import { CursorDefinition } from '@/types/cursor';

export const CURSORS: CursorDefinition[] = [
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
let rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  dot.style.left = e.clientX + 'px';
  dot.style.top = e.clientY + 'px';
});

(function lerp() {
  const target = { x: parseFloat(dot.style.left) || 0,
                   y: parseFloat(dot.style.top) || 0 };
  rx += (target.x - rx) * 0.12;
  ry += (target.y - ry) * 0.12;
  ring.style.left = rx + 'px';
  ring.style.top = ry + 'px';
  requestAnimationFrame(lerp);
})();`,
    react: `// useCursor.jsx
import { useEffect, useRef } from 'react';

export function DotRingCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const move = e => {
      pos.current = { x: e.clientX, y: e.clientY };
      dotRef.current.style.left = e.clientX + 'px';
      dotRef.current.style.top = e.clientY + 'px';
    };
    document.addEventListener('mousemove', move);
    let raf;
    const lerp = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.12;
      ring.current.y += (pos.current.y - ring.current.y) * 0.12;
      ringRef.current.style.left = ring.current.x + 'px';
      ringRef.current.style.top = ring.current.y + 'px';
      raf = requestAnimationFrame(lerp);
    };
    raf = requestAnimationFrame(lerp);
    return () => { document.removeEventListener('mousemove', move); cancelAnimationFrame(raf); };
  }, []);

  return (
    <>
      <div ref={dotRef} style={{
        position:'fixed',width:10,height:10,
        background:'#60a5fa',borderRadius:'50%',
        pointerEvents:'none',zIndex:99999,
        transform:'translate(-50%,-50%)'
      }}/>
      <div ref={ringRef} style={{
        position:'fixed',width:36,height:36,
        border:'2px solid rgba(96,165,250,0.5)',
        borderRadius:'50%',pointerEvents:'none',
        zIndex:99998,transform:'translate(-50%,-50%)',
        transition:'width .3s,height .3s'
      }}/>
    </>
  );
}`,
    init(wrap: HTMLElement) {
      wrap.innerHTML = `<div id="cd" style="position:fixed;width:10px;height:10px;background:#60a5fa;border-radius:50%;pointer-events:none;z-index:99999;transform:translate(-50%,-50%);transition:width .2s,height .2s"></div>
