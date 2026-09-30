# CLAUDE.md

This repo holds a personal tech blog made from Markdown files. **All active code is under `blog/`.**
The other files at the repo root (`app/`, `config/`, `Gemfile`, …) are an old Cloud9 Rails scaffold. They are not used. Don't edit them and don't run Rails/bundler commands.

## Commands

Run everything from `blog/`:

```bash
npm run dev          # dev server at http://localhost:3000 (draft posts visible)
npm run build        # production build; statically generates every route
npm run start        # serve the production build
npm run lint         # ESLint (next/core-web-vitals + next/typescript)
npx tsc --noEmit     # type check (build also type-checks)
```

Before committing, run `npm run lint` and `npm run build`. There are no automated tests. The build is the integration check, because every post is rendered at build time and a bad frontmatter or Markdown file makes the build fail.

## Stack

- **Next.js 15.5, App Router only.** React 19, TypeScript `strict`.
- **Tailwind CSS v4.** Configured in CSS, so there is no `tailwind.config.*`. Theme tokens and the typography plugin live in `src/app/globals.css` (`@theme inline`, `@plugin`).
- **Markdown pipeline** (`src/lib/markdown.ts`): `unified` → `remark-parse` → `remark-gfm` → `remark-rehype` → `rehype-slug` → `rehype-pretty-code` (Shiki, `github-light`/`github-dark`) → `rehype-stringify`. The result is injected with `dangerouslySetInnerHTML` inside a `prose` container.
- **Frontmatter:** `gray-matter`.
- No database, no CMS, no MDX. Everything is read from the filesystem at build time.

## Layout

```
blog/
  content/posts/<slug>.md   # posts; the filename is the URL slug
  src/lib/site.ts           # site title/author/URL (the only config place)
  src/lib/posts.ts          # load, validate, sort, and draft-filter posts; tag aggregation
  src/lib/markdown.ts       # Markdown → HTML
  src/lib/format.ts         # date formatting (uses siteConfig.locale)
  src/components/           # PostList, TagLink (server components)
  src/app/                  # routes: /, /posts/[slug], /tags, /tags/[tag], /rss.xml, /sitemap.xml
```

## Post format

```md
---
title: "..."          # required, or the build throws
date: "YYYY-MM-DD"    # required
description: "..."    # used in list, OG, RSS
tags: ["nextjs"]      # optional; any string, Korean OK
draft: true           # optional; hidden in production builds only
---
```

- Slugs (filenames) must match `^[\w-]+$`, i.e. ASCII letters, digits, `_`, `-`. A Korean or space-containing filename returns a 404.
- If you add a frontmatter field, update both `PostMeta` and `readPostFile` in `posts.ts`. Coerce the type explicitly there, as the existing fields do.

## Conventions

- **Server components by default.** None of the current files use `"use client"`. Add it only for real interactivity, and keep client components small and leaf-level.
- **All post data goes through `src/lib/posts.ts`.** Don't call `fs` from pages or components.
- **Dynamic routes follow the Next 15 pattern:**
  - `params` is a `Promise`: `type Props = { params: Promise<{ slug: string }> }` and `await params`.
  - Export `generateStaticParams` and set `dynamicParams = false`.
  - Export `generateMetadata`.
- **Route handlers and metadata routes** (`rss.xml`, `sitemap.ts`) set `export const dynamic = "force-static"`.
- **Imports** use the `@/*` alias, which maps to `src/*`. Don't use `../` across folders.
- **Styling:**
  - Use Tailwind utilities with the semantic tokens `text-muted`, `border-border`, `bg-background`, `text-foreground`. Don't hard-code grays.
  - Dark mode follows `prefers-color-scheme`. There is no toggle.
  - To add a color, define it in `:root`, in the dark `@media` block, and in `@theme inline`.
- **Style:** double quotes, semicolons, 2-space indent, default-export components in PascalCase files. Match the existing formatting; there is no Prettier config.
- **UI copy is Korean**; code, identifiers, and comments are English or short Korean, matching nearby code.

## Gotchas

- **Don't use CSS attribute selectors whose value contains a space**, e.g. `[data-theme*=" "]`. Next's bundled cssnano crashes on them during `build`. Target `[data-rehype-pretty-code-figure]` instead.
- **Don't add `next/font/google`.** Fonts are a system stack with Korean fallbacks in `globals.css`. Google fonts need network access at build time, and Geist has no Hangul glyphs.
- **Site URL** (RSS, sitemap, OG) resolves `NEXT_PUBLIC_SITE_URL` → `https://$VERCEL_PROJECT_PRODUCTION_URL` → `http://localhost:3000` (`src/lib/site.ts`). `siteConfig` reads a non-public env var, so import it only from server code.
- **Vercel:** no `vercel.json`; Root Directory must be `blog` (set in the dashboard).
- **`draft` filtering depends on `NODE_ENV`.** Check draft behavior with `build` + `start`, not `dev`.
