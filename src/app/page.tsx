import { allPosts } from "content-collections";
import { generatePath } from "../lib/article-meta";
import { format } from "date-fns";

export default function Home() {
	return (
		<main className="mx-auto max-w-2xl py-16">
			<h1 className="font-serif text-4xl font-medium tracking-tight text-stone-900 mb-12">
				All Posts
			</h1>
			<div className="space-y-1">
				{allPosts
					.sort((a, b) =>
						a.publishDate < b.publishDate
							? 1
							: a.publishDate > b.publishDate
							? -1
							: 0
					)
					.map((post) => {
						return (
							<a
								key={post._meta.path}
								href={`/posts${generatePath(post)}`}
								className="group block rounded-lg px-4 py-4 -mx-4 hover:bg-white hover:shadow-sm transition-all duration-200 no-underline"
							>
								<div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
									<h2 className="text-base font-medium text-stone-900 group-hover:text-indigo-600 transition-colors duration-200 p-0 tracking-normal">
										{post.title}
									</h2>
									<time className="text-sm text-stone-400 tabular-nums shrink-0">
										{format(new Date(post.publishDate), "MMM d, yyyy")}
									</time>
								</div>
								{post.summary && (
									<p className="mt-1 text-sm text-stone-500 line-clamp-1 pb-0">
										{post.summary}
									</p>
								)}
							</a>
						);
					})}
			</div>
		</main>
	);
}