<div id="cr" style="position:fixed;width:36px;height:36px;border:2px solid rgba(96,165,250,0.5);border-radius:50%;pointer-events:none;z-index:99998;transform:translate(-50%,-50%);transition:width .3s,height .3s,border-color .3s"></div>`;
      const dot = document.getElementById('cd') as HTMLElement;
      const ring = document.getElementById('cr') as HTMLElement;
      let rx = 0, ry = 0, mx = 0, my = 0;
      document.onmousemove = e => { mx = e.clientX; my = e.clientY; dot.style.left = mx + 'px'; dot.style.top = my + 'px' };
      const lerp = () => { rx += (mx - rx) * .12; ry += (my - ry) * .12; ring.style.left = rx + 'px'; ring.style.top = ry + 'px'; requestAnimationFrame(lerp) }; lerp();
      return {
        enter: () => { dot.style.width = '6px'; dot.style.height = '6px'; ring.style.width = '52px'; ring.style.height = '52px'; ring.style.borderColor = '#60a5fa' },
        leave: () => { dot.style.width = '10px'; dot.style.height = '10px'; ring.style.width = '36px'; ring.style.height = '36px'; ring.style.borderColor = 'rgba(96,165,250,0.5)' }
      };
    }
  },
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
  box-shadow: 0 0 20px 6px color-mix(in srgb, var(--glow-color) 50%, transparent);
  transition: width .3s, height .3s, box-shadow .3s;
  mix-blend-mode: screen;
}
#cursor-orb-aura {
  position: fixed; width: 60px; height: 60px;
  background: color-mix(in srgb, var(--glow-color) 15%, transparent);
  border-radius: 50%; pointer-events: none;
  z-index: 99998; transform: translate(-50%, -50%);
  filter: blur(12px);
  transition: width .4s, height .4s;
}`,
    html: `<div id="cursor-orb"></div>
<div id="cursor-orb-aura"></div>`,
    js: `const orb = document.getElementById('cursor-orb');
const aura = document.getElementById('cursor-orb-aura');
let ax = 0, ay = 0, mx = 0, my = 0;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; orb.style.left = mx + 'px'; orb.style.top = my + 'px'; });
(function lerp() { ax += (mx - ax) * 0.08; ay += (my - ay) * 0.08; aura.style.left = ax + 'px'; aura.style.top = ay + 'px'; requestAnimationFrame(lerp); })();`,
    react: `// GlowOrbCursor.jsx — same lerp pattern, swap colors via props`,
    init(wrap: HTMLElement) {
      wrap.innerHTML = `<div id="corb" style="position:fixed;width:20px;height:20px;background:#a78bfa;border-radius:50%;pointer-events:none;z-index:99999;transform:translate(-50%,-50%);box-shadow:0 0 20px 6px rgba(167,139,250,0.4);mix-blend-mode:screen;transition:width .3s,height .3s"></div>
<div id="caura" style="position:fixed;width:60px;height:60px;background:rgba(167,139,250,0.12);border-radius:50%;pointer-events:none;z-index:99998;transform:translate(-50%,-50%);filter:blur(12px);transition:width .4s,height .4s"></div>`;
      const orb = document.getElementById('corb') as HTMLElement;
      const aura = document.getElementById('caura') as HTMLElement;
      let ax = 0, ay = 0, mx = 0, my = 0;
      document.onmousemove = e => { mx = e.clientX; my = e.clientY; orb.style.left = mx + 'px'; orb.style.top = my + 'px' };
      const lerp = () => { ax += (mx - ax) * .08; ay += (my - ay) * .08; aura.style.left = ax + 'px'; aura.style.top = ay + 'px'; requestAnimationFrame(lerp) }; lerp();
      return {
        enter: () => { orb.style.width = '28px'; orb.style.height = '28px'; aura.style.width = '90px'; aura.style.height = '90px' },
        leave: () => { orb.style.width = '20px'; orb.style.height = '20px'; aura.style.width = '60px'; aura.style.height = '60px' }
      };
    }
  },
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
  transition: transform .1s, width .3s, height .3s, border-radius .3s;
}`,
    html: `<div id="cursor-mag"></div>`,
    js: `const mag = document.getElementById('cursor-mag');
