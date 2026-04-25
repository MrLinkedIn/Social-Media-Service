# LocalPost — Claude Code Guide

## Project Overview

LocalPost is a Next.js 14 social media manager for local businesses. It uses:
- **App Router** with server and client components
- **NextAuth.js** for credentials-based auth
- **Prisma** with PostgreSQL
- **Anthropic Claude** for AI content generation
- **Meta Graph API** for Facebook/Instagram publishing

## Development Commands

```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run db:push      # Push schema to database
npm run db:generate  # Regenerate Prisma client
npm run db:studio    # Open Prisma Studio
```

## Architecture Notes

- Auth guard is in `middleware.ts` — protects all `/dashboard`, `/create`, `/calendar`, `/analytics`, `/settings` routes
- Business onboarding check happens in `app/(dashboard)/layout.tsx` — redirects to `/onboarding` if no business profile
- API routes at `app/api/` are standard Next.js route handlers
- Cron job at `app/api/cron/publish/route.ts` runs every minute (configured in `vercel.json`) to publish scheduled posts
- Meta OAuth flow: connect → `app/api/meta/connect` redirects to Facebook → callback at `app/api/meta/callback`

## Key Files

- `lib/anthropic.ts` — Claude content generation
- `lib/meta.ts` — Meta Graph API helpers
- `lib/auth.ts` — NextAuth configuration
- `prisma/schema.prisma` — Full database schema
- `types/index.ts` — Shared TypeScript types

## Component Patterns

UI components in `components/ui/` follow shadcn/ui patterns using `class-variance-authority`. Feature components are in subdirectories (`dashboard/`, `analytics/`, etc.).
