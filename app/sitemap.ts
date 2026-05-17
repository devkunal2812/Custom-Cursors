import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://custom-cursors.tech';
  
  // Main pages
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
  ];

  // Add individual cursor pages (if you want to create separate pages later)
  const cursorIds = [
    'dot-ring',
    'glow-orb',
    'magnetic',
    'crosshair',
    'trail',
    'morph',
    'spotlight',
    'ripple',
    'text-follow',
    'outline-only',
    'pulse-ring',
    'neon-cross',
  ];

  const cursorRoutes = cursorIds.map((id) => ({
    url: `${baseUrl}#${id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...routes, ...cursorRoutes];
}