let cx = 0, cy = 0, tx = 0, ty = 0;
document.addEventListener('mousemove', e => { tx = e.clientX; ty = e.clientY; });
const magnetEls = document.querySelectorAll('[data-magnetic]');
magnetEls.forEach(el => {
  el.addEventListener('mousemove', e => {
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    el.style.transform = \`translate(\${x * 0.3}px, \${y * 0.3}px)\`;
    tx = r.left + r.width/2 + x * 0.5;
    ty = r.top + r.height/2 + y * 0.5;
  });
  el.addEventListener('mouseleave', () => { el.style.transform = ''; });
});
(function lerp() {
  cx += (tx - cx) * 0.15; cy += (ty - cy) * 0.15;
  mag.style.left = cx + 'px'; mag.style.top = cy + 'px';
  requestAnimationFrame(lerp);
})();`,
    react: `// MagneticCursor.jsx — attach data-magnetic to buttons/links for snap effect`,
    init(wrap: HTMLElement) {
      wrap.innerHTML = `<div id="cmag" style="position:fixed;width:14px;height:14px;background:#ec4899;border-radius:50%;pointer-events:none;z-index:99999;transform:translate(-50%,-50%);transition:width .3s,height .3s"></div>`;
      const mag = document.getElementById('cmag') as HTMLElement;
      let cx = 0, cy = 0, tx = 0, ty = 0;
      document.onmousemove = e => { tx = e.clientX; ty = e.clientY };
      const lerp = () => { cx += (tx - cx) * .15; cy += (ty - cy) * .15; mag.style.left = cx + 'px'; mag.style.top = cy + 'px'; requestAnimationFrame(lerp) }; lerp();
      return {
        enter: () => { mag.style.width = '40px'; mag.style.height = '40px'; mag.style.background = 'rgba(236,72,153,0.2)'; mag.style.border = '2px solid #ec4899' },
        leave: () => { mag.style.width = '14px'; mag.style.height = '14px'; mag.style.background = '#ec4899'; mag.style.border = 'none' }
      };
    }
  },
  {
    id: 'crosshair',
    name: 'Crosshair',
    desc: 'Precision crosshair cursor with animated targeting lines. Great for portfolio sites and games.',
    tags: ['gaming', 'bold', 'animated'],
    accent: '#34d399',
    preview: '<div class="prev-cross" style=""></div>',
    css: `/* ── Crosshair Cursor ── */
body { cursor: none; }
#cursor-cross { position: fixed; pointer-events: none; z-index: 99999; transform: translate(-50%, -50%); }
.cross-h, .cross-v { position: absolute; background: #34d399; border-radius: 2px; transition: width .2s, height .2s; }
.cross-h { width: 28px; height: 2px; top: 50%; left: 50%; transform: translate(-50%, -50%); }
.cross-v { width: 2px; height: 28px; top: 50%; left: 50%; transform: translate(-50%, -50%); }
.cross-center { position: absolute; width: 5px; height: 5px; background: #34d399; border-radius: 50%; top: 50%; left: 50%; transform: translate(-50%, -50%); }`,
    html: `<div id="cursor-cross">
  <div class="cross-h"></div>
  <div class="cross-v"></div>
  <div class="cross-center"></div>
</div>`,
    js: `const cross = document.getElementById('cursor-cross');
document.addEventListener('mousemove', e => {
  cross.style.left = e.clientX + 'px';
  cross.style.top = e.clientY + 'px';
});`,
    react: `// CrosshairCursor.jsx`,
    init(wrap: HTMLElement) {
      wrap.innerHTML = `<div id="ccross" style="position:fixed;pointer-events:none;z-index:99999;transform:translate(-50%,-50%)">
<div style="position:absolute;width:28px;height:2px;background:#34d399;border-radius:2px;top:50%;left:50%;transform:translate(-50%,-50%);transition:width .2s" id="cch"></div>
<div style="position:absolute;width:2px;height:28px;background:#34d399;border-radius:2px;top:50%;left:50%;transform:translate(-50%,-50%);transition:height .2s" id="ccv"></div>
<div style="position:absolute;width:5px;height:5px;background:#34d399;border-radius:50%;top:50%;left:50%;transform:translate(-50%,-50%)"></div></div>`;
      const cross = document.getElementById('ccross') as HTMLElement;
      document.onmousemove = e => { cross.style.left = e.clientX + 'px'; cross.style.top = e.clientY + 'px' };
      return {
        enter: () => { (document.getElementById('cch') as HTMLElement).style.width = '44px'; (document.getElementById('ccv') as HTMLElement).style.height = '44px' },
        leave: () => { (document.getElementById('cch') as HTMLElement).style.width = '28px'; (document.getElementById('ccv') as HTMLElement).style.height = '28px' }
      };
    }
  },
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
  transition: opacity .4s ease;
}`,
    html: `<!-- JS generates particles dynamically -->`,
    js: `const TRAIL = 12;
const dots = Array.from({ length: TRAIL }, (_, i) => {
  const d = document.createElement('div');
  d.className = 'trail-dot';
  const s = Math.max(3, 12 - i);
  d.style.cssText = \`width:\${s}px;height:\${s}px;opacity:\${1 - i / TRAIL}\`;
  document.body.appendChild(d);
  return d;
});
const pos = dots.map(() => ({ x: 0, y: 0 }));
document.addEventListener('mousemove', e => { pos[0] = { x: e.clientX, y: e.clientY }; });
(function loop() {
  for (let i = TRAIL - 1; i > 0; i--) {
    pos[i].x += (pos[i - 1].x - pos[i].x) * 0.35;
    pos[i].y += (pos[i - 1].y - pos[i].y) * 0.35;
    dots[i].style.left = pos[i].x + 'px';
    dots[i].style.top = pos[i].y + 'px';
  }
  dots[0].style.left = pos[0].x + 'px';
  dots[0].style.top = pos[0].y + 'px';
  requestAnimationFrame(loop);
})();`,
    react: `// TrailCursor.jsx — create dots array in useEffect, clean up on unmount`,
    init(wrap: HTMLElement) {
      wrap.innerHTML = '';
      const N = 12, dots: HTMLElement[] = [], pos = Array.from({ length: N }, () => ({ x: 0, y: 0 }));
      for (let i = 0; i < N; i++) {
        const d = document.createElement('div');
        const s = Math.max(3, 12 - i);
        d.style.cssText = `position:fixed;width:${s}px;height:${s}px;border-radius:50%;background:#fbbf24;pointer-events:none;z-index:99999;transform:translate(-50%,-50%);opacity:${(1 - i / N).toFixed(2)}`;
        wrap.appendChild(d); dots.push(d);
      }
      document.onmousemove = e => { pos[0] = { x: e.clientX, y: e.clientY } };
      const loop = () => { for (let i = N - 1; i > 0; i--) { pos[i].x += (pos[i - 1].x - pos[i].x) * .35; pos[i].y += (pos[i - 1].y - pos[i].y) * .35; dots[i].style.left = pos[i].x + 'px'; dots[i].style.top = pos[i].y + 'px' } dots[0].style.left = pos[0].x + 'px'; dots[0].style.top = pos[0].y + 'px'; requestAnimationFrame(loop) }; loop();
      return { enter: () => { }, leave: () => { } };
    }
  },
  {
    id: 'morph',
    name: 'Morphing Blob',
    desc: 'Organic blob that morphs its shape smoothly as you move. Biomorphic and mesmerizing.',
    tags: ['organic', 'animated', 'unique'],
    accent: '#f97316',
    preview: '<div class="prev-morph" style="background:#f97316"></div>',
    css: `/* ── Morphing Blob Cursor ── */
body { cursor: none; }
#cursor-blob {
  position: fixed; width: 22px; height: 22px;
  background: #f97316; pointer-events: none; z-index: 99999;
  transform: translate(-50%, -50%);
  animation: blobMorph 2.5s ease-in-out infinite;
  mix-blend-mode: difference;
}
@keyframes blobMorph {
  0%,100% { border-radius: 50%; }
  25% { border-radius: 60% 40% 55% 45% / 55% 45% 60% 40%; }
  50% { border-radius: 40% 60% 45% 55% / 45% 55% 40% 60%; }
  75% { border-radius: 55% 45% 40% 60% / 60% 40% 55% 45%; }
}`,
    html: `<div id="cursor-blob"></div>`,
    js: `const blob = document.getElementById('cursor-blob');
let bx = 0, by = 0, mx = 0, my = 0;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
(function lerp() {
  bx += (mx - bx) * 0.1; by += (my - by) * 0.1;
  blob.style.left = bx + 'px'; blob.style.top = by + 'px';
  requestAnimationFrame(lerp);
})();`,
    react: `// MorphBlob.jsx`,
    init(wrap: HTMLElement) {
      wrap.innerHTML = `<div id="cblob" style="position:fixed;width:22px;height:22px;background:#f97316;pointer-events:none;z-index:99999;transform:translate(-50%,-50%);animation:blobMorph 2.5s ease-in-out infinite;mix-blend-mode:difference"></div>
<style>@keyframes blobMorph{0%,100%{border-radius:50%}25%{border-radius:60% 40% 55% 45%/55% 45% 60% 40%}50%{border-radius:40% 60% 45% 55%/45% 55% 40% 60%}75%{border-radius:55% 45% 40% 60%/60% 40% 55% 45%}}</style>`;
      const blob = document.getElementById('cblob') as HTMLElement;
      let bx = 0, by = 0, mx = 0, my = 0;
      document.onmousemove = e => { mx = e.clientX; my = e.clientY };
      const lerp = () => { bx += (mx - bx) * .1; by += (my - by) * .1; blob.style.left = bx + 'px'; blob.style.top = by + 'px'; requestAnimationFrame(lerp) }; lerp();
      return {
        enter: () => { blob.style.width = '36px'; blob.style.height = '36px' },
        leave: () => { blob.style.width = '22px'; blob.style.height = '22px' }
      };
    }
  },
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
}
#cursor-spot-core {
  position: fixed; width: 8px; height: 8px;
  background: rgba(229,231,235,0.9); border-radius: 50%;
  pointer-events: none; z-index: 99999;
  transform: translate(-50%, -50%);
}`,
    html: `<div id="cursor-spot"></div>
<div id="cursor-spot-core"></div>`,
    js: `const spot = document.getElementById('cursor-spot');
const core = document.getElementById('cursor-spot-core');
document.addEventListener('mousemove', e => {
  spot.style.left = e.clientX + 'px'; spot.style.top = e.clientY + 'px';
  core.style.left = e.clientX + 'px'; core.style.top = e.clientY + 'px';
});`,
    react: `// SpotlightCursor.jsx`,
    init(wrap: HTMLElement) {
      wrap.innerHTML = `<div id="cspot" style="position:fixed;width:200px;height:200px;background:radial-gradient(circle,rgba(229,231,235,0.1) 0%,transparent 70%);border-radius:50%;pointer-events:none;z-index:99990;transform:translate(-50%,-50%)"></div>
<div id="ccore" style="position:fixed;width:8px;height:8px;background:rgba(229,231,235,0.9);border-radius:50%;pointer-events:none;z-index:99999;transform:translate(-50%,-50%)"></div>`;
      const spot = document.getElementById('cspot') as HTMLElement, core = document.getElementById('ccore') as HTMLElement;
      document.onmousemove = e => { spot.style.left = e.clientX + 'px'; spot.style.top = e.clientY + 'px'; core.style.left = e.clientX + 'px'; core.style.top = e.clientY + 'px' };
      return {
        enter: () => { spot.style.width = '300px'; spot.style.height = '300px' },
        leave: () => { spot.style.width = '200px'; spot.style.height = '200px' }
      };
    }
  },
  {
    id: 'ripple',
    name: 'Water Ripple',
    desc: 'Creates expanding water ripple rings on mouse move and click. Mesmerizing liquid feel.',
    tags: ['water', 'canvas', 'click'],
    accent: '#14b8a6',
    preview: '<div style="position:relative;width:44px;height:44px;display:flex;align-items:center;justify-content:center"><div style="position:absolute;width:10px;height:10px;background:#14b8a6;border-radius:50%"></div><div style="position:absolute;width:28px;height:28px;border:1.5px solid rgba(20,184,166,0.5);border-radius:50%"></div><div style="position:absolute;width:44px;height:44px;border:1px solid rgba(20,184,166,0.2);border-radius:50%"></div></div>',
    css: `/* ── Water Ripple — uses canvas overlay ── */
body { cursor: none; }
#ripple-canvas { position: fixed; inset: 0; pointer-events: none; z-index: 99990; }
#cursor-rip { position: fixed; width: 10px; height: 10px; background: #14b8a6; border-radius: 50%; pointer-events: none; z-index: 99999; transform: translate(-50%,-50%); }`,
    html: `<canvas id="ripple-canvas"></canvas>
<div id="cursor-rip"></div>`,
    js: `const canvas = document.getElementById('ripple-canvas');
const ctx = canvas.getContext('2d');
const cur = document.getElementById('cursor-rip');
let W, H, ripples = [];
const resize = () => { W = canvas.width = innerWidth; H = canvas.height = innerHeight; };
resize(); window.addEventListener('resize', resize);
const MAX_RADIUS = 80; // Maximum ripple size
class Ripple { 
  constructor(x,y){
    this.x=x;
    this.y=y;
    this.r=0;
    this.life=1;
    this.maxR=MAX_RADIUS;
  } 
  update(){
    if(this.r < this.maxR) {
      this.r+=2.5;
      this.life-=0.028;
    } else {
      this.life-=0.05; // Fade faster when max size reached
    }
  } 
  draw(){
    if(this.life <= 0) return;
    ctx.save();
    ctx.globalAlpha=this.life*.6;
    ctx.strokeStyle='#14b8a6';
    ctx.lineWidth=1.8;
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.r,0,Math.PI*2);
    ctx.stroke();
    ctx.restore();
  } 
}
let lx=0,ly=0,t=0;
document.addEventListener('mousemove', e => { 
  cur.style.left=e.clientX+'px'; 
  cur.style.top=e.clientY+'px'; 
  if(Date.now()-t>100&&(Math.abs(e.clientX-lx)+Math.abs(e.clientY-ly))>10){
    ripples.push(new Ripple(e.clientX,e.clientY));
    lx=e.clientX;
    ly=e.clientY;
    t=Date.now();
  } 
});
document.addEventListener('click', e => { 
  for(let i=0;i<2;i++) {
    ripples.push(new Ripple(e.clientX+Math.random()*6-3,e.clientY+Math.random()*6-3));
  }
});
(function loop(){ 
  ctx.clearRect(0,0,W,H); 
  ripples=ripples.filter(r=>r.life>0); 
  ripples.forEach(r=>{r.update();r.draw()}); 
  requestAnimationFrame(loop); 
})();`,
    react: `// RippleCursor.jsx — canvas ref + useEffect for animation loop`,
    init(wrap: HTMLElement) {
      const canvas = document.createElement('canvas');
      canvas.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:99990';
      const dot = document.createElement('div');
      dot.style.cssText = 'position:fixed;width:10px;height:10px;background:#14b8a6;border-radius:50%;pointer-events:none;z-index:99999;transform:translate(-50%,-50%)';
      wrap.appendChild(canvas); wrap.appendChild(dot);
      const ctx = canvas.getContext('2d')!;
      let W: number, H: number;
      interface Ripple { x: number; y: number; r: number; life: number; maxR: number; }
      let ripples: Ripple[] = [];
      const resize = () => { W = canvas.width = innerWidth; H = canvas.height = innerHeight }; resize(); window.addEventListener('resize', resize);
      const MAX_RADIUS = 80;
      class R { 
        x: number; y: number; r: number; life: number; maxR: number;
        constructor(x: number, y: number) { 
          this.x = x; 
          this.y = y; 
          this.r = 0; 
          this.life = 1;
          this.maxR = MAX_RADIUS;
        } 
        update() { 
          if(this.r < this.maxR) {
            this.r += 2.5;
            this.life -= 0.028;
          } else {
            this.life -= 0.05;
          }
        } 
        draw() { 
          if(this.life <= 0) return;
          ctx.save(); 
          ctx.globalAlpha = this.life * .6; 
          ctx.strokeStyle = '#14b8a6'; 
          ctx.lineWidth = 1.8; 
          ctx.beginPath(); 
          ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2); 
          ctx.stroke(); 
          ctx.restore();
        } 
      }
      let lx = 0, ly = 0, lt = 0;
      document.onmousemove = e => { 
        dot.style.left = e.clientX + 'px'; 
        dot.style.top = e.clientY + 'px'; 
        if (Date.now() - lt > 100 && (Math.abs(e.clientX - lx) + Math.abs(e.clientY - ly)) > 10) { 
          ripples.push(new R(e.clientX, e.clientY)); 
          lx = e.clientX; 
          ly = e.clientY; 
          lt = Date.now();
        } 
      };
      document.addEventListener('click', e => { 
        for (let i = 0; i < 2; i++) {
          ripples.push(new R(e.clientX + Math.random() * 6 - 3, e.clientY + Math.random() * 6 - 3));
        }
      });
      const loop = () => { 
        ctx.clearRect(0, 0, W, H); 
        ripples = ripples.filter(r => r.life > 0); 
        ripples.forEach(r => { r.update(); r.draw() }); 
        requestAnimationFrame(loop);
      }; 
      loop();
      return {
        enter: () => { dot.style.width = '6px'; dot.style.height = '6px' },
        leave: () => { dot.style.width = '10px'; dot.style.height = '10px' }
      };
    }
  },
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
  white-space: nowrap;
  transition: opacity .2s, transform .2s;
  opacity: 0;
}
#cursor-dot-label {
  position: fixed; width: 8px; height: 8px;
  background: #ef4444; border-radius: 50%;
  pointer-events: none; z-index: 99999;
  transform: translate(-50%,-50%);
}`,
    html: `<div id="cursor-label">VIEW →</div>
