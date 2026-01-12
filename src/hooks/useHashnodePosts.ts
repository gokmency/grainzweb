import { useInfiniteQuery } from "@tanstack/react-query";
import { listPublicationPosts } from "@/lib/hashnode";

export function useHashnodePosts(args?: { first?: number; tagSlug?: string | null }) {
  const first = args?.first ?? 12;
  const tagSlug = args?.tagSlug ?? null;

  return useInfiniteQuery({
    queryKey: ["hashnode", "posts", { first, tagSlug }],
    queryFn: async ({ pageParam, signal }) => {
      const res = await listPublicationPosts({
        first,
        after: (pageParam as string | null | undefined) ?? null,
        tagSlug,
        signal,
      });
      return res.posts;
    },
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => {
      if (!lastPage.pageInfo.hasNextPage) return undefined;
      return lastPage.pageInfo.endCursor ?? undefined;
    },
    // Keep data fresh without spamming the API (see Hashnode caching/rate limits docs).
    // New posts will show up when user navigates back to Content Hub or focuses the tab.
    staleTime: 1000 * 30,
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
    refetchInterval: false,
    retry: 1,
  });
}

