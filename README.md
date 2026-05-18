<div align="center">

# ✦ Custom Cursors

**A modern collection of 12+ beautiful, animated cursor effects for websites.**
Try live demos · Copy production-ready code · Zero dependencies

[![Live Site](https://img.shields.io/badge/Live_Site-custom--cursors.tech-7c6cff?style=flat-square&logo=vercel)](https://www.custom-cursors.tech/)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square)](CONTRIBUTING.md)
[![Stars](https://img.shields.io/github/stars/devkunal2812/Custom-Cursors?style=flat-square)](https://github.com/devkunal2812/Custom-Cursors/stargazers)

<br/>

> 🔵 Dot Ring · 💜 Glow Orb · 💗 Magnetic Snap · 💚 Crosshair · 💛 Particle Trail · and 7 more...

**[→ Try it Live](https://www.custom-cursors.tech/) · [→ Browse Issues](https://github.com/devkunal2812/Custom-Cursors/issues) · [→ Contributing Guide](CONTRIBUTING.md)**

</div>

---

## ✨ What is Custom Cursors?

Custom Cursors is an interactive web project showcasing **12+ production-ready animated cursor effects**. Each cursor comes with:

- **Live interactive demo** — see it in action before using it
- **Copy-paste code** — HTML/CSS/JS and React snippets included
- **Zero dependencies** — pure vanilla JavaScript implementations
- **Mobile-aware** — automatically disabled on touch devices

Whether you're building a portfolio, creative agency site, or SaaS dashboard — grab a cursor and make your UI unforgettable.

---

## 🌈 Available Cursors

| Cursor | Color | Effect |
|--------|-------|--------|
| 🔵 **Dot + Ring** | Blue | Classic two-layer cursor with smooth trailing |
| 💜 **Glow Orb** | Purple | Soft glowing orb with luminous trail |
| 💗 **Magnetic Snap** | Pink | Snaps toward interactive elements |
| 💚 **Crosshair** | Green | Precision targeting with animated lines |
| 💛 **Particle Trail** | Yellow | Leaves fading particles as you move |
| 🧡 **Morphing Blob** | Orange | Organic shape-shifting animation |
| 🩵 **Spotlight** | Cyan | Radial light revealing effect |
| 🌊 **Water Ripple** | Teal | Expanding ripple rings on movement |
| ❤️ **Text Label** | Red | Custom text following cursor |
| ⚪ **Clean Ring** | White | Ultra-minimal single ring |
| 🟢 **Pulse Ring** | Emerald | Pulsing outer ring animation |
| 💙 **Neon Crosshair** | Violet | Full-viewport glowing lines |

---

## 🚀 Quick Start

### Run Locally

```bash
# Clone the repo
git clone https://github.com/devkunal2812/Custom-Cursors.git
cd Custom-Cursors

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you're ready.

### Use a Cursor in Your Own Project

1. Visit [custom-cursors.tech](https://www.custom-cursors.tech/)
2. Click any cursor card to see it live
3. Hit the **Code** button
4. Choose **HTML/CSS/JS** or **React**
5. Copy and paste into your project

#### Example — Dot Ring (Vanilla JS)

```html
<!-- HTML: place just before </body> -->
<div id="cursor-dot"></div>
<div id="cursor-ring"></div>
```

```css
/* CSS */
body { cursor: none; }

#cursor-dot {
  position: fixed;
  width: 10px; height: 10px;
  background: #60a5fa;
  border-radius: 50%;
  pointer-events: none;
  z-index: 99999;
  transform: translate(-50%, -50%);
  transition: transform 0.1s ease;
}

#cursor-ring {
  position: fixed;
  width: 36px; height: 36px;
  border: 2px solid #60a5fa;
  border-radius: 50%;
  pointer-events: none;
  z-index: 99998;
  transform: translate(-50%, -50%);
  transition: transform 0.15s ease, width 0.2s ease, height 0.2s ease;
}
```

```javascript
// JavaScript
const dot  = document.getElementById('cursor-dot');
const ring = document.getElementById('cursor-ring');

// Use requestAnimationFrame for smooth 60fps tracking
let mouseX = 0, mouseY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
}, { passive: true });

const animate = () => {
  dot.style.left  = mouseX + 'px';
  dot.style.top   = mouseY + 'px';
  ring.style.left = mouseX + 'px';
  ring.style.top  = mouseY + 'px';
  requestAnimationFrame(animate);
};

animate();
```

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| [Next.js 14](https://nextjs.org/) (App Router) | Framework |
| [TypeScript 5](https://www.typescriptlang.org/) | Type safety |
| CSS Modules | Component scoped styles |
| Google Fonts (DM Sans, DM Mono, Syne) | Typography |
| Vercel | Deployment |

---

## 📁 Project Structure

```
Custom-Cursors/
├── app/
│   ├── layout.tsx       # Root layout + SEO metadata
│   ├── page.tsx         # Main page with structured data
│   ├── sitemap.ts       # Dynamic sitemap
│   └── globals.css      # Global styles + CSS variables
│
├── components/
│   ├── Header.tsx       # Site navigation
│   ├── Hero.tsx         # Hero section
│   ├── CursorGrid.tsx   # Responsive cursor card grid
│   ├── CursorCard.tsx   # Individual cursor card + demo
│   ├── DemoZone.tsx     # Interactive cursor preview area
│   ├── CodeModal.tsx    # Code snippet modal
│   ├── CursorWrapper.tsx# Cursor effect renderer
│   └── Footer.tsx       # Footer
│
├── data/
│   └── cursors.ts       # All cursor definitions + code snippets
│
├── types/
│   └── cursor.ts        # TypeScript interfaces
│
├── public/
│   ├── robots.txt
│   └── manifest.json
│
├── CONTRIBUTING.md      # Contributor guide
└── package.json
```

---

## 🤝 Contributing

Contributions are very welcome! This project is actively looking for:

- 🎨 New cursor effect implementations
- ⚡ Performance improvements
- ♿ Accessibility enhancements
- 📱 Mobile/responsive fixes
- 📝 Documentation improvements

**Read the full guide: [CONTRIBUTING.md](CONTRIBUTING.md)**

Quick steps:

```bash
# Fork → Clone → Branch → Code → PR

git checkout -b feat/your-amazing-cursor
git commit -m "feat(cursor): add amazing new cursor effect"
git push origin feat/your-amazing-cursor
# Then open a Pull Request on GitHub
```

[→ View Open Issues](https://github.com/devkunal2812/Custom-Cursors/issues) — look for `good first issue` labels to get started!

---

## 🗺️ Roadmap

- [x] 12 cursor effects with live demos
- [x] Copy-paste HTML/CSS/JS + React code
- [x] SEO optimized (score 91/100)
- [x] Mobile-safe (auto-disabled on touch)
- [ ] Dark / light mode toggle
- [ ] Category filtering system
- [ ] Page loading animation
- [ ] Cursor customizer tool (color, size, speed)
- [ ] npm package for easy installation
- [ ] Animation timeline editor

---

## 📱 Browser Support

| Browser | Status |
|---------|--------|
| Chrome (latest) | ✅ Supported |
| Firefox (latest) | ✅ Supported |
| Safari (latest) | ✅ Supported |
| Edge (latest) | ✅ Supported |
| Mobile / Touch | ✅ Gracefully disabled |

---

## 📝 License

MIT License — see [LICENSE](LICENSE) for details.
Free to use in personal and commercial projects.

---

## 📧 Contact & Support

**Kunal** — [@devkunal2812](https://github.com/devkunal2812)

- 🐛 Found a bug? [Open an issue](https://github.com/devkunal2812/Custom-Cursors/issues)
- 💡 Have an idea? [Start a discussion](https://github.com/devkunal2812/Custom-Cursors/discussions)
- ⭐ Like the project? Give it a star — it helps a lot!

---

<div align="center">

**Made with 💙 by Kunal**

[custom-cursors.tech](https://www.custom-cursors.tech/) · [GitHub](https://github.com/devkunal2812/Custom-Cursors)

</div>
