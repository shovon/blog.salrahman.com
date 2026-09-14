import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { Resvg } from "@resvg/resvg-js";
import satori from "satori";
import { OG_HEIGHT, OG_WIDTH } from "@/lib/og";

const resolve = createRequire(import.meta.url).resolve;

// Straight from the Tailwind palette the site is built on, so that a card looks
// like it belongs to the page it links to.
const STONE_50 = "#fafaf9";
const STONE_200 = "#e7e5e4";
const STONE_400 = "#a8a29e";
const STONE_500 = "#78716c";
const STONE_800 = "#292524";
const STONE_900 = "#1c1917";
const INDIGO_600 = "#4f46e5";

const SITE_NAME = "Thoughts from a programmer";

// Satori reads ttf, otf, and woff, but not woff2, and it needs real font bytes
// rather than the stylesheet Astro's font provider emits. Fontsource ships the
// latin subsets of the same two families the site renders with.
const FONT_FILES = [
	{ name: "Inter", weight: 400 as const, file: "@fontsource/inter/files/inter-latin-400-normal.woff" },
	{ name: "Inter", weight: 600 as const, file: "@fontsource/inter/files/inter-latin-600-normal.woff" },
	{ name: "Lora", weight: 600 as const, file: "@fontsource/lora/files/lora-latin-600-normal.woff" },
];

type Font = Parameters<typeof satori>[1]["fonts"][number];

let fonts: Promise<Font[]> | undefined;

/** Reads the font bytes once, rather than once per page in the build. */
function loadFonts(): Promise<Font[]> {
	fonts ??= Promise.all(
		FONT_FILES.map(async ({ name, weight, file }) => ({
			name,
			weight,
			style: "normal" as const,
			data: await readFile(resolve(file)),
		}))
	);
	return fonts;
}

type Style = Record<string, unknown>;
type Node = { type: string; props: { style: Style; children?: unknown } };

function el(style: Style, children?: unknown): Node {
	return { type: "div", props: { style, children } };
}

/**
 * Satori lays text out but won't shrink it to fit, so long strings have to be
 * cut before they overflow the card. Cuts on a word boundary when there is one
 * close enough to the limit.
 */
function truncate(text: string, limit: number): string {
	const trimmed = text.trim();
	if (trimmed.length <= limit) return trimmed;

	const cut = trimmed.slice(0, limit);
	const boundary = cut.lastIndexOf(" ");
	const kept = boundary > limit * 0.7 ? cut.slice(0, boundary) : cut;
	return `${kept.replace(/[\s,;:.]+$/, "")}…`;
}

/** Long titles step down a size so that they still fill the card without spilling. */
function titleFontSize(title: string): number {
	if (title.length > 68) return 54;
	if (title.length > 44) return 62;
	return 72;
}

export interface CardOptions {
	/** The small line above the title — a date on a post. */
	eyebrow?: string;
	title: string;
	summary?: string;
}

/**
 * Renders a social card as a PNG. Satori turns the layout into SVG, and resvg
 * rasterizes it, because the crawlers that read `og:image` won't render SVG.
 */
export async function renderCard({
	eyebrow,
	title,
	summary,
}: CardOptions): Promise<Uint8Array<ArrayBuffer>> {
	const body = [
		eyebrow &&
			el(
				{
					fontSize: 24,
					fontWeight: 600,
					color: INDIGO_600,
					textTransform: "uppercase",
					letterSpacing: 2,
					marginBottom: 26,
				},
				eyebrow
			),
		el(
			{
				fontFamily: "Lora",
				fontWeight: 600,
				fontSize: titleFontSize(title),
				lineHeight: 1.14,
				letterSpacing: -1,
				color: STONE_900,
			},
			truncate(title, 110)
		),
		summary &&
			el(
				{ fontSize: 27, lineHeight: 1.45, color: STONE_500, marginTop: 28 },
				truncate(summary, 150)
			),
	].filter(Boolean);

	const footer = el(
		{
			display: "flex",
			alignItems: "center",
			justifyContent: "space-between",
			borderTopWidth: 1,
			borderTopStyle: "solid",
			borderTopColor: STONE_200,
			paddingTop: 28,
		},
		[
			// Left empty on the site's own card, where the title already says this.
			el(
				{ fontFamily: "Lora", fontWeight: 600, fontSize: 26, color: STONE_800 },
				title === SITE_NAME ? "" : SITE_NAME
			),
			el({ fontSize: 22, color: STONE_400 }, "blog.salrahman.com"),
		]
	);

	const card = el(
		{
			display: "flex",
			flexDirection: "column",
			width: OG_WIDTH,
			height: OG_HEIGHT,
			backgroundColor: STONE_50,
			fontFamily: "Inter",
		},
		[
			el({ height: 12, backgroundColor: INDIGO_600 }),
			el(
				{
					display: "flex",
					flexDirection: "column",
					flexGrow: 1,
					justifyContent: "space-between",
					padding: "64px 72px 56px",
				},
				[el({ display: "flex", flexDirection: "column" }, body), footer]
			),
		]
	);

	const svg = await satori(card, {
		width: OG_WIDTH,
		height: OG_HEIGHT,
		fonts: await loadFonts(),
	});

	const png = new Resvg(svg, {
		fitTo: { mode: "width", value: OG_WIDTH },
		font: { loadSystemFonts: false },
	})
		.render()
		.asPng();

	// Copied into a plain Uint8Array, because Node's Buffer isn't a valid
	// `Response` body as far as the DOM types are concerned.
	const bytes = new Uint8Array(png.byteLength);
	bytes.set(png);
	return bytes;
}

/**
 * Renders a small square icon as a PNG: the site's initial, in the card's serif,
 * on the card's indigo. Used as the feed's channel image, which RSS 2.0 caps at
 * 144 pixels wide.
 * @param size The width and height, in pixels
 */
export async function renderIcon(size: number): Promise<Uint8Array<ArrayBuffer>> {
	const icon = el(
		{
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			width: size,
			height: size,
			backgroundColor: INDIGO_600,
			color: STONE_50,
			fontFamily: "Lora",
			fontWeight: 600,
			fontSize: Math.round(size * 0.62),
		},
		"S"
	);

	const svg = await satori(icon, {
		width: size,
		height: size,
		fonts: await loadFonts(),
	});

	const png = new Resvg(svg, {
		fitTo: { mode: "width", value: size },
		font: { loadSystemFonts: false },
	})
		.render()
		.asPng();

	const bytes = new Uint8Array(png.byteLength);
	bytes.set(png);
	return bytes;
}
