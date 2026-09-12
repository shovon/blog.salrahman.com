// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import { unified } from "@astrojs/markdown-remark";
import tailwindcss from "@tailwindcss/vite";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeGithubAlerts from "./src/lib/rehypeGithubAlerts";

export default defineConfig({
  site: "https://blog.salrahman.com",
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
