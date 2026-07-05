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

  const res = await fetch(`/api/blog?${params.toString()}`, { signal: args.signal });
  if (!res.ok) {
    throw new HashnodeError(`Failed to fetch posts: ${res.status}`);
  }

  return res.json();
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
