import { Helmet } from 'react-helmet-async';

type SEOProps = {
  title: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  author?: string;
};

const SEO = ({
  title,
  description,
  image,
  url,
  type = 'website',
  publishedTime,
  author
}: SEOProps) => {
  const siteTitle = 'GRAINZ';
  const fullTitle = `${title} | ${siteTitle}`;
  const defaults = {
    image: 'https://grainz.site/og-image.png', // Fallback image if you have one, or use a specific asset path
    url: 'https://grainz.site',
  };

  const currentUrl = url || defaults.url;
  const currentImage = image || defaults.image;

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      <link rel="canonical" href={currentUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:url" content={currentUrl} />
      <meta property="og:image" content={currentImage} />
      <meta property="og:site_name" content={siteTitle} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      {description && <meta name="twitter:description" content={description} />}
      <meta name="twitter:image" content={currentImage} />

      {/* Article Specific */}
      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === 'article' && author && (
        <meta name="author" content={author} />
      )}
    </Helmet>
  );
};

export default SEO;
