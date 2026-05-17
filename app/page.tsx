'use client';

import { useState } from 'react';
import Script from 'next/script';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import CursorGrid from '@/components/CursorGrid';
import DemoZone from '@/components/DemoZone';
import CodeModal from '@/components/CodeModal';
import CursorWrapper from '@/components/CursorWrapper';
import { CURSORS } from '@/data/cursors';
import type { CursorDefinition } from '@/types/cursor';
import styles from './page.module.css';

export default function Home() {
  const [activeCursor, setActiveCursor] = useState<string>('dot-ring');
  const [modalCursor, setModalCursor] = useState<CursorDefinition | null>(null);

  const handleTryCursor = (cursorId: string) => {
    setActiveCursor(cursorId);
  };

  const handleOpenModal = (cursorId: string) => {
    const cursor = CURSORS.find(c => c.id === cursorId);
    if (cursor) {
      setModalCursor(cursor);
    }
  };

  const handleCloseModal = () => {
    setModalCursor(null);
  };

  const activeCursorData = CURSORS.find(c => c.id === activeCursor);

  // Structured Data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: "kunal's build - Custom Cursor Library",
    description: 'Interactive custom cursor library with 12+ cursor effects. Try live demos and download code snippets.',
    url: 'https://kunalsbuild.com',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    author: {
      '@type': 'Person',
      name: 'Kunal',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '127',
    },
    featureList: [
      '12+ Custom Cursor Effects',
      'Live Interactive Demos',
      'HTML, CSS, JavaScript Code',
      'React Component Code',
      'Copy & Paste Ready',
      'Free to Use',
    ],
  };

  const breadcrumbData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://kunalsbuild.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Custom Cursors',
        item: 'https://kunalsbuild.com#cursors',
      },
    ],
  };

  const faqData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I use these custom cursors on my website?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Click the "Code" button on any cursor to view implementation code. Copy the HTML, CSS, and JavaScript snippets and paste them into your website. Each cursor includes vanilla JS and React versions.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are these custom cursors free to use?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! All cursor effects are completely free to use in personal and commercial projects. No attribution required.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do custom cursors work on mobile devices?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Custom cursors are designed for desktop/laptop devices with a mouse or trackpad. On mobile devices, the default touch cursor is used automatically.',
        },
      },
      {
        '@type': 'Question',
        name: 'Which browsers support custom cursors?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'All modern browsers support custom cursors including Chrome, Firefox, Safari, Edge, and Opera. The cursors use standard CSS and JavaScript.',
        },
      },
    ],
  };

  return (
    <>
      {/* Structured Data */}
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Script
        id="breadcrumb-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
      <Script
        id="faq-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
      />

      <CursorWrapper activeCursor={activeCursor} />
      <Header />
      <main className={styles.main}>
        <Hero />
        <DemoZone activeCursorName={activeCursorData?.name || 'Dot + Ring'} />
        <section id="cursors" className={styles.sectionLabel}>
          <div>
            <h2>Choose a Cursor</h2>
          </div>
          <p>
            Click <strong>Try</strong> to activate · <strong>Code</strong> to download
          </p>
        </section>
        <CursorGrid
          cursors={CURSORS}
          activeCursor={activeCursor}
          onTryCursor={handleTryCursor}
          onOpenModal={handleOpenModal}
        />
      </main>
      <Footer />
      {modalCursor && (
        <CodeModal cursor={modalCursor} onClose={handleCloseModal} />
      )}
    </>
  );
}
