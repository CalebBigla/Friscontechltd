/**
 * Structured Data Component for SEO
 * Provides JSON-LD markup for better search engine understanding
 */

export function LocalBusinessStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": "https://friscontech.com/#organization",
    "name": "Friscon Tech",
    "alternateName": "Friscon Technology & Consulting",
    "description": "Nigeria market entry consulting and agricultural development services based in Lagos. Expert stakeholder relations and business partnership facilitation.",
    "url": "https://friscontech.com",
    "logo": "https://friscontech.com/favicon.svg",
    "image": "https://friscontech.com/favicon.svg",
    "telephone": "+234-803-246-1305",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Jakande",
      "addressLocality": "Lagos",
      "addressRegion": "Lagos State",
      "postalCode": "",
      "addressCountry": {
        "@type": "Country",
        "name": "Nigeria"
      }
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "6.5244",
      "longitude": "3.3792"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Nigeria"
    },
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": "6.5244",
        "longitude": "3.3792"
      },
      "geoRadius": "200000"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Consulting Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Market Entry Strategy",
            "description": "Expert guidance for international businesses entering the Nigerian market"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Stakeholder Relations",
            "description": "Building and managing relationships with Nigerian government and business stakeholders"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Agricultural Development",
            "description": "Agricultural value chain development and farmer empowerment programs"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Partnership Facilitation",
            "description": "Connecting businesses with local partners and networks across Nigeria"
          }
        }
      ]
    },
    "founder": {
      "@type": "Person",
      "name": "Chinenye O. Ketebu-Brown",
      "jobTitle": "Founder & Principal Consultant"
    },
    "sameAs": [
      "https://www.linkedin.com/company/friscontech"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+234-803-246-1305",
      "contactType": "Customer Service",
      "areaServed": "NG",
      "availableLanguage": ["English"]
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "09:00",
      "closes": "17:00"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export function WebsiteStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://friscontech.com/#website",
    "url": "https://friscontech.com",
    "name": "Friscon Tech",
    "description": "Nigeria market entry consulting and agricultural development",
    "publisher": {
      "@id": "https://friscontech.com/#organization"
    },
    "inLanguage": "en-NG",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://friscontech.com/?s={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export function BreadcrumbStructuredData({ items }: { items: Array<{ name: string; url: string }> }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export function OrganizationStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://friscontech.com/#organization",
    "name": "Friscon Tech",
    "legalName": "Friscon Technology & Consulting",
    "url": "https://friscontech.com",
    "logo": "https://friscontech.com/favicon.svg",
    "foundingDate": "2014",
    "foundingLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Lagos",
        "addressCountry": "Nigeria"
      }
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Jakande",
      "addressLocality": "Lagos",
      "addressRegion": "Lagos State",
      "addressCountry": "Nigeria"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Service",
      "telephone": "+234-803-246-1305",
      "areaServed": "NG",
      "availableLanguage": "English"
    },
    "sameAs": [
      "https://www.linkedin.com/company/friscontech"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
