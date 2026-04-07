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
      faq/             → FAQ.tsx + faq.module.css
      exam-categories/ → ExamCategories.tsx + exam-categories.module.css (16 exam categories)
  resources/         → Free study resources hub (54 resources, in-memory)
    index.tsx
    sections/
      hero/          → ResourcesHero.tsx + resources-hero.module.css
      categories/    → ResourcesCategories.tsx + resources-categories.module.css (API-driven with counts)
      featured/      → FeaturedResources.tsx + featured-resources.module.css (most-downloaded, shown only on all+no-search)
      grid/          → ResourcesGrid.tsx + resources-grid.module.css (API-driven, sort: downloads/year/title)
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
- `artifacts/api-server/src/routes/resources/data.ts` — 54 real resources (UPSC, SSC, IBPS, RRB, NEET, JEE, GATE, NDA, CDS, UGC NET, CLAT, CAT, State PCS, etc.) all with official govt source URLs

## Database Seed Data (Real Indian Exam Data)

Manual seed script: `cd artifacts/api-server && npx tsx src/seed.ts`
Auto-seed on server start: `artifacts/api-server/src/lib/seed.ts` (uses `onConflictDoNothing()`)

All seed data is real, verified, and points to official government websites:
- **Result Categories** (14): `upsc-civil-services`, `ssc-cgl`, `ssc-chsl`, `banking-ibps`, `railway-rrb`, `army-defence`, `jee-mains`, `neet-ug`, `police`, `teaching-tet`, `state-psc`, `engineering-jobs`, `judiciary`, `nursing`
- **News Categories** (7): `exam-notification`, `result-update`, `education-policy`, `admit-card`, `syllabus-pattern`, `interview-tips`, `technology-in-education`
- **Blog Categories** (6): `career-guidance`, `exam-analysis`, `government-jobs`, `pdf-tools-tips`, `study-strategy`, `success-stories`
- **News**: 12 real articles (UPSC, SSC, JEE, NEET, GATE, RRB, IBPS, etc.)
- **Blogs**: 6 expert articles (UPSC strategies, JEE prep, IBPS guide, etc.)
- **Results**: 20 exam results/vacancies (UPSC CSE, SSC CGL, IBPS PO/Clerk, RRB NTPC, NEET, JEE, etc.)
- **Tools**: 46+ PDF & AI tools across 6 categories

## API Shape Alignment (All Filter Components)

All filter components use real API data (no hardcoded categories):
- `ResultsFilters.tsx` → `useListResultCategories()` returning `ResultCategory[]`
- `NewsFilters.tsx` → `useListNewsCategories()` returning `NewsCategory[]`
- `BlogFilters.tsx` → `useListBlogCategories()` returning `BlogCategory[]`
- `ExamCategories.tsx` → `useListResultCategories()` returning `ResultCategory[]`
- `StatsSection.tsx` (home) → `useGetResultStats()` + `useListTools()` + `useListNews()` (all public; no admin endpoints)

## API Response Shape Mapping

- `GET /api/tools` → `Tool[]` (plain array, no wrapper) — use `Array.isArray(data) ? data : []`
- `GET /api/results/categories` → `ResultCategory[]` (plain array) — use `Array.isArray(data) ? data : []`
- `GET /api/news/categories` → `NewsCategory[]` (plain array) — use `Array.isArray(data) ? data : []`
- `GET /api/blogs/categories` → `BlogCategory[]` (plain array) — use `Array.isArray(data) ? data : []`
- `GET /api/results` → `{ results: Result[], total, page, totalPages }` — use `data?.results ?? []`
- `GET /api/news` → `{ articles: NewsPost[], total, page, totalPages }` — use `data?.articles ?? []`
- `GET /api/blogs` → `{ posts: BlogPost[], total, page, totalPages }` — use `data?.posts ?? []`

## Seed Logic (Idempotent Per Table)

The auto-seed checks each table independently before inserting:
1. `resultCategoriesTable` → only seeds if empty; skips all categories/tools/admin if exists
2. `resultsTable` → seeds independently if empty
3. `newsTable` → seeds independently if empty
4. `blogsTable` → seeds independently if empty

## Pages & Routes

- `/` — Home (hero → stats → exam-categories → featured-results → tools-showcase → news-preview → notification-cta → blog-preview → testimonials → faq)
- `/results` + `/results/:id` — Government exam results & vacancies
  - `/results/category/upsc` `/results/category/ssc` `/results/category/banking`
  - `/results/category/railway` `/results/category/defence` `/results/category/jee`
  - `/results/category/neet` `/results/category/state-psc` `/results/category/teaching`
  - `/results/category/police` `/results/category/engineering` `/results/category/judiciary`
- `/tools` + `/tools/:slug` — 100+ PDF & AI utility tools
  - `/tools/category/pdf` `/tools/category/ai` `/tools/category/image`
  - `/tools/category/text` `/tools/category/conversion`
- `/news` + `/news/:id` — Educational news
  - `/news/category/upsc` `/news/category/ssc` `/news/category/banking`
  - `/news/category/railway` `/news/category/scholarships` `/news/category/admit-cards`
- `/blog` + `/blog/:slug` — Blog posts
  - `/blog/category/exam-tips` `/blog/category/career-guidance`
  - `/blog/category/success-stories` `/blog/category/study-strategies`
- `/resources` — Free study materials hub (54 real resources, in-memory data)
  - `/resources/category/previous-papers` `/resources/category/syllabus`
  - `/resources/category/mock-tests` `/resources/category/study-notes` `/resources/category/formula-sheets`
- `/about` — About page
- `/contact` — Contact form
- `/privacy` — Privacy Policy
- `/terms` — Terms of Service
- `/auth/login` + `/auth/register` — Auth
- `/admin` — Admin dashboard
- `*` — Custom 404 page

## Navbar Dropdown System

The Navbar uses hover-activated mega-menu dropdowns for the 5 main sections:
- **Results**: 12 subcategory links (UPSC, SSC, Banking, Railway, Defence, JEE, NEET, State PSC, Teaching, Police, Engineering, Judiciary)
- **Tools**: 5 subcategory links (PDF, AI, Image, Text, Conversion)
- **News**: 6 subcategory links (UPSC, SSC, Banking, Railway, Scholarships, Admit Cards)
- **Blog**: 4 subcategory links (Exam Tips, Career Guidance, Success Stories, Study Strategies)
- **Resources**: 5 subcategory links (Previous Papers, Syllabus, Mock Tests, Study Notes, Formula Sheets)

Mobile menu is fully responsive with expandable category sections.

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
