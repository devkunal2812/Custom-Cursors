import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://custom-cursors.tech'),
  title: "Kunal's Build - Custom Cursor Library | 12+ Interactive Cursors",
  description: 'Discover 12+ stunning custom cursor effects for your website. Try live demos, copy code snippets (HTML, CSS, JS, React). Free cursor library with dot ring, glow orb, magnetic snap, crosshair, particle trail & more.',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.ico', type: 'image/x-icon' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/manifest.json',
  keywords: [
    'custom cursor',
    'cursor effects',
    'interactive cursor',
    'custom mouse cursor',
    'cursor library',
    'cursor code',
    'cursor snippets',
    'dot ring cursor',
    'glow cursor',
    'magnetic cursor',
    'particle trail cursor',
    'cursor animation',
    'cursor react',
    'cursor javascript',
    'web cursor effects',
    'cursor css',
    'cursor html',
    'cursor playground',
    'cursor demo',
    'free cursor code'
  ],
  authors: [{ name: 'Kunal' }],
  creator: 'Kunal',
  publisher: "Kunal's Build",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://custom-cursors.tech',
    siteName: "Kunal's Build",
    title: "Kunal's Build - Custom Cursor Library | 12+ Interactive Cursors",
    description: 'Discover 12+ stunning custom cursor effects. Try live demos, copy code snippets (HTML, CSS, JS, React). Free cursor library.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: "Kunal's Build - Custom Cursor Library",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Kunal's Build - Custom Cursor Library | 12+ Interactive Cursors",
    description: 'Discover 12+ stunning custom cursor effects. Try live demos, copy code snippets (HTML, CSS, JS, React).',
    images: ['/og-image.png'],
    creator: '@kunal',
  },
  alternates: {
    canonical: 'https://custom-cursors.tech',
  },
  category: 'technology',
  classification: 'Web Development Tools',
  verification: {
    google: 'c7d24ad5a15fdd50',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#0a0a0f" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body>{children}</body>
    </html>
  );
}

