import { useQuery } from "@tanstack/react-query";
import { getPublicationPostBySlug } from "@/lib/hashnode";

export function useHashnodePost(slug: string | undefined) {
  return useQuery({
    queryKey: ["hashnode", "post", { slug }],
    queryFn: async ({ signal }) => {
      if (!slug) return null;
      return getPublicationPostBySlug({ slug, signal });
    },
    enabled: Boolean(slug),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
}

