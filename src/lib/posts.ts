import { getCollection, type CollectionEntry } from "astro:content";

type Entry = CollectionEntry<"posts">;

export type Post = Entry & { data: Required<Entry["data"]> };

const required = ["title", "summary", "publishDate"] as const;

const warned = new Set<string>();

function isComplete(entry: Entry): entry is Post {
	const missing = required.filter((key) => !entry.data[key]);
	if (missing.length === 0) return true;

	if (!warned.has(entry.id)) {
		warned.add(entry.id);
		console.warn(
			`[posts] Skipping "${entry.id}": missing or invalid ${missing.join(", ")}`
		);
	}
	return false;
}

/**
 * Gets all posts with complete frontmatter, newest first. Posts with missing
 * or invalid frontmatter are skipped, with a warning.
 */
export async function getPosts(): Promise<Post[]> {
	const entries = await getCollection("posts");
	return entries
		.filter(isComplete)
		.sort(
			(a, b) =>
				new Date(b.data.publishDate).getTime() -
				new Date(a.data.publishDate).getTime()
		);
}
