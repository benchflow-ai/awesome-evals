// @ts-check
/**
 * Parse the awesome-evals README.md into the dataset shape the portal renders.
 * Pure (no Node/DOM APIs) so it runs identically in the build script and the browser.
 *
 * Every per-entry field is derived from the README; only the ten section
 * titles/subtitles are editorial (rewritten for the portal) and supplied via
 * `editorial.sectionMeta`. See ../data/editorial.json.
 */

/** @typedef {{sectionMeta: Record<string,{title:string,sub:string}>}} Editorial */

/** Map a raw `*type*` token to one of the five display types. */
export function normalizeType(rawType) {
  const rt = (rawType || '').toLowerCase().trim()
  if (rt === '') return 'tool'
  if (rt.includes('benchmark') || rt.includes('leaderboard')) return 'benchmark'
  if (rt.includes('paper')) return 'paper'
  if (rt.includes('talk') || rt.includes('podcast') || rt.includes('lecture') || rt.includes('interview')) return 'talk'
  if (rt.includes('tool') || rt.includes('docs')) return 'tool'
  return 'blog'
}

const LINK_RE = /\*\*\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)\*\*/

/** Authors = the first em-dash segment after the bold title, if it's prose (not a link). */
function parseAuthors(after) {
  const s = after.replace(/^\s*—\s*/, '')
  const idx = s.indexOf(' — ')
  let seg = (idx >= 0 ? s.slice(0, idx) : s).trim()
  if (!seg || seg.startsWith('<') || seg.startsWith('[') || seg.startsWith('`') || seg.includes('<http')) return ''
  return seg
    .replace(/\([^()]*\)/g, '') // drop (affiliations/venues), as the design does
    .replace(/\s+([,.;])/g, '$1') // tidy " ," → ","
    .replace(/\s{2,}/g, ' ')
    .trim()
}

/**
 * For type-less entries (mostly §5 tools): `[authors — ] <links> — annotation`.
 * Segments are split on ` — `. Skip the leading author segment(s), then skip the
 * link block (a `<url>` segment, possibly several — multi-repo rows like OpenRLHF);
 * everything after is the annotation, re-joined (annotations may contain ` — ` and
 * even an inline `<url>`, so a "first/last link" heuristic is not enough).
 */
function sliceAfterLinks(after) {
  const segs = after.replace(/^\s*—\s*/, '').split(' — ')
  const isLink = (seg) => seg.trimStart().startsWith('<')
  let i = 0
  while (i < segs.length && !isLink(segs[i])) i++ // skip author segment(s)
  while (i < segs.length && isLink(segs[i])) i++ // skip the link block
  return segs.slice(i).join(' — ')
}

