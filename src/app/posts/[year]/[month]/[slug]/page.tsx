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
    <main className="mx-auto max-w-2xl py-16">
      <article>
        <header className="mb-10">
          <time className="text-sm font-medium text-indigo-600 uppercase tracking-wider">
            {format(post.publishDate, "MMMM d, yyyy")}
          </time>
          <h1 className="font-serif text-4xl sm:text-5xl font-medium tracking-tight text-stone-900 mt-3 mb-4 leading-tight">
            {post.title}
          </h1>
          {post.summary && (
            <p className="text-lg text-stone-500 leading-relaxed pb-0">
              {post.summary}
            </p>
          )}
        </header>
        <div className="border-t border-stone-200 pt-10">
          <section
            className="prose-article"
            dangerouslySetInnerHTML={{ __html: post.html }}
          ></section>
        </div>
      </article>
    </main>
  );
}
