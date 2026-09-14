import type { APIContext } from "astro";

/**
 * Allows every crawler, and points them at the sitemap that @astrojs/sitemap
 * generates. The sitemap URL must be absolute, so it is built from the site.
 */
export function GET(context: APIContext) {
	const sitemap = new URL("sitemap-index.xml", context.site);

	const body = `User-agent: *
Allow: /

Sitemap: ${sitemap.href}
`;

	return new Response(body, {
		headers: { "Content-Type": "text/plain; charset=utf-8" },
	});
}
