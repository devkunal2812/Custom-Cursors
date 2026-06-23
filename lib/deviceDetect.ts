/**
 * Device detection utility.
 *
 * Goal: reliably tell "mobile phone" / "tablet" apart from "desktop or laptop"
 * (including touch-enabled Windows laptops, which must NEVER be blocked).
 *
 * Why we don't rely on screen width or `pointer: coarse` alone:
 * Touch-enabled laptops (e.g. Surface, 2-in-1 convertibles) also report a
 * coarse pointer and can be resized to small widths, so width/touch checks
 * alone would incorrectly block real laptops. Instead we primarily rely on
 * the User-Agent string, which is still the most reliable signal for
 * "this is a phone/tablet OS", and only use it (no width heuristics).
 *
 * iPadOS 13+ quirk:
 * Modern iPads send a desktop Safari User-Agent ("Macintosh...") to get
 * full desktop sites, so UA string alone can't catch them. We add a
 * dedicated check: Mac UA + multi-touch support is only possible on an
 * iPad (real Macs are not multi-touch), so that combination is treated
 * as a tablet.
 */

export type DeviceType = 'mobile' | 'tablet' | 'desktop';

// Matches common phone UAs (Android phones, iPhone, Windows Phone, etc.)
const MOBILE_UA_REGEX =
  /Android.*Mobile|iPhone|iPod|Windows Phone|BlackBerry|BB10|IEMobile|Opera Mini/i;

// Matches common tablet UAs (iPad, Android tablets which omit "Mobile", Kindle, etc.)
const TABLET_UA_REGEX = /iPad|Android(?!.*Mobile)|Tablet|Kindle|Silk/i;

/**
 * Detects the device type purely from User-Agent + touch capability.
 * Must only be called on the client (uses `navigator`).
 */
export function detectDeviceType(): DeviceType {
  if (typeof navigator === 'undefined') {
    // Server-side / no navigator available — assume desktop so we never
    // accidentally block during SSR; the client check runs right after.
    return 'desktop';
  }

  const ua = navigator.userAgent || '';

  // iPad pretending to be a Mac: real Macs never report multi-touch.
  const isIPadOS =
    /Macintosh/i.test(ua) &&
    typeof navigator.maxTouchPoints === 'number' &&
    navigator.maxTouchPoints > 1;

  if (isIPadOS || TABLET_UA_REGEX.test(ua)) {
    return 'tablet';
  }

  if (MOBILE_UA_REGEX.test(ua)) {
    return 'mobile';
  }

  return 'desktop';
}

/** Convenience boolean used by the guard/page components. */
export function isMobileOrTablet(): boolean {
  const type = detectDeviceType();
  return type === 'mobile' || type === 'tablet';
}
