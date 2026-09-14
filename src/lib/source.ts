/** Where the blog's source lives, and the branch that the site is built from. */
export const REPO_URL = "https://github.com/shovon/blog.salrahman.com";
export const REPO_BRANCH = "main";

/**
 * Gets the URL of a file on GitHub, given its path relative to the repo root
 * (e.g. a collection entry's `filePath`, like `src/posts/foo.md`). Returns
 * `undefined` if there's no path to link to.
 */
export function sourceUrl(filePath: string | undefined): string | undefined {
	if (!filePath) return undefined;
	const path = filePath.replace(/^\.?\//, "").split("/").map(encodeURIComponent);
	return `${REPO_URL}/blob/${REPO_BRANCH}/${path.join("/")}`;
}
