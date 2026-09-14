import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://blogs.ewanjohndennis.vercel.app",
  markdown: {
    shikiConfig: {
      theme: "github-dark",
    },
  },
});