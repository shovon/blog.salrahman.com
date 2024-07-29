import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMarkdown } from "@content-collections/markdown";

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
