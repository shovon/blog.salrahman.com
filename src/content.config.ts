import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const posts = defineCollection({
  // Files prefixed with an underscore are drafts.
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/posts" }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    publishDate: z
      .string()
      .refine((value) => !isNaN(new Date(value).getTime())),
  }),
});

export const collections = { posts };
