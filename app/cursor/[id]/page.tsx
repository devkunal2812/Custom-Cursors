'use client';

import { useState } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { CURSORS } from '@/data/cursors';
import CursorWrapper from '@/components/CursorWrapper';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import styles from './cursor.module.css';

export default function CursorPage({ params }: { params: { id: string } }) {
  const cursor = CURSORS.find((c) => c.id === params.id);
  const [activeCursor] = useState<string>(params.id);

  if (!cursor) {
    notFound();
  }

  return (
    <>
      <CursorWrapper activeCursor={activeCursor} />
      <Header />
      <div className={styles.container}>
      <div className={styles.header}>
        <Link href="/" className={styles.backLink}>← Back to Home</Link>
        <h1 className={styles.title}>{cursor.name}</h1>
        <p className={styles.description}>{cursor.desc}</p>
        <div className={styles.tags}>
          {cursor.tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className={styles.preview}>
        <h2>Live Preview</h2>
        <div 
          className={styles.previewBox}
          style={{ '--cursor-color': cursor.accent } as React.CSSProperties}
        >
          <div 
            className={styles.previewCursor}
            dangerouslySetInnerHTML={{ __html: cursor.preview }}
          />
          <p className={styles.previewHint}>Hover to see cursor effect</p>
        </div>
      </div>

      <div className={styles.codeSection}>
        <div className={styles.tabs}>
          <button className={`${styles.tab} ${styles.active}`}>HTML</button>
          <button className={styles.tab}>CSS</button>
          <button className={styles.tab}>JavaScript</button>
          <button className={styles.tab}>React</button>
        </div>

        <div className={styles.codeBlock}>
          <div className={styles.codeHeader}>
            <span>HTML</span>
            <button className={styles.copyBtn}>Copy</button>
          </div>
          <pre className={styles.code}>{cursor.html}</pre>
        </div>

        <div className={styles.codeBlock}>
          <div className={styles.codeHeader}>
            <span>CSS</span>
            <button className={styles.copyBtn}>Copy</button>
          </div>
          <pre className={styles.code}>{cursor.css}</pre>
        </div>

        <div className={styles.codeBlock}>
          <div className={styles.codeHeader}>
            <span>JavaScript</span>
            <button className={styles.copyBtn}>Copy</button>
          </div>
          <pre className={styles.code}>{cursor.js}</pre>
        </div>

        <div className={styles.codeBlock}>
          <div className={styles.codeHeader}>
            <span>React</span>
            <button className={styles.copyBtn}>Copy</button>
          </div>
          <pre className={styles.code}>{cursor.react}</pre>
        </div>
      </div>

      <div className={styles.usage}>
        <h2>How to Use</h2>
        <ol className={styles.steps}>
          <li>
            <strong>Copy the HTML</strong>
            <p>Add the HTML structure before your closing <code>&lt;/body&gt;</code> tag</p>
          </li>
          <li>
            <strong>Add the CSS</strong>
            <p>Include the CSS in your stylesheet or <code>&lt;style&gt;</code> tag</p>
          </li>
          <li>
            <strong>Include the JavaScript</strong>
            <p>Add the JavaScript code in a <code>&lt;script&gt;</code> tag or external file</p>
          </li>
          <li>
            <strong>Test it out</strong>
            <p>Move your mouse to see the custom cursor in action!</p>
          </li>
        </ol>
      </div>

      <div className={styles.customization}>
        <h2>Customization</h2>
        <div className={styles.customGrid}>
          <div className={styles.customCard}>
            <h3>Change Color</h3>
            <p>Update the color values in CSS to match your brand</p>
            <div className={styles.colorExample}>
              <div className={styles.colorSwatch} style={{ background: cursor.accent }}></div>
              <code>{cursor.accent}</code>
            </div>
          </div>
          <div className={styles.customCard}>
            <h3>Adjust Size</h3>
            <p>Modify width and height properties to scale the cursor</p>
          </div>
          <div className={styles.customCard}>
            <h3>Animation Speed</h3>
            <p>Change transition duration values for faster/slower animations</p>
          </div>
        </div>
      </div>

      <div className={styles.navigation}>
        <h2>Explore More Cursors</h2>
        <div className={styles.cursorGrid}>
          {CURSORS.filter((c) => c.id !== cursor.id)
            .slice(0, 3)
            .map((c) => (
              <Link 
                key={c.id} 
                href={`/cursor/${c.id}`}
                className={styles.cursorCard}
                style={{ '--card-color': c.accent } as React.CSSProperties}
              >
                <div 
                  className={styles.cardPreview}
                  dangerouslySetInnerHTML={{ __html: c.preview }}
                />
                <h3>{c.name}</h3>
                <p>{c.desc}</p>
              </Link>
            ))}
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}
