import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SEO_RICH_DATA } from '@/config/seo_rich_data';

export const SchemaOrg: React.FC = () => {
  const { organization, people } = SEO_RICH_DATA;

  // Construct the graph
  const graph = [
    // Organization Schema
    {
      "@type": "Organization",
      "@id": `${organization.url}/#organization`,
      "name": organization.name,
      "alternateName": organization.alternateName,
      "url": organization.url,
      "description": organization.description,
      "email": organization.email,
      "logo": {
        "@type": "ImageObject",
        "url": organization.logo,
        "width": "512",
        "height": "512",
        "caption": `${organization.name} Logo`
      },
      "address": organization.address,
      "sameAs": organization.sameAs,
      // Link founders and employees
      "founder": people
        .filter(p => p.jobTitle.toLowerCase().includes('founder'))
        .map(p => ({ "@id": `${organization.url}/#person-${p.name.toLowerCase().replace(/\s+/g, '-')}` })),
      "employee": people.map(p => ({ "@id": `${organization.url}/#person-${p.name.toLowerCase().replace(/\s+/g, '-')}` })),
      "brand": { "@id": `${organization.url}/#brand` }
    },
    // Brand Schema
    {
      "@type": "Brand",
      "@id": `${organization.url}/#brand`,
      "name": organization.name,
      "url": organization.url,
      "logo": organization.logo
    },
    // WebSite Schema
    {
      "@type": "WebSite",
      "@id": `${organization.url}/#website`,
      "url": organization.url,
      "name": organization.name,
      "publisher": { "@id": `${organization.url}/#organization` },
      "inLanguage": "en-US"
    },
    // WebPage Schema
    {
      "@type": "WebPage",
      "@id": `${organization.url}/#webpage`,
      "url": organization.url,
      "name": `${organization.name} — We Build Things`,
      "isPartOf": { "@id": `${organization.url}/#website` },
      "about": { "@id": `${organization.url}/#organization` },
      "primaryImageOfPage": { "@id": `${organization.url}/#organization/logo` },
      "inLanguage": "en-US"
    },
    // Person Schemas
    ...people.map(person => ({
      "@type": "Person",
      "@id": `${organization.url}/#person-${person.name.toLowerCase().replace(/\s+/g, '-')}`,
      "name": person.name,
      "jobTitle": person.jobTitle,
      "worksFor": { "@id": `${organization.url}/#organization` },
      "url": person.url,
      "image": {
        "@type": "ImageObject",
        "url": person.image,
        "caption": `${person.name} - ${person.jobTitle}`
      },
      "description": person.description,
      "sameAs": person.sameAs,
      "knowsAbout": person.knowsAbout
    }))
  ];

  const schemaData = {
    "@context": "https://schema.org",
    "@graph": graph
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>
    </Helmet>
  );
};
