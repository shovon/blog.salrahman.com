import type { Post } from "@/lib/posts";
import { generatePath } from "@/lib/article-meta";

/**
 * The size every social card is rendered at, and what the `og:image` tags
 * advertise. 1200x630 is the ~1.91:1 that Facebook, X, LinkedIn, Slack, and
 * Discord all crop toward.
 *
 * Kept apart from the renderer in `og-card.ts` so that pages can reference the
 * dimensions without pulling the image toolchain into their bundle.
 */
export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;

/** The card for the site as a whole, used by any page without one of its own. */
export const OG_DEFAULT_PATH = "/og.png";

/** A post's card sits beside the post, at the same path plus `.png`. */
export function ogImagePath(post: Post): string {
	return `/posts${generatePath(post)}.png`;
}
