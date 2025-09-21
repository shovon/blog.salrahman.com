import { allPosts } from "content-collections";
import { useParams, notFound } from "next/navigation";
import { generatePath } from "@/lib/article-meta";
import { format } from "date-fns";
import type { Metadata } from "next";

type Params = { year: string; month: string; slug: string };

type MetadataProps = {
  params: Promise<Params>;
};

export async function generateMetadata({ params }: MetadataProps) {
  const { year, month, slug } = await params;

  const post = allPosts.find(
    (post) => `/${year}/${month}/${slug}` === generatePath(post)
  );

  if (!post) {
    return { title: "Blog" };
  }

  return {
    title: post.title,
    description: post.summary,
  };
}

export default function BlogPost({ params }: { params: Params }) {
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
