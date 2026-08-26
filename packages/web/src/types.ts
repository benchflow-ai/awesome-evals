export type EvalType = 'paper' | 'benchmark' | 'tool' | 'talk' | 'blog'

/** An entry exactly as it appears in evals-data.json. */
export interface RawEntry {
  title: string
  url: string
  authors: string
  type: EvalType
  rawType: string
  isNew: boolean
  caveat: boolean
  must: boolean
  annotation: string
  /** present on starter entries only */
  starterRank?: number
  /** baked onto section entries in the source data; re-derived on ingest */
  section?: string | null
  subsection?: string | null
}

export interface Subsection {
  name: string | null
  entries: RawEntry[]
}

export interface Section {
  num: string
  title: string
  sub: string
  mustReads: string
  subsections: Subsection[]
}

export interface TalkCategory {
  name: string
  entries: RawEntry[]
}

export interface EvalsData {
  starter: RawEntry[]
  sections: Section[]
  talks: { categories: TalkCategory[] }
  companies: string[]
}

/** A flattened, de-duplicated entry carrying its resolved section/subsection. */
export interface Entry extends RawEntry {
  id: string
  section: string
  subsection: string | null
}

/** Lightweight section metadata used by `secLabel` and the Learn/Map views. */
export interface SectionMeta {
  num: string
  title: string
  sub?: string
}

export type ViewName = 'home' | 'path' | 'catalog' | 'map' | 'learn'
export type SortName = 'section' | 'new' | 'az'
