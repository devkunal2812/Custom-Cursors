'use client';

import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
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
        <button onClick={scrollToTop} className={styles.backToTop}>
          ↑ Back to Top
        </button>
      </nav>
    </header>
  );
}
