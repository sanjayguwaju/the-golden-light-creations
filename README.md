# Reliance Paints Digital Platform

A modern, high-performance web platform and enterprise CMS for **Reliance Paints Pvt. Ltd.** Built with [Next.js 15](https://nextjs.org) (App Router), [Payload CMS 3.86](https://payloadcms.com), and [MongoDB](https://www.mongodb.com), this application powers the public-facing product discovery experience, interactive room visualizer, paint calculator, dealer locator, and full-featured headless content management system.

---

## 🌟 Overview

The Reliance Paints digital platform delivers a rich customer journey—from exploring 100+ vibrant paint colors and visualizing room finishes, to estimating paint volume, finding local authorized dealers, and registering product warranties.

### Core Features

- **🎨 Advanced Room Visualizer (`/visualiser`)**
  - Interactive SVG preset room templates (Living Room, Bedroom, Kitchen, Exterior, Office).
  - Multi-variant wall region selection with mobile touch and desktop click support.
  - Live color application from 100+ Reliance Paints shades.
  - In-browser **"Save My Room"** high-res PNG export with shade summary.

- **🧮 Paint & Wall Price Calculator (`/calculator`)**
  - Room dimension calculator (Length, Width, Height, Doors, Windows).
  - Product-specific coverage rates, coat count options, and automated deduction math.
  - Smart pack-size recommendations (1L, 4L, 10L, 20L).
  - Printable / Downloadable estimate PDF export powered by `@react-pdf/renderer`.

- **📍 Store & Dealer Locator (`/store-locator`)**
  - Province and District-based filtering for authorized dealers across Nepal.
  - Interactive Google Maps integration with custom markers and store detail cards.

- **📦 Product Catalog & Category Hierarchy (`/products`, `/all-products`)**
  - Hierarchical categories (Interior, Exterior, Primers & Putty, Enamels, Waterproofing).
  - Comprehensive technical specifications, TDS/SDS download links, and application guides.
  - Instant full-text search and related product cross-sell recommendations.

- **🌈 Color & Inspiration Gallery (`/colors`, `/color-trends`, `/inspiration`)**
  - 100+ searchable Reliance paint shades with Hex/RGB codes and one-click copy.
  - Curated color trends and room image galleries mapped to specific color codes.

- **📝 Corporate, Careers & Compliance**
  - **Warranty Registration (`/warranty-registration`)**: Digital warranty registration with receipt/invoice upload.
  - **Careers Portal (`/careers`)**: Job listings with resume/CV upload pipeline.
  - **Contractors & Dealership Programs**: B2B inquiry forms for contractors and prospective dealers.
  - **Company & Compliance**: About Us, FAQs, Privacy Policy, and Terms & Conditions.

- **🌐 Multi-Language & Modern UI/UX**
  - Localization support for English (`en`), Nepali (`ne`), and Croatian (`hr`).
  - Dark / Light theme switching with `next-themes`.
  - GSAP animations and smooth scroll transitions.

- **⚡ Headless Payload CMS & AI Integration**
  - Dynamic visual block builder with 35+ flexible layout blocks.
  - Custom Admin Dashboard and visual reports with `recharts`.
  - Pinning, badges, and grouped navigation with `payload-sidebar-plugin`.
  - Agentic Model Context Protocol (MCP) support via `@payloadcms/plugin-mcp`.

---

## 🛠️ Tech Stack

- **Frontend Framework**: Next.js 15 (App Router, Server Components & Actions)
- **CMS Engine**: Payload CMS 3.86 (TypeScript-first Headless CMS)
- **Database**: MongoDB (Mongoose adapter)
- **Styling**: Tailwind CSS 4.1 + Radix UI / shadcn
- **Animations**: GSAP 3 + `@gsap/react`
- **Maps**: `@vis.gl/react-google-maps`
- **PDF Generation**: `@react-pdf/renderer`
- **Media Storage**: Cloudflare R2 / AWS S3 compatible object storage
- **Email Service**: Resend adapter
- **Testing**: Vitest (Unit/Integration) + Playwright (E2E)

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
   cd reliance-paints-v1
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
   - `RESEND_API_KEY` – Resend API key for transaction emails (optional)
   - S3 / R2 storage credentials (optional for local development)
   - `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` – Google Maps API key for Store Locator

4. **Start the development server**:
   ```bash
   pnpm dev
   ```

5. **Access the application**:
   - Website: [http://localhost:3000](http://localhost:3000)
   - Admin Panel: [http://localhost:3000/admin](http://localhost:3000/admin)

---

## 📁 Project Structure

```
src/
├── access/                  # Access control functions (RBAC)
├── app/
│   ├── (frontend)/          # Next.js frontend pages & localized routes
│   │   └── [locale]/        # Localized dynamic routes (en, ne, hr)
│   ├── (payload)/           # Payload CMS admin routes
│   └── api/                 # Custom Next.js API endpoints
├── blocks/                  # Reusable CMS layout blocks (35+ blocks)
├── collections/             # Payload CMS collection configurations
│   ├── Colors/              # Paint shades & palette data
│   ├── Products/            # Product catalog & specifications
│   ├── ProductCategories/   # Product taxonomy
│   ├── Stores/              # Dealer & store locations
│   ├── Careers/             # Job postings
│   ├── JobApplications/     # Candidate applications & CVs
│   ├── Warranties/          # Customer warranty registrations
│   ├── ContractorApplications/ # Painter & contractor onboarding
│   ├── Inspiration/         # Lifestyle & room image galleries
│   ├── ColorTrends/         # Annual color trends
│   ├── Pages/               # Dynamic pages with block builder
│   ├── Posts/               # News, articles & DIY tips
│   └── Users/               # CMS admin accounts & RBAC
├── components/              # React UI components, calculators, modals, maps
├── fields/                  # Custom field factories & Lexical rich text
├── globals/                 # Global site configs (TopBar, Header, Navigation, Footer, SiteSettings)
├── i18n/                    # Localization settings & routing config
├── plugins/                 # Payload plugins (SEO, Search, Redirects, Sidebar, MCP, S3)
├── seeds/                   # Database seeders & CSV import scripts
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
pnpm lint:fix         # Auto-fix linting issues
pnpm format           # Format codebase with Prettier
```

### Payload CMS Management
```bash
pnpm generate:types       # Re-generate TypeScript types (payload-types.ts)
pnpm generate:importmap   # Regenerate Payload component import map
pnpm payload              # Payload CMS CLI commands
```

### Testing
```bash
pnpm test             # Run integration & E2E tests
pnpm test:int         # Run Vitest integration test suite
pnpm test:e2e         # Run Playwright end-to-end tests
```

### Database Seeders & Media Scripts
```bash
pnpm seed:colors          # Seed paint shades from CSV data
pnpm seed:stores          # Seed store & dealer locations from CSV
pnpm seed:products        # Seed paint products & categories
pnpm seed:visualizer      # Seed room visualizer SVG templates
pnpm seed:home            # Seed default homepage block layout
pnpm download:r2          # Download assets from Cloudflare R2
pnpm r2:cleanup           # Clean up orphaned media variants
```

---

## 🔒 Security & Access Control

- **Role-Based Access Control (RBAC)**: Supports `admin`, `editor`, and standard user roles.
- **Local API Access**: Explicit `overrideAccess: false` enforcement for security-critical queries.
- **Document Protection**: Resumes, warranty invoices, and sensitive application data restricted to authorized administrators.
- **CSRF & CORS**: Origin verification for all submission APIs and CMS actions.

---

## 📄 License

Proprietary © Reliance Paints Pvt. Ltd. All rights reserved.
