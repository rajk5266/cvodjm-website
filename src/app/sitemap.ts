// app/sitemap.ts
import type { MetadataRoute } from 'next';

const locales = ['en', 'gu'];
const baseUrl = 'https://yoursite.com';

export default function sitemap(): MetadataRoute.Sitemap {
  // Static pages
  const staticPages = ['', '/about', '/contact'];
  
  const staticUrls = staticPages.flatMap((page) =>
    locales.map((locale) => ({
      url: `${baseUrl}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: page === '' ? 1 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          locales.map((lang) => [lang, `${baseUrl}/${lang}${page}`])
        ),
      },
    }))
  );

  return staticUrls;
}