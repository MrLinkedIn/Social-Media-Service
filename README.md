# LocalPost

LocalPost is a full-stack social media management platform built for local businesses. It helps small shops create, schedule, and publish content across Facebook and Instagram using AI-powered content generation.

## Features

- **AI Content Generation** — Claude-powered post creation tailored to your business type and tone
- **Multi-Platform Publishing** — Schedule and publish to Facebook Pages and Instagram
- **Content Calendar** — Visual calendar view of scheduled and published posts
- **Analytics** — Track engagement metrics synced from Meta
- **Onboarding Flow** — Guided setup for business profile and social account connection

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Auth**: NextAuth.js with Prisma adapter
- **Database**: PostgreSQL via Prisma ORM
- **AI**: Anthropic Claude (claude-haiku)
- **Social API**: Meta Graph API (Facebook + Instagram)
- **UI**: Tailwind CSS + Radix UI + shadcn/ui components
- **Charts**: Recharts
- **Deployment**: Vercel

## Getting Started

1. Clone the repo and install dependencies:
   ```bash
   npm install
   ```

2. Copy `.env.local.example` to `.env.local` and fill in your credentials.

3. Push the database schema:
   ```bash
   npm run db:push
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Environment Variables

See `.env.local.example` for required variables.

## Meta App Setup

1. Create a Meta Developer app at [developers.facebook.com](https://developers.facebook.com)
2. Add Facebook Login and Instagram products
3. Configure OAuth redirect URI: `{NEXTAUTH_URL}/api/meta/callback`
4. Add required permissions: `pages_manage_posts`, `pages_read_engagement`, `instagram_basic`, `instagram_content_publish`
