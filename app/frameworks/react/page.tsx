'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CURSORS } from '@/data/cursors';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CursorWrapper from '@/components/CursorWrapper';
import styles from './react.module.css';

export default function ReactPage() {
  const [activeCursor, setActiveCursor] = useState('dot-ring');
  const [selectedCursor, setSelectedCursor] = useState(CURSORS[0]);
  const [copied, setCopied] = useState(false);

  const handleCursorSelect = (cursor: typeof CURSORS[0]) => {
    setSelectedCursor(cursor);
    setActiveCursor(cursor.id);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <CursorWrapper activeCursor={activeCursor} />
      <Header />
      <div className={styles.container}>
        <div className={styles.hero}>
          <h1 className={styles.title}>
            <span className={styles.icon}>⚛️</span>
            React Components
          </h1>
          <p className={styles.subtitle}>
            Ready-to-use React components with hooks and TypeScript support.
          </p>
        </div>

        <div className={styles.content}>
          <div className={styles.sidebar}>
            <h3 className={styles.sidebarTitle}>Select Cursor</h3>
            <div className={styles.cursorList}>
              {CURSORS.map((cursor) => (
                <button
                  key={cursor.id}
                  className={`${styles.cursorItem} ${selectedCursor.id === cursor.id ? styles.active : ''}`}
                  onClick={() => handleCursorSelect(cursor)}
                >
                  <div 
                    className={styles.cursorPreview}
                    dangerouslySetInnerHTML={{ __html: cursor.preview }}
                  />
                  <div className={styles.cursorInfo}>
                    <span className={styles.cursorName}>{cursor.name}</span>
                    <span className={styles.cursorDesc}>{cursor.desc}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className={styles.main}>
            <div className={styles.cursorHeader}>
              <h2 className={styles.cursorTitle}>{selectedCursor.name}</h2>
              <div className={styles.tags}>
                {selectedCursor.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>{tag}</span>
                ))}
              </div>
            </div>

            <div className={styles.codeSection}>
              <div className={styles.codeBlock}>
                <div className={styles.codeHeader}>
                  <span>REACT COMPONENT</span>
                  <button
                    className={`${styles.copyBtn} ${copied ? styles.copied : ''}`}
                    onClick={() => handleCopy(selectedCursor.react)}
                  >
                    {copied ? '✓ Copied!' : 'Copy'}
                  </button>
                </div>
                <pre className={styles.code}>{selectedCursor.react}</pre>
              </div>
            </div>

            <div className={styles.usage}>
              <h3>How to Use</h3>
              <ol className={styles.steps}>
                <li>
                  <strong>Install React</strong>
                  <p>Make sure you have React installed in your project</p>
                  <code>npm install react react-dom</code>
                </li>
                <li>
                  <strong>Copy the Component</strong>
                  <p>Copy the React component code from above</p>
                </li>
                <li>
                  <strong>Create Component File</strong>
                  <p>Create a new file: <code>{selectedCursor.name.replace(/\s+/g, '')}Cursor.jsx</code></p>
                </li>
                <li>
                  <strong>Import and Use</strong>
                  <p>Import in your app: <code>{`import { ${selectedCursor.name.replace(/\s+/g, '')}Cursor } from './cursors'`}</code></p>
                </li>
                <li>
                  <strong>Add to Your App</strong>
                  <p>Place <code>{`<${selectedCursor.name.replace(/\s+/g, '')}Cursor />`}</code> at the root level of your app</p>
                </li>
              </ol>
            </div>

            <div className={styles.viewDetails}>
              <Link href={`/cursor/${selectedCursor.id}`} className={styles.detailsBtn}>
                View Full Details →
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
