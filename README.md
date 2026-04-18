# Citadel Character Atlas

Citadel Character Atlas is a character browser built on the Rick and Morty API, with search, filters, pagination, localization, and detail views.

A responsive Next.js app that browses characters from the Rick and Morty GraphQL API with fast search, filters, pagination, and a detail drawer.

![Rick and Morty Explorer](https://img.shields.io/badge/Rick%20and%20Morty-Multiverse%20Explorer-08C952?style=for-the-badge&logo=react)
![Next.js](https://img.shields.io/badge/Next.js-15.5.3-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-blue?style=for-the-badge&logo=typescript)
![Hero UI](https://img.shields.io/badge/Hero%20UI-2.4.22-purple?style=for-the-badge)
![Apollo Client](https://img.shields.io/badge/Apollo%20Client-3.14.0-pink?style=for-the-badge&logo=apollo-graphql)

---

## 🧱 Tech Stack

- **Framework:** Next.js 15.5.3 (App Router)
- **Language:** TypeScript 5.9.2
- **Styling:** Tailwind CSS 4.1.13 + Hero UI 2.4.22
- **GraphQL Client:** Apollo Client 3.14.0
- **API:** [Rick and Morty GraphQL](https://rickandmortyapi.com/graphql)
- **State:** URL-based state via custom hooks
- **Testing:** Vitest, React Testing Library, Playwright
- **Tooling:** ESLint, Prettier, Storybook

---

## 🎯 Features

### Core

- ✅ Debounced search by name (500 ms)
- ✅ Paginated table/list with Next/Prev
- ✅ Detail drawer with image, origin, location, episode count
- ✅ Columns: Name, Status, Species, Gender
- ✅ Responsive layout

### Advanced

- 🔍 Filters: status, gender, species
- 🌐 i18n: English, German, French
- 🌙 Theme switch: light/dark
- ♿ Accessibility: keyboard nav + screen reader support
- 🛡️ Error boundaries with friendly messages
- ⚡ Performance: Apollo cache persistence and tuned queries
- 🔗 URL state: shareable search/filter/pagination

---

## 🏗 Architecture

- **Container/Presentational:** `CharacterTableContainer` (data) + `CharacterTable` (UI)
- **Custom Hooks:** `useDebouncedCallback`, `useTableUrlState`, `useKeyboardNavigation`
- **GraphQL:** Apollo Client with cache type policies and pagination merge
- **Error Handling:** Boundary components at key routes
- **URL State:** All search/filters/page in query params for shareability and back/forward support

---

## 📐 Quality & UX

- Clear component structure, strong typing, dead-code free
- Clean, minimalist UI with Hero UI components
- WCAG-aware colors, focus indicators, semantic HTML
- Keyboard shortcuts: **Ctrl+K** search, **Esc** close, **Alt+1** main content
- Live regions for result updates

---

## ⚙️ Performance

- 500 ms input debounce to limit queries
- Apollo cache persistence (localStorage)
- Pagination merging and filter-aware cache keys
- Dynamic imports for non-critical components
- Optimized Hero UI imports

---

## 🗂 Project Structure

```text
rick-et-morty/
├── app/
│   ├── layout.tsx            # Root layout + providers
│   ├── page.tsx              # Home
│   ├── not-found.tsx         # 404
│   └── providers.tsx         # Apollo + theme providers
├── components/
│   ├── CharacterTable.tsx
│   ├── CharacterTableContainer.tsx
│   ├── CharacterDetailDrawer.tsx
│   ├── ErrorBoundary.tsx
│   ├── LoadingStates.tsx
│   └── AccessibilityEnhancements.tsx
├── hooks/
│   ├── useDebouncedCallback.ts
│   ├── useTableUrlState.ts
│   └── useKeyboardNavigation.ts
├── lib/
│   ├── apollo-client.ts
│   └── graphql/              # Queries and fragments
├── messages/                 # en.json, de.json, fr.json
├── styles/
├── tests/                    # unit/ and e2e/
└── stories/                  # Storybook
```

---

## 🧩 Branding & SEO

- Favicon: `public/favicon.svg` (SVG + ICO)
- Navbar title: “Rick and Morty Explorer”
- SEO: title, Open Graph, Twitter, keywords in `app/layout.tsx`

---

## 🚀 Quick Start

### Prereqs

- Node.js 18+
- npm, yarn, or pnpm

### Install

```bash
git clone <your-repo-url>
cd rick-et-morty
npm install    # or yarn / pnpm
```

### Run

```bash
npm run dev
# open http://localhost:3000
```

---

## 📜 Scripts

```bash
# Dev
npm run dev           # Turbopack
npm run build         # Production build
npm run start         # Start production

# Quality
npm run lint          # ESLint --fix
npm run format        # Prettier
npm run type-check    # tsc

# Tests
npm run test          # Vitest
npm run test:watch
npm run test:coverage
npm run e2e           # Playwright
npm run e2e:ui        # Playwright UI

# Storybook
npm run storybook
npm run build-storybook

# GraphQL
npm run codegen
npm run codegen:watch
```

---

## 🌐 Internationalization

- Default: **en**
- Supported: **en**, **de**, **fr** (via `next-intl`)
- Language switcher in header with persisted preference

---

## 🧪 Testing

- **Unit:** Vitest + RTL for components, hooks, utilities
- **E2E:** Playwright for search, pagination, filters, critical flows
- **Visual:** Storybook; Chromatic optional

---

## 🚢 Deployment

- No env vars required; public API used
- Targets: Vercel (recommended), Netlify, AWS Amplify, Railway, Docker

```bash
npm run build
npm run start
```

---

## 📝 Assumptions & Decisions

- **API reliability:** Public API assumed stable
- **Browsers:** Modern ES2020+
- **Network:** Works on slow links; cache-first where feasible
- **Mobile-first:** Responsive from small breakpoints up
- **Progressive enhancement:** SSR where possible, graceful client hydration
- **Performance budget:** Tuned for Core Web Vitals

---

## 🤝 Contributing

1. Fork
2. `git checkout -b feature/amazing-feature`
3. Commit
4. Push
5. Open PR

---

## 🙏 Acknowledgments

- [Rick and Morty API](https://rickandmortyapi.com/)
- [Hero UI](https://heroui.com/)
- [Next.js](https://nextjs.org/)
- [Apollo GraphQL](https://www.apollographql.com/)
