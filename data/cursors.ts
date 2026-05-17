import { CursorDefinition } from '@/types/cursor';

export const CURSORS: CursorDefinition[] = [
  // ─────────────────────────────────────────────
  // 1. DOT + RING
  // ─────────────────────────────────────────────
  {
    id: 'dot-ring',
    name: 'Dot + Ring',
    desc: 'Classic two-layer cursor with a sharp dot and trailing ring. Clean and versatile.',
    tags: ['minimal', 'professional', 'popular'],
    accent: '#60a5fa',
    preview: '<div class="prev-dot" style="background:#60a5fa"></div>',

    css: `/* ── Dot + Ring Cursor ── */
:root { --cur-dot: #60a5fa; --cur-ring: rgba(96,165,250,0.5); }
body { cursor: none; }

#cursor-dot {
  position: fixed; width: 10px; height: 10px;
  background: var(--cur-dot); border-radius: 50%;
  pointer-events: none; z-index: 99999;
  transform: translate(-50%, -50%);
  transition: width .2s, height .2s, background .2s;
}
#cursor-ring {
  position: fixed; width: 36px; height: 36px;
  border: 2px solid var(--cur-ring); border-radius: 50%;
  pointer-events: none; z-index: 99998;
  transform: translate(-50%, -50%);
  transition: width .3s, height .3s, border-color .3s;
}`,

    html: `<!-- Paste before </body> -->
<div id="cursor-dot"></div>
<div id="cursor-ring"></div>`,

    js: `// Dot + Ring Cursor
const dot = document.getElementById('cursor-dot');
const ring = document.getElementById('cursor-ring');
let rx = 0, ry = 0, mx = 0, my = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  dot.style.left = mx + 'px';
  dot.style.top  = my + 'px';
});

(function lerp() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(lerp);
})();

// Optional hover effect — add data-cursor to any interactive element
document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
  el.addEventListener('mouseenter', () => {
    dot.style.width  = '6px';
    dot.style.height = '6px';
    ring.style.width  = '52px';
    ring.style.height = '52px';
    ring.style.borderColor = '#60a5fa';
  });
  el.addEventListener('mouseleave', () => {
    dot.style.width  = '10px';
    dot.style.height = '10px';
    ring.style.width  = '36px';
    ring.style.height = '36px';
    ring.style.borderColor = 'rgba(96,165,250,0.5)';
  });
});`,

    react: `// DotRingCursor.jsx
// Usage: <DotRingCursor /> anywhere in your app (outside any scroll container)
import { useEffect, useRef } from 'react';

export function DotRingCursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  const pos  = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Hide native cursor
    document.body.style.cursor = 'none';

    const move = e => {
      pos.current = { x: e.clientX, y: e.clientY };
      dotRef.current.style.left = e.clientX + 'px';
      dotRef.current.style.top  = e.clientY + 'px';
    };
    document.addEventListener('mousemove', move);

    let raf;
    const lerp = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.12;
      ring.current.y += (pos.current.y - ring.current.y) * 0.12;
      ringRef.current.style.left = ring.current.x + 'px';
      ringRef.current.style.top  = ring.current.y + 'px';
      raf = requestAnimationFrame(lerp);
    };
    raf = requestAnimationFrame(lerp);

    // Hover states for interactive elements
    const enter = () => {
      dotRef.current.style.width  = '6px';
      dotRef.current.style.height = '6px';
      ringRef.current.style.width  = '52px';
      ringRef.current.style.height = '52px';
      ringRef.current.style.borderColor = '#60a5fa';
    };
    const leave = () => {
      dotRef.current.style.width  = '10px';
      dotRef.current.style.height = '10px';
      ringRef.current.style.width  = '36px';
      ringRef.current.style.height = '36px';
      ringRef.current.style.borderColor = 'rgba(96,165,250,0.5)';
    };
    const els = document.querySelectorAll('a, button, [data-cursor]');
    els.forEach(el => { el.addEventListener('mouseenter', enter); el.addEventListener('mouseleave', leave); });

    return () => {
      document.body.style.cursor = '';
      document.removeEventListener('mousemove', move);
      cancelAnimationFrame(raf);
      els.forEach(el => { el.removeEventListener('mouseenter', enter); el.removeEventListener('mouseleave', leave); });
    };
  }, []);

  return (
    <>
      <div ref={dotRef} style={{
        position:'fixed', width:10, height:10,
        background:'#60a5fa', borderRadius:'50%',
        pointerEvents:'none', zIndex:99999,
        transform:'translate(-50%,-50%)',
        transition:'width .2s, height .2s, background .2s',
      }} />
      <div ref={ringRef} style={{
        position:'fixed', width:36, height:36,
        border:'2px solid rgba(96,165,250,0.5)',
        borderRadius:'50%', pointerEvents:'none',
        zIndex:99998, transform:'translate(-50%,-50%)',
        transition:'width .3s, height .3s, border-color .3s',
      }} />
    </>
  );
}`,

    vue: `<!-- DotRingCursor.vue -->
<!-- Usage: <DotRingCursor /> in your Vue 3 app -->
<template>
  <div ref="dotEl" class="cursor-dot" :style="{ background: color }" />
  <div ref="ringEl" class="cursor-ring" :style="{ borderColor: \`\${color}80\` }" />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const props = withDefaults(defineProps<{ color?: string }>(), { color: '#60a5fa' });

const dotEl  = ref<HTMLElement | null>(null);
const ringEl = ref<HTMLElement | null>(null);

let raf: number;
const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
const cur = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

function onMove(e: MouseEvent) {
  pos.x = e.clientX; pos.y = e.clientY;
  dotEl.value!.style.left = e.clientX + 'px';
  dotEl.value!.style.top  = e.clientY + 'px';
}

function loop() {
  cur.x += (pos.x - cur.x) * 0.12;
  cur.y += (pos.y - cur.y) * 0.12;
  ringEl.value!.style.left = cur.x + 'px';
  ringEl.value!.style.top  = cur.y + 'px';
  raf = requestAnimationFrame(loop);
}

function onEnter() { 
  dotEl.value!.style.width = dotEl.value!.style.height = '6px'; 
  ringEl.value!.style.width = ringEl.value!.style.height = '52px'; 
  ringEl.value!.style.borderColor = props.color; 
}

function onLeave() { 
  dotEl.value!.style.width = dotEl.value!.style.height = '10px'; 
  ringEl.value!.style.width = ringEl.value!.style.height = '36px'; 
  ringEl.value!.style.borderColor = \`\${props.color}80\`; 
}

onMounted(() => {
  document.body.style.cursor = 'none';
  document.addEventListener('mousemove', onMove);
  raf = requestAnimationFrame(loop);
  document.querySelectorAll<HTMLElement>('a, button, [data-cursor]').forEach(el => {
    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);
  });
});

onUnmounted(() => {
  document.body.style.cursor = '';
  document.removeEventListener('mousemove', onMove);
  cancelAnimationFrame(raf);
  document.querySelectorAll<HTMLElement>('a, button, [data-cursor]').forEach(el => {
    el.removeEventListener('mouseenter', onEnter);
    el.removeEventListener('mouseleave', onLeave);
  });
});
</script>

<style scoped>
.cursor-dot {
  position: fixed; width: 10px; height: 10px; border-radius: 50%;
  pointer-events: none; z-index: 99999; transform: translate(-50%,-50%);
  transition: width .2s, height .2s;
}
.cursor-ring {
  position: fixed; width: 36px; height: 36px; border-radius: 50%;
  border: 2px solid; pointer-events: none; z-index: 99998;
  transform: translate(-50%,-50%);
  transition: width .3s, height .3s, border-color .3s;
}
</style>`,

    init(wrap: HTMLElement) {
      wrap.innerHTML = `
        <div id="cd" style="position:fixed;width:10px;height:10px;background:#60a5fa;border-radius:50%;pointer-events:none;z-index:99999;transform:translate(-50%,-50%);transition:width .2s,height .2s"></div>
        <div id="cr" style="position:fixed;width:36px;height:36px;border:2px solid rgba(96,165,250,0.5);border-radius:50%;pointer-events:none;z-index:99998;transform:translate(-50%,-50%);transition:width .3s,height .3s,border-color .3s"></div>
      `;
      const dot  = document.getElementById('cd') as HTMLElement;
      const ring = document.getElementById('cr') as HTMLElement;
      let rx = 0, ry = 0, mx = 0, my = 0;
      document.onmousemove = e => { mx = e.clientX; my = e.clientY; dot.style.left = mx + 'px'; dot.style.top = my + 'px'; };
      const lerp = () => { rx += (mx - rx) * .12; ry += (my - ry) * .12; ring.style.left = rx + 'px'; ring.style.top = ry + 'px'; requestAnimationFrame(lerp); };
      lerp();
      return {
        enter: () => { dot.style.width = '6px'; dot.style.height = '6px'; ring.style.width = '52px'; ring.style.height = '52px'; ring.style.borderColor = '#60a5fa'; },
        leave: () => { dot.style.width = '10px'; dot.style.height = '10px'; ring.style.width = '36px'; ring.style.height = '36px'; ring.style.borderColor = 'rgba(96,165,250,0.5)'; },
      };
    },
  },

  // ─────────────────────────────────────────────
  // 2. GLOW ORB
  // ─────────────────────────────────────────────
  {
    id: 'glow-orb',
    name: 'Glow Orb',
    desc: 'Soft glowing orb that pulses and leaves a luminous trail. Perfect for dark premium sites.',
    tags: ['glow', 'dark', 'premium'],
    accent: '#a78bfa',
    preview: '<div class="prev-glow" style="background:#a78bfa;box-shadow:0 0 20px 8px rgba(167,139,250,0.5)"></div>',

    css: `/* ── Glow Orb Cursor ── */
:root { --glow-color: #a78bfa; }
body { cursor: none; }

#cursor-orb {
  position: fixed; width: 20px; height: 20px;
  background: var(--glow-color);
  border-radius: 50%; pointer-events: none;
  z-index: 99999; transform: translate(-50%, -50%);
  box-shadow: 0 0 20px 6px rgba(167,139,250,0.4);
  transition: width .3s, height .3s, box-shadow .3s;
  mix-blend-mode: screen;
}
#cursor-orb-aura {
  position: fixed; width: 60px; height: 60px;
  background: rgba(167,139,250,0.12);
  border-radius: 50%; pointer-events: none;
  z-index: 99998; transform: translate(-50%, -50%);
  filter: blur(12px);
  transition: width .4s, height .4s;
}`,

    html: `<!-- Paste before </body> -->
<div id="cursor-orb"></div>
<div id="cursor-orb-aura"></div>`,

    js: `// Glow Orb Cursor
const orb  = document.getElementById('cursor-orb');
const aura = document.getElementById('cursor-orb-aura');
let ax = 0, ay = 0, mx = 0, my = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  orb.style.left = mx + 'px';
  orb.style.top  = my + 'px';
});

(function lerp() {
  ax += (mx - ax) * 0.08;
  ay += (my - ay) * 0.08;
  aura.style.left = ax + 'px';
  aura.style.top  = ay + 'px';
  requestAnimationFrame(lerp);
})();

// Hover expand — add to interactive elements
document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
  el.addEventListener('mouseenter', () => {
    orb.style.width  = '28px'; orb.style.height = '28px';
    aura.style.width = '90px'; aura.style.height = '90px';
  });
  el.addEventListener('mouseleave', () => {
    orb.style.width  = '20px'; orb.style.height = '20px';
    aura.style.width = '60px'; aura.style.height = '60px';
  });
});`,

    react: `// GlowOrbCursor.jsx
// Usage: <GlowOrbCursor /> — best on dark backgrounds (mix-blend-mode: screen)
import { useEffect, useRef } from 'react';

export function GlowOrbCursor({ color = '#a78bfa' }) {
  const orbRef  = useRef(null);
  const auraRef = useRef(null);
  const pos  = useRef({ x: 0, y: 0 });
  const aura = useRef({ x: 0, y: 0 });

  useEffect(() => {
    document.body.style.cursor = 'none';

    const move = e => {
      pos.current = { x: e.clientX, y: e.clientY };
      orbRef.current.style.left = e.clientX + 'px';
      orbRef.current.style.top  = e.clientY + 'px';
    };
    document.addEventListener('mousemove', move);

    let raf;
    const lerp = () => {
      aura.current.x += (pos.current.x - aura.current.x) * 0.08;
      aura.current.y += (pos.current.y - aura.current.y) * 0.08;
      auraRef.current.style.left = aura.current.x + 'px';
      auraRef.current.style.top  = aura.current.y + 'px';
      raf = requestAnimationFrame(lerp);
    };
    raf = requestAnimationFrame(lerp);

    const enter = () => {
      orbRef.current.style.width   = '28px'; orbRef.current.style.height  = '28px';
      auraRef.current.style.width  = '90px'; auraRef.current.style.height = '90px';
    };
    const leave = () => {
      orbRef.current.style.width   = '20px'; orbRef.current.style.height  = '20px';
      auraRef.current.style.width  = '60px'; auraRef.current.style.height = '60px';
    };
    const els = document.querySelectorAll('a, button, [data-cursor]');
    els.forEach(el => { el.addEventListener('mouseenter', enter); el.addEventListener('mouseleave', leave); });

    return () => {
      document.body.style.cursor = '';
      document.removeEventListener('mousemove', move);
      cancelAnimationFrame(raf);
      els.forEach(el => { el.removeEventListener('mouseenter', enter); el.removeEventListener('mouseleave', leave); });
    };
  }, []);

  return (
    <>
      <div ref={orbRef} style={{
        position:'fixed', width:20, height:20,
        background: color, borderRadius:'50%',
        pointerEvents:'none', zIndex:99999,
        transform:'translate(-50%,-50%)',
        boxShadow:\`0 0 20px 6px \${color}66\`,
        mixBlendMode:'screen',
        transition:'width .3s, height .3s',
      }} />
      <div ref={auraRef} style={{
        position:'fixed', width:60, height:60,
        background:\`\${color}1f\`,
        borderRadius:'50%', pointerEvents:'none',
        zIndex:99998, transform:'translate(-50%,-50%)',
        filter:'blur(12px)',
        transition:'width .4s, height .4s',
      }} />
    </>
  );
}`,

    vue: `<!-- GlowOrbCursor.vue -->
<!-- Usage: <GlowOrbCursor /> in your Vue 3 app -->
<!-- Best on dark backgrounds (mix-blend-mode: screen) -->
<template>
  <div ref="orbEl" class="cursor-orb" :style="{ background: color, boxShadow: \`0 0 20px 6px \${color}66\` }" />
  <div ref="auraEl" class="cursor-aura" :style="{ background: \`\${color}1f\` }" />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const props = withDefaults(defineProps<{ color?: string }>(), { color: '#a78bfa' });

const orbEl = ref<HTMLElement | null>(null);
const auraEl = ref<HTMLElement | null>(null);
let raf: number;
const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
const aura = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

function onMove(e: MouseEvent) {
  pos.x = e.clientX; pos.y = e.clientY;
  orbEl.value!.style.left = e.clientX + 'px';
  orbEl.value!.style.top = e.clientY + 'px';
}

function loop() {
  aura.x += (pos.x - aura.x) * 0.08;
  aura.y += (pos.y - aura.y) * 0.08;
  auraEl.value!.style.left = aura.x + 'px';
  auraEl.value!.style.top = aura.y + 'px';
  raf = requestAnimationFrame(loop);
}

function onEnter() {
  orbEl.value!.style.width = orbEl.value!.style.height = '28px';
  auraEl.value!.style.width = auraEl.value!.style.height = '90px';
}

function onLeave() {
  orbEl.value!.style.width = orbEl.value!.style.height = '20px';
  auraEl.value!.style.width = auraEl.value!.style.height = '60px';
}

onMounted(() => {
  document.body.style.cursor = 'none';
  document.addEventListener('mousemove', onMove);
  raf = requestAnimationFrame(loop);
  document.querySelectorAll<HTMLElement>('a, button, [data-cursor]').forEach(el => {
    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);
  });
});

onUnmounted(() => {
  document.body.style.cursor = '';
  document.removeEventListener('mousemove', onMove);
  cancelAnimationFrame(raf);
  document.querySelectorAll<HTMLElement>('a, button, [data-cursor]').forEach(el => {
    el.removeEventListener('mouseenter', onEnter);
    el.removeEventListener('mouseleave', onLeave);
  });
});
</script>

<style scoped>
.cursor-orb {
  position: fixed; width: 20px; height: 20px; border-radius: 50%;
  pointer-events: none; z-index: 99999; transform: translate(-50%,-50%);
  mix-blend-mode: screen; transition: width .3s, height .3s;
}
.cursor-aura {
  position: fixed; width: 60px; height: 60px; border-radius: 50%;
  pointer-events: none; z-index: 99998; transform: translate(-50%,-50%);
  filter: blur(12px); transition: width .4s, height .4s;
}
</style>`,

    init(wrap: HTMLElement) {
      wrap.innerHTML = `
        <div id="corb"  style="position:fixed;width:20px;height:20px;background:#a78bfa;border-radius:50%;pointer-events:none;z-index:99999;transform:translate(-50%,-50%);box-shadow:0 0 20px 6px rgba(167,139,250,0.4);mix-blend-mode:screen;transition:width .3s,height .3s"></div>
        <div id="caura" style="position:fixed;width:60px;height:60px;background:rgba(167,139,250,0.12);border-radius:50%;pointer-events:none;z-index:99998;transform:translate(-50%,-50%);filter:blur(12px);transition:width .4s,height .4s"></div>
      `;
      const orb  = document.getElementById('corb')  as HTMLElement;
      const aura = document.getElementById('caura') as HTMLElement;
      let ax = 0, ay = 0, mx = 0, my = 0;
      document.onmousemove = e => { mx = e.clientX; my = e.clientY; orb.style.left = mx + 'px'; orb.style.top = my + 'px'; };
      const lerp = () => { ax += (mx - ax) * .08; ay += (my - ay) * .08; aura.style.left = ax + 'px'; aura.style.top = ay + 'px'; requestAnimationFrame(lerp); };
      lerp();
      return {
        enter: () => { orb.style.width = '28px'; orb.style.height = '28px'; aura.style.width = '90px'; aura.style.height = '90px'; },
        leave: () => { orb.style.width = '20px'; orb.style.height = '20px'; aura.style.width = '60px'; aura.style.height = '60px'; },
      };
    },
  },

  // ─────────────────────────────────────────────
  // 3. MAGNETIC SNAP
  // ─────────────────────────────────────────────
  {
    id: 'magnetic',
    name: 'Magnetic Snap',
    desc: 'Cursor snaps and distorts toward interactive elements like a magnet. Ultra-premium feel.',
    tags: ['magnetic', 'interactive', 'luxury'],
    accent: '#ec4899',
    preview: '<div style="display:flex;align-items:center;gap:10px"><div class="prev-dot" style="background:#ec4899"></div><div style="width:28px;height:28px;border:1.5px solid rgba(236,72,153,0.6);border-radius:50%"></div></div>',

    css: `/* ── Magnetic Cursor ── */
body { cursor: none; }

#cursor-mag {
  position: fixed; width: 14px; height: 14px;
  background: #ec4899; border-radius: 50%;
  pointer-events: none; z-index: 99999;
  transform: translate(-50%, -50%);
  transition: width .3s, height .3s, background .3s, border .3s;
}`,

    html: `<!-- Paste before </body> -->
<div id="cursor-mag"></div>

<!-- Add data-magnetic to any element you want the cursor to snap toward -->
<button data-magnetic>Hover me</button>`,

    js: `// Magnetic Snap Cursor
// FIX: Use event delegation so dynamically added [data-magnetic] elements work too
const mag = document.getElementById('cursor-mag');
let cx = 0, cy = 0, tx = 0, ty = 0;

document.addEventListener('mousemove', e => {
  tx = e.clientX; ty = e.clientY;

  // Magnetic pull toward [data-magnetic] elements
  const el = e.target.closest('[data-magnetic]');
  if (el) {
    const r = el.getBoundingClientRect();
    const ox = e.clientX - (r.left + r.width  / 2);
    const oy = e.clientY - (r.top  + r.height / 2);
    el.style.transform = \`translate(\${ox * 0.3}px, \${oy * 0.3}px)\`;
    tx = r.left + r.width  / 2 + ox * 0.5;
    ty = r.top  + r.height / 2 + oy * 0.5;
  }
});

// Reset element position when leaving a magnetic element
document.addEventListener('mouseleave', e => {
  const el = e.target.closest?.('[data-magnetic]');
  if (el) el.style.transform = '';
}, true);

// Cursor expand on hover
document.addEventListener('mouseenter', e => {
  if (e.target.closest?.('[data-magnetic]')) {
    mag.style.width  = '40px';
    mag.style.height = '40px';
    mag.style.background = 'rgba(236,72,153,0.2)';
    mag.style.border = '2px solid #ec4899';
  }
}, true);
document.addEventListener('mouseleave', e => {
  if (e.target.closest?.('[data-magnetic]')) {
    mag.style.width  = '14px';
    mag.style.height = '14px';
    mag.style.background = '#ec4899';
    mag.style.border = 'none';
  }
}, true);

(function lerp() {
  cx += (tx - cx) * 0.15;
  cy += (ty - cy) * 0.15;
  mag.style.left = cx + 'px';
  mag.style.top  = cy + 'px';
  requestAnimationFrame(lerp);
})();`,

    react: `// MagneticCursor.jsx
// Usage: <MagneticCursor />
// Add data-magnetic to buttons/links to activate snap effect
import { useEffect, useRef } from 'react';

export function MagneticCursor() {
  const magRef = useRef(null);
  const cur = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    document.body.style.cursor = 'none';

    const onMove = e => {
      target.current = { x: e.clientX, y: e.clientY };

      const el = e.target.closest('[data-magnetic]');
      if (el) {
        const r = el.getBoundingClientRect();
        const ox = e.clientX - (r.left + r.width  / 2);
        const oy = e.clientY - (r.top  + r.height / 2);
        el.style.transform = \`translate(\${ox * 0.3}px, \${oy * 0.3}px)\`;
        target.current = { x: r.left + r.width / 2 + ox * 0.5, y: r.top + r.height / 2 + oy * 0.5 };
      }
    };

    const onEnter = e => {
      if (!e.target.closest?.('[data-magnetic]')) return;
      Object.assign(magRef.current.style, {
        width:'40px', height:'40px',
        background:'rgba(236,72,153,0.2)', border:'2px solid #ec4899',
      });
    };
    const onLeave = e => {
      const el = e.target.closest?.('[data-magnetic]');
      if (el) el.style.transform = '';
      if (!e.target.closest?.('[data-magnetic]')) return;
      Object.assign(magRef.current.style, {
        width:'14px', height:'14px',
        background:'#ec4899', border:'none',
      });
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseenter', onEnter, true);
    document.addEventListener('mouseleave', onLeave, true);

    let raf;
    const lerp = () => {
      cur.current.x += (target.current.x - cur.current.x) * 0.15;
      cur.current.y += (target.current.y - cur.current.y) * 0.15;
      magRef.current.style.left = cur.current.x + 'px';
      magRef.current.style.top  = cur.current.y + 'px';
      raf = requestAnimationFrame(lerp);
    };
    raf = requestAnimationFrame(lerp);

    return () => {
      document.body.style.cursor = '';
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseenter', onEnter, true);
      document.removeEventListener('mouseleave', onLeave, true);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={magRef} style={{
      position:'fixed', width:14, height:14,
      background:'#ec4899', borderRadius:'50%',
      pointerEvents:'none', zIndex:99999,
      transform:'translate(-50%,-50%)',
      transition:'width .3s, height .3s, background .3s, border .3s',
    }} />
  );
}`,

    vue: `<!-- MagneticCursor.vue -->
<!-- Usage: <MagneticCursor /> in your Vue 3 app -->
<!-- Add data-magnetic to buttons/links to activate snap effect -->
<template>
  <div ref="magEl" class="cursor-mag" :style="{ background: color }" />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const props = withDefaults(defineProps<{ color?: string }>(), { color: '#ec4899' });

const magEl = ref<HTMLElement | null>(null);
let raf: number;
const cur = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

function onMove(e: MouseEvent) {
  target.x = e.clientX; target.y = e.clientY;

  const el = (e.target as HTMLElement).closest('[data-magnetic]') as HTMLElement | null;
  if (el) {
    const r = el.getBoundingClientRect();
    const ox = e.clientX - (r.left + r.width / 2);
    const oy = e.clientY - (r.top + r.height / 2);
    el.style.transform = \`translate(\${ox * 0.3}px, \${oy * 0.3}px)\`;
    target.x = r.left + r.width / 2 + ox * 0.5;
    target.y = r.top + r.height / 2 + oy * 0.5;
  }
}

function loop() {
  cur.x += (target.x - cur.x) * 0.15;
  cur.y += (target.y - cur.y) * 0.15;
  magEl.value!.style.left = cur.x + 'px';
  magEl.value!.style.top = cur.y + 'px';
  raf = requestAnimationFrame(loop);
}

function onEnter(e: Event) {
  if (!(e.target as HTMLElement).closest?.('[data-magnetic]')) return;
  magEl.value!.style.width = '40px';
  magEl.value!.style.height = '40px';
  magEl.value!.style.background = 'rgba(236,72,153,0.2)';
  magEl.value!.style.border = '2px solid #ec4899';
}

function onLeave(e: Event) {
  const el = (e.target as HTMLElement).closest?.('[data-magnetic]') as HTMLElement | null;
  if (el) el.style.transform = '';
  if (!(e.target as HTMLElement).closest?.('[data-magnetic]')) return;
  magEl.value!.style.width = '14px';
  magEl.value!.style.height = '14px';
  magEl.value!.style.background = props.color;
  magEl.value!.style.border = 'none';
}

onMounted(() => {
  document.body.style.cursor = 'none';
  document.addEventListener('mousemove', onMove);
  document.addEventListener('mouseenter', onEnter, true);
  document.addEventListener('mouseleave', onLeave, true);
  raf = requestAnimationFrame(loop);
});

onUnmounted(() => {
  document.body.style.cursor = '';
  document.removeEventListener('mousemove', onMove);
  document.removeEventListener('mouseenter', onEnter, true);
  document.removeEventListener('mouseleave', onLeave, true);
  cancelAnimationFrame(raf);
});
</script>

<style scoped>
.cursor-mag {
  position: fixed; width: 14px; height: 14px; border-radius: 50%;
  pointer-events: none; z-index: 99999; transform: translate(-50%,-50%);
  transition: width .3s, height .3s, background .3s, border .3s;
}
</style>`,

    init(wrap: HTMLElement) {
      wrap.innerHTML = `<div id="cmag" style="position:fixed;width:14px;height:14px;background:#ec4899;border-radius:50%;pointer-events:none;z-index:99999;transform:translate(-50%,-50%);transition:width .3s,height .3s,background .3s"></div>`;
      const mag = document.getElementById('cmag') as HTMLElement;
      let cx = 0, cy = 0, tx = 0, ty = 0;
      document.onmousemove = e => {
        tx = e.clientX; ty = e.clientY;
        const el = (e.target as HTMLElement).closest?.('[data-magnetic]') as HTMLElement | null;
        if (el) {
          const r = el.getBoundingClientRect();
          const ox = e.clientX - (r.left + r.width / 2);
          const oy = e.clientY - (r.top + r.height / 2);
          el.style.transform = `translate(${ox * 0.3}px, ${oy * 0.3}px)`;
          tx = r.left + r.width / 2 + ox * 0.5;
          ty = r.top + r.height / 2 + oy * 0.5;
        }
      };
      const lerp = () => { cx += (tx - cx) * .15; cy += (ty - cy) * .15; mag.style.left = cx + 'px'; mag.style.top = cy + 'px'; requestAnimationFrame(lerp); };
      lerp();
      return {
        enter: () => { mag.style.width = '40px'; mag.style.height = '40px'; mag.style.background = 'rgba(236,72,153,0.2)'; mag.style.border = '2px solid #ec4899'; },
        leave: () => { mag.style.width = '14px'; mag.style.height = '14px'; mag.style.background = '#ec4899'; mag.style.border = 'none'; },
      };
    },
  },

  // ─────────────────────────────────────────────
  // 4. CROSSHAIR
  // ─────────────────────────────────────────────
  {
    id: 'crosshair',
    name: 'Crosshair',
    desc: 'Precision crosshair cursor with animated targeting lines. Great for portfolio sites and games.',
    tags: ['gaming', 'bold', 'animated'],
    accent: '#34d399',
    preview: '<div class="prev-cross"></div>',

    css: `/* ── Crosshair Cursor ── */
body { cursor: none; }

#cursor-cross { position: fixed; pointer-events: none; z-index: 99999; transform: translate(-50%, -50%); }

.cross-h, .cross-v {
  position: absolute; background: #34d399;
  border-radius: 2px; transition: width .2s, height .2s;
}
.cross-h { width: 28px; height: 2px; top: 50%; left: 50%; transform: translate(-50%, -50%); }
.cross-v { width: 2px; height: 28px; top: 50%; left: 50%; transform: translate(-50%, -50%); }
.cross-center {
  position: absolute; width: 5px; height: 5px;
  background: #34d399; border-radius: 50%;
  top: 50%; left: 50%; transform: translate(-50%, -50%);
}`,

    html: `<!-- Paste before </body> -->
<div id="cursor-cross">
  <div class="cross-h"></div>
  <div class="cross-v"></div>
  <div class="cross-center"></div>
</div>`,

    js: `// Crosshair Cursor
const cross = document.getElementById('cursor-cross');
const crossH = cross.querySelector('.cross-h');
const crossV = cross.querySelector('.cross-v');

document.addEventListener('mousemove', e => {
  cross.style.left = e.clientX + 'px';
  cross.style.top  = e.clientY + 'px';
});

// Expand on hover
document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
  el.addEventListener('mouseenter', () => { crossH.style.width = '44px'; crossV.style.height = '44px'; });
  el.addEventListener('mouseleave', () => { crossH.style.width = '28px'; crossV.style.height = '28px'; });
});`,

    react: `// CrosshairCursor.jsx
// Usage: <CrosshairCursor />
import { useEffect, useRef } from 'react';

export function CrosshairCursor({ color = '#34d399', size = 28 }) {
  const crossRef = useRef(null);
  const hRef = useRef(null);
  const vRef = useRef(null);

  useEffect(() => {
    document.body.style.cursor = 'none';

    const move = e => {
      crossRef.current.style.left = e.clientX + 'px';
      crossRef.current.style.top  = e.clientY + 'px';
    };
    document.addEventListener('mousemove', move);

    const enter = () => { hRef.current.style.width = (size * 1.57) + 'px'; vRef.current.style.height = (size * 1.57) + 'px'; };
    const leave = () => { hRef.current.style.width = size + 'px'; vRef.current.style.height = size + 'px'; };
    const els = document.querySelectorAll('a, button, [data-cursor]');
    els.forEach(el => { el.addEventListener('mouseenter', enter); el.addEventListener('mouseleave', leave); });

    return () => {
      document.body.style.cursor = '';
      document.removeEventListener('mousemove', move);
      els.forEach(el => { el.removeEventListener('mouseenter', enter); el.removeEventListener('mouseleave', leave); });
    };
  }, [color, size]);

  const line = { position:'absolute', background:color, borderRadius:2, transition:'width .2s, height .2s' };

  return (
    <div ref={crossRef} style={{ position:'fixed', pointerEvents:'none', zIndex:99999, transform:'translate(-50%,-50%)' }}>
      <div ref={hRef} style={{ ...line, width:size, height:2, top:'50%', left:'50%', transform:'translate(-50%,-50%)' }} />
      <div ref={vRef} style={{ ...line, width:2, height:size, top:'50%', left:'50%', transform:'translate(-50%,-50%)' }} />
      <div style={{ position:'absolute', width:5, height:5, background:color, borderRadius:'50%', top:'50%', left:'50%', transform:'translate(-50%,-50%)' }} />
    </div>
  );
}`,

    vue: `<!-- CrosshairCursor.vue -->
<!-- Usage: <CrosshairCursor /> in your Vue 3 app -->
<template>
  <div ref="crossEl" class="cursor-cross">
    <div ref="hEl" class="cross-h" :style="{ background: color }" />
    <div ref="vEl" class="cross-v" :style="{ background: color }" />
    <div class="cross-center" :style="{ background: color }" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const props = withDefaults(defineProps<{ color?: string; size?: number }>(), { 
  color: '#34d399',
  size: 28
});

const crossEl = ref<HTMLElement | null>(null);
const hEl = ref<HTMLElement | null>(null);
const vEl = ref<HTMLElement | null>(null);

function onMove(e: MouseEvent) {
  crossEl.value!.style.left = e.clientX + 'px';
  crossEl.value!.style.top = e.clientY + 'px';
}

function onEnter() {
  hEl.value!.style.width = (props.size * 1.57) + 'px';
  vEl.value!.style.height = (props.size * 1.57) + 'px';
}

function onLeave() {
  hEl.value!.style.width = props.size + 'px';
  vEl.value!.style.height = props.size + 'px';
}

onMounted(() => {
  document.body.style.cursor = 'none';
  document.addEventListener('mousemove', onMove);
  document.querySelectorAll<HTMLElement>('a, button, [data-cursor]').forEach(el => {
    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);
  });
});

onUnmounted(() => {
  document.body.style.cursor = '';
  document.removeEventListener('mousemove', onMove);
  document.querySelectorAll<HTMLElement>('a, button, [data-cursor]').forEach(el => {
    el.removeEventListener('mouseenter', onEnter);
    el.removeEventListener('mouseleave', onLeave);
  });
});
</script>

<style scoped>
.cursor-cross {
  position: fixed; pointer-events: none; z-index: 99999;
  transform: translate(-50%,-50%);
}
.cross-h, .cross-v {
  position: absolute; border-radius: 2px;
  transition: width .2s, height .2s;
}
.cross-h {
  width: 28px; height: 2px; top: 50%; left: 50%;
  transform: translate(-50%,-50%);
}
.cross-v {
  width: 2px; height: 28px; top: 50%; left: 50%;
  transform: translate(-50%,-50%);
}
.cross-center {
  position: absolute; width: 5px; height: 5px; border-radius: 50%;
  top: 50%; left: 50%; transform: translate(-50%,-50%);
}
</style>`,

    init(wrap: HTMLElement) {
      wrap.innerHTML = `
        <div id="ccross" style="position:fixed;pointer-events:none;z-index:99999;transform:translate(-50%,-50%)">
          <div id="cch" style="position:absolute;width:28px;height:2px;background:#34d399;border-radius:2px;top:50%;left:50%;transform:translate(-50%,-50%);transition:width .2s"></div>
          <div id="ccv" style="position:absolute;width:2px;height:28px;background:#34d399;border-radius:2px;top:50%;left:50%;transform:translate(-50%,-50%);transition:height .2s"></div>
          <div style="position:absolute;width:5px;height:5px;background:#34d399;border-radius:50%;top:50%;left:50%;transform:translate(-50%,-50%)"></div>
        </div>
      `;
      const cross = document.getElementById('ccross') as HTMLElement;
      document.onmousemove = e => { cross.style.left = e.clientX + 'px'; cross.style.top = e.clientY + 'px'; };
      return {
        enter: () => { (document.getElementById('cch') as HTMLElement).style.width = '44px'; (document.getElementById('ccv') as HTMLElement).style.height = '44px'; },
        leave: () => { (document.getElementById('cch') as HTMLElement).style.width = '28px'; (document.getElementById('ccv') as HTMLElement).style.height = '28px'; },
      };
    },
  },

  // ─────────────────────────────────────────────
  // 5. PARTICLE TRAIL
  // ─────────────────────────────────────────────
  {
    id: 'trail',
    name: 'Particle Trail',
    desc: 'Leaves a trail of fading particles as you move. Magical and playful feel.',
    tags: ['particles', 'trail', 'playful'],
    accent: '#fbbf24',
    preview: '<div class="prev-trail"><span style="width:10px;height:10px;opacity:1;background:#fbbf24"></span><span style="width:8px;height:8px;opacity:0.7;background:#fbbf24"></span><span style="width:6px;height:6px;opacity:0.4;background:#fbbf24"></span><span style="width:4px;height:4px;opacity:0.15;background:#fbbf24"></span></div>',

    css: `/* ── Particle Trail Cursor ── */
body { cursor: none; }

.trail-dot {
  position: fixed; border-radius: 50%;
  pointer-events: none; z-index: 99999;
  transform: translate(-50%, -50%);
  background: #fbbf24;
}`,

    html: `<!-- JS generates particles dynamically — no extra HTML needed -->`,

    js: `// Particle Trail Cursor
const TRAIL = 12;
const dots  = [];
// FIX: initialise positions to screen centre so particles don't flash at (0,0)
const cx = window.innerWidth  / 2;
const cy = window.innerHeight / 2;
const pos = Array.from({ length: TRAIL }, () => ({ x: cx, y: cy }));

for (let i = 0; i < TRAIL; i++) {
  const d = document.createElement('div');
  d.className = 'trail-dot';
  const s = Math.max(3, 12 - i);
  d.style.width   = s + 'px';
  d.style.height  = s + 'px';
  d.style.opacity = (1 - i / TRAIL).toFixed(2);
  document.body.appendChild(d);
  dots.push(d);
}

document.addEventListener('mousemove', e => { pos[0] = { x: e.clientX, y: e.clientY }; });

(function loop() {
  for (let i = TRAIL - 1; i > 0; i--) {
    pos[i].x += (pos[i - 1].x - pos[i].x) * 0.35;
    pos[i].y += (pos[i - 1].y - pos[i].y) * 0.35;
    dots[i].style.left = pos[i].x + 'px';
    dots[i].style.top  = pos[i].y + 'px';
  }
  dots[0].style.left = pos[0].x + 'px';
  dots[0].style.top  = pos[0].y + 'px';
  requestAnimationFrame(loop);
})();`,

    react: `// TrailCursor.jsx
// Usage: <TrailCursor />
import { useEffect } from 'react';

export function TrailCursor({ color = '#fbbf24', count = 12 }) {
  useEffect(() => {
    document.body.style.cursor = 'none';

    const cx = window.innerWidth  / 2;
    const cy = window.innerHeight / 2;
    // FIX: initialise at screen centre to avoid (0,0) flash
    const pos  = Array.from({ length: count }, () => ({ x: cx, y: cy }));
    const dots = [];

    for (let i = 0; i < count; i++) {
      const d = document.createElement('div');
      const s = Math.max(3, 12 - i);
      d.style.cssText = [
        'position:fixed', 'border-radius:50%', 'pointer-events:none',
        'z-index:99999', 'transform:translate(-50%,-50%)',
        \`width:\${s}px\`, \`height:\${s}px\`,
        \`background:\${color}\`,
        \`opacity:\${(1 - i / count).toFixed(2)}\`,
      ].join(';');
      document.body.appendChild(d);
      dots.push(d);
    }

    const move = e => { pos[0] = { x: e.clientX, y: e.clientY }; };
    document.addEventListener('mousemove', move);

    let raf;
    const loop = () => {
      for (let i = count - 1; i > 0; i--) {
        pos[i].x += (pos[i - 1].x - pos[i].x) * 0.35;
        pos[i].y += (pos[i - 1].y - pos[i].y) * 0.35;
        dots[i].style.left = pos[i].x + 'px';
        dots[i].style.top  = pos[i].y + 'px';
      }
      dots[0].style.left = pos[0].x + 'px';
      dots[0].style.top  = pos[0].y + 'px';
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      document.body.style.cursor = '';
      document.removeEventListener('mousemove', move);
      cancelAnimationFrame(raf);
      dots.forEach(d => d.remove()); // clean up injected DOM nodes
    };
  }, [color, count]);

  return null; // this component injects DOM nodes directly
}`,

    vue: `<!-- TrailCursor.vue -->
<!-- Usage: <TrailCursor /> in your Vue 3 app -->
<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';

const props = withDefaults(defineProps<{ color?: string; count?: number }>(), {
  color: '#fbbf24',
  count: 12
});

onMounted(() => {
  document.body.style.cursor = 'none';

  const cx = window.innerWidth / 2;
  const cy = window.innerHeight / 2;
  const pos = Array.from({ length: props.count }, () => ({ x: cx, y: cy }));
  const dots: HTMLElement[] = [];

  for (let i = 0; i < props.count; i++) {
    const d = document.createElement('div');
    const s = Math.max(3, 12 - i);
    d.style.cssText = [
      'position:fixed', 'border-radius:50%', 'pointer-events:none',
      'z-index:99999', 'transform:translate(-50%,-50%)',
      \`width:\${s}px\`, \`height:\${s}px\`,
      \`background:\${props.color}\`,
      \`opacity:\${(1 - i / props.count).toFixed(2)}\`,
    ].join(';');
    document.body.appendChild(d);
    dots.push(d);
  }

  const onMove = (e: MouseEvent) => { pos[0] = { x: e.clientX, y: e.clientY }; };
  document.addEventListener('mousemove', onMove);

  let raf: number;
  const loop = () => {
    for (let i = props.count - 1; i > 0; i--) {
      pos[i].x += (pos[i - 1].x - pos[i].x) * 0.35;
      pos[i].y += (pos[i - 1].y - pos[i].y) * 0.35;
      dots[i].style.left = pos[i].x + 'px';
      dots[i].style.top = pos[i].y + 'px';
    }
    dots[0].style.left = pos[0].x + 'px';
    dots[0].style.top = pos[0].y + 'px';
    raf = requestAnimationFrame(loop);
  };
  raf = requestAnimationFrame(loop);

  onUnmounted(() => {
    document.body.style.cursor = '';
    document.removeEventListener('mousemove', onMove);
    cancelAnimationFrame(raf);
    dots.forEach(d => d.remove());
  });
});
</script>

<template>
  <!-- This component injects DOM nodes directly -->
</template>`,

    init(wrap: HTMLElement) {
      wrap.innerHTML = '';
      const N    = 12;
      const dots: HTMLElement[] = [];
      const cx   = window.innerWidth  / 2;
      const cy   = window.innerHeight / 2;
      const pos  = Array.from({ length: N }, () => ({ x: cx, y: cy }));

      for (let i = 0; i < N; i++) {
        const d = document.createElement('div');
        const s = Math.max(3, 12 - i);
        d.style.cssText = `position:fixed;width:${s}px;height:${s}px;border-radius:50%;background:#fbbf24;pointer-events:none;z-index:99999;transform:translate(-50%,-50%);opacity:${(1 - i / N).toFixed(2)}`;
        wrap.appendChild(d);
        dots.push(d);
      }
      document.onmousemove = e => { pos[0] = { x: e.clientX, y: e.clientY }; };
      const loop = () => {
        for (let i = N - 1; i > 0; i--) { pos[i].x += (pos[i - 1].x - pos[i].x) * .35; pos[i].y += (pos[i - 1].y - pos[i].y) * .35; dots[i].style.left = pos[i].x + 'px'; dots[i].style.top = pos[i].y + 'px'; }
        dots[0].style.left = pos[0].x + 'px'; dots[0].style.top = pos[0].y + 'px';
        requestAnimationFrame(loop);
      };
      loop();
      return { enter: () => {}, leave: () => {} };
    },
  },

  // ─────────────────────────────────────────────
  // 6. MORPHING BLOB
  // ─────────────────────────────────────────────
  {
    id: 'morph',
    name: 'Morphing Blob',
    desc: 'Organic blob that morphs its shape smoothly as you move. Biomorphic and mesmerizing.',
    tags: ['organic', 'animated', 'unique'],
    accent: '#f97316',
    preview: '<div class="prev-morph" style="background:#f97316"></div>',

    css: `/* ── Morphing Blob Cursor ── */
/* NOTE: mix-blend-mode:difference inverts colors beneath it — works best on non-white backgrounds */
body { cursor: none; }

#cursor-blob {
  position: fixed; width: 22px; height: 22px;
  background: #f97316; pointer-events: none; z-index: 99999;
  transform: translate(-50%, -50%);
  animation: blobMorph 2.5s ease-in-out infinite;
  mix-blend-mode: difference;
  transition: width .3s, height .3s;
}

@keyframes blobMorph {
  0%,100% { border-radius: 50%; }
  25%  { border-radius: 60% 40% 55% 45% / 55% 45% 60% 40%; }
  50%  { border-radius: 40% 60% 45% 55% / 45% 55% 40% 60%; }
  75%  { border-radius: 55% 45% 40% 60% / 60% 40% 55% 45%; }
}`,

    html: `<!-- Paste before </body> -->
<div id="cursor-blob"></div>`,

    js: `// Morphing Blob Cursor
const blob = document.getElementById('cursor-blob');
let bx = 0, by = 0, mx = 0, my = 0;

document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

(function lerp() {
  bx += (mx - bx) * 0.1;
  by += (my - by) * 0.1;
  blob.style.left = bx + 'px';
  blob.style.top  = by + 'px';
  requestAnimationFrame(lerp);
})();

// Expand on hover
document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
  el.addEventListener('mouseenter', () => { blob.style.width = '36px'; blob.style.height = '36px'; });
  el.addEventListener('mouseleave', () => { blob.style.width = '22px'; blob.style.height = '22px'; });
});`,

    react: `// MorphBlobCursor.jsx
// Usage: <MorphBlobCursor />
// NOTE: mix-blend-mode:difference works best on non-white backgrounds
import { useEffect, useRef } from 'react';

const KEYFRAMES = \`
@keyframes blobMorph {
  0%,100% { border-radius: 50%; }
  25%  { border-radius: 60% 40% 55% 45% / 55% 45% 60% 40%; }
  50%  { border-radius: 40% 60% 45% 55% / 45% 55% 40% 60%; }
  75%  { border-radius: 55% 45% 40% 60% / 60% 40% 55% 45%; }
}
\`;

export function MorphBlobCursor({ color = '#f97316' }) {
  const blobRef = useRef(null);
  const pos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const cur = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

  useEffect(() => {
    document.body.style.cursor = 'none';

    // Inject keyframes once
    const style = document.createElement('style');
    style.textContent = KEYFRAMES;
    document.head.appendChild(style);

    const move = e => { pos.current = { x: e.clientX, y: e.clientY }; };
    document.addEventListener('mousemove', move);

    const enter = () => { blobRef.current.style.width = '36px'; blobRef.current.style.height = '36px'; };
    const leave = () => { blobRef.current.style.width = '22px'; blobRef.current.style.height = '22px'; };
    const els = document.querySelectorAll('a, button, [data-cursor]');
    els.forEach(el => { el.addEventListener('mouseenter', enter); el.addEventListener('mouseleave', leave); });

    let raf;
    const lerp = () => {
      cur.current.x += (pos.current.x - cur.current.x) * 0.1;
      cur.current.y += (pos.current.y - cur.current.y) * 0.1;
      blobRef.current.style.left = cur.current.x + 'px';
      blobRef.current.style.top  = cur.current.y + 'px';
      raf = requestAnimationFrame(lerp);
    };
    raf = requestAnimationFrame(lerp);

    return () => {
      document.body.style.cursor = '';
      document.removeEventListener('mousemove', move);
      cancelAnimationFrame(raf);
      style.remove();
      els.forEach(el => { el.removeEventListener('mouseenter', enter); el.removeEventListener('mouseleave', leave); });
    };
  }, []);

  return (
    <div ref={blobRef} style={{
      position:'fixed', width:22, height:22,
      background: color, pointerEvents:'none',
      zIndex:99999, transform:'translate(-50%,-50%)',
      animation:'blobMorph 2.5s ease-in-out infinite',
      mixBlendMode:'difference',
      transition:'width .3s, height .3s',
    }} />
  );
}`,

    vue: `<!-- MorphBlobCursor.vue -->
<!-- Usage: <MorphBlobCursor /> in your Vue 3 app -->
<!-- NOTE: mix-blend-mode:difference works best on non-white backgrounds -->
<template>
  <div ref="blobEl" class="cursor-blob" :style="{ background: color }" />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const props = withDefaults(defineProps<{ color?: string }>(), { color: '#f97316' });

const blobEl = ref<HTMLElement | null>(null);
let raf: number;
const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
const cur = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

function onMove(e: MouseEvent) {
  pos.x = e.clientX; pos.y = e.clientY;
}

function loop() {
  cur.x += (pos.x - cur.x) * 0.1;
  cur.y += (pos.y - cur.y) * 0.1;
  blobEl.value!.style.left = cur.x + 'px';
  blobEl.value!.style.top = cur.y + 'px';
  raf = requestAnimationFrame(loop);
}

function onEnter() {
  blobEl.value!.style.width = '36px';
  blobEl.value!.style.height = '36px';
}

function onLeave() {
  blobEl.value!.style.width = '22px';
  blobEl.value!.style.height = '22px';
}

onMounted(() => {
  document.body.style.cursor = 'none';
  document.addEventListener('mousemove', onMove);
  raf = requestAnimationFrame(loop);
  document.querySelectorAll<HTMLElement>('a, button, [data-cursor]').forEach(el => {
    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);
  });
});

onUnmounted(() => {
  document.body.style.cursor = '';
  document.removeEventListener('mousemove', onMove);
  cancelAnimationFrame(raf);
  document.querySelectorAll<HTMLElement>('a, button, [data-cursor]').forEach(el => {
    el.removeEventListener('mouseenter', onEnter);
    el.removeEventListener('mouseleave', onLeave);
  });
});
</script>

<style scoped>
.cursor-blob {
  position: fixed; width: 22px; height: 22px; pointer-events: none;
  z-index: 99999; transform: translate(-50%,-50%);
  animation: blobMorph 2.5s ease-in-out infinite;
  mix-blend-mode: difference; transition: width .3s, height .3s;
}

@keyframes blobMorph {
  0%,100% { border-radius: 50%; }
  25%  { border-radius: 60% 40% 55% 45% / 55% 45% 60% 40%; }
  50%  { border-radius: 40% 60% 45% 55% / 45% 55% 40% 60%; }
  75%  { border-radius: 55% 45% 40% 60% / 60% 40% 55% 45%; }
}
</style>`,

    init(wrap: HTMLElement) {
      wrap.innerHTML = `
        <div id="cblob" style="position:fixed;width:22px;height:22px;background:#f97316;pointer-events:none;z-index:99999;transform:translate(-50%,-50%);animation:blobMorph 2.5s ease-in-out infinite;mix-blend-mode:difference;transition:width .3s,height .3s"></div>
        <style>@keyframes blobMorph{0%,100%{border-radius:50%}25%{border-radius:60% 40% 55% 45%/55% 45% 60% 40%}50%{border-radius:40% 60% 45% 55%/45% 55% 40% 60%}75%{border-radius:55% 45% 40% 60%/60% 40% 55% 45%}}</style>
      `;
      const blob = document.getElementById('cblob') as HTMLElement;
      let bx = 0, by = 0, mx = 0, my = 0;
      document.onmousemove = e => { mx = e.clientX; my = e.clientY; };
      const lerp = () => { bx += (mx - bx) * .1; by += (my - by) * .1; blob.style.left = bx + 'px'; blob.style.top = by + 'px'; requestAnimationFrame(lerp); };
      lerp();
      return {
        enter: () => { blob.style.width = '36px'; blob.style.height = '36px'; },
        leave: () => { blob.style.width = '22px'; blob.style.height = '22px'; },
      };
    },
  },

  // ─────────────────────────────────────────────
  // 7. SPOTLIGHT
  // ─────────────────────────────────────────────
  {
    id: 'spotlight',
    name: 'Spotlight',
    desc: 'Radial light spotlight follows your cursor, revealing the page beneath like a torch.',
    tags: ['dark', 'dramatic', 'reveal'],
    accent: '#22d3ee',
    preview: '<div style="width:40px;height:40px;border-radius:50%;background:radial-gradient(circle,rgba(34,211,238,0.8),transparent)"></div>',

    css: `/* ── Spotlight Cursor ── */
body { cursor: none; }

#cursor-spot {
  position: fixed; width: 180px; height: 180px;
  background: radial-gradient(circle, rgba(229,231,235,0.12) 0%, transparent 70%);
  border-radius: 50%; pointer-events: none; z-index: 99990;
  transform: translate(-50%, -50%);
  transition: width .4s, height .4s;
}
#cursor-spot-core {
  position: fixed; width: 8px; height: 8px;
  background: rgba(229,231,235,0.9); border-radius: 50%;
  pointer-events: none; z-index: 99999;
  transform: translate(-50%, -50%);
}`,

    html: `<!-- Paste before </body> -->
<div id="cursor-spot"></div>
<div id="cursor-spot-core"></div>`,

    js: `// Spotlight Cursor
const spot = document.getElementById('cursor-spot');
const core = document.getElementById('cursor-spot-core');

document.addEventListener('mousemove', e => {
  spot.style.left = e.clientX + 'px'; spot.style.top = e.clientY + 'px';
  core.style.left = e.clientX + 'px'; core.style.top = e.clientY + 'px';
});

// Expand spotlight on hover
document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
  el.addEventListener('mouseenter', () => { spot.style.width = '300px'; spot.style.height = '300px'; });
  el.addEventListener('mouseleave', () => { spot.style.width = '180px'; spot.style.height = '180px'; });
});`,

    react: `// SpotlightCursor.jsx
// Usage: <SpotlightCursor /> — best on dark backgrounds
import { useEffect, useRef } from 'react';

export function SpotlightCursor() {
  const spotRef = useRef(null);
  const coreRef = useRef(null);

  useEffect(() => {
    document.body.style.cursor = 'none';

    const move = e => {
      spotRef.current.style.left = e.clientX + 'px'; spotRef.current.style.top = e.clientY + 'px';
      coreRef.current.style.left = e.clientX + 'px'; coreRef.current.style.top = e.clientY + 'px';
    };
    document.addEventListener('mousemove', move);

    const enter = () => { spotRef.current.style.width = '300px'; spotRef.current.style.height = '300px'; };
    const leave = () => { spotRef.current.style.width = '180px'; spotRef.current.style.height = '180px'; };
    const els = document.querySelectorAll('a, button, [data-cursor]');
    els.forEach(el => { el.addEventListener('mouseenter', enter); el.addEventListener('mouseleave', leave); });

    return () => {
      document.body.style.cursor = '';
      document.removeEventListener('mousemove', move);
      els.forEach(el => { el.removeEventListener('mouseenter', enter); el.removeEventListener('mouseleave', leave); });
    };
  }, []);

  return (
    <>
      <div ref={spotRef} style={{
        position:'fixed', width:180, height:180,
        background:'radial-gradient(circle, rgba(229,231,235,0.12) 0%, transparent 70%)',
        borderRadius:'50%', pointerEvents:'none',
        zIndex:99990, transform:'translate(-50%,-50%)',
        transition:'width .4s, height .4s',
      }} />
      <div ref={coreRef} style={{
        position:'fixed', width:8, height:8,
        background:'rgba(229,231,235,0.9)', borderRadius:'50%',
        pointerEvents:'none', zIndex:99999,
        transform:'translate(-50%,-50%)',
      }} />
    </>
  );
}`,

    vue: `<!-- SpotlightCursor.vue -->
<!-- Usage: <SpotlightCursor /> in your Vue 3 app -->
<!-- Best on dark backgrounds -->
<template>
  <div ref="spotEl" class="cursor-spot" />
  <div ref="coreEl" class="cursor-core" />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const spotEl = ref<HTMLElement | null>(null);
const coreEl = ref<HTMLElement | null>(null);

function onMove(e: MouseEvent) {
  spotEl.value!.style.left = e.clientX + 'px';
  spotEl.value!.style.top = e.clientY + 'px';
  coreEl.value!.style.left = e.clientX + 'px';
  coreEl.value!.style.top = e.clientY + 'px';
}

function onEnter() {
  spotEl.value!.style.width = '300px';
  spotEl.value!.style.height = '300px';
}

function onLeave() {
  spotEl.value!.style.width = '180px';
  spotEl.value!.style.height = '180px';
}

onMounted(() => {
  document.body.style.cursor = 'none';
  document.addEventListener('mousemove', onMove);
  document.querySelectorAll<HTMLElement>('a, button, [data-cursor]').forEach(el => {
    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);
  });
});

onUnmounted(() => {
  document.body.style.cursor = '';
  document.removeEventListener('mousemove', onMove);
  document.querySelectorAll<HTMLElement>('a, button, [data-cursor]').forEach(el => {
    el.removeEventListener('mouseenter', onEnter);
    el.removeEventListener('mouseleave', onLeave);
  });
});
</script>

<style scoped>
.cursor-spot {
  position: fixed; width: 180px; height: 180px;
  background: radial-gradient(circle, rgba(229,231,235,0.12) 0%, transparent 70%);
  border-radius: 50%; pointer-events: none; z-index: 99990;
  transform: translate(-50%,-50%); transition: width .4s, height .4s;
}
.cursor-core {
  position: fixed; width: 8px; height: 8px;
  background: rgba(229,231,235,0.9); border-radius: 50%;
  pointer-events: none; z-index: 99999; transform: translate(-50%,-50%);
}
</style>`,

    init(wrap: HTMLElement) {
      wrap.innerHTML = `
        <div id="cspot" style="position:fixed;width:200px;height:200px;background:radial-gradient(circle,rgba(229,231,235,0.1) 0%,transparent 70%);border-radius:50%;pointer-events:none;z-index:99990;transform:translate(-50%,-50%);transition:width .4s,height .4s"></div>
        <div id="ccore" style="position:fixed;width:8px;height:8px;background:rgba(229,231,235,0.9);border-radius:50%;pointer-events:none;z-index:99999;transform:translate(-50%,-50%)"></div>
      `;
      const spot = document.getElementById('cspot') as HTMLElement;
      const core = document.getElementById('ccore') as HTMLElement;
      document.onmousemove = e => { spot.style.left = e.clientX + 'px'; spot.style.top = e.clientY + 'px'; core.style.left = e.clientX + 'px'; core.style.top = e.clientY + 'px'; };
      return {
        enter: () => { spot.style.width = '300px'; spot.style.height = '300px'; },
        leave: () => { spot.style.width = '200px'; spot.style.height = '200px'; },
      };
    },
  },

  // ─────────────────────────────────────────────
  // 8. WATER RIPPLE
  // ─────────────────────────────────────────────
  {
    id: 'ripple',
    name: 'Water Ripple',
    desc: 'Creates expanding water ripple rings on mouse move and click. Mesmerizing liquid feel.',
    tags: ['water', 'canvas', 'click'],
    accent: '#14b8a6',
    preview: '<div style="position:relative;width:44px;height:44px;display:flex;align-items:center;justify-content:center"><div style="position:absolute;width:10px;height:10px;background:#14b8a6;border-radius:50%"></div><div style="position:absolute;width:28px;height:28px;border:1.5px solid rgba(20,184,166,0.5);border-radius:50%"></div><div style="position:absolute;width:44px;height:44px;border:1px solid rgba(20,184,166,0.2);border-radius:50%"></div></div>',

    css: `/* ── Water Ripple — canvas overlay ── */
body { cursor: none; }

#ripple-canvas { position: fixed; inset: 0; pointer-events: none; z-index: 99990; }
#cursor-rip { position: fixed; width: 10px; height: 10px; background: #14b8a6; border-radius: 50%; pointer-events: none; z-index: 99999; transform: translate(-50%,-50%); transition: width .2s, height .2s; }`,

    html: `<!-- Paste before </body> -->
<canvas id="ripple-canvas"></canvas>
<div id="cursor-rip"></div>`,

    js: `// Water Ripple Cursor
const canvas = document.getElementById('ripple-canvas');
const ctx    = canvas.getContext('2d');
const cur    = document.getElementById('cursor-rip');
const MAX_R  = 80;
let W, H, ripples = [];

const resize = () => { W = canvas.width = innerWidth; H = canvas.height = innerHeight; };
resize();
window.addEventListener('resize', resize);

class Ripple {
  constructor(x, y) { this.x = x; this.y = y; this.r = 0; this.life = 1; }
  update() {
    if (this.r < MAX_R) { this.r += 2.5; this.life -= 0.028; }
    else                { this.life -= 0.05; }
  }
  draw() {
    if (this.life <= 0) return;
    ctx.save();
    ctx.globalAlpha = this.life * 0.6;
    ctx.strokeStyle = '#14b8a6';
    ctx.lineWidth   = 1.8;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }
}

let lx = 0, ly = 0, lt = 0;

document.addEventListener('mousemove', e => {
  cur.style.left = e.clientX + 'px';
  cur.style.top  = e.clientY + 'px';
  if (Date.now() - lt > 100 && (Math.abs(e.clientX - lx) + Math.abs(e.clientY - ly)) > 10) {
    ripples.push(new Ripple(e.clientX, e.clientY));
    lx = e.clientX; ly = e.clientY; lt = Date.now();
  }
});

// FIX: store reference so it can be removed if cursor is torn down
const clickHandler = e => {
  ripples.push(new Ripple(e.clientX + Math.random() * 6 - 3, e.clientY + Math.random() * 6 - 3));
  ripples.push(new Ripple(e.clientX + Math.random() * 6 - 3, e.clientY + Math.random() * 6 - 3));
};
document.addEventListener('click', clickHandler);

(function loop() {
  ctx.clearRect(0, 0, W, H);
  ripples = ripples.filter(r => r.life > 0);
  ripples.forEach(r => { r.update(); r.draw(); });
  requestAnimationFrame(loop);
})();`,

    react: `// RippleCursor.jsx
// Usage: <RippleCursor />
import { useEffect, useRef } from 'react';

export function RippleCursor({ color = '#14b8a6' }) {
  const canvasRef = useRef(null);
  const dotRef    = useRef(null);

  useEffect(() => {
    document.body.style.cursor = 'none';

    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d');
    const MAX_R  = 80;
    let W, H;
    let ripples  = [];

    const resize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    class Ripple {
      constructor(x, y) { this.x = x; this.y = y; this.r = 0; this.life = 1; }
      update() {
        if (this.r < MAX_R) { this.r += 2.5; this.life -= 0.028; }
        else                { this.life -= 0.05; }
      }
      draw() {
        if (this.life <= 0) return;
        ctx.save();
        ctx.globalAlpha = this.life * 0.6;
        ctx.strokeStyle = color;
        ctx.lineWidth   = 1.8;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }
    }

    let lx = 0, ly = 0, lt = 0;
    const move = e => {
      dotRef.current.style.left = e.clientX + 'px';
      dotRef.current.style.top  = e.clientY + 'px';
      if (Date.now() - lt > 100 && (Math.abs(e.clientX - lx) + Math.abs(e.clientY - ly)) > 10) {
        ripples.push(new Ripple(e.clientX, e.clientY));
        lx = e.clientX; ly = e.clientY; lt = Date.now();
      }
    };

    // FIX: named reference so listener can be cleaned up properly
    const click = e => {
      ripples.push(new Ripple(e.clientX + Math.random() * 6 - 3, e.clientY + Math.random() * 6 - 3));
      ripples.push(new Ripple(e.clientX + Math.random() * 6 - 3, e.clientY + Math.random() * 6 - 3));
    };

    document.addEventListener('mousemove', move);
    document.addEventListener('click', click);

    let raf;
    const loop = () => {
      ctx.clearRect(0, 0, W, H);
      ripples = ripples.filter(r => r.life > 0);
      ripples.forEach(r => { r.update(); r.draw(); });
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      document.body.style.cursor = '';
      document.removeEventListener('mousemove', move);
      document.removeEventListener('click', click);  // FIX: clean up click listener
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(raf);
    };
  }, [color]);

  return (
    <>
      <canvas ref={canvasRef} style={{ position:'fixed', inset:0, pointerEvents:'none', zIndex:99990 }} />
      <div ref={dotRef} style={{
        position:'fixed', width:10, height:10,
        background:'#14b8a6', borderRadius:'50%',
        pointerEvents:'none', zIndex:99999,
        transform:'translate(-50%,-50%)',
        transition:'width .2s, height .2s',
      }} />
    </>
  );
}`,

    init(wrap: HTMLElement) {
      const canvas = document.createElement('canvas');
      canvas.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:99990';
      const dot = document.createElement('div');
      dot.style.cssText = 'position:fixed;width:10px;height:10px;background:#14b8a6;border-radius:50%;pointer-events:none;z-index:99999;transform:translate(-50%,-50%);transition:width .2s,height .2s';
      wrap.appendChild(canvas);
      wrap.appendChild(dot);

      const ctx = canvas.getContext('2d')!;
      const MAX_R = 80;
      let W: number, H: number;
      const resize = () => { W = canvas.width = innerWidth; H = canvas.height = innerHeight; };
      resize();
      window.addEventListener('resize', resize);

      class R {
        x: number; y: number; r: number; life: number;
        constructor(x: number, y: number) { this.x = x; this.y = y; this.r = 0; this.life = 1; }
        update() { if (this.r < MAX_R) { this.r += 2.5; this.life -= 0.028; } else { this.life -= 0.05; } }
        draw() {
          if (this.life <= 0) return;
          ctx.save(); ctx.globalAlpha = this.life * .6; ctx.strokeStyle = '#14b8a6'; ctx.lineWidth = 1.8;
          ctx.beginPath(); ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2); ctx.stroke(); ctx.restore();
        }
      }

      let ripples: R[] = [], lx = 0, ly = 0, lt = 0;

      document.onmousemove = e => {
        dot.style.left = e.clientX + 'px'; dot.style.top = e.clientY + 'px';
        if (Date.now() - lt > 100 && (Math.abs(e.clientX - lx) + Math.abs(e.clientY - ly)) > 10) {
          ripples.push(new R(e.clientX, e.clientY)); lx = e.clientX; ly = e.clientY; lt = Date.now();
        }
      };

      // FIX: named reference for cleanup
      const clickHandler = (e: MouseEvent) => {
        ripples.push(new R(e.clientX + Math.random() * 6 - 3, e.clientY + Math.random() * 6 - 3));
        ripples.push(new R(e.clientX + Math.random() * 6 - 3, e.clientY + Math.random() * 6 - 3));
      };
      document.addEventListener('click', clickHandler);

      const loop = () => { ctx.clearRect(0, 0, W, H); ripples = ripples.filter(r => r.life > 0); ripples.forEach(r => { r.update(); r.draw(); }); requestAnimationFrame(loop); };
      loop();

      return {
        enter: () => { dot.style.width = '6px'; dot.style.height = '6px'; },
        leave: () => { dot.style.width = '10px'; dot.style.height = '10px'; },
        destroy: () => { document.removeEventListener('click', clickHandler); window.removeEventListener('resize', resize); },
      };
    },
  },

  // ─────────────────────────────────────────────
  // 9. TEXT LABEL
  // ─────────────────────────────────────────────
  {
    id: 'text-follow',
    name: 'Text Label',
    desc: 'Cursor shows a custom text label that follows elegantly. Perfect for portfolio hover states.',
    tags: ['text', 'interactive', 'portfolio'],
    accent: '#ef4444',
    preview: '<div style="display:flex;align-items:center;gap:8px"><div style="width:8px;height:8px;background:#ef4444;border-radius:50%"></div><div style="font-family:monospace;font-size:11px;color:#ef4444;border:1px solid rgba(239,68,68,0.4);padding:2px 8px;border-radius:4px">VIEW</div></div>',

    css: `/* ── Text Label Cursor ── */
body { cursor: none; }

#cursor-label {
  position: fixed; pointer-events: none; z-index: 99999;
  transform: translate(-50%, -50%);
  background: #ef4444; color: #000;
  font-size: 11px; font-weight: 700; letter-spacing: .12em;
  padding: 8px 16px; border-radius: 100px;
  white-space: nowrap; font-family: sans-serif;
  opacity: 0;
  transition: opacity .2s;
}
#cursor-dot-label {
  position: fixed; width: 8px; height: 8px;
  background: #ef4444; border-radius: 50%;
  pointer-events: none; z-index: 99999;
  transform: translate(-50%,-50%);
}`,

    html: `<!-- Paste before </body> -->
<div id="cursor-label">VIEW →</div>
<div id="cursor-dot-label"></div>

<!-- Add data-cursor-text="VIEW →" to any element to show the label on hover -->
<div data-cursor-text="VIEW →">Hover me</div>`,

    js: `// Text Label Cursor
// FIX: use event delegation so dynamically added [data-cursor-text] elements work
const label = document.getElementById('cursor-label');
const dotL  = document.getElementById('cursor-dot-label');
let lx = 0, ly = 0, mx = 0, my = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  dotL.style.left = mx + 'px';
  dotL.style.top  = my + 'px';
});

(function lerp() {
  lx += (mx - lx) * 0.1;
  ly += (my - ly) * 0.1;
  label.style.left = lx + 'px';
  label.style.top  = ly + 'px';
  requestAnimationFrame(lerp);
})();

// Event delegation — works for dynamically added elements too
document.addEventListener('mouseenter', e => {
  const el = e.target.closest('[data-cursor-text]');
  if (el) { label.style.opacity = '1'; label.textContent = el.dataset.cursorText; }
}, true);

document.addEventListener('mouseleave', e => {
  if (e.target.closest?.('[data-cursor-text]')) label.style.opacity = '0';
}, true);`,

    react: `// TextLabelCursor.jsx
// Usage: <TextLabelCursor />
// Add data-cursor-text="YOUR TEXT" to any element to activate the label
import { useEffect, useRef } from 'react';

export function TextLabelCursor() {
  const labelRef = useRef(null);
  const dotRef   = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const cur = useRef({ x: 0, y: 0 });

  useEffect(() => {
    document.body.style.cursor = 'none';

    const move = e => {
      pos.current = { x: e.clientX, y: e.clientY };
      dotRef.current.style.left = e.clientX + 'px';
      dotRef.current.style.top  = e.clientY + 'px';
    };

    // FIX: event delegation for dynamic elements
    const enter = e => {
      const el = e.target.closest('[data-cursor-text]');
      if (el) { labelRef.current.style.opacity = '1'; labelRef.current.textContent = el.dataset.cursorText; }
    };
    const leave = e => {
      if (e.target.closest?.('[data-cursor-text]')) labelRef.current.style.opacity = '0';
    };

    document.addEventListener('mousemove', move);
    document.addEventListener('mouseenter', enter, true);
    document.addEventListener('mouseleave', leave, true);

    let raf;
    const lerp = () => {
      cur.current.x += (pos.current.x - cur.current.x) * 0.1;
      cur.current.y += (pos.current.y - cur.current.y) * 0.1;
      labelRef.current.style.left = cur.current.x + 'px';
      labelRef.current.style.top  = cur.current.y + 'px';
      raf = requestAnimationFrame(lerp);
    };
    raf = requestAnimationFrame(lerp);

    return () => {
      document.body.style.cursor = '';
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseenter', enter, true);
      document.removeEventListener('mouseleave', leave, true);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={labelRef} style={{
        position:'fixed', pointerEvents:'none', zIndex:99999,
        transform:'translate(-50%,-50%)',
        background:'#ef4444', color:'#000',
        fontSize:11, fontWeight:700, letterSpacing:'.12em',
        padding:'8px 16px', borderRadius:100,
        whiteSpace:'nowrap', fontFamily:'sans-serif',
        opacity:0, transition:'opacity .2s',
      }}>
        VIEW →
      </div>
      <div ref={dotRef} style={{
        position:'fixed', width:8, height:8,
        background:'#ef4444', borderRadius:'50%',
        pointerEvents:'none', zIndex:99999,
        transform:'translate(-50%,-50%)',
      }} />
    </>
  );
}`,

    init(wrap: HTMLElement) {
      wrap.innerHTML = `
        <div id="clabel" style="position:fixed;pointer-events:none;z-index:99999;transform:translate(-50%,-50%);background:#ef4444;color:#000;font-size:11px;font-weight:700;letter-spacing:.12em;padding:8px 16px;border-radius:100px;white-space:nowrap;opacity:0;transition:opacity .2s;font-family:sans-serif">VIEW →</div>
        <div id="cdotl" style="position:fixed;width:8px;height:8px;background:#ef4444;border-radius:50%;pointer-events:none;z-index:99999;transform:translate(-50%,-50%)"></div>
      `;
      const label = document.getElementById('clabel') as HTMLElement;
      const dot   = document.getElementById('cdotl') as HTMLElement;
      let lx = 0, ly = 0, mx = 0, my = 0;
      document.onmousemove = e => { mx = e.clientX; my = e.clientY; dot.style.left = mx + 'px'; dot.style.top = my + 'px'; };
      const lerp = () => { lx += (mx - lx) * .1; ly += (my - ly) * .1; label.style.left = lx + 'px'; label.style.top = ly + 'px'; requestAnimationFrame(lerp); };
      lerp();
      return {
        enter: () => { label.style.opacity = '1'; },
        leave: () => { label.style.opacity = '0'; },
      };
    },
  },

  // ─────────────────────────────────────────────
  // 10. CLEAN RING
  // ─────────────────────────────────────────────
  {
    id: 'outline-only',
    name: 'Clean Ring',
    desc: 'Ultra-minimal single ring cursor. Barely-there but instantly premium. Zero distraction.',
    tags: ['minimal', 'clean', 'elegant'],
    accent: '#ffffff',
    preview: '<div style="width:28px;height:28px;border-radius:50%;border:1.5px solid rgba(255,255,255,0.7)"></div>',

    css: `/* ── Clean Ring Cursor ── */
body { cursor: none; }

#cursor-clean {
  position: fixed; width: 32px; height: 32px;
  border: 1.5px solid rgba(255,255,255,0.7); border-radius: 50%;
  pointer-events: none; z-index: 99999;
  transform: translate(-50%, -50%);
  transition: width .3s, height .3s, border-color .3s, opacity .3s;
}`,

    html: `<!-- Paste before </body> -->
<div id="cursor-clean"></div>`,

    js: `// Clean Ring Cursor
const clean = document.getElementById('cursor-clean');
let cx = 0, cy = 0, tx = 0, ty = 0;

document.addEventListener('mousemove', e => { tx = e.clientX; ty = e.clientY; });

(function lerp() {
  cx += (tx - cx) * 0.14;
  cy += (ty - cy) * 0.14;
  clean.style.left = cx + 'px';
  clean.style.top  = cy + 'px';
  requestAnimationFrame(lerp);
})();

// Expand on hover
document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
  el.addEventListener('mouseenter', () => { clean.style.width = '50px'; clean.style.height = '50px'; clean.style.borderColor = 'rgba(255,255,255,1)'; });
  el.addEventListener('mouseleave', () => { clean.style.width = '32px'; clean.style.height = '32px'; clean.style.borderColor = 'rgba(255,255,255,0.7)'; });
});`,

    react: `// CleanRingCursor.jsx
// Usage: <CleanRingCursor /> — best on dark backgrounds
import { useEffect, useRef } from 'react';

export function CleanRingCursor({ color = 'rgba(255,255,255,0.7)' }) {
  const ringRef = useRef(null);
  const cur = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    document.body.style.cursor = 'none';

    const move = e => { target.current = { x: e.clientX, y: e.clientY }; };
    document.addEventListener('mousemove', move);

    const enter = () => { ringRef.current.style.width = '50px'; ringRef.current.style.height = '50px'; ringRef.current.style.borderColor = 'rgba(255,255,255,1)'; };
    const leave = () => { ringRef.current.style.width = '32px'; ringRef.current.style.height = '32px'; ringRef.current.style.borderColor = color; };
    const els = document.querySelectorAll('a, button, [data-cursor]');
    els.forEach(el => { el.addEventListener('mouseenter', enter); el.addEventListener('mouseleave', leave); });

    let raf;
    const lerp = () => {
      cur.current.x += (target.current.x - cur.current.x) * 0.14;
      cur.current.y += (target.current.y - cur.current.y) * 0.14;
      ringRef.current.style.left = cur.current.x + 'px';
      ringRef.current.style.top  = cur.current.y + 'px';
      raf = requestAnimationFrame(lerp);
    };
    raf = requestAnimationFrame(lerp);

    return () => {
      document.body.style.cursor = '';
      document.removeEventListener('mousemove', move);
      cancelAnimationFrame(raf);
      els.forEach(el => { el.removeEventListener('mouseenter', enter); el.removeEventListener('mouseleave', leave); });
    };
  }, [color]);

  return (
    <div ref={ringRef} style={{
      position:'fixed', width:32, height:32,
      border:\`1.5px solid \${color}\`,
      borderRadius:'50%', pointerEvents:'none',
      zIndex:99999, transform:'translate(-50%,-50%)',
      transition:'width .3s, height .3s, border-color .3s',
    }} />
  );
}`,

    init(wrap: HTMLElement) {
      wrap.innerHTML = `<div id="cclean" style="position:fixed;width:32px;height:32px;border:1.5px solid rgba(255,255,255,0.7);border-radius:50%;pointer-events:none;z-index:99999;transform:translate(-50%,-50%);transition:width .3s,height .3s,border-color .3s"></div>`;
      const el = document.getElementById('cclean') as HTMLElement;
      let cx = 0, cy = 0, tx = 0, ty = 0;
      document.onmousemove = e => { tx = e.clientX; ty = e.clientY; };
      const lerp = () => { cx += (tx - cx) * .14; cy += (ty - cy) * .14; el.style.left = cx + 'px'; el.style.top = cy + 'px'; requestAnimationFrame(lerp); };
      lerp();
      return {
        enter: () => { el.style.width = '50px'; el.style.height = '50px'; el.style.borderColor = 'rgba(255,255,255,1)'; },
        leave: () => { el.style.width = '32px'; el.style.height = '32px'; el.style.borderColor = 'rgba(255,255,255,0.7)'; },
      };
    },
  },

  // ─────────────────────────────────────────────
  // 11. PULSE RING
  // ─────────────────────────────────────────────
  {
    id: 'pulse-ring',
    name: 'Pulse Ring',
    desc: 'Inner dot with an outer ring that pulses on hover. Energetic and attention-grabbing.',
    tags: ['pulse', 'animated', 'energetic'],
    accent: '#10b981',
    preview: '<div style="position:relative;width:32px;height:32px;display:flex;align-items:center;justify-content:center"><div class="prev-pulse" style="width:8px;height:8px;background:#10b981"></div></div>',

    css: `/* ── Pulse Ring Cursor ── */
body { cursor: none; }

#cursor-pulse-dot {
  position: fixed; width: 8px; height: 8px;
  background: #10b981; border-radius: 50%;
  pointer-events: none; z-index: 99999;
  transform: translate(-50%,-50%);
}
#cursor-pulse-ring {
  position: fixed; width: 30px; height: 30px;
  border: 2px solid rgba(16,185,129,0.6);
  border-radius: 50%; pointer-events: none; z-index: 99998;
  transform: translate(-50%,-50%);
  animation: pulseCur 2s ease-in-out infinite;
}

@keyframes pulseCur {
  0%, 100% { opacity: 1; transform: translate(-50%,-50%) scale(1); }
  50%       { opacity: 0.4; transform: translate(-50%,-50%) scale(1.4); }
}`,

    html: `<!-- Paste before </body> -->
<div id="cursor-pulse-dot"></div>
<div id="cursor-pulse-ring"></div>`,

    js: `// Pulse Ring Cursor
const pd = document.getElementById('cursor-pulse-dot');
const pr = document.getElementById('cursor-pulse-ring');
let rx = 0, ry = 0, mx = 0, my = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  pd.style.left = mx + 'px';
  pd.style.top  = my + 'px';
});

(function lerp() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  pr.style.left = rx + 'px';
  pr.style.top  = ry + 'px';
  requestAnimationFrame(lerp);
})();

// Speed up pulse on hover
document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
  el.addEventListener('mouseenter', () => { pr.style.animationDuration = '.6s'; });
  el.addEventListener('mouseleave', () => { pr.style.animationDuration = '2s'; });
});`,

    react: `// PulseRingCursor.jsx
// Usage: <PulseRingCursor />
import { useEffect, useRef } from 'react';

const KEYFRAMES = \`
@keyframes pulseCur {
  0%, 100% { opacity: 1; transform: translate(-50%,-50%) scale(1); }
  50%       { opacity: 0.4; transform: translate(-50%,-50%) scale(1.4); }
}
\`;

export function PulseRingCursor({ color = '#10b981' }) {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  const pos  = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });

  useEffect(() => {
    document.body.style.cursor = 'none';

    // Inject keyframes once
    const style = document.createElement('style');
    style.textContent = KEYFRAMES;
    document.head.appendChild(style);

    const move = e => {
      pos.current = { x: e.clientX, y: e.clientY };
      dotRef.current.style.left = e.clientX + 'px';
      dotRef.current.style.top  = e.clientY + 'px';
    };
    document.addEventListener('mousemove', move);

    const enter = () => { ringRef.current.style.animationDuration = '.6s'; };
    const leave = () => { ringRef.current.style.animationDuration = '2s'; };
    const els = document.querySelectorAll('a, button, [data-cursor]');
    els.forEach(el => { el.addEventListener('mouseenter', enter); el.addEventListener('mouseleave', leave); });

    let raf;
    const lerp = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.12;
      ring.current.y += (pos.current.y - ring.current.y) * 0.12;
      ringRef.current.style.left = ring.current.x + 'px';
      ringRef.current.style.top  = ring.current.y + 'px';
      raf = requestAnimationFrame(lerp);
    };
    raf = requestAnimationFrame(lerp);

    return () => {
      document.body.style.cursor = '';
      document.removeEventListener('mousemove', move);
      cancelAnimationFrame(raf);
      style.remove();
      els.forEach(el => { el.removeEventListener('mouseenter', enter); el.removeEventListener('mouseleave', leave); });
    };
  }, []);

  return (
    <>
      <div ref={dotRef} style={{
        position:'fixed', width:8, height:8,
        background: color, borderRadius:'50%',
        pointerEvents:'none', zIndex:99999,
        transform:'translate(-50%,-50%)',
      }} />
      <div ref={ringRef} style={{
        position:'fixed', width:30, height:30,
        border:\`2px solid \${color}99\`,
        borderRadius:'50%', pointerEvents:'none',
        zIndex:99998, transform:'translate(-50%,-50%)',
        animation:'pulseCur 2s ease-in-out infinite',
      }} />
    </>
  );
}`,

    init(wrap: HTMLElement) {
      wrap.innerHTML = `
        <div id="cpd" style="position:fixed;width:8px;height:8px;background:#10b981;border-radius:50%;pointer-events:none;z-index:99999;transform:translate(-50%,-50%)"></div>
        <div id="cpr" style="position:fixed;width:30px;height:30px;border:2px solid rgba(16,185,129,0.6);border-radius:50%;pointer-events:none;z-index:99998;transform:translate(-50%,-50%);animation:pulseCur 2s ease-in-out infinite"></div>
        <style>@keyframes pulseCur{0%,100%{opacity:1;transform:translate(-50%,-50%) scale(1)}50%{opacity:0.4;transform:translate(-50%,-50%) scale(1.5)}}</style>
      `;
      const pd = document.getElementById('cpd') as HTMLElement;
      const pr = document.getElementById('cpr') as HTMLElement;
      let rx = 0, ry = 0, mx = 0, my = 0;
      document.onmousemove = e => { mx = e.clientX; my = e.clientY; pd.style.left = mx + 'px'; pd.style.top = my + 'px'; };
      const lerp = () => { rx += (mx - rx) * .12; ry += (my - ry) * .12; pr.style.left = rx + 'px'; pr.style.top = ry + 'px'; requestAnimationFrame(lerp); };
      lerp();
      return {
        enter: () => { pr.style.animationDuration = '.6s'; },
        leave: () => { pr.style.animationDuration = '2s'; },
      };
    },
  },

  // ─────────────────────────────────────────────
  // 12. NEON CROSSHAIR
  // ─────────────────────────────────────────────
  {
    id: 'neon-cross',
    name: 'Neon Crosshair',
    desc: 'Glowing neon lines that span the full viewport like a targeting system. Maximum drama.',
    tags: ['neon', 'fullscreen', 'dramatic'],
    accent: '#8b5cf6',
    preview: '<div style="position:relative;width:36px;height:36px"><div style="position:absolute;top:50%;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,#8b5cf6,transparent)"></div><div style="position:absolute;left:50%;top:0;bottom:0;width:1px;background:linear-gradient(to bottom,transparent,#8b5cf6,transparent)"></div></div>',

    css: `/* ── Neon Crosshair Cursor ── */
body { cursor: none; }

#neon-h, #neon-v {
  position: fixed; pointer-events: none; z-index: 99990;
  opacity: 0.35; transition: opacity .2s;
}
#neon-h {
  left: 0; right: 0; height: 1px;
  background: linear-gradient(90deg, transparent 0%, #8b5cf6 40%, #8b5cf6 60%, transparent 100%);
}
#neon-v {
  top: 0; bottom: 0; width: 1px;
  background: linear-gradient(to bottom, transparent 0%, #8b5cf6 40%, #8b5cf6 60%, transparent 100%);
}
#neon-dot {
  position: fixed; width: 10px; height: 10px;
  background: #8b5cf6; border-radius: 50%;
  pointer-events: none; z-index: 99999;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 12px 4px rgba(139,92,246,0.6);
}`,

    html: `<!-- Paste before </body> -->
<div id="neon-h"></div>
<div id="neon-v"></div>
<div id="neon-dot"></div>`,

    js: `// Neon Crosshair Cursor
const nh = document.getElementById('neon-h');
const nv = document.getElementById('neon-v');
const nd = document.getElementById('neon-dot');

document.addEventListener('mousemove', e => {
  nh.style.top  = e.clientY + 'px';
  nv.style.left = e.clientX + 'px';
  nd.style.left = e.clientX + 'px';
  nd.style.top  = e.clientY + 'px';
});

// Brighten on hover
document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
  el.addEventListener('mouseenter', () => { nh.style.opacity = '0.7'; nv.style.opacity = '0.7'; });
  el.addEventListener('mouseleave', () => { nh.style.opacity = '0.35'; nv.style.opacity = '0.35'; });
});`,

    react: `// NeonCrosshairCursor.jsx
// Usage: <NeonCrosshairCursor />
import { useEffect, useRef } from 'react';

export function NeonCrosshairCursor({ color = '#8b5cf6' }) {
  const nhRef = useRef(null);
  const nvRef = useRef(null);
  const ndRef = useRef(null);

  useEffect(() => {
    document.body.style.cursor = 'none';

    const move = e => {
      nhRef.current.style.top  = e.clientY + 'px';
      nvRef.current.style.left = e.clientX + 'px';
      ndRef.current.style.left = e.clientX + 'px';
      ndRef.current.style.top  = e.clientY + 'px';
    };
    document.addEventListener('mousemove', move);

    const enter = () => { nhRef.current.style.opacity = '0.7'; nvRef.current.style.opacity = '0.7'; };
    const leave = () => { nhRef.current.style.opacity = '0.35'; nvRef.current.style.opacity = '0.35'; };
    const els = document.querySelectorAll('a, button, [data-cursor]');
    els.forEach(el => { el.addEventListener('mouseenter', enter); el.addEventListener('mouseleave', leave); });

    return () => {
      document.body.style.cursor = '';
      document.removeEventListener('mousemove', move);
      els.forEach(el => { el.removeEventListener('mouseenter', enter); el.removeEventListener('mouseleave', leave); });
    };
  }, []);

  return (
    <>
      <div ref={nhRef} style={{
        position:'fixed', left:0, right:0, height:1,
        background:\`linear-gradient(90deg, transparent 0%, \${color} 40%, \${color} 60%, transparent 100%)\`,
        pointerEvents:'none', zIndex:99990,
        opacity:0.35, transition:'opacity .2s',
      }} />
      <div ref={nvRef} style={{
        position:'fixed', top:0, bottom:0, width:1,
        background:\`linear-gradient(to bottom, transparent 0%, \${color} 40%, \${color} 60%, transparent 100%)\`,
        pointerEvents:'none', zIndex:99990,
        opacity:0.35, transition:'opacity .2s',
      }} />
      <div ref={ndRef} style={{
        position:'fixed', width:10, height:10,
        background: color, borderRadius:'50%',
        pointerEvents:'none', zIndex:99999,
        transform:'translate(-50%,-50%)',
        boxShadow:\`0 0 12px 4px \${color}99\`,
      }} />
    </>
  );
}`,

    init(wrap: HTMLElement) {
      wrap.innerHTML = `
        <div id="cnh" style="position:fixed;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent 0%,#8b5cf6 40%,#8b5cf6 60%,transparent 100%);pointer-events:none;z-index:99990;opacity:0.4;transition:opacity .2s"></div>
        <div id="cnv" style="position:fixed;top:0;bottom:0;width:1px;background:linear-gradient(to bottom,transparent 0%,#8b5cf6 40%,#8b5cf6 60%,transparent 100%);pointer-events:none;z-index:99990;opacity:0.4;transition:opacity .2s"></div>
        <div id="cnd" style="position:fixed;width:10px;height:10px;background:#8b5cf6;border-radius:50%;pointer-events:none;z-index:99999;transform:translate(-50%,-50%);box-shadow:0 0 12px 4px rgba(139,92,246,0.5)"></div>
      `;
      const nh = document.getElementById('cnh') as HTMLElement;
      const nv = document.getElementById('cnv') as HTMLElement;
      const nd = document.getElementById('cnd') as HTMLElement;
      document.onmousemove = e => { nh.style.top = e.clientY + 'px'; nv.style.left = e.clientX + 'px'; nd.style.left = e.clientX + 'px'; nd.style.top = e.clientY + 'px'; };
      return {
        enter: () => { nh.style.opacity = '0.7'; nv.style.opacity = '0.7'; },
        leave: () => { nh.style.opacity = '0.4'; nv.style.opacity = '0.4'; },
      };
    },
  },
];