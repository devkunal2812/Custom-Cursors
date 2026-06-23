'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { isMobileOrTablet } from '@/lib/deviceDetect';

const DESKTOP_ONLY_PATH = '/desktop-only';

/**
 * DeviceGuard
 *
 * Mounted once in the root layout so it applies to every route.
 * On mount (and whenever the route changes), it checks the device type:
 *  - Mobile/tablet users get redirected to /desktop-only, no matter what
 *    URL they tried to open directly.
 *  - Desktop/laptop users are redirected AWAY from /desktop-only if they
 *    somehow land there, since the page is only meant for blocked devices.
 *
 * We render nothing visual — this is pure routing logic. The actual
 * "you're on the wrong device" UI lives in app/desktop-only/page.tsx.
 *
 * `checking` gates rendering of children for a brief moment on first
 * mount so a mobile/tablet user never sees a flash of the real site
 * before the redirect kicks in.
 */
export default function DeviceGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const blocked = isMobileOrTablet();
    const onDesktopOnlyPage = pathname?.startsWith(DESKTOP_ONLY_PATH);

    if (blocked && !onDesktopOnlyPage) {
      // Phone/tablet trying to access any real page -> send to the gate.
      router.replace(DESKTOP_ONLY_PATH);
      return;
    }

    if (!blocked && onDesktopOnlyPage) {
      // Desktop/laptop user landed on the gate page directly -> let them in.
      router.replace('/');
      return;
    }

    setChecking(false);
    // Re-run whenever the route changes so direct URL entry is also covered.
  }, [pathname, router]);

  if (checking) {
    // Render nothing while we determine device + route to avoid flashing
    // the real site to a device that's about to be redirected.
    return null;
  }

  return <>{children}</>;
}
