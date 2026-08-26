# The Frontier of Evals — web portal

A reading portal for [**awesome-evals**](../../README.md): the curated library of
resources for building and evaluating AI agents, presented as a guided experience
(reading path · searchable catalog · landscape map · curriculum). This is the
frontend for **eval.news**.

Built with **Vite + React + TypeScript**. Ported from the Claude Design source
(`Evals Frontier.dc.html`).

## Develop

```bash
cd packages/web
npm install
npm run dev        # http://localhost:5173
```

## Build

```bash
npm run build      # type-checks, then emits static site to dist/
npm run preview    # serve the production build locally
```

## Deploy (Vercel)

This package is a self-contained static SPA. Point a Vercel project at it:

- **Root Directory:** `packages/web`
- Framework preset **Vite** (build `npm run build`, output `dist/`) — already
  declared in [`vercel.json`](./vercel.json).

No server, env vars, or secrets required.

## Data

**The dataset is generated from the repo's [`README.md`](../../README.md)** — the
canonical, self-curating source (see [SCAN.md](../../SCAN.md)). A shared parser
([`src/lib/parseReadme.js`](./src/lib/parseReadme.js)) turns it into `starter`,
ten `sections` (each with `subsections` of entries), `talks` categories, and a
`companies` list. Each entry carries `title`, `url`, `authors`, `type`
(`paper`/`benchmark`/`tool`/`talk`/`blog`), `annotation`, and the
`isNew`/`must`/`caveat` flags. The only editorial layer — the ten section
**titles/subtitles**, rewritten for the portal — lives in
[`src/data/editorial.json`](./src/data/editorial.json) and is merged in.

The data comes from the repo **two ways**:

1. **Build time** — `prebuild` runs [`scripts/build-data.mjs`](./scripts/build-data.mjs),
   which parses the in-repo `README.md` (GitHub-raw fallback) into
   `src/data/evals-data.json`. So every Vercel deploy reflects `main` as merged.
   The JSON is committed too, so `npm run dev` and offline loads work immediately.
2. **Runtime** — on load the app fetches the latest `README.md` from GitHub `main`,
   re-parses it with the same parser, and live-swaps the dataset **only if it
   changed** since the deploy (see [`src/lib/useLiveUpdate.ts`](./src/lib/useLiveUpdate.ts)).
   Best-effort: any failure silently keeps the bundled dataset.

```bash
npm run data                  # regenerate evals-data.json from README (local, GH fallback)
SOURCE=remote npm run data    # force-generate from GitHub raw
npm run check:readme          # report URLs added/removed in README vs the dataset
```

The source repo/branch is configured in [`src/lib/source.js`](./src/lib/source.js).
Read + bookmark progress is stored client-side in `localStorage`
(`evals_read`, `evals_bm`).

## Structure

```
src/
  App.tsx              # layout shell, hash routing, view + selection, live-update
  data/
    evals-data.json    # generated dataset (committed default + offline fallback)
    editorial.json     # the only hand-curated layer: section titles/subtitles
  lib/
    parseReadme.js     # README → dataset parser (shared: build script + browser)
    dataset.ts         # reactive store (useSyncExternalStore) + ingest/lookups
    useLiveUpdate.ts   # runtime GitHub fetch → live dataset swap
    source.js          # GitHub owner/repo/branch + raw README URL
    useReadingState.ts · css.ts · constants.ts
  components/          # Masthead · Home · ReadingPath · Catalog · MapView · Learn · DetailDrawer
scripts/
  build-data.mjs       # prebuild: README → evals-data.json
  check-readme-sync.mjs
```
