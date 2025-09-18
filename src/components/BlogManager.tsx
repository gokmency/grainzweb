import React, { useState } from 'react';
import { createNewBlogPost, addBlogPost, blogCategories } from '@/data/blogData';

const BlogManager: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: 'Web3',
    author: 'GRAINZ Team',
    image: '',
    tags: '',
    readTime: ''
  });

  const [showPreview, setShowPreview] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
    
    const newPost = createNewBlogPost(
      formData.title,
      formData.excerpt,
      formData.content,
      formData.category,
      formData.author,
      formData.image,
      tagsArray,
      formData.readTime || undefined
    );

    addBlogPost(newPost);
    
    // Form'u temizle
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      category: 'Web3',
      author: 'GRAINZ Team',
      image: '',
      tags: '',
      readTime: ''
    });

    alert('Blog post başarıyla eklendi!');
  };

  const availableImages = [
    // Placeholder resimler (gerçek resimler eklendikçe güncellenecek)
    '/placeholder.svg',
    '/grainz-logo.png',
    '/temp-logo.png',
    // Örnek blog resimleri (bu path'lere resim eklediğinizde kullanılabilir)
    '/blog-images/web3-1.jpg',
    '/blog-images/web3-2.jpg',
    '/blog-images/development-1.jpg',
    '/blog-images/development-2.jpg',
    '/blog-images/community-1.jpg',
    '/blog-images/community-2.jpg',
    '/blog-images/design-1.jpg',
    '/blog-images/design-2.jpg',
    '/blog-images/blog-1.jpg',
    '/blog-images/blog-2.jpg',
    '/blog-images/blog-3.jpg',
    '/blog-images/blog-4.jpg',
    '/blog-images/blog-5.jpg'
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg" style={{ fontFamily: "'Tomorrow', sans-serif" }}>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Blog Post Yöneticisi</h2>
      
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setShowPreview(false)}
          className={`px-4 py-2 rounded-md font-medium transition-colors ${
            !showPreview 
              ? 'bg-[#C8102E] text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Düzenle
        </button>
        <button
          onClick={() => setShowPreview(true)}
          className={`px-4 py-2 rounded-md font-medium transition-colors ${
            showPreview 
              ? 'bg-[#C8102E] text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Önizleme
        </button>
      </div>

      {!showPreview ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Başlık */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Başlık *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              value={formData.title}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
              placeholder="Blog post başlığı"
            />
          </div>

          {/* Kısa Açıklama */}
          <div>
            <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-2">
              Kısa Açıklama *
            </label>
            <textarea
              id="excerpt"
              name="excerpt"
              required
              rows={3}
              value={formData.excerpt}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent resize-none"
              placeholder="Blog post'un kısa açıklaması (1-2 cümle)"
            />
          </div>

          {/* Kategori ve Yazar */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Kategori *
              </label>
              <select
                id="category"
                name="category"
                required
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
              >
                {blogCategories.slice(1).map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-2">
                Yazar *
              </label>
              <input
                type="text"
                id="author"
                name="author"
                required
                value={formData.author}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
                placeholder="Yazar adı"
              />
            </div>
          </div>

          {/* Resim Seçimi */}
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
              Kapak Resmi *
            </label>
            <div className="space-y-3">
              {/* Dropdown seçim */}
              <select
                id="image"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
              >
                <option value="">Hazır resimlerden seçin (opsiyonel)</option>
                {availableImages.map(image => (
                  <option key={image} value={image}>{image}</option>
                ))}
              </select>
              
              {/* Manuel URL girişi */}
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Veya manuel olarak resim URL'si girin:
                </label>
                <input
                  type="url"
                  placeholder="/blog-images/my-image.jpg veya https://example.com/image.jpg"
                  value={formData.image}
                  onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent text-sm"
                />
              </div>
            </div>
            
            {/* Resim önizlemesi */}
            {formData.image && (
              <div className="mt-3">
                <p className="text-xs text-gray-500 mb-2">Önizleme:</p>
                <img 
                  src={formData.image} 
                  alt="Preview" 
                  className="w-40 h-24 object-cover rounded-md border"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            )}
            
            <div className="mt-2 text-xs text-gray-500">
              <p><strong>İpucu:</strong> Resmi <code>/public/blog-images/</code> klasörüne koyup <code>/blog-images/dosya-adi.jpg</code> şeklinde kullanın.</p>
            </div>
          </div>

          {/* Tags ve Okuma Süresi */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
                Etiketler *
              </label>
              <input
                type="text"
                id="tags"
                name="tags"
                required
                value={formData.tags}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
                placeholder="Web3, Gaming, NFT (virgülle ayırın)"
              />
            </div>

            <div>
              <label htmlFor="readTime" className="block text-sm font-medium text-gray-700 mb-2">
                Okuma Süresi (Opsiyonel)
              </label>
              <input
                type="text"
                id="readTime"
                name="readTime"
                value={formData.readTime}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
                placeholder="5 min read (boş bırakılırsa otomatik hesaplanır)"
              />
            </div>
          </div>

          {/* İçerik */}
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
              İçerik * (HTML formatında)
            </label>
            <textarea
              id="content"
              name="content"
              required
              rows={15}
              value={formData.content}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent resize-none font-mono text-sm"
              placeholder="HTML formatında blog içeriği..."
            />
            <p className="text-xs text-gray-500 mt-1">
              HTML etiketleri kullanabilirsiniz: &lt;h2&gt;, &lt;h3&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;li&gt;, &lt;strong&gt;, vb.
            </p>
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-[#C8102E] text-white rounded-md hover:bg-[#A00E26] transition-colors font-medium"
            >
              Blog Post'u Ekle
            </button>
          </div>
        </form>
      ) : (
        /* Önizleme */
        <div className="border border-gray-200 rounded-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{formData.title || 'Başlık buraya gelecek'}</h3>
          <p className="text-gray-600 mb-4">{formData.excerpt || 'Kısa açıklama buraya gelecek'}</p>
          
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
            <span>{formData.category}</span>
            <span>{formData.author}</span>
            <span>{formData.readTime || 'Auto-calculated'}</span>
          </div>

          {formData.image && (
            <img 
              src={formData.image} 
              alt="Preview" 
              className="w-full max-w-md h-48 object-cover rounded-md mb-4"
            />
          )}

          <div className="mb-4">
            <strong>Etiketler:</strong> {formData.tags || 'Etiket yok'}
          </div>

          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: formData.content || '<p>İçerik buraya gelecek...</p>' }}
          />
        </div>
      )}
    </div>
  );
};

export default BlogManager;
