import styles from './DemoZone.module.css';

interface DemoZoneProps {
  activeCursorName: string;
}

export default function DemoZone({ activeCursorName }: DemoZoneProps) {
  return (
    <div className={styles.demoZone}>
      <div className={styles.demoZoneHeader}>
        <div>
          <h3>Live Preview Zone</h3>
          <p>Move your mouse here to see the active cursor</p>
        </div>
        <div className={styles.demoActiveName}>{activeCursorName}</div>
      </div>
      <div className={styles.demoCanvas} id="demo-canvas">
        <div className={styles.demoGrid}></div>
        <div className={styles.demoElements}>
          <button className="demo-btn">Hover Me</button>
          <div className="demo-card-el">
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>✦</div>
            Card Element
          </div>
          <button className="demo-btn">Click Here</button>
          <div className="demo-card-el">
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>◈</div>
            Interactive
          </div>
          <a className="demo-link" href="#">
            Link Style
          </a>
        </div>
        <div className={styles.demoHint}>↑ Hover elements to see cursor interactions</div>
      </div>
    </div>
  );
}
