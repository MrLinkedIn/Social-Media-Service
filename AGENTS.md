# LocalPost — Agent Instructions

## Repository Scope

This is `mrlinkedin/social-media-service`. Only interact with this repository.

## Branch Conventions

- Feature branches: `feat/<description>`
- Fix branches: `fix/<description>`
- Main branch: `main`

## What This App Does

LocalPost helps local business owners:
1. Complete an onboarding flow to set up their business profile (type, tone, description)
2. Connect Facebook Pages and Instagram accounts via Meta OAuth
3. Generate AI-powered social media posts using Claude
4. Schedule posts for future publication
5. View analytics synced from Meta

## Key Constraints

- All AI generation uses `claude-haiku-4-5-20251001` for cost efficiency
- Meta API calls require valid page access tokens stored in `SocialAccount.accessToken`
- The cron endpoint (`/api/cron/publish`) should be protected — check `CRON_SECRET` header in production
- Database uses PostgreSQL; do not switch to SQLite without updating the Prisma provider

## Testing Notes

- No test suite configured yet — add `jest` or `vitest` if needed
- TypeScript strict mode is on; ensure zero `tsc` errors before pushing
