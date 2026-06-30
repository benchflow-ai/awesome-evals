import { useSyncExternalStore } from 'react'
import bundled from '../data/evals-data.json'
import editorialJson from '../data/editorial.json'
import { parseReadme } from './parseReadme.js'
import type { Editorial } from './parseReadme'
import type { EvalsData, Entry, RawEntry, SectionMeta } from '../types'

export const editorial = editorialJson as Editorial
export { parseReadme }
export const secOrder = (n: string): number => (n === 'T' ? 99 : parseInt(n, 10))

/** Everything a view needs, derived once per dataset. */
export interface DatasetView {
  data: EvalsData
  all: Entry[]
  secMeta: Record<string, SectionMeta>
  secLabel: (num: string) => string
  findEntry: (url: string) => Entry | RawEntry | undefined
  stats: { total: number; sectionCount: number; newCount: number; mustCount: number; starterCount: number }
}

/** Flatten + de-duplicate by URL and precompute lookups (mirrors the original `_ingest`). */
function ingest(data: EvalsData): DatasetView {
  const seen = new Map<string, Entry>()
  // First occurrence wins: a URL listed in two sections keeps the earlier one's
  // section + flags. So a later `(MUST)` listing can dedupe away — which is why
  // `stats.mustCount` (5) is below the raw count of (MUST) markers (6). Faithful to the design.
  const push = (e: RawEntry, section: string, subsection: string | null) => {
    if (!seen.has(e.url)) seen.set(e.url, { ...e, id: e.url, section, subsection })
  }
  for (const s of data.sections) for (const ss of s.subsections) for (const e of ss.entries) push(e, s.num, ss.name)
  for (const c of data.talks.categories) for (const e of c.entries) push(e, 'T', c.name)
  const all = [...seen.values()]

  const secMeta: Record<string, SectionMeta> = {}
  for (const s of data.sections) secMeta[s.num] = s
  secMeta['T'] = { num: 'T', title: 'Talks, podcasts & lectures', sub: 'Transcribed and noted — the field in motion' }

  return {
    data,
    all,
    secMeta,
    secLabel: (num) => (num === 'T' ? 'Talks & media' : secMeta[num] ? `§${num} · ${secMeta[num].title}` : `§${num}`),
    findEntry: (url) => all.find((x) => x.url === url) || data.starter.find((x) => x.url === url),
    stats: {
      total: all.length,
      sectionCount: data.sections.length,
      newCount: all.filter((e) => e.isNew).length,
      mustCount: all.filter((e) => e.must).length,
      starterCount: data.starter.length,
    },
  }
}

// External store: the bundled dataset is the default; a runtime GitHub fetch can swap it.
let current = ingest(bundled as unknown as EvalsData)
let currentSig = JSON.stringify(bundled)
const listeners = new Set<() => void>()

const getSnapshot = () => current
function subscribe(l: () => void) {
  listeners.add(l)
  return () => listeners.delete(l)
}

/** Replace the live dataset; returns false (and does nothing) if identical to the current one. */
export function setDataset(data: EvalsData): boolean {
  const sig = JSON.stringify(data)
  if (sig === currentSig) return false
  current = ingest(data)
  currentSig = sig
  listeners.forEach((l) => l())
  return true
}

export function useDataset(): DatasetView {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
}
