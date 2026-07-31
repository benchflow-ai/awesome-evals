import { useCallback, useEffect, useMemo, useState } from 'react'

function load(key: string): string[] {
  try {
    const v = JSON.parse(localStorage.getItem(key) || '[]')
    return Array.isArray(v) ? v : []
  } catch {
    return []
  }
}

/** A string list persisted to localStorage; returns the list plus a toggle-membership setter. */
function usePersistentList(key: string): [string[], (v: string) => void] {
  const [list, setList] = useState<string[]>(() => load(key))
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(list))
    } catch {
      /* storage unavailable (private mode / quota) — progress is best-effort */
    }
  }, [key, list])
  const toggle = useCallback((v: string) => setList((l) => (l.includes(v) ? l.filter((x) => x !== v) : [...l, v])), [])
  return [list, toggle]
}

export interface ReadingState {
  read: string[]
  bm: string[]
  isRead: (url: string) => boolean
  isBookmarked: (url: string) => boolean
  toggleRead: (url: string) => void
  toggleBookmark: (url: string) => void
}

/** Read + bookmark progress (localStorage keys match the original design). */
export function useReadingState(): ReadingState {
  const [read, toggleRead] = usePersistentList('evals_read')
  const [bm, toggleBookmark] = usePersistentList('evals_bm')
  // Memoized so the returned object is stable between renders that don't change progress.
  return useMemo(
    () => ({
      read,
      bm,
      isRead: (url: string) => read.includes(url),
      isBookmarked: (url: string) => bm.includes(url),
      toggleRead,
      toggleBookmark,
    }),
    [read, bm, toggleRead, toggleBookmark],
  )
}
