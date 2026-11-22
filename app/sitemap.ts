import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/lib/site';
import { getAllDepartements } from '@/lib/centres';
import { getAllGuides } from '@/lib/guides';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const departements = getAllDepartements();
  const guides = getAllGuides();

  const deptRoutes: MetadataRoute.Sitemap = departements.map((d) => ({
    url: absoluteUrl(`/departement/${d.code}`),
    lastModified,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const guideRoutes: MetadataRoute.Sitemap = guides.map((guide) => ({
    url: absoluteUrl(`/guide/${guide.slug}`),
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const legalRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl('/mentions-legales'),
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: absoluteUrl('/confidentialite'),
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: absoluteUrl('/cookies'),
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  return [
    {
      url: absoluteUrl('/'),
      lastModified,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    ...deptRoutes,
    ...guideRoutes,
    ...legalRoutes,
  ];
}
