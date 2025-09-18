import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { blogCategories, getPostsByCategory } from '@/data/blogData';
import { Waves } from '@/components/ui/waves-background';
import { CardContainer, CardBody, CardItem } from '@/components/ui/3d-card-effect';

const ContentHub = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Articles");
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredPosts = getPostsByCategory(selectedCategory).filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleHomeClick = () => {
    window.location.href = '/';
  };

  const handleContentHubClick = () => {
    window.location.href = '/content-hub';
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden" style={{ fontFamily: "'Tomorrow', sans-serif" }}>
      {/* Waves Animation Background */}
      <div className="absolute inset-0 z-0">
        <Waves
          strokeColor="rgba(200, 16, 46, 0.15)"
          backgroundColor="transparent"
          pointerSize={0.2}
        />
      </div>

      {/* Header - Logo (responsive) */}
      <header className="absolute top-4 left-4 md:top-8 md:left-16 z-10">
        <div className="flex items-center">
          <img 
            src="/grainz-logo.png" 
            alt="GRAINZ LABS Logo" 
            className="h-12 w-auto md:h-20 drop-shadow-lg select-none object-contain cursor-pointer hover:opacity-80 transition-opacity duration-200"
            style={{
              filter: 'brightness(0) saturate(100%) invert(12%) sepia(87%) saturate(5718%) hue-rotate(356deg) brightness(87%) contrast(109%)'
            }}
            draggable={false}
            onClick={handleHomeClick}
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
      
      {/* Top Search Bar - Simple */}
      <section className="pt-24 md:pt-32 pb-6 px-6 md:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search"
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
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Sidebar - Categories (YZi Labs Style) */}
            <div className="w-full lg:w-56 flex-shrink-0">
              <div className="space-y-2">
                {blogCategories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 flex items-center ${
                      selectedCategory === category
                        ? 'bg-gray-200 text-gray-900'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <span className="mr-3 text-base">📄</span>
                    {category}
                  </button>
                ))}
                
                {/* Additional Categories */}
                <div className="mt-6 space-y-2">
                  <button className="w-full text-left px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-lg transition-all duration-200">
                    Events
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-lg transition-all duration-200">
                    Incubation
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-lg transition-all duration-200">
                    Investment
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-lg transition-all duration-200">
                    Team Update
                  </button>
                </div>
              </div>
            </div>

            {/* Right Content - Articles Grid (YZi Labs Style) */}
            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPosts.slice(0, 12).map((post) => (
                  <Link to={`/content-hub/article/${post.id}`} key={post.id}>
                    <CardContainer containerClassName="py-0">
                      <CardBody className="bg-white rounded-xl border border-gray-200 w-full h-auto group/card hover:shadow-xl transition-all duration-300 cursor-pointer">
                        {/* Image */}
                        <CardItem translateZ="50" className="w-full">
                          <div className="aspect-video overflow-hidden rounded-t-xl relative">
                            <img 
                              src={post.image} 
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
                            {post.excerpt}
                          </CardItem>
                          
                          <CardItem
                            translateZ="30"
                            className="flex items-center justify-between text-xs text-gray-500"
                          >
                            <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                            <span>{post.readTime}</span>
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

              {/* Pagination - YZi Labs Style */}
              {filteredPosts.length > 12 && (
                <div className="flex justify-center items-center mt-12 gap-2">
                  <button className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    Previous
                  </button>
                  <button className="px-4 py-2 text-sm bg-[#C8102E] text-white rounded-lg">
                    1
                  </button>
                  <button className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    2
                  </button>
                  <button className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    3
                  </button>
                  <button className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    Next
                  </button>
                </div>
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
