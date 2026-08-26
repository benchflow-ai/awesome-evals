import type { EvalsData, RawEntry, EvalType } from '../types'

export type Editorial = { sectionMeta: Record<string, { title: string; sub: string }> }

export function normalizeType(rawType: string): EvalType
export function parseEntry(line: string): RawEntry | null
export function parseReadme(md: string, editorial: Editorial): EvalsData
export function flattenEntries(data: EvalsData): RawEntry[]
export function datasetIssues(data: EvalsData): string[]