/** Strip README markup/markers from an annotation, preserving its prose (and single *emphasis*). */
function cleanAnnotation(raw) {
  return raw
    .replace(/🆕/g, '')
    .replace(/⚠️/g, '')
    .replace(/⚠\([^)]*\)/g, '')
    .replace(/⚠/g, '')
    // strip *paired* emphasis only, keeping inner text (**(MUST)** → (MUST), *why* → why);
    // a lone literal asterisk (e.g. "O*NET", a trailing glob "foo-*") is preserved.
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/`/g, '') // code spans → keep inner text
    .replace(/\s+/g, ' ')
    .replace(/^[\s—–·-]+/, '')
    .trim()
}

/** Parse a single entry line (bullet or numbered) into the entry record. */
export function parseEntry(line) {
  const m = line.match(LINK_RE)
  if (!m) return null
  const after = line.slice(m.index + m[0].length)

  const typeM = after.match(/·\s*\*([^*]+)\*/)
  const rawType = typeM ? typeM[1].trim() : ''
  const annoRaw = typeM ? after.slice(typeM.index + typeM[0].length) : sliceAfterLinks(after)

  return {
    title: m[1],
    url: m[2],
    authors: parseAuthors(after),
    type: normalizeType(rawType),
    rawType,
    isNew: /🆕/.test(line),
    caveat: /⚠/.test(line),
    must: /\(MUST\)/.test(line) || /industry must-read/i.test(line),
    annotation: cleanAnnotation(annoRaw),
  }
}

/**
 * @param {string} md - README.md contents
 * @param {Editorial} editorial
 */
export function parseReadme(md, editorial) {
  const meta = (editorial && editorial.sectionMeta) || {}
  const lines = md.split('\n')

  const starter = []
  /** @type {any[]} */
  const sections = []
  const talks = { categories: [] }
  const companies = []

  let mode = 'none'
  /** @type {any} */
  let section = null
  /** @type {any} */
  let sub = null
  /** @type {any} */
  let talkCat = null

  for (const line of lines) {
    const h2 = line.match(/^## +(.*)$/)
    if (h2) {
      const h = h2[1].trim()
      const secM = h.match(/^(\d+) · (.+)$/)
      if (/Must-read starter set/i.test(h)) mode = 'starter'
      else if (secM) {
        mode = 'section'
        const num = secM[1]
        const ov = meta[num] || {}
        // Fallback when no editorial override: title before "(", sub from the parenthetical.
        const paren = secM[2].match(/^(.*?)\s*\((.*)\)\s*$/)
        section = {
          num,
          title: ov.title || (paren ? paren[1].trim() : secM[2].trim()),
          sub: ov.sub || (paren ? paren[2].trim() : ''),
          mustReads: '',
          subsections: [{ name: null, entries: [] }],
        }
        sub = section.subsections[0]
        sections.push(section)
      } else if (/Talks, podcasts/i.test(h)) mode = 'talks'
      else if (/^Companies & landscape/i.test(h)) mode = 'companies'
      else mode = 'none'
      continue
    }

    const h3 = line.match(/^### +(.*)$/)
    if (h3) {
      const name = h3[1].trim()
      if (mode === 'section' && section) {
        sub = { name: name.replace(/ · /g, ' — '), entries: [] }
        section.subsections.push(sub)
      } else if (mode === 'talks') {
        talkCat = { name, entries: [] }
        talks.categories.push(talkCat)
      }
      continue
    }

    if (mode === 'starter') {
      const sm = line.match(/^(\d+)\. /)
      if (sm) {
        const e = parseEntry(line)
        if (e) starter.push({ ...e, starterRank: parseInt(sm[1], 10) })
      }
      continue
    }
    if (mode === 'section' && section) {
      const mr = line.match(/^\*\*Must-reads:\*\* +(.*)$/)
      if (mr) {
        section.mustReads = mr[1].trim()
        continue
      }
      if (/^- \*\*\[/.test(line)) {
        const e = parseEntry(line)
        if (e) sub.entries.push({ ...e, section: section.num, subsection: sub.name })
      }
      continue
    }
    if (mode === 'talks' && talkCat) {
      if (/^- \*\*\[/.test(line)) {
        const e = parseEntry(line)
        if (e) talkCat.entries.push(e)
      }
      continue
    }
    if (mode === 'companies') {
      const cm = line.match(/^- (.*\S.*)$/)
      if (cm) companies.push(cm[1].trim())
    }
  }

  return { starter, sections, talks, companies }
}

/** Every entry across starter + sections + talks, in document order (not de-duplicated). */
export function flattenEntries(data) {
  const out = []
  for (const e of data.starter) out.push(e)
  for (const s of data.sections) for (const ss of s.subsections) for (const e of ss.entries) out.push(e)
  for (const c of data.talks.categories) for (const e of c.entries) out.push(e)
  return out
}

/**
 * Structural sanity check for a parsed dataset — the single source of truth for
 * "is this parse trustworthy?", shared by the build generator and the runtime
 * live-update so the two can't drift. Returns human-readable problems ([] = ok).
 */
export function datasetIssues(data) {
  const issues = []
  if (data.sections.length !== 10) issues.push(`expected 10 sections, got ${data.sections.length}`)
  if (data.starter.length < 8) issues.push(`expected ≥8 starter picks, got ${data.starter.length}`)
  if (!data.talks.categories.length) issues.push('no talk categories parsed')
  const n = new Set(flattenEntries(data).map((e) => e.url)).size
  if (n < 300) issues.push(`only ${n} unique URLs (expected 300+)`)
  return issues
}
