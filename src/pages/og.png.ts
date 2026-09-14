import { renderCard } from "@/lib/og-card";
import { AUTHOR_NAME, SITE_TAGLINE } from "@/lib/site";

/** The card for the site as a whole, shown for any page without one of its own. */
export async function GET() {
	const png = await renderCard({
		eyebrow: AUTHOR_NAME,
		title: SITE_TAGLINE,
	});

	return new Response(png, {
		headers: {
			"Content-Type": "image/png",
			"Cache-Control": "public, max-age=31536000, immutable",
		},
	});
}
