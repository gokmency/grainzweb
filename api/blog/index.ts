import { fetchAllPosts, HashnodePostsPage } from '../_lib/hashnode-backend';

export default async function handler(req: any, res: any) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const { first = 12, after, tagSlug } = req.query;

        const allPosts = await fetchAllPosts();

        let filtered = allPosts;
        if (tagSlug) {
            filtered = filtered.filter(p => p.tags.some(t => t.slug === tagSlug));
        }

        let startIndex = 0;
        if (after) {
            const afterIdx = filtered.findIndex(p => p.slug === after);
            if (afterIdx !== -1) {
                startIndex = afterIdx + 1;
            }
        }

        const firstNum = parseInt(first as string, 10) || 12;
        const endIndex = startIndex + firstNum;
        const sliced = filtered.slice(startIndex, endIndex);

        const edges = sliced.map(p => {
            const { _rawHtml, ...rest } = p as any;
            return {
                cursor: p.slug,
                node: rest
            };
        });

        const hasNextPage = endIndex < filtered.length;
        const endCursor = hasNextPage && sliced.length > 0 ? sliced[sliced.length - 1].slug : null;

        const postsPage: HashnodePostsPage = {
            edges,
            pageInfo: {
                hasNextPage,
                endCursor
            }
        };

        // Cache for 5 minutes, stale while revalidate for 10 minutes
        res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');
        res.status(200).json({ posts: postsPage });

    } catch (e: any) {
        console.error("API /blog error:", e);
        res.status(500).json({ error: "Failed to fetch posts" });
    }
}
