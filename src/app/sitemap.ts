import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://quizqb.com';

  const routes = [
    '',
    '/about',
    '/login',
    '/register',
    '/dashboard',
    '/quizzes',
    '/subjects/math',
    '/subjects/science',
    '/subjects/english',
    '/subjects/geography',
    '/subjects/history',
    '/subjects/computer-science',
    '/exam-prep/gcse',
    '/exam-prep/sat',
    '/daily-challenges',
    '/brain-teasers',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  return routes;
}
