# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start local dev server at localhost:4321
npm run build     # Build production site to ./dist/
npm run preview   # Preview production build locally
```

## Architecture

This is an **Astro v5** static site portfolio. The project uses file-based routing — every `.astro` file in `src/pages/` becomes a URL route automatically.

- `src/pages/index.astro` — Home page (currently the only page)
- `public/` — Static assets served at the root URL
- `astro.config.mjs` — Astro configuration (currently minimal, extend here to add integrations)
- `tsconfig.json` — Extends Astro's strict TypeScript preset

Astro components use a frontmatter script block (fenced by `---`) for server-side logic, followed by HTML-like template markup. Components in `src/components/` (when created) are imported and used directly in pages.
