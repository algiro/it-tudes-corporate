# it-tudes corporate site

A second, separate it-tudes website aimed at business decision-makers as well as CTOs
(the "Corporate IT Agency" benchmark in `../it-tudes.tech/Docs/technical_review_analysis.md`).
Static [Astro](https://astro.build) site: no cookies, no third-party requests (fonts and icons
are bundled), a little JavaScript for the scroll effects.

```
content/site.ts                 company details and all copy per language: industries, solutions,
                                selected work (anonymised), process, engagement models, products
src/i18n/ui.ts                  interface labels (menu, buttons)
src/styles/global.css           colour tokens (dark theme, navy brand field), type, header, footer
src/components/BrandGraphic.astro  isometric brand graphics generated from the logo geometry
src/assets/products/            product screenshots and icons
src/assets/founder.jpg          optional photo for the team card (see site.founder)
```

Pages, in English at `/`, Spanish at `/es/`, Italian at `/it/`: home, `/industries/`,
`/solutions/`, `/products/`, `/about/`, `/contact/`.

## Content rules

Positioning: software engineering for financial services (banks, trading firms) and mid-sized
companies. Client work appears only as anonymised "Selected work" stories; every claim and figure
must be true. `site.figures` (the numbers band under the hero) stays hidden until filled in.

## Design rules

Enterprise look with layout clarity, dark theme only: a deep navy brand field (header, hero,
inner page headers, CTA band, footer) over a near-black page, one UI accent (brand
blue), the logo's orange only inside the brand graphics, one corner radius (8px), Geist + Geist
Mono, Phosphor icons. Motion: floating hero layers, hover lift, and scroll-linked effects in
src/scripts/scroll-fx.ts (GSAP ScrollTrigger, bundled locally): "How a project runs" is pinned on
desktop and reveals its steps as you scroll, the hero layers separate, brand graphics drift, and
section fade-ins reverse when scrolling back up. All of it is off under prefers-reduced-motion. No em dashes in copy; one label per call to action.

## Run locally

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # writes the site to dist/
npm run check      # type-checks the site
```

## Deploy

This site replaces the previous one at https://it-tudes.tech, on the same server and in the
same folder, so the proxy needs no change. Server specifics live in `tools/deploy.local.env`
(git-ignored; same values as `it-tudes.tech/tools/deploy.local.env`, template in
`tools/deploy.local.env.example`).

```powershell
.\tools\deploy.ps1 -DryRun   # build, connect, show what would change
.\tools\deploy.ps1           # build and publish
```

Each deploy uploads `dist/` to `$REMOTE_BASE/releases/<timestamp>` and switches the `current`
symlink: atomic, no restart, no sudo. The first time (while the old site is still live) it asks
you to type `replace` before switching; `-Yes` skips that. It refuses to run if the server's
hostname is not `EXPECTED_HOST`, then checks every page, a 404, the old project URLs and the
other apps on the proxy, and prints the one-line rollback command. The last 5 releases of this
site are kept; releases of the previous site are never pruned, so going back to it stays a
one-line switch.

The previous site's `/projects/<name>/` pages are kept as redirect stubs
(`src/pages/[...lang]/projects/[slug].astro`). Running the old repo's deploy would put the old
site back live.
