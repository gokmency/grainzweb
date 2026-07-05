import { XMLParser } from 'fast-xml-parser';
import * as cheerio from 'cheerio';
import { marked } from 'marked';
import sanitizeHtml from 'sanitize-html';

const envHost = (import.meta as any).env?.VITE_HASHNODE_HOST;

const cleanHost = (host: string | undefined) => {
  if (!host) return null;
  const cleaned = host
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\/$/, "")
    .trim();
  return cleaned;
};

const cleanedEnvHost = cleanHost(envHost);

export const HASHNODE_HOST =
  cleanedEnvHost && cleanedEnvHost !== "grainz.site"
    ? cleanedEnvHost
    : "grainz.hashnode.dev";

console.log("[Hashnode] Configured Host:", HASHNODE_HOST, "(Env:", envHost, ")");

export type HashnodeTag = {
  name: string;
  slug: string;
};

export type HashnodeCoverImage = {
  url: string;
} | null;

export type HashnodePostListItem = {
  id: string;
  title: string;
  slug: string;
  brief: string;
  url: string;
  publishedAt: string;
  readTimeInMinutes: number;
  coverImage: HashnodeCoverImage;
  tags: HashnodeTag[];
};

export type HashnodeUser = {
  name: string;
  username: string;
  profilePicture: string | null;
};

export type HashnodePostDetail = HashnodePostListItem & {
  author: HashnodeUser;
  contentHtml: string;
};

export class HashnodeError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "HashnodeError";
  }
}

export type HashnodePostsPage = {
  edges: Array<{
    cursor: string;
    node: HashnodePostListItem;
  }>;
  pageInfo: {
    hasNextPage: boolean | null;
    endCursor: string | null;
  };
};

let cachedPosts: HashnodePostListItem[] | null = null;
let lastFetchTime = 0;
const CACHE_TTL = 1000 * 60; // 1 minute

async function fetchAllPosts(signal?: AbortSignal): Promise<HashnodePostListItem[]> {
  if (cachedPosts && Date.now() - lastFetchTime < CACHE_TTL) {
    return cachedPosts;
  }

  try {
    let sitemapItems: any[] = [];
    try {
        const sitemapRes = await fetchWithTimeout(`https://${HASHNODE_HOST}/sitemap.xml`, { signal }, 5000);
        if (sitemapRes.ok) {
            const sitemapXml = await sitemapRes.text();
            if (sitemapXml.includes("<?xml") || sitemapXml.includes("<urlset")) {
                const sitemapParser = new XMLParser({ ignoreAttributes: false });
                const sitemapObj = sitemapParser.parse(sitemapXml);
                const rawUrls = sitemapObj?.urlset?.url || [];
                sitemapItems = Array.isArray(rawUrls) ? rawUrls : [rawUrls];
            }
        }
    } catch(e) {
        console.warn("[Hashnode] Sitemap fetch failed:", e);
    }

    const res = await fetchWithTimeout(`https://${HASHNODE_HOST}/rss.xml`, { signal }, 5000);
    if (!res.ok) {
      throw new Error(`Failed to fetch RSS: ${res.status}`);
    }
    const xml = await res.text();
    const parser = new XMLParser({ ignoreAttributes: false });
    const jsonObj = parser.parse(xml);
    const rawItems = jsonObj?.rss?.channel?.item || [];
    const items = Array.isArray(rawItems) ? rawItems : [rawItems];

    const postsMap = new Map<string, any>();

    sitemapItems.forEach((item: any) => {
        const loc = item.loc || "";
        let slug = loc.split('/').pop() || "";
        if (slug.includes('?')) {
            slug = slug.split('?')[0];
        }
        if (slug) {
            postsMap.set(slug, {
                id: slug,
                title: slug.replace(/-/g, ' '),
                slug: slug,
                brief: "",
                url: loc,
                publishedAt: new Date().toISOString(),
                readTimeInMinutes: 1,
                coverImage: null,
                tags: [],
                _rawHtml: ""
            });
        }
    });

    items.forEach((item: any) => {
      let slug = item.guid || item.link || "";
      if (typeof slug === "object" && slug["#text"]) {
          slug = slug["#text"];
      }
      slug = slug.split('/').pop() || "";
      if (slug.includes('?')) {
        slug = slug.split('?')[0];
      }

      const publishedAt = item.pubDate ? new Date(item.pubDate).toISOString() : new Date().toISOString();
      let enclosureUrl = null;
      if (item.enclosure && item.enclosure["@_url"]) {
          enclosureUrl = item.enclosure["@_url"];
      }

      const encodedContent = item["content:encoded"] || "";
      let brief = item.description || encodedContent || "";
      brief = brief.replace(/<[^>]*>?/gm, ''); // strip HTML
      if (brief.length > 200) {
        brief = brief.substring(0, 200) + '...';
      }

      const wordCount = encodedContent.split(/\s+/).length;
      const readTimeInMinutes = Math.max(1, Math.ceil(wordCount / 200));

      if (slug) {
          postsMap.set(slug, {
            id: slug,
            title: item.title || "Untitled",
            slug: slug,
            brief: brief,
            url: item.link || `https://${HASHNODE_HOST}/${slug}`,
            publishedAt,
            readTimeInMinutes,
            coverImage: enclosureUrl ? { url: enclosureUrl } : null,
            tags: [],
            _rawHtml: encodedContent,
          });
      }
    });

    const posts = Array.from(postsMap.values());
    posts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

    cachedPosts = posts;
    lastFetchTime = Date.now();
    return posts;

  } catch (err: any) {
    console.error("[Hashnode] RSS fetch failed:", err);
    if (cachedPosts) return cachedPosts;
    return [];
  }
}

