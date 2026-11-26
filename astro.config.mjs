// @ts-check
import { readdirSync, readFileSync } from "node:fs";
import { defineConfig, fontProviders } from "astro/config";
import { unified } from "@astrojs/markdown-remark";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeGithubAlerts from "./src/lib/rehypeGithubAlerts";

// Slugs of unlisted posts, to keep them out of the sitemap. Content collections
// aren't available in this file, so the frontmatter is matched directly.
const unlisted = readdirSync("src/posts")
  .filter((file) =>
    /^unlisted:\s*true\s*$/m.test(readFileSync(`src/posts/${file}`, "utf8")),
  )
  .map((file) => file.replace(/\.md$/, ""));

export default defineConfig({
  site: "https://blog.salrahman.com",
  integrations: [
    sitemap({
      filter: (page) => !unlisted.some((slug) => page.endsWith(`/${slug}/`)),
    }),
  ],
  markdown: {
    processor: unified({
      // Keep straight quotes, as the site had before.
      smartypants: false,
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeGithubAlerts, rehypeKatex],
    }),
    shikiConfig: {
      theme: "github-dark",
    },
  },
  fonts: [
    {
      provider: fontProviders.google(),
      name: "Inter",
      cssVariable: "--font-inter",
      weights: [400, 500, 600, 700],
      styles: ["normal", "italic"],
      subsets: ["latin"],
      fallbacks: ["system-ui", "sans-serif"],
    },
    {
      provider: fontProviders.google(),
      name: "Lora",
      cssVariable: "--font-lora",
      weights: [400, 500, 600, 700],
      styles: ["normal", "italic"],
      subsets: ["latin"],
      fallbacks: ["Georgia", "serif"],
    },
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