<div id="cursor-dot-label"></div>`,
    js: `const label = document.getElementById('cursor-label');
const dotL = document.getElementById('cursor-dot-label');
let lx=0,ly=0,mx=0,my=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;dotL.style.left=mx+'px';dotL.style.top=my+'px'});
(function lerp(){lx+=(mx-lx)*.1;ly+=(my-ly)*.1;label.style.left=lx+'px';label.style.top=ly+'px';requestAnimationFrame(lerp)})();
// Add data-cursor-text="VIEW →" to elements to show label
document.querySelectorAll('[data-cursor-text]').forEach(el=>{
  el.addEventListener('mouseenter',()=>{label.style.opacity=1;label.textContent=el.dataset.cursorText});
  el.addEventListener('mouseleave',()=>{label.style.opacity=0});
});`,
    react: `// TextLabelCursor.jsx`,
    init(wrap: HTMLElement) {
      wrap.innerHTML = `<div id="clabel" style="position:fixed;pointer-events:none;z-index:99999;transform:translate(-50%,-50%);background:#ef4444;color:#000;font-size:11px;font-weight:700;letter-spacing:.12em;padding:8px 16px;border-radius:100px;white-space:nowrap;opacity:0;transition:opacity .2s;font-family:sans-serif">VIEW →</div>
<div id="cdotl" style="position:fixed;width:8px;height:8px;background:#ef4444;border-radius:50%;pointer-events:none;z-index:99999;transform:translate(-50%,-50%)"></div>`;
      const label = document.getElementById('clabel') as HTMLElement, dot = document.getElementById('cdotl') as HTMLElement;
      let lx = 0, ly = 0, mx = 0, my = 0;
      document.onmousemove = e => { mx = e.clientX; my = e.clientY; dot.style.left = mx + 'px'; dot.style.top = my + 'px' };
      const lerp = () => { lx += (mx - lx) * .1; ly += (my - ly) * .1; label.style.left = lx + 'px'; label.style.top = ly + 'px'; requestAnimationFrame(lerp) }; lerp();
      return {
        enter: () => { label.style.opacity = '1' },
        leave: () => { label.style.opacity = '0' }
      };
    }
  },
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
    html: `<div id="cursor-clean"></div>`,
    js: `const clean = document.getElementById('cursor-clean');
let cx=0,cy=0,tx=0,ty=0;
document.addEventListener('mousemove',e=>{tx=e.clientX;ty=e.clientY});
(function lerp(){cx+=(tx-cx)*.14;cy+=(ty-cy)*.14;clean.style.left=cx+'px';clean.style.top=cy+'px';requestAnimationFrame(lerp)})();`,
    react: `// CleanRingCursor.jsx`,
    init(wrap: HTMLElement) {
      wrap.innerHTML = `<div id="cclean" style="position:fixed;width:32px;height:32px;border:1.5px solid rgba(255,255,255,0.7);border-radius:50%;pointer-events:none;z-index:99999;transform:translate(-50%,-50%);transition:width .3s,height .3s,border-color .3s"></div>`;
      const el = document.getElementById('cclean') as HTMLElement;
      let cx = 0, cy = 0, tx = 0, ty = 0;
      document.onmousemove = e => { tx = e.clientX; ty = e.clientY };
      const lerp = () => { cx += (tx - cx) * .14; cy += (ty - cy) * .14; el.style.left = cx + 'px'; el.style.top = cy + 'px'; requestAnimationFrame(lerp) }; lerp();
      return {
        enter: () => { el.style.width = '50px'; el.style.height = '50px'; el.style.borderColor = 'rgba(255,255,255,1)' },
        leave: () => { el.style.width = '32px'; el.style.height = '32px'; el.style.borderColor = 'rgba(255,255,255,0.7)' }
      };
    }
  },
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
  0%,100%{opacity:1;transform:translate(-50%,-50%) scale(1)}
  50%{opacity:0.4;transform:translate(-50%,-50%) scale(1.4)}
}`,
    html: `<div id="cursor-pulse-dot"></div>
