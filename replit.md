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
  resources/         → NEW - Free study resources hub
    index.tsx
    sections/
      hero/
      categories/
      grid/
  not-found/         → Improved animated 404 page
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
- **Blog**: `BlogHero` → `BlogFilters` → `BlogGrid` (API: category, search, page; field: `author`)
- **Tools**: `ToolsHero` → `ToolsFilters` → `ToolsGrid` (API: category only; search is client-side)
- **Contact**: `ContactHero` → `ContactInfo` → `ContactForm`
- **About**: `AboutHero` → `AboutStats` → `AboutValues` → `AboutTeam`

### API data shapes (actual)
- `GET /api/tools` → plain array (no wrapper object)
- `GET /api/news` → `{ articles: [...], total, page, totalPages }`
- `GET /api/blogs` → `{ posts: [...], total, page, totalPages }`
- `GET /api/results` → `{ results: [...], total, page, totalPages }`

## Pages & Routes

- `/` — Home (hero, stats, results, tools, news, notifications, blog, testimonials)
- `/results` + `/results/:id` — Government exam results & vacancies
- `/tools` + `/tools/:slug` — 100+ PDF utility tools
- `/news` + `/news/:id` — Educational news
- `/blog` + `/blog/:slug` — Blog posts
- `/resources` — Free study materials hub (NEW)
- `/about` — About page
- `/contact` — Contact form
- `/auth/login` + `/auth/register` — Auth
- `/admin` — Admin dashboard

## Backend Routes (Isolated per domain)

```
artifacts/api-server/src/routes/
  results/   admin/   auth/   blogs/   contact/
  news/      notifications/  tools/
```

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

## Design Principles

- **Full responsiveness**: All pages work on all devices (mobile-first)
- **CSS Modules isolation**: Each section has its own .module.css file — zero style leakage
- **Smooth scrolling**: Lenis smooth scroll provider wraps the entire app
- **SEO**: PageMeta component sets meta title, description, og:tags, twitter cards on every page
- **Animations**: Framer Motion whileInView animations + Lenis smooth scroll
- **Dark mode first**: Dark cinematic theme with accent colors (blue, orange, purple)

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
