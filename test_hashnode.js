import { listPublicationPosts, getPublicationPostBySlug } from './src/lib/hashnode.js';

async function run() {
    const list = await listPublicationPosts({ first: 10 });
    console.log("List:", list.posts.edges.map(e => e.node.title));
    if (list.posts.edges.length > 0) {
        const slug = list.posts.edges[0].node.slug;
        const post = await getPublicationPostBySlug({ slug });
        console.log("Post keys:", Object.keys(post));
        console.log("Post HTML start:", post.contentHtml.substring(0, 100));
    }
}
// We can't easily run the typescript file, let's just make an endpoint check or manually write a fast vercel function check
