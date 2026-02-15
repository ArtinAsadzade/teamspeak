import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllArticles, getArticleBySlug, getRelatedArticles } from "@/lib/articles";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://alleh.example.com";

export function generateStaticParams() {
  return getAllArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  const canonical = article.canonical || `${siteUrl}/articles/${article.slug}`;

  return {
    title: article.title,
    description: article.description,
    alternates: { canonical },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.description,
      url: `/articles/${article.slug}`,
      images: [{ url: "/og.png", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
      images: ["/og.png"],
    },
  };
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const related = getRelatedArticles(article, 3);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    inLanguage: article.language,
    datePublished: article.date,
    dateModified: article.lastUpdated,
    author: { "@type": "Person", name: "ALLEH Team" },
    mainEntityOfPage: `${siteUrl}/articles/${article.slug}`,
    image: `${siteUrl}/og.png`,
  };

  return (
    <main className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 md:grid-cols-[1fr_260px] md:px-8">
      <article className="min-w-0 rounded-2xl border border-white/10 bg-slate-900/70 p-6">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
        <h1 className="text-3xl font-bold text-white">{article.title}</h1>
        <p className="mt-3 text-slate-300">{article.description}</p>
        <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-400">
          <span>انتشار: {new Date(article.date).toLocaleDateString("fa-IR")}</span>
          <span>•</span>
          <span>آخرین بروزرسانی: {new Date(article.lastUpdated).toLocaleDateString("fa-IR")}</span>
          <span>•</span>
          <span>{article.readingMinutes} دقیقه مطالعه</span>
        </div>

        <div className="article-content mt-8" dangerouslySetInnerHTML={{ __html: article.html }} />

        <section className="mt-8 rounded-xl border border-sky-400/40 bg-sky-500/10 p-4">
          <h2 className="text-lg font-bold text-sky-200">آماده Join شدن هستید؟</h2>
          <p className="mt-2 text-sm text-slate-200">برای ورود سریع به سرور TeamSpeak ایرانی، از راهنمای اصلی استفاده کنید.</p>
          <Link href="/#join" className="mt-3 inline-block rounded-lg bg-sky-500 px-4 py-2 text-sm font-bold text-slate-950">
            ورود به سرور TeamSpeak ALLEH
          </Link>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-bold">مقالات مرتبط</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {related.map((item) => (
              <Link
                key={item.slug}
                href={`/articles/${item.slug}`}
                className="rounded-xl border border-white/10 bg-slate-950/80 p-3 text-sm hover:border-sky-400"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </section>
      </article>

      <aside className="h-fit rounded-2xl border border-white/10 bg-slate-900/60 p-4 md:sticky md:top-6">
        <h2 className="text-sm font-bold text-slate-100">فهرست مطالب</h2>
        <nav className="mt-3 space-y-2 text-sm text-slate-300">
          {article.headings.map((heading) => (
            <a key={heading.id} href={`#${heading.id}`} className={`block hover:text-sky-300 ${heading.depth === 3 ? "pr-4" : ""}`}>
              {heading.text}
            </a>
          ))}
        </nav>
      </aside>
    </main>
  );
}