<div id="cursor-pulse-ring"></div>`,
    js: `const pd = document.getElementById('cursor-pulse-dot');
const pr = document.getElementById('cursor-pulse-ring');
let rx=0,ry=0,mx=0,my=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;pd.style.left=mx+'px';pd.style.top=my+'px'});
(function lerp(){rx+=(mx-rx)*.12;ry+=(my-ry)*.12;pr.style.left=rx+'px';pr.style.top=ry+'px';requestAnimationFrame(lerp)})();`,
    react: `// PulseRingCursor.jsx`,
    init(wrap: HTMLElement) {
      wrap.innerHTML = `<div id="cpd" style="position:fixed;width:8px;height:8px;background:#10b981;border-radius:50%;pointer-events:none;z-index:99999;transform:translate(-50%,-50%)"></div>
<div id="cpr" style="position:fixed;width:30px;height:30px;border:2px solid rgba(16,185,129,0.6);border-radius:50%;pointer-events:none;z-index:99998;transform:translate(-50%,-50%);animation:pulseCur 2s ease-in-out infinite"></div>
<style>@keyframes pulseCur{0%,100%{opacity:1;transform:translate(-50%,-50%) scale(1)}50%{opacity:0.4;transform:translate(-50%,-50%) scale(1.5)}}</style>`;
      const pd = document.getElementById('cpd') as HTMLElement, pr = document.getElementById('cpr') as HTMLElement;
      let rx = 0, ry = 0, mx = 0, my = 0;
      document.onmousemove = e => { mx = e.clientX; my = e.clientY; pd.style.left = mx + 'px'; pd.style.top = my + 'px' };
      const lerp = () => { rx += (mx - rx) * .12; ry += (my - ry) * .12; pr.style.left = rx + 'px'; pr.style.top = ry + 'px'; requestAnimationFrame(lerp) }; lerp();
      return {
        enter: () => { pr.style.animationDuration = '.6s' },
        leave: () => { pr.style.animationDuration = '2s' }
      };
    }
  },
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
  position: fixed; pointer-events: none; z-index: 99990; opacity: 0.35;
  transition: opacity .2s;
}
#neon-h { left:0;right:0; height:1px; background: linear-gradient(90deg,transparent 0%,#8b5cf6 40%,#8b5cf6 60%,transparent 100%); }
#neon-v { top:0;bottom:0; width:1px; background: linear-gradient(to bottom,transparent 0%,#8b5cf6 40%,#8b5cf6 60%,transparent 100%); }
#neon-dot { position:fixed;width:10px;height:10px;background:#8b5cf6;border-radius:50%;pointer-events:none;z-index:99999;transform:translate(-50%,-50%);box-shadow:0 0 12px 4px rgba(139,92,246,0.6); }`,
    html: `<div id="neon-h"></div>
<div id="neon-v"></div>
<div id="neon-dot"></div>`,
    js: `const nh=document.getElementById('neon-h'),nv=document.getElementById('neon-v'),nd=document.getElementById('neon-dot');
document.addEventListener('mousemove',e=>{nh.style.top=e.clientY+'px';nv.style.left=e.clientX+'px';nd.style.left=e.clientX+'px';nd.style.top=e.clientY+'px'});`,
    react: `// NeonCrosshair.jsx`,
    init(wrap: HTMLElement) {
      wrap.innerHTML = `<div id="cnh" style="position:fixed;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent 0%,#8b5cf6 40%,#8b5cf6 60%,transparent 100%);pointer-events:none;z-index:99990;opacity:0.4"></div>
<div id="cnv" style="position:fixed;top:0;bottom:0;width:1px;background:linear-gradient(to bottom,transparent 0%,#8b5cf6 40%,#8b5cf6 60%,transparent 100%);pointer-events:none;z-index:99990;opacity:0.4"></div>
<div id="cnd" style="position:fixed;width:10px;height:10px;background:#8b5cf6;border-radius:50%;pointer-events:none;z-index:99999;transform:translate(-50%,-50%);box-shadow:0 0 12px 4px rgba(139,92,246,0.5)"></div>`;
      const nh = document.getElementById('cnh') as HTMLElement, nv = document.getElementById('cnv') as HTMLElement, nd = document.getElementById('cnd') as HTMLElement;
      document.onmousemove = e => { nh.style.top = e.clientY + 'px'; nv.style.left = e.clientX + 'px'; nd.style.left = e.clientX + 'px'; nd.style.top = e.clientY + 'px' };
      return {
        enter: () => { nh.style.opacity = '0.7'; nv.style.opacity = '0.7' },
        leave: () => { nh.style.opacity = '0.4'; nv.style.opacity = '0.4' }
      };
    }
  },
];



