import { getAllArticles } from "@/lib/articles";

export default function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://alleh.example.com";
  const articles = getAllArticles();

  const articleEntries = articles.map((article) => ({
    url: `${baseUrl}/articles/${article.slug}`,
    lastModified: article.lastUpdated,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [
    { url: `${baseUrl}/`, lastModified: new Date().toISOString(), changeFrequency: "daily", priority: 1 },
    { url: `${baseUrl}/articles`, lastModified: new Date().toISOString(), changeFrequency: "daily", priority: 0.9 },
    ...articleEntries,
  ];
}
