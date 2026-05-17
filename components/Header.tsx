import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header} role="banner">
      <h1 className={styles.logo} itemScope itemType="https://schema.org/Organization">
        <span itemProp="name">kunal's<span>build</span></span>
      </h1>
      <nav className={styles.headerRight} aria-label="Site information">
        <span className={styles.tagPill} role="status" aria-label="12 free cursors available">
          ● 12 Cursors Free
        </span>
      </nav>
    </header>
  );
}
