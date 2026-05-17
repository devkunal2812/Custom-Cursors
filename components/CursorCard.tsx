import Link from 'next/link';
import type { CursorDefinition } from '@/types/cursor';
import styles from './CursorCard.module.css';

interface CursorCardProps {
  cursor: CursorDefinition;
  isActive: boolean;
  onTry: () => void;
}

export default function CursorCard({ cursor, isActive, onTry }: CursorCardProps) {
  return (
    <article
      className={`${styles.cursorCard} ${isActive ? styles.active : ''} cursor-card`}
      style={{ '--card-accent': cursor.accent } as React.CSSProperties}
      aria-label={`${cursor.name} cursor effect`}
      itemScope
      itemType="https://schema.org/SoftwareApplication"
    >
      <div className={styles.cardActiveBadge} aria-live="polite">ACTIVE</div>
      <div className={styles.cardPreview} role="img" aria-label={`Preview of ${cursor.name} cursor`}>
        <div className={styles.cardPreviewBg}></div>
        <div
          className={styles.previewCursor}
          dangerouslySetInnerHTML={{ __html: cursor.preview }}
        />
      </div>
      <div className={styles.cardBody}>
        <h3 className={styles.cardName} itemProp="name">{cursor.name}</h3>
        <p className={styles.cardDesc} itemProp="description">{cursor.desc}</p>
        <div className={styles.cardTags} role="list" aria-label="Cursor tags">
          {cursor.tags.map(tag => (
            <span key={tag} className={styles.cardTag} role="listitem" itemProp="keywords">
              {tag}
            </span>
          ))}
        </div>
        <div className={styles.cardActions}>
          <button 
            className={styles.btnTry} 
            onClick={onTry}
            aria-label={`Try ${cursor.name} cursor`}
            aria-pressed={isActive}
          >
            Try It
          </button>
          <Link 
            href={`/cursor/${cursor.id}`}
            className={styles.btnCode}
            aria-label={`View code for ${cursor.name} cursor`}
          >
            {'{ }'} Code
          </Link>
        </div>
      </div>
    </article>
  );
}
