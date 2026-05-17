'use client';

import { useState } from 'react';
import Link from 'next/link';
import CursorWrapper from '@/components/CursorWrapper';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import styles from './docs.module.css';

export default function DocsPage() {
  const [activeCursor] = useState<string>('dot-ring');

  return (
    <>
      <CursorWrapper activeCursor={activeCursor} />
      <Header />
      <div className={styles.container}>
        <div className={styles.sidebar}>
          <Link href="/" className={styles.backLink}>← Back to Home</Link>
        
        <nav className={styles.nav}>
          <h3>Getting Started</h3>
          <ul>
            <li><a href="#installation">Installation</a></li>
            <li><a href="#quick-start">Quick Start</a></li>
            <li><a href="#usage">Usage</a></li>
          </ul>
          
          <h3>Cursors</h3>
          <ul>
            <li><a href="#dot-ring">Dot + Ring</a></li>
            <li><a href="#glow-orb">Glow Orb</a></li>
            <li><a href="#magnetic">Magnetic Snap</a></li>
            <li><a href="#crosshair">Crosshair</a></li>
            <li><a href="#trail">Particle Trail</a></li>
            <li><a href="#morph">Morphing Blob</a></li>
          </ul>
          
          <h3>Advanced</h3>
          <ul>
            <li><a href="#customization">Customization</a></li>
            <li><a href="#react">React Integration</a></li>
            <li><a href="#performance">Performance</a></li>
          </ul>
        </nav>
      </div>
      
      <main className={styles.content}>
        <h1>Documentation</h1>
        <p className={styles.lead}>
          Complete guide to implementing custom cursors on your website
        </p>
        
        <section id="installation" className={styles.section}>
          <h2>Installation</h2>
          <p>No installation required! All cursors are pure vanilla JavaScript with zero dependencies.</p>
          
          <div className={styles.codeBlock}>
            <pre>{`<!-- Simply copy the HTML, CSS, and JS code -->
<!-- No npm install needed! -->`}</pre>
          </div>
        </section>
        
        <section id="quick-start" className={styles.section}>
          <h2>Quick Start</h2>
          <p>Get started in 3 simple steps:</p>
          
          <ol className={styles.steps}>
            <li>
              <strong>Choose a cursor</strong> from the homepage
            </li>
            <li>
              <strong>Click "Code"</strong> to view implementation
            </li>
            <li>
              <strong>Copy & paste</strong> into your project
            </li>
          </ol>
        </section>
        
        <section id="usage" className={styles.section}>
          <h2>Basic Usage</h2>
          <p>Each cursor consists of three parts:</p>
          
          <h3>1. HTML Structure</h3>
          <div className={styles.codeBlock}>
            <pre>{`<!-- Add before closing </body> tag -->
<div id="cursor-dot"></div>
<div id="cursor-ring"></div>`}</pre>
          </div>
          
          <h3>2. CSS Styling</h3>
          <div className={styles.codeBlock}>
            <pre>{`body { cursor: none; }

#cursor-dot {
  position: fixed;
  width: 10px;
  height: 10px;
  background: #60a5fa;
  border-radius: 50%;
  pointer-events: none;
  z-index: 99999;
  transform: translate(-50%, -50%);
}`}</pre>
          </div>
          
          <h3>3. JavaScript Logic</h3>
          <div className={styles.codeBlock}>
            <pre>{`const dot = document.getElementById('cursor-dot');

document.addEventListener('mousemove', e => {
  dot.style.left = e.clientX + 'px';
  dot.style.top = e.clientY + 'px';
});`}</pre>
          </div>
        </section>
        
        <section id="customization" className={styles.section}>
          <h2>Customization</h2>
          <p>Easily customize colors, sizes, and animations:</p>
          
          <h3>Change Colors</h3>
          <div className={styles.codeBlock}>
            <pre>{`:root {
  --cursor-color: #60a5fa; /* Your brand color */
}

#cursor-dot {
  background: var(--cursor-color);
}`}</pre>
          </div>
          
          <h3>Adjust Size</h3>
          <div className={styles.codeBlock}>
            <pre>{`#cursor-dot {
  width: 12px;  /* Increase size */
  height: 12px;
}

#cursor-ring {
  width: 40px;  /* Larger ring */
  height: 40px;
}`}</pre>
          </div>
        </section>
        
        <section id="react" className={styles.section}>
          <h2>React Integration</h2>
          <p>Use cursors in React applications:</p>
          
          <div className={styles.codeBlock}>
            <pre>{`import { useEffect, useRef } from 'react';

export function CustomCursor() {
  const dotRef = useRef(null);
  
  useEffect(() => {
    const handleMove = (e) => {
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + 'px';
        dotRef.current.style.top = e.clientY + 'px';
      }
    };
    
    document.addEventListener('mousemove', handleMove);
    return () => document.removeEventListener('mousemove', handleMove);
  }, []);
  
  return (
    <div 
      ref={dotRef}
      style={{
        position: 'fixed',
        width: '10px',
        height: '10px',
        background: '#60a5fa',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 99999,
        transform: 'translate(-50%, -50%)'
      }}
    />
  );
}`}</pre>
          </div>
        </section>
        
        <section id="performance" className={styles.section}>
          <h2>Performance Tips</h2>
          
          <ul className={styles.tipsList}>
            <li>
              <strong>Use requestAnimationFrame</strong> for smooth animations
            </li>
            <li>
              <strong>Disable on mobile</strong> devices (no mouse cursor)
            </li>
            <li>
              <strong>Use CSS transforms</strong> instead of top/left for better performance
            </li>
            <li>
              <strong>Limit particle count</strong> in trail effects (max 10-15)
            </li>
            <li>
              <strong>Use pointer-events: none</strong> on cursor elements
            </li>
          </ul>
        </section>
        
        <section className={styles.section}>
          <h2>Browser Support</h2>
          <p>All cursors work in modern browsers:</p>
          
          <div className={styles.browserGrid}>
            <div className={styles.browserCard}>
              <strong>Chrome</strong>
              <span>✓ Latest</span>
            </div>
            <div className={styles.browserCard}>
              <strong>Firefox</strong>
              <span>✓ Latest</span>
            </div>
            <div className={styles.browserCard}>
              <strong>Safari</strong>
              <span>✓ Latest</span>
            </div>
            <div className={styles.browserCard}>
              <strong>Edge</strong>
              <span>✓ Latest</span>
            </div>
          </div>
        </section>
        
        <section className={styles.section}>
          <h2>FAQ</h2>
          
          <div className={styles.faq}>
            <details>
              <summary>Do I need to install any packages?</summary>
              <p>No! All cursors are pure vanilla JavaScript with zero dependencies.</p>
            </details>
            
            <details>
              <summary>Will this work on mobile devices?</summary>
              <p>Custom cursors are designed for desktop/laptop devices with a mouse. On mobile, the default touch cursor is used.</p>
            </details>
            
            <details>
              <summary>Can I use this in commercial projects?</summary>
              <p>Yes! All cursors are free to use in personal and commercial projects.</p>
            </details>
            
            <details>
              <summary>How do I disable the cursor on specific elements?</summary>
              <p>Add <code>cursor: auto;</code> to specific elements in your CSS.</p>
            </details>
          </div>
        </section>
        
        <div className={styles.cta}>
          <h2>Ready to get started?</h2>
          <Link href="/#cursors" className={styles.ctaButton}>
            Browse Cursors →
          </Link>
        </div>
      </main>
    </div>
    <Footer />
    </>
  );
}
