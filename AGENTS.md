# Agent Instructions for merojosa-website

## Build/Lint/Test Commands

- **Dev**: `pnpm dev` or `pnpm start`
- **Build**: `pnpm build`
- **Preview**: `pnpm preview`
- **Format**: `npx prettier --write .`
- **No tests or linting configured** - do not assume test frameworks exist

## Code Style Guidelines

### Formatting (Prettier)

- Use **tabs** for indentation
- Single quotes for strings
- 100 character line width
- Prettier handles formatting with astro and tailwindcss plugins

### TypeScript & Imports

- Extend `astro/tsconfigs/strict`
- Use path aliases: `@components/*`, `@layouts/*`, `@shared/*`
- Import order: external packages, then aliases, then relative imports
- Example: `import BaseLayout from '@layouts/BaseLayout.astro'`

### Astro Components

- Use `.astro` extension for Astro components
- Props: Define types inline with `type Props = { ... }`
- No JSX comments - keep code clean without comments unless necessary
