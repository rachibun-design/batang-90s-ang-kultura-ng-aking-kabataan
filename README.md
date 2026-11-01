# BATANG 90s — Ang Kultura ng Aking Kabataan
### An Interactive Filipino Nostalgia Virtual Museum (1990s – Early 2000s)

> **"Isang digital na paglalakbay sa kultura, bagay, aliwan, at pang-araw-araw na buhay ng batang Pilipino noong dekada nobenta hanggang unang bahagi ng dekada dos mil."**

---

## 1. Project Overview

**BATANG 90s: Ang Kultura ng Aking Kabataan** is an interactive, responsive digital cultural archive celebrating Filipino childhood, popular culture, and domestic life from the 1990s through the early 2000s. 

Unlike traditional institutional museums or corporate sites, this project operates as an extensive personal collection of cultural ephemera, memorabilia, oral histories, and tactile memories. It balances heartfelt nostalgia with rigorous cultural documentation, distinguishing verified historical facts from oral recollections and personal childhood lore.

### The Six Curated Exhibition Galleries:
1. **Gallery 01 — Larong Kalye**: Traditional street games (*Teks, Pogs, Holen, Jackstones, Chinese Garter, Tumbang Preso, Patintero*).
2. **Gallery 02 — Buhay Eskwela**: Classroom life, supplies, and rituals (*Mongol No. 2 pencils, multi-compartment magnetic pencil cases, assignment notebooks wrapped in plastic, Crayola, baon routines*).
3. **Gallery 03 — Telebisyon at Aliwan**: Home entertainment and broadcast culture (*Woodgrain CRT TVs, VHS rental culture and car-shaped rewinders, Tagalog-dubbed anime like Ghost Fighter and Slam Dunk, OPM alternative rock on cassette tapes*).
4. **Gallery 04 — Tindahan at Pagkain**: Neighborhood micro-commerce (*Sari-sari stores, Choc-Nut, Haw Flakes, Mik-Mik, softdrinks in plastic bags with straws, homemade ice candy*).
5. **Gallery 05 — Welcome to the Y2K Era**: The dawn of personal computing and mobile connectivity (*Nokia 5110/3310 SMS revolution, 56k dial-up internet handshake, Netopia internet cafes, mIRC #philippines, floppy disks*).
6. **Gallery 06 — Araw-Araw noong 90s**: Domestic life and traditions (*Rotating brownout candle shadow theater, crocheted TV doilies, birthday hotdogs with marshmallows on barbecue sticks, family photo albums*).

### Key Interactive Features:
- **Interactive Artifact Viewer**: Deep exhibit inspection with cultural background, how it was used, trivia, and related artifact recommendations.
- **Naalala Mo Ba?**: Instant random nostalgia discovery generator.
- **Mga Alaala Natin (Memory Wall)**: Local community memory wall where visitors share childhood memories (stored securely in browser `localStorage`).
- **Nostalgia Quiz**: *"Gaano Ka-Kumpleto ang 90s Childhood Mo?"* 8-question scored quiz with humorous Pinoy badges.
- **Digital Time Capsule**: Chronological timeline spanning Early 1990s, Mid-1990s, Late 1990s, Early 2000s, and the Y2K Era.
- **Retro Walkman Audio Synthesizer**: Zero-404 Web Audio procedural sound synthesizer (OPM rock guitar riffs, authentic 56k dial-up modem handshakes, afternoon anime brass melodies, and street sounds).
- **Interactive Y2K Windows 98 Desktop**: Interactive simulated desktop with mIRC chat room, dial-up connect simulator, and 1996 Slambook.
- **CRT Scanlines Overlay Toggle**: Instant retro monitor scanline simulation.

---

## 2. Technology Stack

- **Framework**: React 19 + TypeScript
- **Bundler & Tooling**: Vite 8 (configured with `base: './'` for seamless GitHub Pages repository subpaths)
- **Styling**: Tailwind CSS v4 with custom retro-scrapbook palettes, washi tape effects, and typography
- **Typography**: Google Fonts (*Fredoka*, *Patrick Hand*, *Plus Jakarta Sans*, *Space Mono*, *VT323*)
- **Icons**: Lucide React
- **Audio Engine**: Web Audio API (100% procedural sound synthesis; zero external MP3 dependencies)
- **Hosting Target**: GitHub Pages (Static build with GitHub Actions automation)

---

## 3. Folder Structure

```
batang-90s/
├── .github/
│   └── workflows/
│       └── deploy.yml             # GitHub Actions deployment workflow for GitHub Pages
├── public/                        # Static assets
├── src/
│   ├── assets/
│   │   └── images/                # High-resolution documentary plates
│   ├── audio/
│   │   └── retroAudioEngine.ts    # Web Audio procedural synthesis engine
│   ├── components/
│   │   ├── RetroHeader.tsx        # Top navigation header & quick tools
│   │   ├── HeroSection.tsx        # Nostalgic hero section with official manifesto
│   │   ├── GalleriesSection.tsx   # 6-gallery exhibition overview
│   │   ├── GalleryView.tsx        # Gallery exhibit catalog with era filtering
│   │   ├── ArtifactDetailModal.tsx# Comprehensive artifact modal
│   │   ├── NaalalaMoBaModal.tsx   # Random memory discovery modal
│   │   ├── MemoryWallSection.tsx  # Interactive community memory wall
│   │   ├── NostalgiaQuizModal.tsx # Interactive 90s childhood quiz
│   │   ├── TimeCapsuleModal.tsx   # Historical digital timeline
│   │   ├── AboutMuseumModal.tsx   # Curatorial statement & methodology
│   │   ├── RetroDesktopModal.tsx  # Y2K Windows 98 desktop & mIRC
│   │   ├── CassettePlayerWidget.tsx# Walkman cassette player widget
│   │   └── SearchResultsView.tsx  # Full archive search & filter
│   ├── data/
│   │   └── museumData.ts          # Complete catalog of exhibits, memories, quiz, & timeline
│   ├── types/
│   │   └── museum.ts              # TypeScript interfaces
│   ├── App.tsx                    # Main state machine and layout router
│   ├── index.css                  # Tailwind styles and paper textures
│   └── main.tsx                   # React root entry point
├── index.html                     # HTML5 shell with fonts and metadata
├── package.json                   # Dependencies & npm scripts
├── tsconfig.json                  # TypeScript compiler options
└── vite.config.ts                 # Vite bundler configuration
```

---

## 4. How to Run Locally

### Prerequisites:
- Node.js (version 18 or 20+ recommended)
- npm or yarn

### Steps:
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/batang-90s.git
   cd batang-90s
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the local development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to:
   ```
   http://localhost:3000 (or the port indicated in your terminal)
   ```

---

## 5. How to Add or Edit Exhibits

All exhibit data is stored in a clean, typed format inside `/src/data/museumData.ts` under the `ALL_ARTIFACTS` array.

To add a new exhibit:
```typescript
{
  id: 'art-my-new-exhibit',
  galleryId: 'larong-kalye', // Options: 'larong-kalye' | 'buhay-eskwela' | 'telebisyon-aliwan' | 'tindahan-pagkain' | 'y2k-era' | 'araw-araw-90s'
  title: 'English Title',
  tagalogTitle: 'Pamagat sa Filipino',
  subtitle: 'Descriptive Subtitle',
  period: 'Mid-1990s', // Options: 'Early 1990s' | 'Mid-1990s' | 'Late 1990s' | 'Early 2000s' | 'Y2K Era'
  yearRange: '1993 – 1998',
  category: 'Larong Kalye',
  imageUrl: '/src/assets/images/my_photo.jpg',
  badgeTag: 'Popular Pastime',
  description: 'Detailed description of the object or game.',
  culturalBackground: 'Historical and social context in the Philippines.',
  howItWasUsed: 'Step-by-step description of how children interacted with it.',
  interestingFacts: [
    'Trivia point 1',
    'Trivia point 2'
  ],
  documentedFacts: 'Verified historical documentation (manufacturers, dates).',
  personalMemories: '"Quote from personal childhood experience."',
  relatedArtifactIds: ['art-teks', 'art-pogs']
}
```

---

## 6. How to Replace Images

1. Place your new `.jpg`, `.png`, or `.webp` image into `/src/assets/images/`.
2. Update the `imageUrl` property of the corresponding artifact inside `/src/data/museumData.ts`.
3. If using an external image or CDN, ensure it is served over HTTPS and respects CORS.

---

## 7. How to Create Additional Galleries

1. Add the new gallery identifier to `GalleryId` in `/src/types/museum.ts`.
2. Add the gallery metadata to `GALLERIES_META` in `/src/data/museumData.ts` specifying `title`, `tagalogTitle`, `theme`, `badgeColor`, and `heroImage`.
3. Assign any new artifacts to that `galleryId`. The app will automatically generate cards and filters.

---

## 8. How to Upload the Project to GitHub

1. Create a new repository on [GitHub](https://github.com/new) named `batang-90s`.
2. In your local project directory, initialize Git and commit your files:
   ```bash
   git init
   git add .
   git commit -m "feat: initial commit of Batang 90s virtual museum"
   ```
3. Link and push to your GitHub repository:
   ```bash
   git branch -M main
   git remote add origin https://github.com/your-username/batang-90s.git
   git push -u origin main
   ```

---

## 9. How to Enable GitHub Pages

The repository includes a ready-to-use GitHub Actions workflow in `.github/workflows/deploy.yml`.

1. Go to your GitHub repository on `github.com`.
2. Click **Settings** (top navigation tab).
3. Under the left sidebar, click **Pages** (under the "Code and automation" section).
4. Under **Build and deployment > Source**, select:
   **GitHub Actions** (do NOT select "Deploy from a branch").
5. The included workflow `.github/workflows/deploy.yml` will automatically trigger on every push to `main` and deploy your site.
6. Once completed, your site will be live at:
   `https://<your-username>.github.io/batang-90s/`

---

## 10. How to Update the Published Website

Whenever you make changes, add memories, or add exhibits:
1. Stage and commit your changes:
   ```bash
   git add .
   git commit -m "content: add new exhibits to Buhay Eskwela"
   ```
2. Push to GitHub:
   ```bash
   git push origin main
   ```
3. GitHub Actions will automatically re-build and publish the updated museum in under 2 minutes.

---

### License & Attribution
Curated and developed as an open cultural tribute to Filipino childhood and 1990s popular culture.
All trademarks (such as Mongol, Crayola, Nokia, Choc-Nut, Purefoods) remain the intellectual property of their respective owners and are referenced solely for cultural documentation and educational archiving purposes.
