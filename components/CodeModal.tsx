'use client';

import { useState } from 'react';
import type { CursorDefinition } from '@/types/cursor';
import styles from './CodeModal.module.css';

interface CodeModalProps {
  cursor: CursorDefinition;
  onClose: () => void;
}

type TabType = 'css' | 'js' | 'react' | 'usage';

export default function CodeModal({ cursor, onClose }: CodeModalProps) {
  const [activeTab, setActiveTab] = useState<TabType>('css');
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    let text = '';
    switch (activeTab) {
      case 'css':
        text = `${cursor.css}\n\n${cursor.html ? '/* HTML */\n' + cursor.html : ''}`;
        break;
      case 'js':
        text = cursor.js;
        break;
      case 'react':
        text = cursor.react;
        break;
      default:
        return;
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleDownload = () => {
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>${cursor.name} Cursor</title>
<style>
body { margin: 0; background: #0a0a0f; min-height: 100vh; display: flex; align-items: center; justify-content: center; font-family: sans-serif; color: #fff; }
h1 { font-size: 32px; opacity: 0.8; }

${cursor.css}
</style>
</head>
<body>
<h1>${cursor.name} Cursor — Demo</h1>

${cursor.html || '<!-- cursor elements added by JS -->'}

<script>
${cursor.js}
<\/script>
</body>
</html>`;

    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${cursor.id}-cursor.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={`${styles.modalOverlay} ${styles.open}`} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <div>
            <div className={styles.modalTitle}>{cursor.name}</div>
            <div className={styles.modalSubtitle}>Copy the code and drop it into your project</div>
          </div>
          <button className={styles.modalClose} onClick={onClose}>
            ✕
          </button>
        </div>
        <div className={styles.modalTabs}>
          <button
            className={`${styles.modalTab} ${activeTab === 'css' ? styles.active : ''}`}
            onClick={() => setActiveTab('css')}
          >
            CSS + HTML
          </button>
          <button
            className={`${styles.modalTab} ${activeTab === 'js' ? styles.active : ''}`}
            onClick={() => setActiveTab('js')}
          >
            JavaScript
          </button>
          <button
            className={`${styles.modalTab} ${activeTab === 'react' ? styles.active : ''}`}
            onClick={() => setActiveTab('react')}
          >
            React
          </button>
          <button
            className={`${styles.modalTab} ${activeTab === 'usage' ? styles.active : ''}`}
            onClick={() => setActiveTab('usage')}
          >
            How to Use
          </button>
        </div>
        <div className={styles.modalBody}>
          {activeTab === 'css' && (
            <pre className={styles.codeBlock}>
              {cursor.css}
              {cursor.html && `\n\n/* HTML */\n${cursor.html}`}
            </pre>
          )}
          {activeTab === 'js' && <pre className={styles.codeBlock}>{cursor.js}</pre>}
          {activeTab === 'react' && <pre className={styles.codeBlock}>{cursor.react}</pre>}
          {activeTab === 'usage' && (
            <ul className={styles.usageSteps}>
              <li>
                <span className={styles.stepNum}>1</span>
                <span>
                  <strong>Paste the HTML</strong> — Add the cursor <code>&lt;div&gt;</code> elements right before your
                  closing <code>&lt;/body&gt;</code> tag.
                </span>
              </li>
              <li>
                <span className={styles.stepNum}>2</span>
                <span>
                  <strong>Add the CSS</strong> — Copy the CSS into your stylesheet or inside a <code>&lt;style&gt;</code>{' '}
                  block. Make sure <code>body {'{ cursor: none }'}</code> is set.
                </span>
              </li>
              <li>
                <span className={styles.stepNum}>3</span>
                <span>
                  <strong>Include the JS</strong> — Paste the script at the bottom of your HTML or import as a module. It
                  handles all mouse tracking.
                </span>
              </li>
              <li>
                <span className={styles.stepNum}>4</span>
                <span>
                  <strong>Customize colors</strong> — Change CSS custom properties at the top to match your brand palette.
                </span>
              </li>
              <li>
                <span className={styles.stepNum}>5</span>
                <span>
                  <strong>Test on desktop</strong> — Custom cursors only work on non-touch devices. The script auto-hides
                  on mobile.
                </span>
              </li>
            </ul>
          )}
        </div>
        <div className={styles.modalFooter}>
          <button className={styles.btnDownload} onClick={handleDownload}>
            ⬇ Download .zip
          </button>
          <button className={`${styles.btnCopy} ${copied ? styles.copied : ''}`} onClick={handleCopy}>
            {copied ? '✓ Copied!' : 'Copy Code'}
          </button>
        </div>
      </div>
    </div>
  );
}
