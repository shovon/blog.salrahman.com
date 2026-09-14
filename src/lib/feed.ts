import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { render } from "astro:content";
import { postPath } from "@/lib/article-meta";
import { getPosts, type Post } from "@/lib/posts";

/**
 * The small square image that feed readers show beside the feed's name. RSS 2.0
 * caps a channel image at 144 wide and 400 tall, so the 1200x630 social card
 * won't do.
 */
export const FEED_ICON_SIZE = 144;
export const FEED_ICON_PATH = "/feed-icon.png";

/** One post, in the shape both the RSS and the Atom feed are built from. */
export interface FeedItem {
	title: string;
	description: string;
	pubDate: Date;
	/** Root-relative, as `@astrojs/rss` expects. */
	link: string;
	/** The full post body, as HTML with absolute URLs. */
	content: string;
}

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

/**
 * Gets every post as a feed item, newest first.
 * @param site The site's URL, which the post bodies' links are resolved against
 * @returns The feed items
 */
export async function getFeedItems(site: URL): Promise<FeedItem[]> {
	const posts = await getPosts();
	const container = await AstroContainer.create();

	return Promise.all(
		posts.map(async (post) => ({
			title: post.data.title,
			description: post.data.summary,
			pubDate: new Date(post.data.publishDate),
			link: postPath(post),
			content: absolutize(await renderContent(container, post), site),
		}))
	);
}

/** Escapes text for use in XML element content and attribute values. */
export function escapeXml(text: string): string {
	return text
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&apos;");
}
