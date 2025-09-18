# GRAINZ Blog Yönetim Rehberi

## Blog Post Ekleme

### 1. Kolay Yöntem - BlogManager Bileşeni
`/src/components/BlogManager.tsx` bileşenini kullanarak web arayüzü üzerinden blog post ekleyebilirsiniz.

**Kullanım:**
```tsx
import BlogManager from '@/components/BlogManager';

// BlogManager bileşenini istediğiniz sayfaya ekleyin
<BlogManager />
```

### 2. Manuel Yöntem - blogData.ts Dosyası
`/src/data/blogData.ts` dosyasını doğrudan düzenleyerek blog post ekleyebilirsiniz.

## Blog Post Formatı

```typescript
{
  id: "unique-id",
  title: "Blog Post Başlığı",
  excerpt: "Kısa açıklama (1-2 cümle)",
  content: `
    <div class="prose prose-lg max-w-none">
      <p class="text-xl leading-relaxed text-gray-700 mb-8">Giriş paragrafı...</p>
      
      <h2 class="text-3xl font-bold text-gray-900 mt-12 mb-6">Ana Başlık</h2>
      <p class="text-gray-700 leading-relaxed mb-6">Normal paragraf...</p>
      
      <h3 class="text-2xl font-semibold text-gray-900 mt-10 mb-5">Alt Başlık</h3>
      <ul class="list-disc pl-6 mb-8 space-y-2">
        <li class="text-gray-700"><strong class="text-gray-900">Kalın metin</strong> - Açıklama</li>
      </ul>
    </div>
  `,
  date: "2025-01-15",
  readTime: "5 min read",
  category: "Web3",
  author: "GRAINZ Team",
  image: "/portfolio/development/project-1.jpg",
  tags: ["Web3", "Gaming", "Blockchain"],
  published: true,
  featured: false
}
```

## Mevcut Kategoriler
- Web3
- Development
- Community
- Design
- News
- Research

## Mevcut Kapak Resimleri
- `/portfolio/development/project-1.jpg`
- `/portfolio/development/project-2.jpg`
- `/portfolio/development/project-3.jpg`
- `/portfolio/community/project-1.jpg`
- `/portfolio/community/project-2.jpg`
- `/portfolio/design/project-1.jpg`
- `/portfolio/design/project-2.jpg`

## HTML Formatı İpuçları

### Temel Yapı
```html
<div class="prose prose-lg max-w-none">
  <!-- İçerik buraya -->
</div>
```

### Stil Sınıfları
- **Giriş paragrafı:** `text-xl leading-relaxed text-gray-700 mb-8`
- **Ana başlık:** `text-3xl font-bold text-gray-900 mt-12 mb-6`
- **Alt başlık:** `text-2xl font-semibold text-gray-900 mt-10 mb-5`
- **Normal paragraf:** `text-gray-700 leading-relaxed mb-6`
- **Kalın metin:** `text-gray-900`
- **Liste:** `list-disc pl-6 mb-8 space-y-2`
- **Liste öğesi:** `text-gray-700`

### Alıntı Kutusu
```html
<blockquote class="border-l-4 border-blue-500 pl-6 my-8 italic text-lg text-gray-700 bg-blue-50 py-4 rounded-r-lg">
  <p class="mb-2">"Alıntı metni buraya gelir."</p>
  <cite class="text-blue-600 font-semibold">— Kaynak</cite>
</blockquote>
```

## Yeni Kapak Resmi Ekleme

1. Resmi `/public/portfolio/` klasörüne ekleyin
2. `BlogManager.tsx` dosyasındaki `availableImages` dizisine ekleyin
3. Veya manuel olarak blog post'ta image alanına path'i yazın

## Blog Post Yayınlama

- `published: true` - Post yayınlanır
- `published: false` - Post taslak olarak kalır
- `featured: true` - Post öne çıkarılır (sadece bir post için)

## İpuçları

1. **SEO Dostu Başlıklar:** Anahtar kelimelerle açıklayıcı başlıklar
2. **Kısa Excerpts:** 150-200 karakter arası
3. **Uygun Etiketler:** Her post için 3-5 etiket
4. **Okuma Süresi:** Otomatik hesaplanır veya manuel belirlenebilir
5. **Kategori Seçimi:** İçeriğe en uygun kategoriyi seçin

## Sorun Giderme

- Resim görünmüyorsa path'i kontrol edin
- HTML hataları varsa tarayıcı konsolu kontrol edin
- Yeni post görünmüyorsa `published: true` olduğundan emin olun
