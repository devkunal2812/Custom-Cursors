import CursorCard from './CursorCard';
import type { CursorDefinition } from '@/types/cursor';
import styles from './CursorGrid.module.css';

interface CursorGridProps {
  cursors: CursorDefinition[];
  activeCursor: string;
  onTryCursor: (cursorId: string) => void;
  onOpenModal: (cursorId: string) => void;
}

export default function CursorGrid({ cursors, activeCursor, onTryCursor, onOpenModal }: CursorGridProps) {
  return (
    <div className={styles.cursorGrid}>
      {cursors.map((cursor, index) => (
        <div key={cursor.id} style={{ '--index': index } as React.CSSProperties}>
          <CursorCard
            cursor={cursor}
            isActive={activeCursor === cursor.id}
            onTry={() => onTryCursor(cursor.id)}
            onCode={() => onOpenModal(cursor.id)}
          />
        </div>
      ))}
    </div>
  );
}
