import { defineConfig } from "astro/config";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

export default defineConfig({
  site: "https://blogs.ewanjohndennis.vercel.app",
  markdown: {
    shikiConfig: {
      theme: "github-dark",
    },
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  },
});