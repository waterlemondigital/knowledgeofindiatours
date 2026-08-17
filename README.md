# 🇮🇳 Explore India — Sacred & Cultural Destinations

An animation-forward, data-driven tourism web application built with **React 18**, **Vite**, **Tailwind CSS**, and **Framer Motion** to help travellers and pilgrims discover sacred and cultural heritage sites across India.

---

## 🌟 Highlights

- **Dynamic Data-Driven Architecture**: Single source of truth loaded from `destinations.json` — zero hardcoded destination lists. Scales smoothly to new categories (forts, hill stations, wildlife).
- **Graceful Image Fallbacks**: Gradient placeholders with SVG deity/temple silhouettes keyed by religion when images are not yet added.
- **Rich Motion & Aesthetics**:
  - Parallax hero crossfading with Ken Burns effect
  - Interactive rotating geometric mandalas & floating ambient orbs
  - Smooth animated stat counters on scroll
  - Seamless marquee ticker
  - Glassmorphic category exploration cards
  - Real-time search, state dropdown, and faith filter pills with URL sync
  - Lightbox image viewer & responsive travel mode cards
- **Mobile Responsive**: Fully responsive layout tested across device breakpoints.

---

## 🛠️ Tech Stack

- **Framework**: React 18
- **Bundler**: Vite
- **Routing**: React Router v6
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Styling**: Tailwind CSS & Vanilla CSS Design Tokens

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or newer recommended)
- npm, pnpm, or yarn

### Installation & Run

```bash
# Clone the repository
git clone <repo-url>
cd knowledgeofindiatours

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 📁 Project Structure

```
knowledgeofindiatours/
├── public/
│   ├── favicon.svg
│   └── images/
│       └── destinations/       # 31 destination folders for hero/card/gallery images
│           ├── ajmer-sharif-dargah/
│           ├── golden-temple/
│           ├── kedarnath-temple/
│           └── ...
├── src/
│   ├── components/
│   │   ├── DestinationCard.jsx # Animated destination preview card
│   │   ├── FilterBar.jsx       # Search & multi-filter controller
│   │   ├── Footer.jsx          # Rich site footer with citations
│   │   ├── Gallery.jsx         # Destination image gallery
│   │   ├── ImageWithFallback.jsx# Gradient + SVG fallback image loader
│   │   ├── Lightbox.jsx        # Fullscreen modal image viewer
│   │   ├── Nav.jsx             # Glassmorphism header with mobile drawer
│   │   ├── QuickFacts.jsx      # Key details panel
│   │   └── SectionReveal.jsx   # Scroll-triggered stagger wrappers
│   ├── data/
│   │   └── destinations.json   # Verified destination dataset
│   ├── lib/
│   │   ├── filterHelpers.js    # State/religion deduplication & filtering
│   │   ├── religionColors.js   # Color schemes & badges by faith
│   │   └── slugHelpers.js      # URL slug lookups & cross-linking
│   ├── pages/
│   │   ├── About.jsx           # Mission & verified sources
│   │   ├── DestinationDetail.jsx# Parallax hero, facts & how-to-reach
│   │   ├── Explore.jsx         # Full searchable catalog
│   │   └── Home.jsx            # Landing page with rich animations
│   ├── App.jsx                 # Routes & AnimatePresence transitions
│   ├── index.css               # Design tokens & typography
│   └── main.jsx
├── .gitignore
├── package.json
└── vite.config.js
```

---

## 📷 Adding Destination Images

Drop images into `public/images/destinations/{slug}/`:
- `hero.jpg` — High-res hero image
- `card.jpg` — 3:4 thumbnail for cards
- `gallery-1.jpg`, `gallery-2.jpg`, `gallery-3.jpg`, `gallery-4.jpg` — Gallery photos

If images are missing, the application automatically displays religion-themed gradient placeholders with zero UI breakage.

---

## 📜 Sources & Data Verification

Content is verified against official government tourism portals including `tourism.rajasthan.gov.in`, `uttarakhandtourism.gov.in`, `incredibleindia.gov.in`, `devasthan.rajasthan.gov.in`, `amritsar.nic.in`, and respective state tourism departments.
