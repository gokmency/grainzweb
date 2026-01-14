import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Share2 } from 'lucide-react';
import { Waves } from '@/components/ui/waves-background';
import { useHashnodePost } from '@/hooks/useHashnodePost';
import { useHashnodePosts } from '@/hooks/useHashnodePosts';
import SEO from '@/components/SEO';

const BlogDetail = () => {
  const { slug } = useParams();

  const postQuery = useHashnodePost(slug);
  const blogPost = postQuery.data ?? null;

  const firstTagSlug = blogPost?.tags?.[0]?.slug ?? null;
  const relatedQuery = useHashnodePosts({ first: 12, tagSlug: firstTagSlug });
  const relatedPosts = (relatedQuery.data?.pages ?? [])
    .flatMap((p) => p.edges.map((e) => e.node))
    .filter((p) => p.slug !== blogPost?.slug)
    .slice(0, 6);

  if (postQuery.isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-6">
        <SEO title="Loading..." />
        <div className="text-center">
          <p className="text-gray-600">Loading article…</p>
        </div>
      </div>
    );
  }

  if (postQuery.isError) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-6">
        <SEO title="Error" />
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Couldn’t load article</h1>
          <button
            onClick={() => postQuery.refetch()}
            className="text-[#C8102E] hover:underline"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  if (!blogPost) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <SEO title="Article Not Found" />
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Article not found</h1>
          <Link to="/content-hub" className="text-[#C8102E] hover:underline">
            ← Back to Content Hub
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden" style={{ fontFamily: "'Tomorrow', sans-serif" }}>
      <SEO
        title={blogPost.title}
        description={blogPost.brief}
        image={blogPost.coverImage?.url}
        url={`https://grainz.site/content-hub/article/${blogPost.slug}`}
        type="article"
        publishedTime={blogPost.publishedAt}
        author={blogPost.author.name}
      />
      {/* Waves Animation Background */}
      <div className="absolute inset-0 z-0">
        <Waves
          strokeColor="rgba(200, 16, 46, 0.12)"
          backgroundColor="transparent"
          pointerSize={0.15}
        />
      </div>

      {/* Back Navigation */}
      <div className="pt-24 pb-4 px-6 md:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <Link 
            to="/content-hub" 
            className="inline-flex items-center text-gray-600 hover:text-[#C8102E] transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Content Hub
          </Link>
        </div>
      </div>

      {/* Article */}
      <main className="py-8 px-6 md:px-8 relative z-10">
        <article className="max-w-4xl mx-auto">
          {/* Article Header */}
          <header className="mb-8">
            <div className="mb-6">
              {blogPost.tags?.[0] && (
                <span
                  className="inline-block px-3 py-1 rounded-full text-xs font-semibold border bg-gray-100 text-gray-800 border-gray-200 mb-4"
                >
                  {blogPost.tags[0].name}
                </span>
              )}
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {blogPost.title}
            </h1>

            <div className="flex items-center text-gray-500 text-sm gap-6 mb-8 flex-wrap">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(blogPost.publishedAt).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{blogPost.readTimeInMinutes} min read</span>
              </div>
              <div>
                By {blogPost.author?.name || blogPost.author?.username}
              </div>
              <button 
                onClick={() => navigator.share ? navigator.share({
                  title: blogPost.title,
                  text: blogPost.brief,
                  url: blogPost.url || window.location.href
                }) : navigator.clipboard.writeText(blogPost.url || window.location.href)}
                className="flex items-center gap-1 text-[#C8102E] hover:text-[#A00E28] transition-colors"
              >
                <Share2 className="w-4 h-4" />
                Share
              </button>
            </div>

            {/* Featured Image */}
            <div className="aspect-video overflow-hidden rounded-xl mb-8 border border-gray-200">
              <img 
                src={blogPost.coverImage?.url || "/placeholder.svg"} 
                alt={blogPost.title}
                className="w-full h-full object-cover"
              />
            </div>
          </header>

          {/* Article Content */}
          <div className="bg-white">
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: blogPost.contentHtml }}
            />
          </div>

          {/* Tags */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="flex flex-wrap gap-2">
              {blogPost.tags.map((tag) => (
                <span 
                  key={tag.slug}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          </div>

          {/* Related Articles */}
          {relatedPosts.length > 0 && (
            <section className="mt-16 pt-16 border-t border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Related Articles</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedPosts.map((post) => (
                  <Link to={`/content-hub/article/${post.slug}`} key={post.id}>
                    <article className="bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300 group">
                      <div className="aspect-video overflow-hidden rounded-t-xl">
                        <img 
                          src={post.coverImage?.url || "/placeholder.svg"} 
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4">
                        <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#C8102E] transition-colors">
                          {post.title}
                        </h4>
                        <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                          {post.brief}
                        </p>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>{post.readTimeInMinutes} min read</span>
                          <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </section>
          )}

        </article>
      </main>

      {/* Footer on Waves Background */}
      <div className="absolute bottom-4 left-0 w-full z-50 pointer-events-auto">
        <p className="text-center text-xs text-gray-600/80 tracking-wide px-4" style={{
          textShadow: "0 2px 8px rgba(0,0,0,0.1)",
          fontFamily: "'Tomorrow', sans-serif"
        }}>
          © 2026{' '}
          <button 
            onClick={() => window.open('https://x.com/grainzeth', '_blank')}
            className="underline hover:text-[#C8102E] transition-colors cursor-pointer font-semibold"
          >
            GRAINZ
          </button>
          {' '}All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default BlogDetail;
