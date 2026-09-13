import type { APIContext } from "astro";
import { getMeta } from "@/lib/article-meta";
import { renderCard } from "@/lib/og-card";
import { getPosts, type Post } from "@/lib/posts";

/** One card per post, at the post's own path plus `.png`. */
export async function getStaticPaths() {
	const posts = await getPosts();
	return posts.map((post) => ({
		params: getMeta(post),
		props: { post },
	}));
}

export async function GET({ props }: APIContext) {
	const { post } = props as { post: Post };

	const png = await renderCard({
		// UTC, to match the URL and `article:published_time`, so that the date on
		// the card doesn't shift with the timezone of the build machine.
		eyebrow: new Date(post.data.publishDate).toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
			timeZone: "UTC",
		}),
		title: post.data.title,
		summary: post.data.summary,
	});

	return new Response(png, {
		headers: {
			"Content-Type": "image/png",
			"Cache-Control": "public, max-age=31536000, immutable",
		},
	});
}
