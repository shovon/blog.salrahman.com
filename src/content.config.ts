import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const posts = defineCollection({
  // Files prefixed with an underscore are drafts.
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/posts" }),
  // Every field is lenient, so that a post with missing or invalid frontmatter
  // doesn't fail the build. Such posts are skipped in `getPosts`.
  schema: z.object({
    title: z.string().optional().catch(undefined),
    summary: z.string().optional().catch(undefined),
    publishDate: z
      .string()
      .refine((value) => !isNaN(new Date(value).getTime()))
      .optional()
      .catch(undefined),
  }),
});

export const collections = { posts };
