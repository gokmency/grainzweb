export const HASHNODE_ENDPOINT = "https://gql.hashnode.com/graphql";
// Custom domain host works on Hashnode GraphQL and avoids confusion with www/subdomain.
export const HASHNODE_HOST = (import.meta as any).env?.VITE_HASHNODE_HOST || "grainz.site";

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

type GraphQLError = { message: string };

export class HashnodeError extends Error {
  readonly causeErrors?: GraphQLError[];
  constructor(message: string, errors?: GraphQLError[]) {
    super(message);
    this.name = "HashnodeError";
    this.causeErrors = errors;
  }
}

async function fetchGraphQL<TData, TVariables extends Record<string, unknown>>(
  query: string,
  variables: TVariables,
  opts?: { signal?: AbortSignal }
): Promise<TData> {
  const res = await fetch(HASHNODE_ENDPOINT, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
    signal: opts?.signal,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new HashnodeError(`Hashnode API request failed (${res.status}). ${text}`.trim());
  }

  const json = (await res.json()) as { data?: TData; errors?: GraphQLError[] };
  if (json.errors?.length) {
    throw new HashnodeError(json.errors[0]?.message || "Hashnode GraphQL error", json.errors);
  }
  if (!json.data) {
    throw new HashnodeError("Hashnode GraphQL returned no data");
  }
  return json.data;
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
  const query = `
    query PublicationPosts($host: String!, $first: Int!, $after: String, $filter: PublicationPostConnectionFilter) {
      publication(host: $host) {
        posts(first: $first, after: $after, filter: $filter) {
          edges {
            cursor
            node {
              id
              title
              slug
              brief
              url
              publishedAt
              readTimeInMinutes
              coverImage { url }
              tags { name slug }
            }
          }
          pageInfo { hasNextPage endCursor }
        }
      }
    }
  `;

  type Resp = {
    publication: {
      posts: HashnodePostsPage;
    } | null;
  };

  const filter = args.tagSlug ? { tagSlugs: [args.tagSlug] } : null;
  const data = await fetchGraphQL<Resp, { host: string; first: number; after: string | null; filter: any }>(
    query,
    {
      host: HASHNODE_HOST,
      first: args.first,
      after: args.after ?? null,
      filter,
    },
    { signal: args.signal }
  );

  if (!data.publication) {
    throw new HashnodeError(`Hashnode publication not found for host: ${HASHNODE_HOST}`);
  }

  return { posts: data.publication.posts };
}

export async function getPublicationPostBySlug(args: {
  slug: string;
  signal?: AbortSignal;
}): Promise<HashnodePostDetail | null> {
  const query = `
    query PublicationPostBySlug($host: String!, $slug: String!) {
      publication(host: $host) {
        post(slug: $slug) {
          id
          title
          slug
          brief
          url
          publishedAt
          readTimeInMinutes
          coverImage { url }
          tags { name slug }
          author { name username profilePicture }
          content { html }
        }
      }
    }
  `;

  type Resp = {
    publication: {
      post: (HashnodePostListItem & {
        author: HashnodeUser;
        content: { html: string };
      }) | null;
    } | null;
  };

  const data = await fetchGraphQL<Resp, { host: string; slug: string }>(
    query,
    { host: HASHNODE_HOST, slug: args.slug },
    { signal: args.signal }
  );

  const post = data.publication?.post ?? null;
  if (!post) return null;

  return {
    ...post,
    contentHtml: post.content.html,
  };
}

