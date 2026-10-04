#!/usr/bin/env bash
#
# Upload the built site (dist/) to the server and make it live at https://it-tudes.tech.
# Use deploy.ps1, which builds first, or run from WSL after `npm run build`:
#
#     wsl bash -c '/mnt/c/projects/sites/it-tudes-corporate/tools/deploy.sh [--dry-run] [--yes]'
#
#   --dry-run   connect, check, show what would be uploaded; change nothing
#   --yes       skip the confirmation asked the first time this site replaces the old one
#
# Server specifics come from tools/deploy.local.env (git-ignored; start from
# deploy.local.env.example). They are the same values as the previous site's repo
# (it-tudes.tech/tools/deploy.local.env): this site is served from the same folder.
#
# The proxy was set up once by the previous repo's setup-server.sh: it serves
# $REMOTE_BASE/current at https://it-tudes.tech/. So no server or nginx change is needed:
# each deploy lands in $REMOTE_BASE/releases/<timestamp> and goes live by swapping the
# "current" symlink. Visitors never see a half-uploaded site, rollback is instant, no sudo,
# and the proxy container is never restarted.
#
# Releases of the previous site are never pruned, so rolling back to it stays possible.
# Note: running the previous repo's deploy would put the old site back live.

set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT="$(dirname "$HERE")"
LOCAL_SITE="$PROJECT/dist"
ENV_FILE="$HERE/deploy.local.env"
SITE_URL=https://it-tudes.tech
MARKER='data-build="corporate"'
KEEP_RELEASES=5

say()  { printf '\n\033[1m==> %s\033[0m\n' "$*"; }
warn() { printf '\033[33m%s\033[0m\n' "$*"; }
fail() { printf '\n\033[31mFAILED: %s\033[0m\n' "$*" >&2; exit 1; }

[ -f "$ENV_FILE" ] || fail "missing $ENV_FILE: copy deploy.local.env.example and fill it in"
# shellcheck source=/dev/null
. "$ENV_FILE"
for v in SSH_HOST EXPECTED_HOST REMOTE_BASE CONTAINER; do
  [ -n "${!v:-}" ] || fail "$v is not set in deploy.local.env"
done

DRY_RUN=0
YES=0
for a in "$@"; do
  case "$a" in
    --dry-run) DRY_RUN=1 ;;
    --yes) YES=1 ;;
    *) echo "unknown option: $a" >&2; exit 2 ;;
  esac
done

say "Preflight"
[ -f "$LOCAL_SITE/index.html" ] || fail "no dist/index.html: run 'npm run build' first"
[ -f "$LOCAL_SITE/404.html" ] || fail "no dist/404.html: incomplete build"
grep -q "$MARKER" "$LOCAL_SITE/index.html" || fail "dist/index.html is not this site's build"
echo "  $(find "$LOCAL_SITE" -name '*.html' | wc -l) pages, $(find "$LOCAL_SITE" -type f | wc -l) files"

REMOTE_HOSTNAME=$(ssh -o ConnectTimeout=15 -o BatchMode=yes "$SSH_HOST" hostname 2>/dev/null) || fail "cannot reach $SSH_HOST"
[ "$REMOTE_HOSTNAME" = "$EXPECTED_HOST" ] || fail "$SSH_HOST is $REMOTE_HOSTNAME, expected $EXPECTED_HOST"
echo "  $SSH_HOST = $REMOTE_HOSTNAME"

ssh "$SSH_HOST" "docker inspect $CONTAINER --format '{{range .Mounts}}{{.Destination}} {{end}}'" | grep -q /srv/it-tudes \
  || fail "the proxy does not mount /srv/it-tudes: run the one-time setup from the it-tudes.tech repo (tools/setup-server.sh install) first"
CURRENT=$(ssh "$SSH_HOST" "basename \"\$(readlink '$REMOTE_BASE/current' 2>/dev/null || echo none)\"")
echo "  proxy serves $REMOTE_BASE/current (now: $CURRENT)"

FIRST_SWITCH=0
if curl -sS --max-time 15 "$SITE_URL/" | grep -q "$MARKER"; then
  echo "  $SITE_URL already runs this site"
else
  FIRST_SWITCH=1
  warn "  $SITE_URL still runs the previous site: this deploy replaces it"
fi

