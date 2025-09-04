import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, ArrowRight, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getPostById, getRelatedPosts } from '@/data/blogData';
import { Waves } from '@/components/ui/waves-background';

const BlogDetail = () => {
  const { id } = useParams();
  
  const blogPost = getPostById(id || '');
  const relatedPosts = blogPost ? getRelatedPosts(blogPost.id, blogPost.category) : [];

  const handleHomeClick = () => {
    window.location.href = '/';
  };

  const handleContentHubClick = () => {
    window.location.href = '/content-hub';
  };

  if (!blogPost) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Article not found</h1>
          <Link to="/content-hub" className="text-[#C8102E] hover:underline">
            ← Back to Content Hub
          </Link>
        </div>
      </div>
    );
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Web3': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Development': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Community': return 'bg-green-100 text-green-800 border-green-200';
      case 'Design': return 'bg-pink-100 text-pink-800 border-pink-200';
      case 'Research': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'News': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden" style={{ fontFamily: "'Tomorrow', sans-serif" }}>
      {/* Waves Animation Background */}
      <div className="absolute inset-0 z-0">
        <Waves
          strokeColor="rgba(200, 16, 46, 0.12)"
          backgroundColor="transparent"
          pointerSize={0.15}
        />
      </div>

      {/* Header - Logo (responsive) */}
      <header className="absolute top-4 left-4 md:top-8 md:left-16 z-10">
        <div className="flex items-center">
          <img 
            src="/grainz-logo.png" 
            alt="GRAINZ LABS Logo" 
            className="h-12 w-auto md:h-20 drop-shadow-lg select-none object-contain"
            style={{
              filter: 'brightness(0) saturate(100%) invert(12%) sepia(87%) saturate(5718%) hue-rotate(356deg) brightness(87%) contrast(109%)'
            }}
            draggable={false}
          />
        </div>
      </header>

      {/* Top Center Navigation */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex items-center border-2 border-[#C8102E] overflow-hidden">
          <button
            onClick={handleHomeClick}
            className="bg-transparent text-[#C8102E] px-4 py-2 text-sm font-medium transition-all duration-300 ease-in-out hover:bg-[#C8102E]/10 border-r border-[#C8102E]/30"
            style={{ fontFamily: "'Tomorrow', sans-serif" }}
          >
            Home
          </button>
          <button
            onClick={handleContentHubClick}
            className="bg-[#C8102E] text-white px-4 py-2 text-sm font-medium transition-all duration-300 ease-in-out hover:bg-[#C8102E]/90"
            style={{ fontFamily: "'Tomorrow', sans-serif" }}
          >
            Content Hub
          </button>
        </div>
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
              <span 
                className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${getCategoryColor(blogPost.category)} mb-4`}
              >
                {blogPost.category}
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {blogPost.title}
            </h1>

            <div className="flex items-center text-gray-500 text-sm gap-6 mb-8 flex-wrap">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(blogPost.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{blogPost.readTime}</span>
              </div>
              <div>
                By {blogPost.author}
              </div>
              <button 
                onClick={() => navigator.share ? navigator.share({
                  title: blogPost.title,
                  text: blogPost.excerpt,
                  url: window.location.href
                }) : navigator.clipboard.writeText(window.location.href)}
                className="flex items-center gap-1 text-[#C8102E] hover:text-[#A00E28] transition-colors"
              >
                <Share2 className="w-4 h-4" />
                Share
              </button>
            </div>

            {/* Featured Image */}
            <div className="aspect-video overflow-hidden rounded-xl mb-8 border border-gray-200">
              <img 
                src={blogPost.image} 
                alt={blogPost.title}
                className="w-full h-full object-cover"
              />
            </div>
          </header>

          {/* Article Content */}
          <div className="bg-white">
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: blogPost.content }}
            />
          </div>

          {/* Tags */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="flex flex-wrap gap-2">
              {blogPost.tags.map((tag) => (
                <span 
                  key={tag}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                >
                  {tag}
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
                  <Link to={`/content-hub/article/${post.id}`} key={post.id}>
                    <article className="bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300 group">
                      <div className="aspect-video overflow-hidden rounded-t-xl">
                        <img 
                          src={post.image} 
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4">
                        <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#C8102E] transition-colors">
                          {post.title}
                        </h4>
                        <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>{post.readTime}</span>
                          <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
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
