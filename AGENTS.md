# Agent Instructions for merojosa-website

## Build/Lint/Test Commands

- **Dev**: `pnpm dev` or `pnpm start`
- **Build**: `pnpm build`
- **Preview**: `pnpm preview`
- **Format**: `npx prettier --write .`
- **Deploy**: Uses SST v3 with AWS adapter (domain: merojosa.dev)
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
- Frontmatter imports go first, followed by HTML/JSX, then `<style>` blocks
- Use Astro's built-in `Image` component from `astro:assets` for images

### Tailwind CSS

- Custom font: 'inter' extends default sans-serif stack
- Use Tailwind utility classes directly in markup
- Arbitrary values allowed: `class="mx-[10vw]"`
- Print media queries in component `<style>` blocks when needed
