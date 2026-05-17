import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      <div className={styles.heroBadge} role="status" aria-label="Feature badge">
        Interactive Cursor Playground
      </div>
      <h1 id="hero-heading">
        Custom Cursors
        <br />
        for <em>Your</em> Website
      </h1>
      <p className={styles.heroDescription}>
        Try every cursor live. Find your favorite. Download the code - HTML, CSS, JS, or React. Drop it in and ship.
      </p>
      <div className={styles.heroStats} role="list" aria-label="Library statistics">
        <div className={styles.statItem} role="listitem">
          <div className={styles.statN} aria-label="12 cursor styles available">12</div>
          <div className={styles.statL}>Cursor Styles</div>
        </div>
        <div className={styles.statItem} role="listitem">
          <div className={styles.statN} aria-label="3 code formats provided">3</div>
          <div className={styles.statL}>Code Formats</div>
        </div>
        <div className={styles.statItem} role="listitem">
          <div className={styles.statN} aria-label="Zero dependencies required">0</div>
          <div className={styles.statL}>Dependencies</div>
        </div>
      </div>
    </section>
  );
}
