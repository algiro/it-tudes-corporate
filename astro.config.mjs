import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// Replaces the previous it-tudes.tech site (same domain, same server folder; see tools/deploy.sh).
export default defineConfig({
  site: "https://it-tudes.tech",
  trailingSlash: "always",
  // English at /, Spanish at /es/, Italian at /it/. Keep in sync with `languages` in content/site.ts.
  i18n: {
    locales: ["en", "es", "it"],
    defaultLocale: "en",
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({
      // Redirect stubs for the old site's project pages stay out of the sitemap.
      filter: (page) => !page.includes("/projects/"),
      i18n: { defaultLocale: "en", locales: { en: "en", es: "es", it: "it" } },
    }),
  ],
});
