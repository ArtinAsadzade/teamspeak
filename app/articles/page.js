import Link from "next/link";
import { getAllArticles } from "@/lib/articles";

export const metadata = {
  title: "مقالات TeamSpeak برای ورود و استفاده حرفه‌ای",
  description: "مجموعه مقالات فارسی و انگلیسی برای join teamspeak server، رفع مشکل اتصال، تنظیمات میکروفون، گیمینگ، RP و امنیت.",
  alternates: { canonical: "/articles" },
  openGraph: {
    title: "مقالات TeamSpeak | ALLEH",
    description: "راهنماهای کامل برای ورود به سرور TeamSpeak ایرانی و استفاده بهتر در گیمینگ.",
    url: "/articles",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
};

export default function ArticlesPage() {
  const articles = getAllArticles();

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-10 md:px-8">
      <h1 className="text-3xl font-bold text-white">مقالات آموزشی TeamSpeak</h1>
      <p className="mt-3 text-slate-300">محتوای SEO-محور برای کاربرانی که دنبال راهنمای واقعی برای ورود به سرور TeamSpeak هستند.</p>

      <section className="mt-8 grid gap-4">
        {articles.map((article) => (
          <article key={article.slug} className="rounded-2xl border border-white/10 bg-slate-900/70 p-5">
            <h2 className="text-xl font-bold text-slate-100">
              <Link href={`/articles/${article.slug}`} className="hover:text-sky-300">
                {article.title}
              </Link>
            </h2>
            <p className="mt-2 text-sm text-slate-300">{article.description}</p>
            <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-400">
              <span>{new Date(article.date).toLocaleDateString("fa-IR")}</span>
              <span>•</span>
              <span>{article.readingMinutes} دقیقه مطالعه</span>
              <span>•</span>
              <span>{article.language === "fa" ? "فارسی" : "English"}</span>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
