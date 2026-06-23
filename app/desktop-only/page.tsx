'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { isMobileOrTablet } from '@/lib/deviceDetect';
import styles from './page.module.css';

/**
 * /desktop-only
 *
 * The only page mobile/tablet visitors ever see (enforced by
 * components/DeviceGuard.tsx, which redirects every other route here
 * for blocked devices, and redirects desktop users away from here).
 *
 * Includes a bonus "I'm now using a Desktop" button: re-runs the device
 * check on click. If the visitor really is on desktop/laptop now (e.g.
 * they switched devices and re-opened the link), they're sent to the
 * homepage. Otherwise we show an inline message instead of letting them in.
 */
export default function DesktopOnlyPage() {
  const router = useRouter();
  const [recheckFailed, setRecheckFailed] = useState(false);

  const handleRecheck = () => {
    if (isMobileOrTablet()) {
      setRecheckFailed(true);
    } else {
      setRecheckFailed(false);
      router.replace('/');
    }
  };

  return (
    <div className={styles.wrapper}>
      {/* Decorative ambient glows, matching the Hero section's style */}
      <div className={`${styles.glow} ${styles.glowOne}`} />
      <div className={`${styles.glow} ${styles.glowTwo}`} />

      <div className={styles.card}>
        <div className={styles.iconWrap}>
          {/* Inline desktop/monitor illustration, styled with the site's accent color */}
          <svg
            className={styles.icon}
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="3" y="4" width="18" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
            <path d="M8 20h8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            <path d="M12 16v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            <path d="M7 8.5l2.5 2.5L7 13.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 13.5h3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </div>

        <h1 className={styles.title}>🖥️ Desktop Experience Recommended</h1>

        <p className={styles.description}>
          This website is an interactive experience built around advanced custom cursor
          effects and desktop interactions. Unfortunately, these features are not fully
          supported on mobile and tablet devices. To experience the website as intended,
          please open it on a laptop or desktop computer.
        </p>

        <div className={styles.messageBox}>
          <span className={styles.messageLabel}>Try this website on</span>
          <span className={styles.deviceChip}>💻 Laptop</span>
          <span className={styles.deviceChip}>🖥️ Desktop PC</span>
        </div>

        <button type="button" className={styles.recheckBtn} onClick={handleRecheck}>
          I&apos;m now using a Desktop
        </button>

        {recheckFailed && (
          <p className={styles.recheckMessage}>
            This experience is currently available only on laptops and desktop computers.
          </p>
        )}

        <p className={styles.footerNote}>
          Thank you for your interest in exploring this project. We hope to see you on a
          larger screen!
        </p>
      </div>
    </div>
  );
}
