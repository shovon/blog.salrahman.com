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
			<body className={`${inter.className}`}>
				<div className="p-4">
					<nav className="my-0 mx-auto max-w-3xl mt-4 flex border-b-2 pb-4">
						<div className="flex-1 text-gray-500 font-bold">
							<a href="/" className="text-gray-500">
								Thoughts from a programmer
							</a>
						</div>
						<ul>
							<a href="https://salrahman.com">About</a>
						</ul>
					</nav>
					{children}
				</div>
			</body>
		</html>
	);
}
