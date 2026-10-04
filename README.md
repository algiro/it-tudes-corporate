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
