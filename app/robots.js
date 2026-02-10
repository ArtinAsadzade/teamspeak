export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://alleh.example.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
