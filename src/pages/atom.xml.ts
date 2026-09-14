import type { APIContext } from "astro";
import { escapeXml, FEED_ICON_PATH, getFeedItems } from "@/lib/feed";
import { AUTHOR_NAME, SITE_NAME, SITE_TAGLINE } from "@/lib/site";

/** An Atom 1.0 feed, with the same entries as the RSS feed at `/rss.xml`. */
export async function GET(context: APIContext) {
	const site = context.site!;
	const items = await getFeedItems(site);

	const siteUrl = new URL("/", site).href;
	const selfUrl = new URL("atom.xml", site).href;
	// Items are newest first, so the feed was last updated by the first one.
	const updated = (items[0]?.pubDate ?? new Date(0)).toISOString();

	const entries = items.map((item) => {
		const url = escapeXml(new URL(item.link, site).href);
		const date = item.pubDate.toISOString();
		return `	<entry>
		<id>${url}</id>
		<title>${escapeXml(item.title)}</title>
		<link rel="alternate" type="text/html" href="${url}"/>
		<published>${date}</published>
		<updated>${date}</updated>
		<summary>${escapeXml(item.description)}</summary>
		<content type="html">${escapeXml(item.content)}</content>
	</entry>`;
	});

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
	<id>${escapeXml(siteUrl)}</id>
	<title>${escapeXml(SITE_NAME)}</title>
	<subtitle>${escapeXml(SITE_TAGLINE)}</subtitle>
	<updated>${updated}</updated>
	<link rel="self" type="application/atom+xml" href="${escapeXml(selfUrl)}"/>
	<link rel="alternate" type="text/html" href="${escapeXml(siteUrl)}"/>
	<icon>${escapeXml(new URL(FEED_ICON_PATH, site).href)}</icon>
	<author>
		<name>${escapeXml(AUTHOR_NAME)}</name>
	</author>
${entries.join("\n")}
</feed>
`;

	return new Response(xml, {
		headers: { "Content-Type": "application/atom+xml; charset=utf-8" },
	});
}
