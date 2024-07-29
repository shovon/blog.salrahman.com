import { allPosts } from "content-collections";

type Post = (typeof allPosts)[number];

/**
 * Derives some metadata from a post
 * @param post The post from which to derive the metadata from
 * @returns Some metadata
 */
export function getMeta(post: Post) {
	const date = new Date(post.publishDate);

	const year = `${date.getFullYear()}`;
	const month = `${date.getMonth() + 1}`.padStart(2, "0");

	return { year, month, slug: post._meta.fileName.split(".")[0] };
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
