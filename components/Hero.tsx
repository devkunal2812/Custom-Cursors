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
        <h1 className={styles.title}>
          Custom Cursor
          <br />
          Library
        </h1>
        <p className={styles.subtitle}>
          12+ Interactive Cursor Effects for Modern Websites
        </p>
        
        {/* Glowing chips */}
        <div className={styles.chips}>
          <div className={styles.chip} data-color="green">
            Next.js 14
          </div>
          <div className={styles.chip} data-color="blue">
            Try Live Demo
          </div>
          <div className={styles.chip} data-color="purple">
            Free & Open Source
          </div>
        </div>
      </div>
    </section>
  );
}
