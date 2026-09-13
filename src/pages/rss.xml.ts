import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { render } from "astro:content";
import { generatePath } from "@/lib/article-meta";
import { getPosts, type Post } from "@/lib/posts";

/**
 * Renders a post's body to an HTML string, using the same Markdown pipeline as
 * the site itself, so that code highlighting, math, and alerts survive.
 */
async function renderContent(
	container: AstroContainer,
	post: Post
): Promise<string> {
	const { Content } = await render(post);
	return container.renderToString(Content);
}

/**
 * Feed readers fetch the feed from elsewhere, so root-relative URLs in the post
 * body have nothing to resolve against. Make them absolute.
 */
function absolutize(html: string, site: URL): string {
	return html.replace(
		/(\s(?:href|src)=")\/(?!\/)/g,
		(_, attribute) => `${attribute}${new URL("/", site).href}`
	);
}

export async function GET(context: APIContext) {
	const posts = await getPosts();
	const container = await AstroContainer.create();
	const site = context.site!;

	const items = await Promise.all(
		posts.map(async (post) => ({
			title: post.data.title,
			description: post.data.summary,
			pubDate: new Date(post.data.publishDate),
			link: `/posts${generatePath(post)}`,
			content: absolutize(await renderContent(container, post), site),
		}))
	);

	return rss({
		title: "Sal's Blog",
		description: "Thoughts from a programmer",
		site,
		items,
	});
}
