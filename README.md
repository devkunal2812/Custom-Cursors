# 🎨 Kunal's Build - Custom Cursor Library

> **12+ stunning custom cursor effects for modern websites**  
> Try live demos · Copy code snippets · Zero dependencies

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](CONTRIBUTING.md)

---

## ✨ Features

- 🎯 **12 Unique Cursors** - Dot Ring, Glow Orb, Magnetic Snap, Crosshair, Particle Trail & more
- 🎨 **Rainbow Colors** - Each cursor has its own vibrant color scheme
- 🚀 **Live Demos** - Try every cursor interactively before using
- 📦 **Copy & Paste** - Get HTML, CSS, JavaScript, and React code
- 🎭 **Zero Dependencies** - Pure vanilla JavaScript implementations
- 📱 **Responsive** - Automatically disabled on mobile devices
- ♿ **Accessible** - ARIA labels and semantic HTML
- 🔍 **SEO Optimized** - Complete meta tags and structured data

---

## 🎬 Demo

**Live Site:** [custom-cursors.tech](https://custom-cursors.tech)

---

## 🌈 Available Cursors

| Cursor | Color | Description |
|--------|-------|-------------|
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

### Installation

```bash
# Clone the repository
git clone https://github.com/devkunal2812/Custom-Cursors.git

# Navigate to project
cd Custom-Cursors

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Using a Cursor in Your Project

1. **Click "Code" button** on any cursor
2. **Choose your format**: HTML/CSS/JS or React
3. **Copy the code snippets**
4. **Paste into your project**

#### Example: Dot + Ring Cursor

```html
<!-- HTML -->
<div id="cursor-dot"></div>
<div id="cursor-ring"></div>
```

```css
/* CSS */
body { cursor: none; }
#cursor-dot {
  position: fixed;
  width: 10px;
  height: 10px;
  background: #60a5fa;
  border-radius: 50%;
  pointer-events: none;
  z-index: 99999;
  transform: translate(-50%, -50%);
}
/* ... more styles */
```

```javascript
// JavaScript
const dot = document.getElementById('cursor-dot');
document.addEventListener('mousemove', e => {
  dot.style.left = e.clientX + 'px';
  dot.style.top = e.clientY + 'px';
});
// ... more code
```

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** CSS Modules
- **Fonts:** Google Fonts (DM Sans, DM Mono, Syne)
- **Deployment:** Vercel / Netlify ready

---

## 📁 Project Structure

```
Custom-Cursors/
├── app/
│   ├── layout.tsx          # Root layout with SEO metadata
│   ├── page.tsx            # Main page with structured data
│   ├── sitemap.ts          # Dynamic sitemap generator
│   └── globals.css         # Global styles
├── components/
│   ├── Header.tsx          # Site header
│   ├── Hero.tsx            # Hero section
│   ├── CursorGrid.tsx      # Cursor cards grid
│   ├── CursorCard.tsx      # Individual cursor card
│   ├── DemoZone.tsx        # Interactive demo area
│   ├── CodeModal.tsx       # Code snippet modal
│   ├── CursorWrapper.tsx   # Cursor effect wrapper
│   └── Footer.tsx          # Site footer
├── data/
│   └── cursors.ts          # Cursor definitions & code
├── types/
│   └── cursor.ts           # TypeScript types
├── public/
│   ├── robots.txt          # SEO robots file
│   └── manifest.json       # PWA manifest
└── package.json
```

---

## 🎨 Customization

### Change Cursor Colors

Edit `data/cursors.ts`:

```typescript
{
  id: 'dot-ring',
  name: 'Dot + Ring',
  accent: '#60a5fa', // Change this color
  // ...
}
```

### Add New Cursor

1. Add cursor definition to `data/cursors.ts`
2. Include `init()` function with cursor logic
3. Provide CSS, HTML, JS, and React code snippets

---

## 🔍 SEO Features

- ✅ Comprehensive meta tags
- ✅ Open Graph (Facebook/LinkedIn)
- ✅ Twitter Cards
- ✅ Structured Data (JSON-LD)
  - WebApplication schema
  - BreadcrumbList schema
  - FAQPage schema
- ✅ Semantic HTML
- ✅ ARIA labels
- ✅ robots.txt
- ✅ Dynamic sitemap
- ✅ PWA manifest

**SEO Score: 91/100** 🎉

---

## 📱 Browser Support

| Browser | Version |
|---------|---------|
| Chrome | ✅ Latest |
| Firefox | ✅ Latest |
| Safari | ✅ Latest |
| Edge | ✅ Latest |
| Opera | ✅ Latest |

**Note:** Custom cursors are automatically disabled on mobile/touch devices.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-cursor`)
3. Commit your changes (`git commit -m 'Add amazing cursor'`)
4. Push to the branch (`git push origin feature/amazing-cursor`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Inspired by modern web design trends
- Built with ❤️ using Next.js
- Fonts from Google Fonts
- Icons and design patterns from the community

---

## 📧 Contact

**Kunal** - [@devkunal2812](https://github.com/devkunal2812)

**Project Link:** [https://github.com/devkunal2812/Custom-Cursors](https://github.com/devkunal2812/Custom-Cursors)

---

## ⭐ Show Your Support

If you found this project helpful, please give it a ⭐ on GitHub!

---

## 🗺️ Roadmap

- [x] Add more cursor effects (12+ total)
- [x] Create individual cursor detail pages
- [x] Add documentation page
- [ ] Add video tutorials
- [ ] Implement cursor customizer tool
- [ ] Add dark/light theme toggle
- [ ] Create npm package for easy installation
- [ ] Add cursor performance metrics
- [ ] Build cursor animation timeline editor

---

**Made with 💙 by Kunal | Visit: [custom-cursors.tech](https://custom-cursors.tech)**
