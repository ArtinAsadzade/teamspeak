import fs from "node:fs";
import path from "node:path";

const contentDir = path.join(process.cwd(), "content/articles");

function parseFrontmatter(raw) {
  if (!raw.startsWith("---")) return { data: {}, body: raw };
  const end = raw.indexOf("\n---", 3);
  if (end === -1) return { data: {}, body: raw };
  const fm = raw.slice(3, end).trim();
  const body = raw.slice(end + 4).trim();
  const data = {};

  for (const line of fm.split("\n")) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();
    if (value.startsWith("[") && value.endsWith("]")) {
      value = value
        .slice(1, -1)
        .split(",")
        .map((item) => item.trim().replace(/^['\"]|['\"]$/g, ""))
        .filter(Boolean);
    } else {
      value = value.replace(/^['\"]|['\"]$/g, "");
    }
    data[key] = value;
  }

  return { data, body };
}

function slugify(input) {
  return input
    .toLowerCase()
    .replace(/[^\w\u0600-\u06FF\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function escapeHtml(text) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function markdownToHtml(markdown) {
  const lines = markdown.split("\n");
  let html = "";
  let inList = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      if (inList) {
        html += "</ul>";
        inList = false;
      }
      continue;
    }

    if (trimmed.startsWith("### ")) {
      if (inList) {
        html += "</ul>";
        inList = false;
      }
      const text = trimmed.slice(4);
      html += `<h3 id="${slugify(text)}">${escapeHtml(text)}</h3>`;
      continue;
    }

    if (trimmed.startsWith("## ")) {
      if (inList) {
        html += "</ul>";
        inList = false;
      }
      const text = trimmed.slice(3);
      html += `<h2 id="${slugify(text)}">${escapeHtml(text)}</h2>`;
      continue;
    }

    if (trimmed.startsWith("- ")) {
      if (!inList) {
        html += "<ul>";
        inList = true;
      }
      html += `<li>${escapeHtml(trimmed.slice(2))}</li>`;
      continue;
    }

    html += `<p>${escapeHtml(trimmed)}</p>`;
  }

  if (inList) html += "</ul>";
  return html;
}

export function getAllArticles() {
  const files = fs.readdirSync(contentDir).filter((file) => file.endsWith(".mdx"));
  const slugs = new Set();

  return files
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      if (slugs.has(slug)) {
        throw new Error(`Duplicate article slug detected: ${slug}`);
      }
      slugs.add(slug);
      const fullPath = path.join(contentDir, file);
      const raw = fs.readFileSync(fullPath, "utf8");
      const { data, body } = parseFrontmatter(raw);
      const words = body.split(/\s+/).filter(Boolean).length;
      const readingMinutes = Math.max(1, Math.ceil(words / 220));
      const headings = body
        .split("\n")
        .filter((line) => line.startsWith("## ") || line.startsWith("### "))
        .map((line) => ({
          depth: line.startsWith("### ") ? 3 : 2,
          text: line.replace(/^###?\s/, ""),
          id: slugify(line.replace(/^###?\s/, "")),
        }));

      return {
        slug,
        title: data.title,
        description: data.description,
        date: data.date,
        tags: Array.isArray(data.tags) ? data.tags : [],
        language: data.language || "fa",
        canonical: data.canonical,
        body,
        html: markdownToHtml(body),
        readingMinutes,
        headings,
        lastUpdated: fs.statSync(fullPath).mtime.toISOString(),
      };
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function getArticleBySlug(slug) {
  return getAllArticles().find((article) => article.slug === slug);
}

export function getRelatedArticles(article, limit = 3) {
  return getAllArticles()
    .filter((candidate) => candidate.slug !== article.slug)
    .map((candidate) => ({
      ...candidate,
      score: candidate.tags.filter((tag) => article.tags.includes(tag)).length,
    }))
    .filter((candidate) => candidate.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}
