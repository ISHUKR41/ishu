# Ishu - India's Premier Education & Government Jobs Platform

## Overview

pnpm workspace monorepo using TypeScript. Full-stack education platform for Indian students with exam results, PDF tools, news, blog, and study resources.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **Frontend**: React 19, Vite, Tailwind CSS v4, Framer Motion, GSAP, Lenis (smooth scroll)
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)
- **Routing**: wouter
- **Animations**: Framer Motion, GSAP
- **Smooth Scroll**: Lenis
- **CSS Isolation**: CSS Modules (*.module.css per section)
- **React Query**: @tanstack/react-query for all data fetching

## Frontend Architecture (Section-Isolated)

Each page and section has its own isolated folder with its own CSS module so that changes to one section don't affect any other section. This enables 100+ developers to work independently.

```
artifacts/ishu/src/pages/
  home/
    index.tsx
    sections/
      hero/          → HeroSection.tsx + hero.module.css
      stats/         → StatsSection.tsx + stats.module.css
      featured-results/ → FeaturedResults.tsx + featured-results.module.css
      tools-showcase/ → ToolsShowcase.tsx + tools-showcase.module.css
      news-preview/  → NewsPreview.tsx + news-preview.module.css
      blog-preview/  → BlogPreview.tsx + blog-preview.module.css
      notification-cta/ → NotificationCTA.tsx + notification-cta.module.css
      testimonials/  → Testimonials.tsx + testimonials.module.css
  resources/         → Free study resources hub (real API data)
    index.tsx
    sections/
      hero/          → ResourcesHero.tsx + resources-hero.module.css
      categories/    → ResourcesCategories.tsx + resources-categories.module.css (API-driven with counts)
      grid/          → ResourcesGrid.tsx + resources-grid.module.css (API-driven)
  privacy/           → Privacy Policy page
    index.tsx
    sections/hero/ + sections/content/
  terms/             → Terms of Service page
    index.tsx
    sections/hero/ + sections/content/
  not-found/         → Animated 404 page
    index.tsx + not-found.module.css
  results/
  tools/
  news/
  blog/
  about/
  contact/
  auth/
  admin/
```

## Modular Section Architecture (per page)

Every page uses fully isolated section components:

- **Results**: `ResultsHero` → `ResultsFilters` → `ResultsGrid` (API: category, status, page)
- **News**: `NewsHero` → `NewsFilters` → `NewsGrid` (API: category, search, page)
- **Blog**: `BlogHero` → `BlogFilters` → `BlogGrid` (API: category, search, page)
- **Tools**: `ToolsHero` → `ToolsFilters` → `ToolsGrid` (API: category only; search is client-side)
- **Resources**: `ResourcesHero` → `ResourcesCategories` → `ResourcesGrid` (direct fetch, no API client)
- **Contact**: `ContactHero` → `ContactInfo` → `ContactForm`
- **About**: `AboutHero` → `AboutStats` → `AboutValues` → `AboutTeam`

## API Data Shapes (actual server responses)

- `GET /api/tools` → plain array (no wrapper object)
- `GET /api/news` → `{ articles: [...], total, page, totalPages }`
- `GET /api/blogs` → `{ posts: [...], total, page, totalPages }`
- `GET /api/results` → `{ results: [...], total, page, totalPages }`
- `GET /api/resources` → `{ resources: [...], total, category, search, page, limit }`
- `GET /api/resources/categories` → `[ { id, label, count }, ... ]`

## Resources Backend (In-Memory, No DB)

The resources route uses in-memory data (no DB dependency):
- `artifacts/api-server/src/routes/resources/index.ts` — route handler
- `artifacts/api-server/src/routes/resources/data.ts` — 18 real resources (UPSC, SSC, IBPS, NEET, JEE, GATE etc.)

## Database Seed Data (Real Indian Exam Data)

All seed data is real, verified, and points to official government websites:
- **News**: 15 articles (SSC CGL, UPSC, JEE, NEET, GATE, CBSE, RRB, IBPS, Bihar BPSC, etc.)
- **Blogs**: 11 expert articles (UPSC topper strategies, JEE syllabus, IBPS PO guide, salary guide, etc.)
- **Results**: 12 vacancies (UPSC CSE, SSC CGL/CHSL, IBPS PO/Clerk, UP Police, Bihar Police, MP Police, RRB NTPC, GATE, JEE Main, NEET UG)
- **Tools**: 28 PDF tools (merge, split, compress, convert, OCR, sign, watermark, etc.)

## Seed Logic (Idempotent Per Table)

The seed function checks each table independently before inserting:
1. `resultCategoriesTable` → only seeds categories/tools/admin on first run
2. `resultsTable` → seeds independently if empty
3. `newsTable` → seeds independently if empty
4. `blogsTable` → seeds independently if empty

## Pages & Routes

- `/` — Home (hero, stats, results, tools, news, notifications, blog, testimonials)
- `/results` + `/results/:id` — Government exam results & vacancies
- `/tools` + `/tools/:slug` — 100+ PDF utility tools
- `/news` + `/news/:id` — Educational news
- `/blog` + `/blog/:slug` — Blog posts
- `/resources` — Free study materials hub (18 real resources, API-driven)
- `/about` — About page
- `/contact` — Contact form
- `/privacy` — Privacy Policy
- `/terms` — Terms of Service
- `/auth/login` + `/auth/register` — Auth
- `/admin` — Admin dashboard
- `*` — Custom 404 page

## Backend Routes (Isolated per domain)

```
artifacts/api-server/src/routes/
  results/     admin/        auth/
  blogs/       contact/      news/
  notifications/ tools/      resources/  (new, in-memory)
```

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

## URL Pattern for Direct Fetch (non-API-client)

When fetching directly (not via the generated API client), use:
```ts
const baseUrl = import.meta.env.BASE_URL?.replace(/\/$/, "") ?? "";
const res = await fetch(`${baseUrl}/api/endpoint`, { credentials: "include" });
```

## API Client Hook Usage

The generated API client hooks are used for standard data fetching:
```ts
import { useListNews, useListResults, useListBlogs, useListTools } from "@workspace/api-client-react";
```

## Design Principles

- **Full responsiveness**: All pages work on all devices (mobile-first)
- **CSS Modules isolation**: Each section has its own .module.css file — zero style leakage
- **CSS contain**: All section CSS modules use `contain: layout style` for performance isolation
- **Smooth scrolling**: Lenis smooth scroll provider wraps the entire app
- **SEO**: PageMeta component with structured data (JSON-LD) on every page
- **Code splitting**: React.lazy() + Suspense for all routes (optimal performance)
- **Animations**: Framer Motion whileInView animations + AnimatePresence
- **Dark mode first**: Dark cinematic theme with accent colors (blue, orange, purple)

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
