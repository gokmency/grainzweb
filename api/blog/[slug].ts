import { getPublicationPostBySlugInternal } from '../_lib/hashnode-backend';

export default async function handler(req: any, res: any) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const { slug } = req.query;

        if (!slug || typeof slug !== 'string') {
            return res.status(400).json({ error: 'Invalid slug' });
        }

        const post = await getPublicationPostBySlugInternal(slug);

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        // Cache for 5 minutes, stale while revalidate for 10 minutes
        res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');
        res.status(200).json(post);

    } catch (e: any) {
        console.error("API /blog/[slug] error:", e);
        res.status(500).json({ error: "Failed to fetch post" });
    }
}
