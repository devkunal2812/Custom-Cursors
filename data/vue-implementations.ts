/**
 * Vue 3 Composition API implementations for all cursors
 * This file contains Vue implementations that can be imported and used
 */

export const VUE_IMPLEMENTATIONS: Record<string, string> = {
  // Ripple cursor
  'ripple': `<!-- RippleCursor.vue -->
<!-- Usage: <RippleCursor /> in your Vue 3 app -->
<template>
  <canvas ref="canvasEl" class="ripple-canvas" />
  <div ref="dotEl" class="cursor-dot" :style="{ background: color }" />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const props = withDefaults(defineProps<{ color?: string }>(), { color: '#14b8a6' });

const canvasEl = ref<HTMLCanvasElement | null>(null);
const dotEl = ref<HTMLElement | null>(null);

onMounted(() => {
  document.body.style.cursor = 'none';

  const canvas = canvasEl.value!;
  const ctx = canvas.getContext('2d')!;
  const MAX_R = 80;
  let W: number, H: number;
  let ripples: Ripple[] = [];

  const resize = () => {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  };
  resize();
  window.addEventListener('resize', resize);

  class Ripple {
    x: number; y: number; r: number; life: number;
    constructor(x: number, y: number) {
      this.x = x; this.y = y; this.r = 0; this.life = 1;
    }
    update() {
      if (this.r < MAX_R) { this.r += 2.5; this.life -= 0.028; }
      else { this.life -= 0.05; }
    }
    draw() {
      if (this.life <= 0) return;
      ctx.save();
      ctx.globalAlpha = this.life * 0.6;
      ctx.strokeStyle = props.color;
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }
  }

  let lx = 0, ly = 0, lt = 0;
  const onMove = (e: MouseEvent) => {
    dotEl.value!.style.left = e.clientX + 'px';
    dotEl.value!.style.top = e.clientY + 'px';
    if (Date.now() - lt > 100 && (Math.abs(e.clientX - lx) + Math.abs(e.clientY - ly)) > 10) {
      ripples.push(new Ripple(e.clientX, e.clientY));
      lx = e.clientX; ly = e.clientY; lt = Date.now();
    }
  };

  const onClick = (e: MouseEvent) => {
    ripples.push(new Ripple(e.clientX + Math.random() * 6 - 3, e.clientY + Math.random() * 6 - 3));
    ripples.push(new Ripple(e.clientX + Math.random() * 6 - 3, e.clientY + Math.random() * 6 - 3));
  };

  document.addEventListener('mousemove', onMove);
  document.addEventListener('click', onClick);

  let raf: number;
  const loop = () => {
    ctx.clearRect(0, 0, W, H);
    ripples = ripples.filter(r => r.life > 0);
    ripples.forEach(r => { r.update(); r.draw(); });
    raf = requestAnimationFrame(loop);
  };
  raf = requestAnimationFrame(loop);

  onUnmounted(() => {
    document.body.style.cursor = '';
    document.removeEventListener('mousemove', onMove);
    document.removeEventListener('click', onClick);
    window.removeEventListener('resize', resize);
    cancelAnimationFrame(raf);
  });
});
</script>

<style scoped>
.ripple-canvas {
  position: fixed; inset: 0; pointer-events: none; z-index: 99990;
}
.cursor-dot {
  position: fixed; width: 10px; height: 10px; border-radius: 50%;
  pointer-events: none; z-index: 99999; transform: translate(-50%,-50%);
  transition: width .2s, height .2s;
}
</style>`,

  // Text Label cursor
  'text-follow': `<!-- TextLabelCursor.vue -->
<!-- Usage: <TextLabelCursor /> in your Vue 3 app -->
<!-- Add data-cursor-text="YOUR TEXT" to any element to activate the label -->
<template>
  <div ref="labelEl" class="cursor-label" :style="{ background: color, color: textColor }">
    {{ labelText }}
  </div>
  <div ref="dotEl" class="cursor-dot" :style="{ background: color }" />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const props = withDefaults(defineProps<{ color?: string; textColor?: string }>(), {
  color: '#ef4444',
  textColor: '#000'
});

const labelEl = ref<HTMLElement | null>(null);
const dotEl = ref<HTMLElement | null>(null);
const labelText = ref('VIEW →');

let raf: number;
const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
const cur = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

function onMove(e: MouseEvent) {
  pos.x = e.clientX; pos.y = e.clientY;
  dotEl.value!.style.left = e.clientX + 'px';
  dotEl.value!.style.top = e.clientY + 'px';
}

function loop() {
  cur.x += (pos.x - cur.x) * 0.1;
  cur.y += (pos.y - cur.y) * 0.1;
  labelEl.value!.style.left = cur.x + 'px';
  labelEl.value!.style.top = cur.y + 'px';
  raf = requestAnimationFrame(loop);
}

function onEnter(e: Event) {
  const el = (e.target as HTMLElement).closest('[data-cursor-text]') as HTMLElement | null;
  if (el) {
    labelEl.value!.style.opacity = '1';
    labelText.value = el.dataset.cursorText || 'VIEW →';
  }
}

function onLeave(e: Event) {
  if ((e.target as HTMLElement).closest?.('[data-cursor-text]')) {
    labelEl.value!.style.opacity = '0';
  }
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
.cursor-label {
  position: fixed; pointer-events: none; z-index: 99999;
  transform: translate(-50%, -50%);
  font-size: 11px; font-weight: 700; letter-spacing: .12em;
  padding: 8px 16px; border-radius: 100px;
  white-space: nowrap; font-family: sans-serif;
  opacity: 0; transition: opacity .2s;
}
.cursor-dot {
  position: fixed; width: 8px; height: 8px; border-radius: 50%;
  pointer-events: none; z-index: 99999; transform: translate(-50%,-50%);
}
</style>`,

  // Clean Ring cursor
  'outline-only': `<!-- CleanRingCursor.vue -->
<!-- Usage: <CleanRingCursor /> in your Vue 3 app -->
<!-- Best on dark backgrounds -->
<template>
  <div ref="ringEl" class="cursor-ring" :style="{ borderColor: color }" />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const props = withDefaults(defineProps<{ color?: string }>(), {
  color: 'rgba(255,255,255,0.7)'
});

const ringEl = ref<HTMLElement | null>(null);
let raf: number;
const cur = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

function onMove(e: MouseEvent) {
  target.x = e.clientX; target.y = e.clientY;
}

function loop() {
  cur.x += (target.x - cur.x) * 0.14;
  cur.y += (target.y - cur.y) * 0.14;
  ringEl.value!.style.left = cur.x + 'px';
  ringEl.value!.style.top = cur.y + 'px';
  raf = requestAnimationFrame(loop);
}

function onEnter() {
  ringEl.value!.style.width = '50px';
  ringEl.value!.style.height = '50px';
  ringEl.value!.style.borderColor = 'rgba(255,255,255,1)';
}

function onLeave() {
  ringEl.value!.style.width = '32px';
  ringEl.value!.style.height = '32px';
  ringEl.value!.style.borderColor = props.color;
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
.cursor-ring {
  position: fixed; width: 32px; height: 32px;
  border: 1.5px solid; border-radius: 50%;
  pointer-events: none; z-index: 99999;
  transform: translate(-50%,-50%);
  transition: width .3s, height .3s, border-color .3s;
}
</style>`,

  // Pulse Ring cursor
  'pulse-ring': `<!-- PulseRingCursor.vue -->
<!-- Usage: <PulseRingCursor /> in your Vue 3 app -->
<template>
  <div ref="dotEl" class="cursor-dot" :style="{ background: color }" />
  <div ref="ringEl" class="cursor-ring" :style="{ borderColor: \`\${color}99\` }" />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const props = withDefaults(defineProps<{ color?: string }>(), { color: '#10b981' });

const dotEl = ref<HTMLElement | null>(null);
const ringEl = ref<HTMLElement | null>(null);

let raf: number;
const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
const ring = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

function onMove(e: MouseEvent) {
  pos.x = e.clientX; pos.y = e.clientY;
  dotEl.value!.style.left = e.clientX + 'px';
  dotEl.value!.style.top = e.clientY + 'px';
}

function loop() {
  ring.x += (pos.x - ring.x) * 0.12;
  ring.y += (pos.y - ring.y) * 0.12;
  ringEl.value!.style.left = ring.x + 'px';
  ringEl.value!.style.top = ring.y + 'px';
  raf = requestAnimationFrame(loop);
}

function onEnter() {
  ringEl.value!.style.animationDuration = '.6s';
}

function onLeave() {
  ringEl.value!.style.animationDuration = '2s';
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
  position: fixed; width: 8px; height: 8px; border-radius: 50%;
  pointer-events: none; z-index: 99999; transform: translate(-50%,-50%);
}
.cursor-ring {
  position: fixed; width: 30px; height: 30px;
  border: 2px solid; border-radius: 50%;
  pointer-events: none; z-index: 99998;
  transform: translate(-50%,-50%);
  animation: pulseCur 2s ease-in-out infinite;
}

@keyframes pulseCur {
  0%, 100% { opacity: 1; transform: translate(-50%,-50%) scale(1); }
  50% { opacity: 0.4; transform: translate(-50%,-50%) scale(1.4); }
}
</style>`,

  // Neon Crosshair cursor
  'neon-cross': `<!-- NeonCrosshairCursor.vue -->
<!-- Usage: <NeonCrosshairCursor /> in your Vue 3 app -->
<template>
  <div ref="hEl" class="neon-h" :style="hStyle" />
  <div ref="vEl" class="neon-v" :style="vStyle" />
  <div ref="dotEl" class="neon-dot" :style="{ background: color, boxShadow: \`0 0 12px 4px \${color}99\` }" />
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';

const props = withDefaults(defineProps<{ color?: string }>(), { color: '#8b5cf6' });

const hEl = ref<HTMLElement | null>(null);
const vEl = ref<HTMLElement | null>(null);
const dotEl = ref<HTMLElement | null>(null);

const hStyle = computed(() => ({
  background: \`linear-gradient(90deg, transparent 0%, \${props.color} 40%, \${props.color} 60%, transparent 100%)\`
}));

const vStyle = computed(() => ({
  background: \`linear-gradient(to bottom, transparent 0%, \${props.color} 40%, \${props.color} 60%, transparent 100%)\`
}));

function onMove(e: MouseEvent) {
  hEl.value!.style.top = e.clientY + 'px';
  vEl.value!.style.left = e.clientX + 'px';
  dotEl.value!.style.left = e.clientX + 'px';
  dotEl.value!.style.top = e.clientY + 'px';
}

function onEnter() {
  hEl.value!.style.opacity = '0.7';
  vEl.value!.style.opacity = '0.7';
}

function onLeave() {
  hEl.value!.style.opacity = '0.35';
  vEl.value!.style.opacity = '0.35';
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
.neon-h, .neon-v {
  position: fixed; pointer-events: none; z-index: 99990;
  opacity: 0.35; transition: opacity .2s;
}
.neon-h {
  left: 0; right: 0; height: 1px;
}
.neon-v {
  top: 0; bottom: 0; width: 1px;
}
.neon-dot {
  position: fixed; width: 10px; height: 10px; border-radius: 50%;
  pointer-events: none; z-index: 99999; transform: translate(-50%,-50%);
}
</style>`,
};
