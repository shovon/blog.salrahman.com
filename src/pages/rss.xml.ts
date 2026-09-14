import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import {
	escapeXml,
	FEED_ICON_PATH,
	FEED_ICON_SIZE,
	getFeedItems,
} from "@/lib/feed";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/site";

export async function GET(context: APIContext) {
	const site = context.site!;

	const items = await getFeedItems(site);

	return rss({
		title: SITE_NAME,
		description: SITE_TAGLINE,
		site,
		items,
		xmlns: { atom: "http://www.w3.org/2005/Atom" },
		// Validators want the feed to name its own URL. The image's title and
		// link must match the channel's.
		customData: [
			`<atom:link href="${escapeXml(new URL("rss.xml", site).href)}" rel="self" type="application/rss+xml"/>`,
			"<image>",
			`<url>${escapeXml(new URL(FEED_ICON_PATH, site).href)}</url>`,
			`<title>${escapeXml(SITE_NAME)}</title>`,
			`<link>${escapeXml(new URL("/", site).href)}</link>`,
			`<width>${FEED_ICON_SIZE}</width>`,
			`<height>${FEED_ICON_SIZE}</height>`,
			"</image>",
		].join(""),
	});
}
