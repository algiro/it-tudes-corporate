import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// TODO: set the final domain before deploying (this site is separate from it-tudes.tech).
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
      i18n: { defaultLocale: "en", locales: { en: "en", es: "es", it: "it" } },
    }),
  ],
});
