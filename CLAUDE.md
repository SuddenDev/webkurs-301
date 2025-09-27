# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Astro-based educational website for a digital competency course for photographers, taught at Hochschule München. It's a minimal, SEO-friendly portfolio and blog theme that combines Astro, Vue, and UnoCSS.

## Common Commands

### Development
- `npm run dev` - Start development server (runs on port 1977)
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

### Code Quality
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix linting issues automatically

### Release
- `npm run release` - Bump version using bumpp

## Architecture & Key Files

### Core Configuration
- `astro.config.ts` - Astro configuration with MDX, Vue, sitemap, and UnoCSS integrations
- `uno.config.ts` - UnoCSS configuration with custom shortcuts and design tokens
- `src/site-config.ts` - Site metadata, navigation, and social links configuration

### Content Structure
- `src/content/` - Content collections using Astro's content layer
  - `course/` - Course lessons (markdown/MDX files with frontmatter: title, description, date, draft, lang)
  - `pages/` - Static pages
- Files starting with `_` in course directory are ignored by the glob loader

### Component Architecture
- `src/layouts/BaseLayout.astro` - Main layout wrapper
- `src/components/` - Vue components for interactive elements:
  - `Header.vue` / `Footer.vue` - Site navigation
  - `ThemeToggle.vue` - Dark/light mode switcher
  - `ListLessons.vue` - Course content listing
  - `ScrollToTop.vue` - Scroll utility
- `src/components/BaseHead.astro` - SEO and meta tags

### Styling System
Uses UnoCSS with custom design tokens:
- Main colors: `bg-main`, `text-main`, `text-link`, `border-main`
- Component patterns: `nav-link`, `prose-link`, `container-link`
- Typography: Inter font family, custom font weights

### Technology Stack
- **Framework**: Astro 5.x with Vue 3.x integration
- **Styling**: UnoCSS with presets (Wind3, Typography, Icons, WebFonts)
- **Content**: MDX support for components in markdown
- **Icons**: Phosphor icons via UnoCSS preset
- **Development**: ESLint with @antfu/eslint-config

### Content Schema
Course content requires frontmatter with:
- `title` (required)
- `description` (optional)
- `date` (required, auto-formatted to US locale)
- `draft` (optional, defaults to false)
- `lang` (optional, defaults to 'de-DE')
- `redirect` (optional)

## Development Notes

- Site URL configured for https://kurs.dtampe.com
- Uses pnpm as package manager (as evidenced by pnpm-lock.yaml)
- Requires Node.js >= 22
- Content files use German language by default
- Dark/light theme support built-in with UnoCSS shortcuts
- i'm using obsidian to write content