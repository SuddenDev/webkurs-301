# Kurs Digitalkompetenz für Fotografen

A modern educational website for a digital competency course for photographers, taught at Hochschule München. Built with Astro, Vue, and UnoCSS for optimal performance and maintainability.

**Live Site:** [kurs.dtampe.com](https://kurs.dtampe.com)

## Project Structure

```
webkurs-301/
├── src/
│   ├── components/        # Vue components (Header, Footer, ThemeToggle, etc.)
│   ├── content/
│   │   ├── course/        # Course lessons (markdown/MDX files)
│   │   └── pages/         # Static pages
│   ├── layouts/           # Astro layout components
│   ├── pages/             # Astro pages and routing
│   └── site-config.ts     # Site metadata and navigation
├── astro.config.ts        # Astro configuration
└── uno.config.ts          # UnoCSS styling configuration
```

## Adding New Lessons

Create a new `.md` or `.mdx` file in `src/content/course/`:

```yaml
---
title: Your Lesson Title
description: Brief description of the lesson
date: 2024-01-28
draft: false              # Set to true to hide from production
lang: de-DE
---

Your lesson content here...
```

**Note:** Files starting with `_` are ignored by the content loader and won't appear on the site.

## Styling System

The site uses UnoCSS with custom design tokens defined in `uno.config.ts`:

- **Colors:** `bg-main`, `text-main`, `text-link`, `border-main`
- **Components:** `nav-link`, `prose-link`, `container-link`
- **Typography:** Inter font family with custom weights
- **Icons:** Phosphor icons available via `i-ph-*` classes

## Technology Stack

- **Framework:** Astro 5.x with Vue 3.x integration
- **Styling:** UnoCSS
- **Content:** MDX support
- **Package Manager:** pnpm

## Development

### Prerequisites

- Node.js >= 22
- pnpm

### Setup

Install dependencies:

```bash
pnpm install
```

### Available Commands

```bash
# Start development server on http://localhost:1977
pnpm run dev

# Build for production
pnpm run build

# Preview production build locally
pnpm run preview

# Run linting
pnpm run lint

# Auto-fix linting issues
pnpm run lint:fix

# Bump version
pnpm run release
```

## Content Structure

Course content is organized in `src/content/course/` with the following frontmatter schema:

```yaml
---
title: Lesson Title        # Required
description: Brief summary # Optional
date: 2024-01-01          # Required
draft: false              # Optional, defaults to false
lang: de-DE               # Optional, defaults to 'de-DE'
---
```

Files starting with `_` are ignored by the content loader.

## Configuration

- **Site Config:** `src/site-config.ts` - Metadata, navigation, and social links
- **Astro Config:** `astro.config.ts` - Framework and integration settings
- **UnoCSS Config:** `uno.config.ts` - Design tokens and styling shortcuts

## License

MIT License
