import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Waves } from '@/components/ui/waves-background';
import { CardContainer, CardBody, CardItem } from '@/components/ui/3d-card-effect';
import { useHashnodePosts } from '@/hooks/useHashnodePosts';
import SEO from '@/components/SEO';

const ContentHub = () => {
  const [selectedTagSlug, setSelectedTagSlug] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const postsQuery = useHashnodePosts({ first: 12, tagSlug: selectedTagSlug });

  const allPosts = useMemo(() => {
    return (postsQuery.data?.pages ?? []).flatMap((p) => p.edges.map((e) => e.node));
  }, [postsQuery.data?.pages]);

  const availableTags = useMemo(() => {
    const seen = new Map<string, { slug: string; name: string; count: number }>();
    for (const post of allPosts) {
      for (const tag of post.tags) {
        const existing = seen.get(tag.slug);
        if (existing) existing.count += 1;
        else seen.set(tag.slug, { slug: tag.slug, name: tag.name, count: 1 });
      }
    }
    return Array.from(seen.values()).sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
  }, [allPosts]);

  const filteredPosts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return allPosts;

    return allPosts.filter((post) => {
      return (
        post.title.toLowerCase().includes(q) ||
        post.brief.toLowerCase().includes(q) ||
        post.tags.some((t) => t.name.toLowerCase().includes(q) || t.slug.toLowerCase().includes(q))
      );
    });
  }, [allPosts, searchQuery]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden" style={{ fontFamily: "'Tomorrow', sans-serif" }}>
      <SEO
        title="Content Hub"
        description="Explore the latest articles, insights, and news from GRAINZ."
        url="https://grainz.site/content-hub"
      />
      {/* Waves Animation Background */}
      <div className="absolute inset-0 z-0">
        <Waves
          strokeColor="rgba(200, 16, 46, 0.15)"
          backgroundColor="transparent"
          pointerSize={0.2}
        />
      </div>

      {/* Top Search Bar - Simple */}
      <section className="pt-24 md:pt-32 pb-6 px-6 md:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search articles"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-[#C8102E] focus:border-[#C8102E] transition-all"
            />
          </div>
        </div>
      </section>

      {/* Categories and Content */}
      <section className="pb-20 px-6 md:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Mobile Tags Chips */}
          <div className="lg:hidden mb-6">
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              <button
                onClick={() => setSelectedTagSlug(null)}
                className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                  selectedTagSlug === null
                    ? "bg-[#C8102E] text-white border-[#C8102E]"
                    : "bg-white text-gray-700 border-gray-200 hover:border-[#C8102E]/40"
                }`}
              >
                All
              </button>
              {availableTags.map((t) => (
                <button
                  key={t.slug}
                  onClick={() => setSelectedTagSlug(t.slug)}
                  className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                    selectedTagSlug === t.slug
                      ? "bg-gray-900 text-white border-gray-900"
                      : "bg-white text-gray-700 border-gray-200 hover:border-gray-400"
                  }`}
                  title={`${t.name} (${t.count})`}
                >
                  {t.name}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Sidebar - Tags */}
            <div className="hidden lg:block w-64 flex-shrink-0">
              <div className="space-y-2 sticky top-24">
                <button
                  onClick={() => setSelectedTagSlug(null)}
                  className={`w-full text-left px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 flex items-center ${
                    selectedTagSlug === null ? "bg-gray-200 text-gray-900" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  <span className="mr-3 text-base">📄</span>
                  All Articles
                </button>
                {availableTags.map((t) => (
                  <button
                    key={t.slug}
                    onClick={() => setSelectedTagSlug(t.slug)}
                    className={`w-full text-left px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 flex items-center justify-between ${
                      selectedTagSlug === t.slug ? "bg-gray-200 text-gray-900" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                  >
                    <span className="flex items-center">
                      <span className="mr-3 text-base">🏷️</span>
                      {t.name}
                    </span>
                    <span className="text-xs text-gray-500">{t.count}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Right Content - Articles Grid (YZi Labs Style) */}
            <div className="flex-1">
              {postsQuery.isLoading && (
                <div className="py-16 text-center text-gray-600">
                  Loading articles…
                </div>
              )}

              {postsQuery.isError && (
                <div className="py-16 text-center">
                  <p className="text-gray-700 mb-4">Articles couldn’t be loaded.</p>
                  <button
                    onClick={() => postsQuery.refetch()}
                    className="px-4 py-2 text-sm bg-[#C8102E] text-white rounded-lg hover:bg-[#C8102E]/90 transition-colors"
                  >
                    Try again
                  </button>
                </div>
              )}

              {!postsQuery.isLoading && !postsQuery.isError && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPosts.map((post) => (
                      <Link to={`/content-hub/article/${post.slug}`} key={post.id}>
                    <CardContainer containerClassName="py-0">
                      <CardBody className="bg-white rounded-xl border border-gray-200 w-full h-auto group/card hover:shadow-xl transition-all duration-300 cursor-pointer">
                        {/* Image */}
                        <CardItem translateZ="50" className="w-full">
                          <div className="aspect-video overflow-hidden rounded-t-xl relative">
                            <img 
                              src={post.coverImage?.url || "/placeholder.svg"} 
                              alt={post.title}
                              className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover/card:bg-black/20 transition-all duration-300"></div>
                          </div>
                        </CardItem>
                        
                        {/* Content */}
                        <div className="p-6">
                          <CardItem
                            translateZ="60"
                            className="font-bold text-gray-900 text-lg mb-3 line-clamp-2 group-hover/card:text-[#C8102E] transition-colors leading-tight"
                          >
                            {post.title}
                          </CardItem>
                          
                          <CardItem
                            translateZ="40"
                            className="text-gray-600 text-sm line-clamp-3 mb-4 leading-relaxed"
                          >
                            {post.brief}
                          </CardItem>
                          
                          <CardItem
                            translateZ="30"
                            className="flex items-center justify-between text-xs text-gray-500"
                          >
                            <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                            <span>{post.readTimeInMinutes} min read</span>
                          </CardItem>
                        </div>
                      </CardBody>
                    </CardContainer>
                  </Link>
                    ))}
                  </div>

                  {filteredPosts.length === 0 && (
                    <div className="text-center py-16">
                      <p className="text-gray-500 text-lg">No articles found matching your search.</p>
                    </div>
                  )}

                  {/* Load more */}
                  {postsQuery.hasNextPage && (
                    <div className="flex justify-center mt-12">
                      <button
                        onClick={() => postsQuery.fetchNextPage()}
                        disabled={postsQuery.isFetchingNextPage}
                        className="px-6 py-3 text-sm bg-[#C8102E] text-white rounded-lg hover:bg-[#C8102E]/90 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                      >
                        {postsQuery.isFetchingNextPage ? "Loading…" : "Load more"}
                      </button>
                    </div>
                  )}

                  {/* Empty publication */}
                  {allPosts.length === 0 && (
                    <div className="text-center py-16">
                      <p className="text-gray-500 text-lg">No posts yet. Publish on Hashnode and they’ll show up here automatically.</p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>

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

export default ContentHub;
