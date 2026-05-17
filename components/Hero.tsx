import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      {/* Floating cursor decorations */}
      <div className={styles.floatingCursors}>
        <div className={styles.cursor} style={{ top: '18%', left: '5%' }}>
          <div className={styles.cursorRing} style={{ borderColor: '#60a5fa' }}>
            <div className={styles.cursorDot} style={{ background: '#1e293b' }}></div>
          </div>
        </div>
        <div className={styles.cursor} style={{ top: '15%', left: '25%' }}>
          <div className={styles.cursorRing} style={{ borderColor: '#34d399' }}>
            <div className={styles.cursorDot} style={{ background: '#1e293b' }}></div>
          </div>
        </div>
        <div className={styles.cursor} style={{ top: '20%', right: '15%' }}>
          <div className={styles.crosshair}>
            <div className={styles.crosshairH}></div>
            <div className={styles.crosshairV}></div>
          </div>
        </div>
        <div className={styles.cursor} style={{ top: '30%', right: '8%' }}>
          <div className={styles.cursorRing} style={{ borderColor: '#60a5fa' }}>
            <div className={styles.cursorDot} style={{ background: '#1e293b' }}></div>
          </div>
        </div>
        <div className={styles.cursor} style={{ bottom: '18%', left: '8%' }}>
          <div className={styles.crosshair}>
            <div className={styles.crosshairH}></div>
            <div className={styles.crosshairV}></div>
          </div>
        </div>
        <div className={styles.cursor} style={{ bottom: '22%', left: '15%' }}>
          <div className={styles.cursorRing} style={{ borderColor: '#ec4899' }}>
            <div className={styles.cursorDot} style={{ background: '#1e293b' }}></div>
          </div>
        </div>
        <div className={styles.cursor} style={{ bottom: '15%', right: '12%' }}>
          <div className={styles.cursorRing} style={{ borderColor: '#a78bfa' }}>
            <div className={styles.cursorDot} style={{ background: '#1e293b' }}></div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className={styles.content}>
        <div className={styles.brand}>kunal's build</div>
        <h1 className={styles.title}>
          Custom Cursor
          <br />
          Library
        </h1>
        <p className={styles.subtitle}>
          12+ Interactive Cursor Effects for Modern Websites
        </p>
        <div className={styles.buttons}>
          <button className={styles.btn} style={{ background: '#60a5fa' }}></button>
          <button className={styles.btn} style={{ background: '#a78bfa' }}></button>
          <button className={styles.btn} style={{ background: '#34d399' }}>
            <div className={styles.btnCursor}></div>
          </button>
        </div>
      </div>
    </section>
  );
}
