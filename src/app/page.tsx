import { allPosts } from "content-collections";
import { generatePath } from "../lib/article-meta";
import { format } from "date-fns";

export default function Home() {
	return (
		<main className="my-0 mx-auto max-w-3xl mt-11">
			<ul className="list-none  [&_li_a_p]:text-gray-600 [&_li_h3]:text-xl [&_li_h3]:font-bold">
				{allPosts.map((post) => (
					<li key={post._meta.path}>
						<a href={`/posts${generatePath(post)}`}>
							<h3>{post.title}</h3>
							<p>{format(new Date(post.publishDate), "MMMM do, y")}</p>
						</a>
					</li>
				))}
			</ul>
		</main>
	);
}
