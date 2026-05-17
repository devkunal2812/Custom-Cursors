'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
  const [showFrameworks, setShowFrameworks] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>Kunal's Build</Link>
      <nav className={styles.nav}>
        <Link href="/" className={styles.navLink}>Home</Link>
        <a href="/#cursors" className={styles.navLink}>Cursors</a>
        <Link href="/docs" className={styles.navLink}>Docs</Link>
        
        <div 
          className={styles.dropdown}
          onMouseEnter={() => setShowFrameworks(true)}
          onMouseLeave={() => setShowFrameworks(false)}
        >
          <button className={styles.navLink}>
            Frameworks ▾
          </button>
          {showFrameworks && (
            <div className={styles.dropdownMenu}>
              <Link href="/frameworks/vanilla" className={styles.dropdownItem}>
                <span className={styles.frameworkIcon}>🌐</span>
                Vanilla JS
                <span className={styles.frameworkDesc}>HTML + CSS + JS</span>
              </Link>
              <Link href="/frameworks/react" className={styles.dropdownItem}>
                <span className={styles.frameworkIcon}>⚛️</span>
                React
                <span className={styles.frameworkDesc}>React Components</span>
              </Link>
              <Link href="/frameworks/vue" className={styles.dropdownItem}>
                <span className={styles.frameworkIcon}>💚</span>
                Vue 3
                <span className={styles.frameworkDesc}>Composition API</span>
              </Link>
            </div>
          )}
        </div>

        <button onClick={scrollToTop} className={styles.backToTop}>
          ↑ Back to Top
        </button>
      </nav>
    </header>
  );
}
