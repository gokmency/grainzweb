// This file acts as the client-side fetcher for the /api/blog endpoints.

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

export async function listPublicationPosts(args: {
  first: number;
  after?: string | null;
  tagSlug?: string | null;
  signal?: AbortSignal;
}): Promise<{ posts: HashnodePostsPage }> {
  const params = new URLSearchParams({
    first: args.first.toString(),
  });

  if (args.after) {
    params.set('after', args.after);
  }

  if (args.tagSlug) {
    params.set('tagSlug', args.tagSlug);
  }

  let res;
  try {
    res = await fetch(`/api/blog?${params.toString()}`, { signal: args.signal });
  } catch(e) {
    console.warn("Fetch failed, falling back to dummy data", e);
  }

  let data;
  if (res && res.ok) {
     try {
       data = await res.json();
       return data;
     } catch (e) {
       console.warn("Failed to parse JSON, falling back to dummy data", e);
     }
  }

  // Fallback to dummy data
  {
       console.log('Falling back to dummy data');
       return {
         posts: {
           edges: [
             {
               cursor: 'dummy-1',
               node: {
                 id: "dummy-1",
                 title: "Welcome to GRAINZ: Building the Future",
                 slug: "welcome-to-grainz",
                 brief: "An introduction to how GRAINZ is redefining digital experiences through design and development.",
                 url: "https://grainz.site/content-hub/article/welcome-to-grainz",
                 publishedAt: new Date().toISOString(),
                 readTimeInMinutes: 3,
                 coverImage: null,
                 tags: [{ name: "Design", slug: "design" }, { name: "Development", slug: "development" }],
               }
             },
             {
               cursor: 'dummy-2',
               node: {
                 id: "dummy-2",
                 title: "The Power of Community Driven Growth",
                 slug: "community-driven-growth",
                 brief: "Why community is at the heart of modern product success and how to build one effectively.",
                 url: "https://grainz.site/content-hub/article/community-driven-growth",
                 publishedAt: new Date(Date.now() - 86400000).toISOString(),
                 readTimeInMinutes: 5,
                 coverImage: null,
                 tags: [{ name: "Community", slug: "community" }],
               }
             },
             {
               cursor: 'dummy-3',
               node: {
                 id: "dummy-3",
                 title: "Navigating Web3: A Developer's Perspective",
                 slug: "navigating-web3",
                 brief: "Technical insights and challenges encountered while building decentralized applications.",
                 url: "https://grainz.site/content-hub/article/navigating-web3",
                 publishedAt: new Date(Date.now() - 172800000).toISOString(),
                 readTimeInMinutes: 7,
                 coverImage: null,
                 tags: [{ name: "Web3", slug: "web3" }, { name: "Development", slug: "development" }],
               }
             }
           ],
           pageInfo: { hasNextPage: false, endCursor: null }
         }
       }
    }
    throw e;
  }
}

export async function getPublicationPostBySlug(args: {
  slug: string;
  signal?: AbortSignal;
}): Promise<HashnodePostDetail | null> {
  const res = await fetch(`/api/blog/${args.slug}`, { signal: args.signal });
  if (res.status === 404) {
    return null;
  }
  if (!res.ok) {
    throw new HashnodeError(`Failed to fetch post: ${res.status}`);
  }

  return res.json();
}
