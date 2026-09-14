import { FEED_ICON_SIZE } from "@/lib/feed";
import { renderIcon } from "@/lib/og-card";

/** The channel image that feed readers show beside the feed's name. */
export async function GET() {
	const png = await renderIcon(FEED_ICON_SIZE);

	return new Response(png, {
		headers: {
			"Content-Type": "image/png",
			"Cache-Control": "public, max-age=31536000, immutable",
		},
	});
}
