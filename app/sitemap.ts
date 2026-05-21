// app/sitemap.ts
// ─────────────────────────────────────────────────────────
// FIXED: Removed #hash URLs — Google does NOT index these.
// Each cursor now gets a real /cursor/[id] URL for indexing.
// ─────────────────────────────────────────────────────────
import { MetadataRoute } from 'next';

const BASE_URL = 'https://custom-cursors.tech';

// Exact IDs from your data/cursors.ts
const CURSOR_IDS = [
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

export default function sitemap(): MetadataRoute.Sitemap {
  // ── Static pages ──────────────────────────────────────
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/cursors`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/docs`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  // ── Dynamic cursor pages — /cursor/[id] ───────────────
  // NOTE: These need actual pages in app/cursor/[id]/page.tsx
  // If pages don't exist yet, keep only staticRoutes for now
  const cursorRoutes: MetadataRoute.Sitemap = CURSOR_IDS.map((id) => ({
    url: `${BASE_URL}/cursor/${id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...cursorRoutes];
}
