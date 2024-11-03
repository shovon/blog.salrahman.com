import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

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
					href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/default.min.css"
				></link>
			</head>
			<body className={`${inter.className}`}>
				<div className="p-4">
					<nav className="my-0 mx-auto max-w-3xl mt-4 flex border-b-2 pb-4 items-center justify-between">
						<div className="text-gray-500 font-bold">
							<a href="/" className="text-gray-500">
								Thoughts from a programmer
							</a>
						</div>
						<ul className="[&>li]:inline-block [&>li]:p-0 p-0">
							<li>
								<a href="https://salrahman.com">About</a>
							</li>
						</ul>
					</nav>
					{children}
				</div>
			</body>
		</html>
	);
}
