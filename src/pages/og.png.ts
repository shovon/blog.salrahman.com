import { renderCard } from "@/lib/og-card";

/** The card for the site as a whole, shown for any page without one of its own. */
export async function GET() {
	const png = await renderCard({
		eyebrow: "Sal Rahman",
		title: "Thoughts from a programmer",
	});

	return new Response(png, {
		headers: {
			"Content-Type": "image/png",
			"Cache-Control": "public, max-age=31536000, immutable",
		},
	});
}
