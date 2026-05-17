import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>kunal's build</Link>
      <nav className={styles.nav}>
        <Link href="/" className={styles.navLink}>Home</Link>
        <a href="/#cursors" className={styles.navLink}>Cursors</a>
        <Link href="/docs" className={styles.navLink}>Docs</Link>
        <a href="https://github.com/devkunal2812/Custom-Cursors" className={styles.navLink} target="_blank" rel="noopener noreferrer">GitHub</a>
      </nav>
    </header>
  );
}
