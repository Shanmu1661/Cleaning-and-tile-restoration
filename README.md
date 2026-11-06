# AquaGleam — Bathroom Cleaning & Tile Restoration Master HTML Template

A commercial, production-ready, ultra-responsive HTML5 & Tailwind CSS website template crafted specifically for **Bathroom Cleaning, Grout Restoration, Tile Recoloring, and Marble Diamond Polishing** businesses.

---

## 🌟 Key Features

- **11 Complete Pages**:
  1. `pages/index.html` — Conversion-optimized master landing page with hero, live before/after slider, instant quote estimator, services bento, 85% savings ROI comparison, 3-layer ceramic shield breakdown, room-by-room applications, microbial health threat index, verified case studies bento, emergency flood banner, and FAQ.
  2. `pages/home-2.html` — **Niche Specialty Landing Page**: Luxury Marble Honing, Travertine & Natural Stone Diamond Restoration with interactive acid-etch diagnostic selector, stone-specific estimator, 6-phase sequence, and 10,000-grit mirror vitrification showcase.
  3. `pages/about.html` — Company legacy (15+ years), environmental non-destructive philosophy, IICRC certifications, leadership team, and equipment technology.
  4. `pages/services.html` — Full catalog of tile & grout restoration services with a detailed multi-column comparison table against DIY and retiling.
  5. `pages/service-detail.html` — Dedicated deep-dive page for ColorSeal™ permanent grout recoloring with 8-shade designer palette chips, chemical formulation specs, and pricing package.
  6. `pages/gallery.html` — Interactive before/after split-sliders and filterable portfolio (Shower enclosures, Carrera marble, Victorian encaustic, Subway tiles, Terrazzo).
  7. `pages/booking.html` — Interactive 4-step booking wizard with live review summary and dynamic appointment confirmation modal with generated reference ID.
  8. `pages/contact.html` — Photo diagnostic request form with client-side validation, drag-and-drop upload zone, and styled Google Maps API placeholder.
  9. `pages/blog.html` — Master craftsman guides on mold science, bleach damage, and marble etching repairs.
  10. `pages/404.html` — Custom playful 404 error page with quick links back to working pages.
  11. `pages/coming-soon.html` — Maintenance / pre-launch page with live JavaScript animated countdown timer and early-bird newsletter capture.

---

## 🎨 Design & UI Standards

- **Color System**: Structured palette powered by CSS custom properties (`--primary: #0284c7`, `--secondary: #0d9488`, `--accent: #f59e0b`).
- **Typography**: Google Fonts pairing `Outfit` (body) and `Plus Jakarta Sans` (display/headings), with `Tajawal` for Arabic RTL.
- **Dark / Light Mode**: Theme toggle button in header & drawer with persistence in `localStorage` and automatic OS preference detection.
- **Full RTL Support**: Native Right-to-Left bidirectional layout toggle (`dir="rtl"`) with mirrored sliders, drawer transitions, and text alignment.
- **WCAG 2.1 AA Accessibility**: Skip to content link, high contrast ratios, touch targets >= 44px, semantic ARIA attributes.
- **Non-Repeating Images**: Every single image across all pages is a contextually relevant, unique, high-resolution tile & bathroom photograph.
- **Interactive Widgets**:
  - Drag-and-drop before/after image comparison slider.
  - Real-time bathroom cost & duration calculator.
  - Multi-step booking wizard with step indicators.
  - Floating WhatsApp, phone hotline, and back-to-top button.
  - Custom toast notification engine.

---

## 📁 File Structure

```
AquaGleam/
├── index.html                 # Direct gateway redirect to pages/index.html
├── sitemap.xml                # SEO XML sitemap for search crawlers
├── robots.txt                 # Production crawling directives
├── README.md                  # Template documentation & quick start
├── assets/
│   ├── css/
│   │   ├── style.css          # Main stylesheet with CSS variables & components
│   │   ├── dark-mode.css      # Dark theme tokens and surface adjustments
│   │   └── rtl.css            # RTL layout overrides and bidirectional rules
│   ├── js/
│   │   ├── main.js            # Theme toggle, RTL toggle, mobile drawer, sliders
│   │   ├── booking.js         # Cost estimator engine & 4-step booking wizard
│   │   └── plugins/           # Supporting scripts and helpers
│   ├── images/                # Asset storage directory
│   └── fonts/                 # Web font assets
├── pages/
│   ├── index.html             # Home 1: Master Clean & Grout
│   ├── home-2.html            # Home 2: Luxury Stone & Marble Honing (Niche)
│   ├── about.html             # About Us
│   ├── services.html          # Services Overview & Comparison Matrix
│   ├── service-detail.html    # ColorSeal™ Deep Dive
│   ├── gallery.html           # Before/After Interactive Portfolio
│   ├── booking.html           # 4-Step Booking Wizard
│   ├── blog.html              # Care Guides & Articles
│   ├── contact.html           # Contact & Photo Diagnostic
│   ├── 404.html               # Custom 404 Error
│   └── coming-soon.html       # Maintenance & Countdown Timer
└── documentation/
    └── index.html             # Comprehensive interactive developer manual
```

---

## 🚀 Quick Start Guide

1. **Direct Preview**: Double-click `index.html` at the project root or open `pages/index.html` in any web browser.
2. **Local HTTP Server** (Recommended):
   ```bash
   # Python 3
   python -m http.server 8000

   # Node http-server
   npx http-server . -p 8000
   ```
3. Open `http://localhost:8000/` in your browser.

---

## 🛠️ Forms Integration

The forms are pre-configured with client-side validation and toast notifications. To connect to a live email inbox:
- **Formspree**: Set `action="https://formspree.io/f/YOUR_FORM_ID"` and `method="POST"`.
- **Netlify Forms**: Add `data-netlify="true"` to any `<form>`.

---

## 📄 License & Credits

- **Tailwind CSS**: MIT License
- **Font Awesome 6**: CC BY 4.0 / SIL OFL 1.1
- **Google Fonts**: SIL Open Font License (Outfit, Plus Jakarta Sans, Tajawal)
- **Imagery**: Unsplash (Free commercial license)
