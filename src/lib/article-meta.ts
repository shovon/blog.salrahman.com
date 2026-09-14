import type { Post } from "@/lib/posts";

/**
 * Derives some metadata from a post
 * @param post The post from which to derive the metadata from
 * @returns Some metadata
 */
export function getMeta(post: Post) {
	const date = new Date(post.data.publishDate);

	// UTC, so that URLs don't depend on the timezone of the build machine.
	const year = `${date.getUTCFullYear()}`;
	const month = `${date.getUTCMonth() + 1}`.padStart(2, "0");

	return { year, month, slug: post.id };
}

/**
 * Derives some metadata from a post
 * @param post The psot from which to derive the path
 * @returns Some metadata
 */
export function generatePath(post: Post): string {
	const { year, month, slug } = getMeta(post);
	return `/${year}/${month}/${slug}`;
}

/**
 * The URL of a post's page, relative to the site root.
 *
 * Ends in a slash, since that is where the page is served from; linking without
 * it costs a redirect.
 * @param post The post whose page to link to
 * @returns The root-relative URL of the post's page
 */
export function postPath(post: Post): string {
	return `/posts${generatePath(post)}/`;
}
