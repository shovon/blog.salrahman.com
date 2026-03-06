import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const lora = Lora({ subsets: ["latin"], variable: "--font-lora" });

export const metadata: Metadata = {
	title: "Sal's Blog",
	description: "Thoughts from a programmer",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<link
					rel="stylesheet"
					href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css"
				></link>
			</head>
			<body className={`${inter.variable} ${lora.variable} font-sans`}>
				<div className="min-h-screen">
					<nav className="border-b border-stone-200 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
						<div className="mx-auto max-w-2xl px-6 py-4 flex items-center justify-between">
							<a href="/" className="text-stone-800 hover:text-stone-600 no-underline">
								<span className="font-serif text-lg font-medium tracking-tight">
									Thoughts from a programmer
								</span>
							</a>
							<a
								href="https://salrahman.com"
								className="text-sm text-stone-500 hover:text-stone-800 transition-colors"
							>
								About
							</a>
						</div>
					</nav>
					<div className="px-6">
						{children}
					</div>
				</div>
			</body>
		</html>
	);
}
