import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMarkdown } from "@content-collections/markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";

const posts = defineCollection({
	name: "posts",
	directory: "src/posts",
	include: "**/*.md",
	schema: (z) => ({
		title: z.string(),
		summary: z.string(),
		publishDate: z
			.string()
			.refine((value) => !isNaN(new Date(value).getTime())),
	}),
	transform: async (document, context) => {
		const html = await compileMarkdown(context, document, {
			remarkPlugins: [remarkMath, remarkParse, remarkRehype],
			rehypePlugins: [rehypeKatex, rehypeStringify],
			allowDangerousHtml: true,
		});
		return {
			...document,
			html,
		};
	},
});

export default defineConfig({
	collections: [posts],
});