export async function listPublicationPosts(args: {
  first: number;
  after?: string | null;
  tagSlug?: string | null;
  signal?: AbortSignal;
}): Promise<{ posts: HashnodePostsPage }> {

  const allPosts = await fetchAllPosts(args.signal);

  let filtered = allPosts;
  if (args.tagSlug) {
    filtered = filtered.filter(p => p.tags.some(t => t.slug === args.tagSlug));
  }

  let startIndex = 0;
  if (args.after) {
    const afterIdx = filtered.findIndex(p => p.slug === args.after);
    if (afterIdx !== -1) {
      startIndex = afterIdx + 1;
    }
  }

  const endIndex = startIndex + args.first;
  const sliced = filtered.slice(startIndex, endIndex);

  const edges = sliced.map(p => ({
    cursor: p.slug,
    node: p
  }));

  const hasNextPage = endIndex < filtered.length;
  const endCursor = hasNextPage && sliced.length > 0 ? sliced[sliced.length - 1].slug : null;

  return {
    posts: {
      edges,
      pageInfo: {
        hasNextPage,
        endCursor
      }
    }
  };
}

const fetchWithTimeout = async (url: string, opts?: RequestInit, ms: number = 5000) => {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), ms);

    let compositeSignal: AbortSignal;
    if (opts?.signal && (AbortSignal as any).any) {
        compositeSignal = (AbortSignal as any).any([opts.signal, controller.signal]);
    } else if (opts?.signal) {
        compositeSignal = controller.signal;
        opts.signal.addEventListener('abort', () => controller.abort());
    } else {
        compositeSignal = controller.signal;
    }

    try {
        const response = await fetch(url, { ...opts, signal: compositeSignal });
        clearTimeout(id);
        return response;
    } catch(e) {
        clearTimeout(id);
        throw e;
    }
};

export async function getPublicationPostBySlug(args: {
  slug: string;
  signal?: AbortSignal;
}): Promise<HashnodePostDetail | null> {
  const allPosts = await fetchAllPosts(args.signal);
  const post = allPosts.find((p) => p.slug === args.slug) as (HashnodePostListItem & { _rawHtml?: string }) | undefined;

  if (!post) {
      return null;
  }

  let rawContent = "";
  let isMarkdown = false;
  let found = false;

  // Fallback 1: Try direct .md file from Hashnode
  if (!found) {
      try {
          const res = await fetchWithTimeout(`https://${HASHNODE_HOST}/${args.slug}.md`, { signal: args.signal }, 3000);
          if (res.ok) {
              const text = await res.text();
              if (!text.includes("<!DOCTYPE html>")) {
                  rawContent = text;
                  isMarkdown = true;
                  found = true;
              }
          }
      } catch (e) {
          console.warn("Markdown endpoint fallback failed:", e);
      }
  }

  // Fallback 2: Try Accept: text/markdown on canonical URL
  if (!found) {
      try {
          const res = await fetchWithTimeout(`https://${HASHNODE_HOST}/${args.slug}`, {
              headers: { "Accept": "text/markdown" },
              signal: args.signal
          }, 3000);
          if (res.ok) {
              const contentType = res.headers.get("content-type");
              if (contentType && contentType.includes("markdown")) {
                  const text = await res.text();
                  if (!text.includes("<!DOCTYPE html>")) {
                      rawContent = text;
                      isMarkdown = true;
                      found = true;
                  }
              }
          }
      } catch(e) {
          console.warn("Markdown accept header fallback failed:", e);
      }
  }

  // Fallback 3: Use RSS content:encoded (already stored in _rawHtml)
  if (!found && post._rawHtml) {
      rawContent = post._rawHtml;
      isMarkdown = false;
      found = true;
  }

  // Fallback 4: Canonical HTML extraction
  if (!found) {
      try {
          const res = await fetchWithTimeout(`https://${HASHNODE_HOST}/${args.slug}`, { signal: args.signal }, 3000);
          if (res.ok) {
              const html = await res.text();
              if (!html.includes('id="challenge-error-text"')) { // Ensure it's not a Cloudflare challenge
                  const $ = cheerio.load(html);
                  const articleContent = $('article, #post-content-wrapper, .prose').html();
                  if (articleContent) {
                      rawContent = articleContent;
                      isMarkdown = false;
                      found = true;
                  }
              }
          }
      } catch(e) {
          console.warn("HTML extraction fallback failed:", e);
      }
  }

  // If everything failed, just use brief
  if (!found) {
      rawContent = `<p>${post.brief}</p>`;
      isMarkdown = false;
  }

  let contentHtml = "";
  if (isMarkdown) {
      contentHtml = await marked.parse(rawContent, { async: true });
  } else {
      contentHtml = rawContent;
  }

  contentHtml = sanitizeHtml(contentHtml, {
      allowedTags: [
          'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'p', 'a', 'ul', 'ol',
          'nl', 'li', 'b', 'i', 'strong', 'em', 'strike', 'code', 'hr', 'br', 'div',
          'table', 'thead', 'caption', 'tbody', 'tr', 'th', 'td', 'pre', 'img', 'span', 'figure', 'figcaption'
      ],
      allowedAttributes: {
          'a': ['href', 'name', 'target', 'rel'],
          'img': ['src', 'alt', 'title'],
          'code': ['class'],
          'pre': ['class'],
          'span': ['class']
      },
      transformTags: {
          'a': sanitizeHtml.simpleTransform('a', { target: '_blank', rel: 'noopener noreferrer' })
      }
  });

  return {
      ...post,
      author: {
          name: "Grainz Team",
          username: "grainz",
          profilePicture: null
      },
      contentHtml
  };
}
