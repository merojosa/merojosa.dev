# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm install                  # pnpm is required (pnpm 11, Node 24 in CI)
pnpm dev                      # dev server (alias: pnpm start)
pnpm build                    # astro build -> dist/client + dist/server
pnpm preview
pnpm generate-resume-pdf      # regenerate public/resume.pdf (see below)
npx prettier --write .        # formatting
```

There are **no tests and no linter** configured — do not assume a test framework exists.

Deploys are CI-only: `.github/workflows/ci.yaml` runs on push to `main`, assumes an AWS
OIDC role, and runs `pnpm sst deploy --stage production`. Avoid deploying from a local machine.

## Architecture

Astro site in SSR mode (`output: 'server'`) with the `astro-sst` adapter, deployed to AWS by
SST v3 (`sst.config.ts`, `sst.aws.Astro`) at `merojosa.dev`. Only two routes exist:
`src/pages/index.astro` (landing) and `src/pages/resume.astro`.

Astro is pinned to **5.x**: the `astro-sst` adapter is unmaintained and imports
`applyPolyfills` from `astro/app/node`, which Astro 6 and 7 no longer export — both fail the
build. Astro cannot move past 5 until the adapter is replaced.

Tailwind is **v4**, wired through `@tailwindcss/vite` in `astro.config.mjs` (the old
`@astrojs/tailwind` integration is gone, and there is no `tailwind.config.mjs` — theme values
live in the `@theme` block in `src/styles/global.css`, and sources are auto-detected).

Everything shares `src/layouts/BaseLayout.astro`, which owns `<head>`, the global Tailwind
import, the fixed `mx-[10vw] lg:w-[50rem]` content column, and the social footer. Components
under `src/components/icons/` are inline-SVG `.astro` files styled from the parent via
`*:fill-white` / `*:h-6` utilities rather than props.

TS path aliases: `@components/*`, `@layouts/*`, `@shared/*` (the `@shared` target
`src/shared/` does not exist yet).

### Resume → PDF pipeline

The resume has one source of truth: `src/pages/resume.astro`. The downloadable PDF is
rendered _from that page_, not authored separately:

1. `scripts/generate-resume-pdf.ts` spawns `pnpm dev`, scrapes the port from stdout,
   Puppeteer-visits `/resume`, and prints A4 with zero margins to `public/resume.pdf`.
2. `public/resume.pdf` is **gitignored**. CI generates it _before_ `pnpm build`, then copies
   it to `dist/client/resume.pdf` afterwards.

Consequences when touching the resume:

- The `@media print` block at the bottom of `resume.astro` (plus the print block in
  `BaseLayout.astro` that whitens the background and hides the footer) is the PDF's layout —
  screen changes can silently break pagination. Verify with `pnpm generate-resume-pdf`.
- That print block pins `line-height` on `h1`/`h2`/`h3`. Tailwind v4's `text-*` utilities set
  line-height as a *ratio*, so without those pins the block's `font-size` overrides would also
  shrink the heading line boxes and re-flow the PDF. Don't remove them.
- Locally, `/resume.pdf` 404s until you run the generate script at least once.
- Puppeteer's own postinstall downloads Chrome (allowed via `allowBuilds` in
  `pnpm-workspace.yaml`); CI also runs `pnpx puppeteer browsers install chrome` explicitly.

## Conventions

Prettier (tabs, single quotes, 100 cols, astro + tailwindcss plugins) is the formatting
authority. `astro/tsconfigs/strict`. Props are typed inline as `type Props = { ... }` and
destructured from `Astro.props`. Images go through `Image` from `astro:assets`. Style with
Tailwind utilities in markup — including arbitrary values — and reserve `<style>` blocks for
print media queries.
