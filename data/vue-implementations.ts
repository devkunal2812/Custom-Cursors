/**
 * Vue 3 Composition API implementations for all cursors
 * Each cursor is a complete .vue file implementation
 */

export const VUE_IMPLEMENTATIONS: Record<string, string> = {
  'dot-ring': `<!-- DotRingCursor.vue -->
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

  'glow-orb': `<!-- GlowOrbCursor.vue -->
<template>
  <div ref="orbEl"  class="cursor-orb"  :style="{ background: color, boxShadow: \`0 0 20px 6px \${color}66\` }" />
  <div ref="auraEl" class="cursor-aura" :style="{ background: \`\${color}1f\` }" />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const props = withDefaults(defineProps<{ color?: string }>(), { color: '#a78bfa' });

const orbEl  = ref<HTMLElement | null>(null);
const auraEl = ref<HTMLElement | null>(null);
let raf: number;
const pos  = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
const aura = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

function onMove(e: MouseEvent) {
  pos.x = e.clientX; pos.y = e.clientY;
  orbEl.value!.style.left = e.clientX + 'px';
  orbEl.value!.style.top  = e.clientY + 'px';
}

function loop() {
  aura.x += (pos.x - aura.x) * 0.08;
  aura.y += (pos.y - aura.y) * 0.08;
  auraEl.value!.style.left = aura.x + 'px';
  auraEl.value!.style.top  = aura.y + 'px';
  raf = requestAnimationFrame(loop);
}

onMounted(() => {
  document.body.style.cursor = 'none';
  document.addEventListener('mousemove', onMove);
  raf = requestAnimationFrame(loop);
});

onUnmounted(() => {
  document.body.style.cursor = '';
  document.removeEventListener('mousemove', onMove);
  cancelAnimationFrame(raf);
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

  // Add more cursors here...
  'magnetic': `<!-- Vue implementation for Magnetic cursor -->`,
  'crosshair': `<!-- Vue implementation for Crosshair cursor -->`,
  'trail': `<!-- Vue implementation for Trail cursor -->`,
  'morph': `<!-- Vue implementation for Morph cursor -->`,
  'spotlight': `<!-- Vue implementation for Spotlight cursor -->`,
  'ripple': `<!-- Vue implementation for Ripple cursor -->`,
  'text-follow': `<!-- Vue implementation for Text Label cursor -->`,
  'outline-only': `<!-- Vue implementation for Clean Ring cursor -->`,
  'pulse-ring': `<!-- Vue implementation for Pulse Ring cursor -->`,
  'neon-cross': `<!-- Vue implementation for Neon Crosshair cursor -->`,
};
