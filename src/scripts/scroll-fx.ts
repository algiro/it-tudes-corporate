// Scroll-linked effects. Every animation is "scrubbed": it follows the scroll position, so it
// plays forward scrolling down and rewinds scrolling up. Nothing runs when the visitor prefers
// reduced motion; the markup is complete and readable without this script.
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const mm = gsap.matchMedia();
const DESKTOP = "(min-width: 961px) and (prefers-reduced-motion: no-preference)";
const MOBILE = "(max-width: 960px) and (prefers-reduced-motion: no-preference)";
const MOTION = "(prefers-reduced-motion: no-preference)";

/** How a project runs: the steps appear one by one while the section is pinned. */
function processDesktop(section: HTMLElement) {
  const steps = gsap.utils.toArray<HTMLElement>(".step", section);
  const fill = section.querySelector(".process-fill");
  section.classList.add("is-scrolly");

  const tl = gsap.timeline({
    defaults: { ease: "power2.out" },
    scrollTrigger: {
      trigger: section,
      start: "top 72px", // below the sticky header
      end: () => `+=${Math.round(window.innerHeight * 1.8)}`,
      pin: true,
      scrub: 0.6,
      invalidateOnRefresh: true,
    },
  });

  if (fill) tl.fromTo(fill, { scaleX: 0 }, { scaleX: 1, ease: "none", duration: steps.length }, 0);
  steps.forEach((step, i) => {
    const at = i;
    tl.fromTo(step, { autoAlpha: 0.12, y: 48 }, { autoAlpha: 1, y: 0, duration: 0.6 }, at)
      .fromTo(step.querySelector(".step-dot"), { scale: 0 }, { scale: 1, duration: 0.3, ease: "back.out(3)" }, at)
      .fromTo(step.querySelector(".step-icon"), { scale: 0.4, rotate: -20, autoAlpha: 0 }, { scale: 1, rotate: 0, autoAlpha: 1, duration: 0.5, ease: "back.out(2)" }, at + 0.15)
      .fromTo(step.querySelector(".deliverable"), { autoAlpha: 0, y: 20, clipPath: "inset(0 0 100% 0)" }, { autoAlpha: 1, y: 0, clipPath: "inset(0 0 0% 0)", duration: 0.5 }, at + 0.4);
  });
  // Short hold at the end, so the last step stays readable before the page moves on.
  tl.to({}, { duration: 0.4 });

  return () => section.classList.remove("is-scrolly");
}

/** Phones and tablets: no pinning; each step animates as it passes through the screen. */
function processMobile(section: HTMLElement) {
  gsap.utils.toArray<HTMLElement>(".step", section).forEach((step) => {
    gsap.timeline({ scrollTrigger: { trigger: step, start: "top 88%", end: "top 45%", scrub: 0.5 } })
      .fromTo(step, { autoAlpha: 0.15, x: -24 }, { autoAlpha: 1, x: 0, ease: "power2.out" }, 0)
      .fromTo(step.querySelector(".step-icon"), { scale: 0.4, rotate: -20 }, { scale: 1, rotate: 0, ease: "back.out(2)" }, 0.1)
      .fromTo(step.querySelector(".deliverable"), { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0 }, 0.4);
  });
}

/** Hero: the logo layers separate and the copy drifts up as you scroll away from it. */
function hero() {
  const el = document.querySelector<HTMLElement>(".hero");
  if (!el) return;
  const st = { trigger: el, start: "top top", end: "bottom top", scrub: 0.5 };
  gsap.timeline({ scrollTrigger: st, defaults: { ease: "none" } })
    // The logo explodes: top layer lifts, bottom layer drops, middle stays.
    .to(".fx-l1", { y: -170 }, 0)
    .to(".fx-l2", { y: -20 }, 0)
    .to(".fx-l3", { y: 150 }, 0)
    // Modules fly outward and spin a little.
    .to(".fx-m0", { x: -150, y: -110, rotate: -25, transformOrigin: "50% 50%" }, 0)
    .to(".fx-m1", { x: 150, y: -110, rotate: 25, transformOrigin: "50% 50%" }, 0)
    .to(".fx-m2", { x: -150, y: 110, rotate: 20, transformOrigin: "50% 50%" }, 0)
    .to(".fx-m3", { x: 150, y: 110, rotate: -20, transformOrigin: "50% 50%" }, 0)
    .to(".hero-art", { scale: 0.88, autoAlpha: 0.35 }, 0)
    .to(".hero-copy", { y: -140, autoAlpha: 0 }, 0);
}

const blocksOf = (art: Element) => gsap.utils.toArray<SVGGElement>(".blk", art).sort((a, b) => Number(a.classList.contains("hl")) - Number(b.classList.contains("hl")));

/**
 * Brand block fields assemble as they scroll into view: blocks rise one after another and the
 * orange block drops in last. Scrolling back up takes them apart again. The whole field also
 * drifts against the scroll for depth.
 */
function blockFields() {
  const arts = gsap.utils.toArray<HTMLElement>(".industry-art, .cell-art, .proof-art, .proof-art-only, .cta-art, .page-hero-art");
  for (const art of arts) {
    const blocks = blocksOf(art);
    const atTop = !!art.closest(".page-hero");
    if (atTop) {
      // Already on screen at load: build once on load, then lift the blocks apart while leaving.
      gsap.from(blocks, { y: 90, autoAlpha: 0, duration: 0.9, ease: "back.out(1.6)", stagger: 0.06, delay: 0.15 });
      gsap.to(blocks, {
        y: (i) => -40 - (i % 4) * 30, ease: "none", stagger: 0.02,
        scrollTrigger: { trigger: art.parentElement, start: "top top", end: "bottom top", scrub: 0.5 },
      });
    } else {
      gsap.timeline({ scrollTrigger: { trigger: art, start: "top 95%", end: "top 35%", scrub: 0.6 } })
        .fromTo(blocks, { y: 110, autoAlpha: 0 }, { y: 0, autoAlpha: 1, ease: "back.out(1.4)", stagger: 0.12, duration: 0.6 });
    }
    // Drift the drawing, not its box, so framed tiles never show an empty edge.
    gsap.fromTo(art.querySelector("svg"), { yPercent: atTop ? 0 : -18 }, {
      yPercent: atTop ? 25 : 18, ease: "none",
      scrollTrigger: { trigger: art.parentElement, start: atTop ? "top top" : "top bottom", end: "bottom top", scrub: true },
    });
  }
}

const process = document.querySelector<HTMLElement>("[data-process]");
mm.add(DESKTOP, () => process ? processDesktop(process) : undefined);
mm.add(MOBILE, () => { if (process) processMobile(process); });
mm.add(MOTION, () => { hero(); blockFields(); });

// Images and fonts change the page height after load; recompute the trigger positions.
window.addEventListener("load", () => ScrollTrigger.refresh());
