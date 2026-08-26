import { useEffect } from 'react'
import { datasetIssues } from './parseReadme.js'
import { README_RAW_URL } from './source.js'
import { editorial, parseReadme, setDataset } from './dataset'

/**
 * On mount, fetch the latest README straight from the GitHub repo and re-parse it,
 * swapping the live dataset if `main` has moved since this build was deployed.
 * Best-effort: any failure (offline, rate-limit, malformed parse) silently keeps
 * the bundled dataset, so the site always works without the network.
 */
export function useLiveUpdate(): void {
  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const res = await fetch(README_RAW_URL, { cache: 'no-cache' })
        if (!res.ok || cancelled) return
        const md = await res.text()
        const data = parseReadme(md, editorial)
        if (cancelled || datasetIssues(data).length) return
        if (setDataset(data)) console.info('[evals] dataset refreshed from GitHub main')
      } catch {
        /* offline / rate-limited / parse error → keep the bundled dataset */
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])
}
