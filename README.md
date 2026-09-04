# The Golden Light Creations — Digital Platform & CMS

A high-performance digital platform and luxury creative studio content management system for **The Golden Light Creations** (Nepal's premier luxury photography, cinematic films, and production studio). Built with [Next.js 15](https://nextjs.org) (App Router), [Payload CMS 3.86](https://payloadcms.com), and [MongoDB](https://www.mongodb.com).

---

## 🌟 Overview

The Golden Light Creations platform showcases the studio's portfolio across weddings, cinematic films, drone cinematography, editorial fashion, concerts, and brand campaigns, while managing client inquiries, reviews, and dynamic content through a dedicated Payload CMS admin panel.

### Core Features

- **📸 Luxury Studio Portfolio (`/portfolio`)**
  - High-resolution photography showcase with filterable categories (Weddings, Pre-Wedding, Cinematic, Events, Portraits).
  - 100dvh mobile-optimized lightbox viewer with gesture zoom and swipe support.

- **🎬 Cinematic Films & Video Hub (`/films`)**
  - Immersive cinema player for 4K teaser reels, highlight films, and brand commercials.
  - Category filtering across Wedding Films, Commercials, Travel, and Documentaries.

- **✨ Creative Services (`/services`)**
  - Interactive service index detailing luxury wedding packages, commercial videography, aerial drone capture, fashion campaigns, and color grading.

- **💬 Client Shoot Inquiries & Bookings (`/contact`)**
  - Dedicated client inquiry pipeline categorized by service type (Wedding, Videography, Drone, Fashion, Concert, Brand, Other).
  - Direct email routing to `sanjayguwaju@gmail.com`.

- **📖 Studio Journal & Behind-the-Scenes (`/posts`)**
  - Photo essays, lighting breakdowns, destination wedding diaries, and gear insights.

- **⚡ Tailored Payload CMS Studio Admin Panel**
  - Streamlined sidebar groups: **Studio**, **Client Inquiries**, **Content**, **Media**, **Settings**, **Tools**.
  - 100% dedicated collections: `Portfolio`, `Films`, `Services`, `Testimonials`, `Albums`, `ContactSubmissions`, `Pages`, `Posts`, `Categories`, `Media`, `Files`, `Users`.
  - Dedicated Studio Overview & Analytics dashboard with KPI cards for shoot genres, inquiry statuses, and film statistics.
  - Multi-language support (English & Nepali).

---

## 🛠️ Tech Stack

- **Frontend Framework**: Next.js 15 (App Router, Server Components & Server Actions)
- **CMS Engine**: Payload CMS 3.86 (TypeScript-first Headless CMS)
- **Database**: MongoDB (Mongoose adapter)
- **Styling**: Tailwind CSS 4.1 + Radix UI
- **Animations**: GSAP 3 + `@gsap/react`
- **Media Storage**: Cloudflare R2 / AWS S3 compatible object storage
- **Email Service**: Resend adapter
- **Deployment**: Vercel / Netlify

---

## 🚀 Quick Start

### Prerequisites

- **Node.js**: `^18.20.2` or `>=20.9.0`
- **Package Manager**: `pnpm` (v9 or v10 recommended)
- **Database**: MongoDB instance (local or MongoDB Atlas)

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd the-golden-light-creations
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

3. **Configure environment variables**:
   ```bash
   cp .env.example .env
   ```
   Fill in your configuration details:
   - `DATABASE_URL` – MongoDB connection string
   - `PAYLOAD_SECRET` – Secret encryption key for Payload CMS
   - `NEXT_PUBLIC_SERVER_URL` – Public application URL (e.g. `http://localhost:3000`)
   - `RESEND_API_KEY` – Resend API key for inquiry notification emails
   - S3 / R2 storage credentials for media uploads

4. **Seed initial studio data**:
   ```bash
   pnpm seed:studio
   ```

5. **Start the development server**:
   ```bash
   pnpm dev
   ```

6. **Access the application**:
   - Website: [http://localhost:3000](http://localhost:3000)
   - Admin Panel: [http://localhost:3000/admin](http://localhost:3000/admin)

---

## 📁 Project Structure

```
src/
├── access/                  # Access control functions (RBAC)
├── app/
│   ├── (frontend)/          # Next.js frontend pages & localized routes
│   │   └── [locale]/        # Localized dynamic routes (en, ne)
│   ├── (payload)/           # Payload CMS admin routes
│   └── api/                 # Custom Next.js API endpoints
├── blocks/                  # Reusable CMS layout blocks (Archive, Gallery, Form, etc.)
├── collections/             # Payload CMS collection configurations
│   ├── Portfolio/           # Photo shoots & showcase items
│   ├── Films/               # Video productions & cinema reels
│   ├── Services/            # Studio creative packages
│   ├── Testimonials/        # Client reviews & testimonials
│   ├── Albums/              # Client photo albums & galleries
│   ├── ContactSubmissions/  # Shoot booking & contact inquiries
│   ├── Pages/               # Dynamic pages with block builder
│   ├── Posts/               # Studio journal & blog articles
│   ├── Categories/          # Content taxonomy
│   ├── Media/               # High-res photo assets
│   ├── Files/               # PDF & downloadable documents
│   └── Users/               # CMS admin accounts & RBAC
├── components/              # React UI components & studio sections
│   └── studio/              # Active Golden Light Creations components
├── fields/                  # Custom field factories & Lexical rich text
├── globals/                 # Global configs (StudioSettings, SiteSettings)
├── i18n/                    # Localization settings & routing config
├── plugins/                 # Payload plugins (SEO, Search, Redirects, S3)
├── seeds/                   # Studio seeder (pnpm seed:studio)
└── payload.config.ts        # Main Payload CMS configuration
```

---

## 📜 Available Scripts

### Development & Build
```bash
pnpm dev              # Start local development server
pnpm build            # Production build with next-sitemap generation
pnpm start            # Run production server
pnpm lint             # Run Next.js & ESLint checks
```

### Payload CMS Management
```bash
pnpm generate:types       # Re-generate TypeScript types (payload-types.ts)
pnpm generate:importmap   # Regenerate Payload component import map
pnpm payload              # Payload CMS CLI commands
pnpm seed:studio          # Seed initial portfolio, films, services, and settings
```

---

## 📄 License

Proprietary © The Golden Light Creations. All rights reserved.