RELEASE=$(date +%Y%m%d-%H%M%S)
say "Uploading release $RELEASE"
RSYNC_OPTS=(-az --delete --human-readable --stats)
[ "$DRY_RUN" -eq 1 ] && RSYNC_OPTS+=(--dry-run --itemize-changes)
LINK_DEST=()
ssh "$SSH_HOST" "[ -e '$REMOTE_BASE/current' ]" && LINK_DEST=(--link-dest="$REMOTE_BASE/current/")
ssh "$SSH_HOST" "mkdir -p '$REMOTE_BASE/releases'"
rsync "${RSYNC_OPTS[@]}" "${LINK_DEST[@]}" "$LOCAL_SITE/" "$SSH_HOST:$REMOTE_BASE/releases/$RELEASE/" \
  | grep -E 'Number of regular files transferred|Total transferred|^[<>ch.]' | sed 's/^/  /' || true

if [ "$DRY_RUN" -eq 1 ]; then
  ssh "$SSH_HOST" "rm -rf '$REMOTE_BASE/releases/$RELEASE'"
  say "Dry run: nothing changed"
  exit 0
fi

if [ "$FIRST_SWITCH" -eq 1 ] && [ "$YES" -eq 0 ]; then
  printf '\nThe new site is uploaded but not live. Type "replace" to make it live at %s: ' "$SITE_URL"
  read -r answer
  if [ "$answer" != "replace" ]; then
    ssh "$SSH_HOST" "rm -rf '$REMOTE_BASE/releases/$RELEASE'"
    say "Cancelled: upload removed, the live site is unchanged"
    exit 1
  fi
fi

say "Switching 'current' to $RELEASE"
ssh "$SSH_HOST" bash -s <<REMOTE
set -euo pipefail
cd '$REMOTE_BASE'
[ -f "releases/$RELEASE/index.html" ] || { echo "upload looks incomplete"; exit 1; }
echo "  previous: \$(basename "\$(readlink current 2>/dev/null || echo none)")"
# Relative link: the container sees this tree at /srv/it-tudes, not at $REMOTE_BASE.
ln -sfn 'releases/$RELEASE' current.tmp
mv -T current.tmp current
echo "  current:  $RELEASE"
# Prune old releases of this site only; releases of the previous site stay for rollback.
cd releases
ls -1dt */ | while read -r d; do grep -q '$MARKER' "\$d/index.html" 2>/dev/null && echo "\$d"; done \
  | tail -n +$((KEEP_RELEASES + 1)) | xargs -r rm -rf
echo "  releases kept: \$(ls -1d */ | wc -l)"
REMOTE

say "Verifying $SITE_URL"
bad=0
check() { # check <url> <expected status>
  local c; c=$(curl -sS -o /dev/null -w '%{http_code}' --max-time 15 "$1" || echo ---)
  printf '  %-52s %s (expect %s)\n' "${1#"$SITE_URL"}" "$c" "$2"
  [[ "$c" =~ ^($2)$ ]] || bad=1
}
for path in / /es/ /it/ /industries/ /solutions/ /products/ /about/ /contact/ /it/solutions/ /es/contact/ \
            /projects/ninvoices/ /robots.txt /sitemap-index.xml /favicon.svg; do
  check "$SITE_URL$path" 200
done
check "$SITE_URL/does-not-exist/" 404
curl -sS --max-time 15 "$SITE_URL/" | grep -q "$MARKER" && echo "  homepage is this site" || { echo "  homepage is NOT this site"; bad=1; }

if [ -n "${OTHER_CHECKS:-}" ]; then
  say "Other apps behind the proxy"
  while read -r scheme path want; do
    [ -n "${path:-}" ] || continue
    check "$scheme://${SITE_URL#https://}$path" "$want"
  done <<< "$OTHER_CHECKS"
fi

ROLLBACK="wsl bash -c 'ssh $SSH_HOST \"cd $REMOTE_BASE && ln -sfn releases/$CURRENT current.tmp && mv -T current.tmp current\"'"
if [ "$bad" -ne 0 ]; then
  printf '\n\033[31mSome checks failed.\033[0m To put back the previous release (%s):\n  %s\n' "$CURRENT" "$ROLLBACK"
  exit 1
fi
say "Deployed $RELEASE"
echo "Rollback to the previous release ($CURRENT):"
echo "  $ROLLBACK"
