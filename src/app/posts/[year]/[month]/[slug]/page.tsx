"use client";

import { allPosts } from "content-collections";
import { useParams, notFound } from "next/navigation";
import { generatePath } from "@/lib/article-meta";
import { format } from "date-fns";

export default function Home() {
	const params = useParams();

	const { year, month, slug } = params;

	const post = allPosts.find(
		(post) => `/${year}/${month}/${slug}` === generatePath(post)
	);

	if (!post) {
		notFound();
	}

	return (
		<main className="my-0 mx-auto mb-12 max-w-3xl mt-11">
			<article>
				<hgroup className="mb-4">
					<p className="text-gray-500">
						{format(post.publishDate, "MMMM do, y")}
					</p>
					<h1 className="text-5xl mb-3 font-bold">{post.title}</h1>
					<p className="text-gray-600">{post.summary}</p>
				</hgroup>
				<section dangerouslySetInnerHTML={{ __html: post.html }}></section>
			</article>
		</main>
	);
}
