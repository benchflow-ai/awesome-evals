import { useMemo, useState } from 'react'
import type { EvalType, Entry, SortName } from '../types'
import { TYPE_COLORS, TYPE_LABELS, TYPE_ORDER } from '../lib/constants'
import { useDataset, secOrder } from '../lib/dataset'
import type { ReadingState } from '../lib/useReadingState'
import { css } from '../lib/css'

interface Props {
  reading: ReadingState
  openEntry: (url: string) => void
}

interface Filters {
  query: string
  types: EvalType[]
  sections: string[]
  newOnly: boolean
  mustOnly: boolean
  bmOnly: boolean
  unreadOnly: boolean
  sort: SortName
}

const EMPTY: Filters = {
  query: '',
  types: [],
  sections: [],
  newOnly: false,
  mustOnly: false,
  bmOnly: false,
  unreadOnly: false,
  sort: 'section',
}

function toggleIn<T>(list: T[], v: T): T[] {
  return list.includes(v) ? list.filter((x) => x !== v) : [...list, v]
}

export function Catalog({ reading, openEntry }: Props) {
  const { all, data, secLabel, stats } = useDataset()
  const [f, setF] = useState<Filters>(EMPTY)
  const { read, bm } = reading

  const facets = useMemo(() => {
    const typeCounts: Record<string, number> = {}
    const secCounts: Record<string, number> = {}
    for (const e of all) {
      typeCounts[e.type] = (typeCounts[e.type] || 0) + 1
      secCounts[e.section] = (secCounts[e.section] || 0) + 1
    }
    return {
      typeCounts,
      secCounts,
      secList: data.sections.map((x) => ({ num: x.num, title: x.title })).concat([{ num: 'T', title: 'Talks & media' }]),
    }
  }, [all, data])

  const filtered = useMemo(() => {
    let list = all
    if (f.types.length) list = list.filter((e) => f.types.includes(e.type))
    if (f.sections.length) list = list.filter((e) => f.sections.includes(e.section))
    if (f.newOnly) list = list.filter((e) => e.isNew)
    if (f.mustOnly) list = list.filter((e) => e.must)
    if (f.bmOnly) list = list.filter((e) => bm.includes(e.url))
    if (f.unreadOnly) list = list.filter((e) => !read.includes(e.url))
    const q = f.query.trim().toLowerCase()
    if (q) list = list.filter((e) => (e.title + ' ' + e.authors + ' ' + e.annotation).toLowerCase().includes(q))
    list = list.slice()
    if (f.sort === 'section') list.sort((a, b) => secOrder(a.section) - secOrder(b.section))
    else if (f.sort === 'az') list.sort((a, b) => a.title.localeCompare(b.title))
    else if (f.sort === 'new') list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0) || (b.must ? 1 : 0) - (a.must ? 1 : 0))
    return list
  }, [all, f, read, bm])

  const readCount = all.filter((e) => read.includes(e.url)).length

  const flagDefs: [keyof Filters, string, number][] = [
    ['newOnly', 'New in 2025–26', stats.newCount],
    ['mustOnly', 'Must-reads', stats.mustCount],
    ['bmOnly', 'Bookmarked', bm.length],
    ['unreadOnly', 'Unread only', stats.total - readCount],
  ]
  const sortTabs: [SortName, string][] = [
    ['section', 'By section'],
    ['new', 'Newest'],
    ['az', 'A–Z'],
  ]

  return (
    <div style={css('display:flex;height:100%')}>
      {/* filter rail */}
      <aside className="ef-scroll" style={css('flex:none;width:262px;border-right:1px solid rgba(28,26,22,.14);overflow-y:auto;padding:26px 22px 60px;background:#f7f3ea')}>
        <FacetHeader>Type</FacetHeader>
        <div style={css('display:flex;flex-direction:column;gap:1px;margin-bottom:26px')}>
          {TYPE_ORDER.map((t) => {
            const on = f.types.includes(t)
            return (
              <div key={t} onClick={() => setF((s) => ({ ...s, types: toggleIn(s.types, t) }))} style={css(`cursor:pointer;display:flex;align-items:center;gap:9px;padding:6px 8px;border-radius:2px;background:${on ? 'rgba(140,59,47,.08)' : 'transparent'}`)}>
                <div style={css(`width:8px;height:8px;border-radius:50%;flex:none;background:${TYPE_COLORS[t]}`)} />
                <div style={css(`flex:1;font-size:15px;color:${on ? '#8c3b2f' : '#332f27'};font-weight:${on ? '600' : '400'}`)}>{TYPE_LABELS[t]}</div>
                <div style={css("font-family:'Spline Sans Mono',monospace;font-size:11px;color:#a8a193")}>{facets.typeCounts[t] || 0}</div>
              </div>
            )
          })}
        </div>

        <FacetHeader>Section</FacetHeader>
        <div style={css('display:flex;flex-direction:column;gap:1px;margin-bottom:26px')}>
          {facets.secList.map((x) => {
            const on = f.sections.includes(x.num)
            return (
              <div key={x.num} onClick={() => setF((s) => ({ ...s, sections: toggleIn(s.sections, x.num) }))} style={css(`cursor:pointer;display:flex;align-items:baseline;gap:9px;padding:5px 8px;border-radius:2px;background:${on ? 'rgba(140,59,47,.08)' : 'transparent'}`)}>
                <div style={css("font-family:'Spline Sans Mono',monospace;font-size:10px;color:#8c3b2f;width:18px;flex:none")}>{x.num}</div>
                <div style={css(`flex:1;font-size:13.5px;line-height:1.25;color:${on ? '#8c3b2f' : '#332f27'};font-weight:${on ? '600' : '400'}`)}>{x.title}</div>
                <div style={css("font-family:'Spline Sans Mono',monospace;font-size:11px;color:#a8a193")}>{facets.secCounts[x.num] || 0}</div>
              </div>
            )
          })}
        </div>

        <FacetHeader>Filter</FacetHeader>
        <div style={css('display:flex;flex-direction:column;gap:1px')}>
          {flagDefs.map(([k, label, count]) => {
            const on = f[k] as boolean
            return (
              <div key={k} onClick={() => setF((s) => ({ ...s, [k]: !s[k] }))} style={css(`cursor:pointer;display:flex;align-items:center;gap:9px;padding:6px 8px;border-radius:2px;background:${on ? 'rgba(140,59,47,.08)' : 'transparent'}`)}>
                <div style={css(`width:13px;height:13px;border-radius:3px;flex:none;border:1.5px solid ${on ? '#8c3b2f' : 'rgba(28,26,22,.3)'};background:${on ? '#8c3b2f' : 'transparent'}`)} />
                <div style={css(`flex:1;font-size:15px;color:${on ? '#8c3b2f' : '#332f27'};font-weight:${on ? '600' : '400'}`)}>{label}</div>
                <div style={css("font-family:'Spline Sans Mono',monospace;font-size:11px;color:#a8a193")}>{count}</div>
              </div>
            )
          })}
        </div>
        <div onClick={() => setF(EMPTY)} style={css("cursor:pointer;margin-top:22px;font-family:'Spline Sans Mono',monospace;font-size:11px;letter-spacing:.06em;color:#8c3b2f")}>
          ↺ Clear all filters
        </div>
      </aside>

      {/* list */}
      <div className="ef-scroll" style={css('flex:1;overflow-y:auto;min-width:0')}>
        <div style={css('position:sticky;top:0;background:#f3efe5;border-bottom:1px solid rgba(28,26,22,.14);padding:18px 34px;z-index:10')}>
          <div style={css('display:flex;align-items:center;gap:16px')}>
            <div style={css('flex:1;display:flex;align-items:center;gap:11px;background:#fbf8f1;border:1px solid rgba(28,26,22,.18);border-radius:3px;padding:11px 15px')}>
              <span style={css("font-family:'Spline Sans Mono',monospace;color:#a8a193;font-size:14px")}>⌕</span>
              <input
                value={f.query}
                onChange={(e) => setF((s) => ({ ...s, query: e.target.value }))}
                placeholder="Search title, author, or annotation…"
                style={css("flex:1;border:none;outline:none;background:transparent;font-family:'Newsreader',serif;font-size:16px;color:#1c1a16")}
              />
              {f.query && <span onClick={() => setF((s) => ({ ...s, query: '' }))} style={css('cursor:pointer;color:#a8a193;font-size:16px')}>✕</span>}
            </div>
            <div style={css("font-family:'Spline Sans Mono',monospace;font-size:12px;color:#6b6557;white-space:nowrap")}>{filtered.length} results</div>
            <div style={css('display:flex;border:1px solid rgba(28,26,22,.18);border-radius:3px;overflow:hidden')}>
              {sortTabs.map(([v, label]) => (
                <div key={v} onClick={() => setF((s) => ({ ...s, sort: v }))} style={css(`cursor:pointer;font-family:'Spline Sans Mono',monospace;font-size:11px;letter-spacing:.04em;padding:9px 13px;background:${f.sort === v ? '#1c1a16' : '#fbf8f1'};color:${f.sort === v ? '#f3efe5' : '#6b6557'}`)}>
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={css('padding:8px 0 70px')}>
          {filtered.map((e) => (
            <CatalogRow key={e.url} e={e} reading={reading} openEntry={openEntry} sectionLabel={secLabel(e.section)} />
          ))}
          {filtered.length === 0 && (
            <div style={css('padding:80px 34px;text-align:center;color:#9b9486')}>
              <div style={css('font-size:40px;margin-bottom:10px')}>⌕</div>
              <div style={css('font-size:19px;color:#6b6557')}>No resources match those filters.</div>
              <div onClick={() => setF(EMPTY)} style={css("cursor:pointer;margin-top:14px;font-family:'Spline Sans Mono',monospace;font-size:12px;color:#8c3b2f")}>
                ↺ Clear filters
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function FacetHeader({ children }: { children: React.ReactNode }) {
  return (
    <div style={css("font-family:'Spline Sans Mono',monospace;font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:#8c8475;margin-bottom:12px")}>
      {children}
    </div>
  )
}

function CatalogRow({ e, reading, openEntry, sectionLabel }: { e: Entry; reading: ReadingState; openEntry: (url: string) => void; sectionLabel: string }) {
  const isR = reading.isRead(e.url)
  const isB = reading.isBookmarked(e.url)
  const typeColor = TYPE_COLORS[e.type] || '#6b6557'
  const stop = (fn: () => void) => (ev: React.MouseEvent) => {
    ev.stopPropagation()
    fn()
  }
  return (
    <div onClick={() => openEntry(e.url)} style={css('display:flex;gap:18px;padding:17px 34px;border-bottom:1px solid rgba(28,26,22,.08);background:transparent;cursor:pointer')}>
      <div onClick={stop(() => reading.toggleRead(e.url))} title="Mark read" style={css(`flex:none;margin-top:3px;width:19px;height:19px;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-size:11px;transition:background .15s,border-color .15s;border:1.5px solid ${isR ? '#4a6b46' : 'rgba(28,26,22,.32)'};background:${isR ? '#4a6b46' : 'transparent'}`)}>
        {isR ? '✓' : ''}
      </div>
      <div style={css('flex:1;min-width:0')}>
        <div style={css('display:flex;align-items:baseline;gap:10px;flex-wrap:wrap')}>
          <h3 style={css(`font-size:20px;font-weight:500;letter-spacing:-.01em;margin:0;color:${isR ? '#9b9486' : '#1c1a16'}`)}>{e.title}</h3>
          {e.isNew && <span style={css("font-family:'Spline Sans Mono',monospace;font-size:8.5px;letter-spacing:.1em;color:#a8842c;border:1px solid #d8c08a;padding:1px 5px;border-radius:2px")}>NEW</span>}
          {e.must && <span style={css("font-family:'Spline Sans Mono',monospace;font-size:8.5px;letter-spacing:.1em;color:#8c3b2f;border:1px solid #d3a99f;padding:1px 5px;border-radius:2px")}>MUST</span>}
        </div>
        <p style={css('font-size:15.5px;line-height:1.42;color:#5c564a;margin:5px 0 0;font-weight:300;max-width:88ch')}>{e.annotation}</p>
        <div style={css('display:flex;align-items:center;gap:12px;margin-top:9px')}>
          <span style={css(`font-family:'Spline Sans Mono',monospace;font-size:9.5px;letter-spacing:.08em;text-transform:uppercase;color:${typeColor}`)}>● {TYPE_LABELS[e.type] || e.type}</span>
          <span style={css("font-family:'Spline Sans Mono',monospace;font-size:11px;color:#a39c8d")}>{e.authors || '—'}</span>
          <span style={css("font-family:'Spline Sans Mono',monospace;font-size:10px;color:#bdb6a6")}>{sectionLabel}</span>
        </div>
      </div>
      <div onClick={stop(() => reading.toggleBookmark(e.url))} title="Bookmark" style={css(`flex:none;cursor:pointer;font-size:17px;margin-top:2px;color:${isB ? '#8c3b2f' : 'rgba(28,26,22,.22)'}`)}>
        {isB ? '★' : '☆'}
      </div>
    </div>
  )
}
