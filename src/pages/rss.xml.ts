import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { generatePath } from "@/lib/article-meta";
import { getPosts } from "@/lib/posts";

export async function GET(context: APIContext) {
	const posts = await getPosts();

	return rss({
		title: "Sal's Blog",
		description: "Thoughts from a programmer",
		site: context.site!,
		items: posts.map((post) => ({
			title: post.data.title,
			description: post.data.summary,
			pubDate: new Date(post.data.publishDate),
			link: `/posts${generatePath(post)}`,
		})),
	});
}
