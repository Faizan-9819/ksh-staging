// Hand-rolled JSON-LD helpers, matching this site's existing park-page pattern
// (plain typed objects + a <script type="application/ld+json"> tag) — no schema library.

const SITE_URL = "https://www.kshinfra.com";
const ORG_NAME = "KSH INFRA";
const ORG_LOGO = `${SITE_URL}/ksh-black.svg`;

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}#organization`,
    name: ORG_NAME,
    url: SITE_URL,
    logo: ORG_LOGO,
    sameAs: [
      "https://www.linkedin.com/company/ksh-infra/?viewAsMember=true",
      "https://www.youtube.com/channel/UCae7QNTK0AUOf7kxBF53hag",
      "https://www.facebook.com/KSHInfraIndia/",
      "https://www.instagram.com/kshinfrapark/",
    ] as string[],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-1800-212-2030",
      contactType: "customer service",
      email: "leasing@kshinfra.com",
    },
  };
}

interface ParkSummary {
  slug: string;
  name: string;
  description: string;
  address: string;
  latitude: string;
  longitude: string;
  image: string;
  telephone: string;
}

// /parks listing page: one ItemList-style Place plus one Place entry per
// park, matching the live site's schema shape exactly (see allseo reference).
export function parksListSchema(parks: ParkSummary[]) {
  return [
    {
      "@context": "https://schema.org",
      "@type": "Place",
      "@id": `${SITE_URL}/parks/#itemlist`,
      name: "KSH INFRA Parks",
      url: `${SITE_URL}/parks`,
      containedInPlace: parks.map((park) => ({
        "@id": `${SITE_URL}/${park.slug}`,
      })),
    },
    ...parks.map((park) => ({
      "@context": "https://schema.org",
      "@type": "Place",
      "@id": `${SITE_URL}/${park.slug}`,
      name: park.name,
      url: `${SITE_URL}/${park.slug}`,
      description: park.description,
      address: park.address,
      latitude: park.latitude,
      longitude: park.longitude,
      image: park.image,
      telephone: park.telephone,
    })),
  ];
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

interface ArticleSchemaInput {
  type: "BlogPosting" | "NewsArticle";
  headline: string;
  image: string;
  datePublished: string;
  dateModified: string;
  url: string;
  authorName?: string;
}

export function articleSchema({
  type,
  headline,
  image,
  datePublished,
  dateModified,
  url,
  authorName = ORG_NAME,
}: ArticleSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": type,
    headline,
    image: [image],
    datePublished,
    dateModified,
    url,
    author: {
      "@type": "Organization",
      name: authorName,
    },
    publisher: {
      "@type": "Organization",
      name: ORG_NAME,
      logo: {
        "@type": "ImageObject",
        url: ORG_LOGO,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };
}
