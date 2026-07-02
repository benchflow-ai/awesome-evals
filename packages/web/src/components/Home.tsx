import type { ViewName } from '../types'
import { css, lift } from '../lib/css'

interface Props {
  total: number
  sectionCount: number
  newCount: number
  mustCount: number
  starterCount: number
  onNav: (v: ViewName) => void
}

const MODES: [ViewName, string, string, string, string, string][] = [
  ['path', '01', '❯', 'Reading Path', 'The twelve must-reads in sequence — the fastest way to load the field’s mental model.', 'Begin the canon'],
  ['catalog', '02', '▦', 'The Catalog', 'All resources, searchable and filterable by type, section, and recency. Track what you’ve read.', 'Search everything'],
  ['map', '03', '✦', 'Landscape Map', 'A constellation of the whole field — see how the sections cluster and where the frontier glows.', 'Explore the map'],
  ['learn', '04', '◷', 'Learn Track', 'Ten sections as a curriculum — thesis, key concepts, and the readings, lesson by lesson.', 'Work through it'],
]

export function Home({ total, sectionCount, newCount, mustCount, starterCount, onNav }: Props) {
  // Must-reads = the inline-flagged section entries plus every starter pick.
  const stats: [number, string][] = [
    [total, 'curated resources'],
    [sectionCount, 'thematic sections'],
    [newCount, 'new in 2025–26'],
    [mustCount + starterCount, 'flagged must-reads'],
  ]
  return (
    <div style={css('max-width:1180px;margin:0 auto;padding:0 44px')}>
      <section style={css('padding:78px 0 30px;border-bottom:1px solid rgba(28,26,22,.14)')}>
        <div style={css("font-family:'Spline Sans Mono',monospace;font-size:11px;letter-spacing:.26em;text-transform:uppercase;color:#8c3b2f;margin-bottom:26px")}>
          An annotated atlas of AI evaluation
        </div>
        <h1 style={css('font-size:74px;line-height:1.02;font-weight:500;letter-spacing:-.025em;margin:0;max-width:14ch')}>
          How we measure what AI can&nbsp;do.
        </h1>
        <p style={css('font-size:21px;line-height:1.5;color:#454036;max-width:62ch;margin:30px 0 0;font-weight:300')}>
          A curated, opinionated library of the best resources for building and evaluating AI agents — every entry says{' '}
          <em>what it is and why it belongs</em>. Not a link dump. A guided path through the field's canon and its frontier.
        </p>
        <div style={css('display:flex;gap:14px;margin-top:38px;flex-wrap:wrap')}>
          <div className="ef-press" onClick={() => onNav('path')} style={css('cursor:pointer;background:#1c1a16;color:#f3efe5;padding:15px 26px;border-radius:2px;font-size:16px;font-weight:500;display:flex;align-items:center;gap:10px')}>
            Start the reading path <span style={css("font-family:'Spline Sans Mono',monospace;font-size:13px")}>→</span>
          </div>
          <div className="ef-press" onClick={() => onNav('catalog')} style={css('cursor:pointer;background:transparent;color:#1c1a16;padding:15px 26px;border-radius:2px;font-size:16px;font-weight:500;border:1px solid rgba(28,26,22,.3)')}>
            Browse all {total} resources
          </div>
        </div>
      </section>

      <section style={css('display:grid;grid-template-columns:repeat(4,1fr);gap:0;border-bottom:1px solid rgba(28,26,22,.14)')}>
        {stats.map(([n, label]) => (
          <div key={label} style={css('padding:28px 0;border-right:1px solid rgba(28,26,22,.1)')}>
            <div style={css('font-size:42px;font-weight:500;letter-spacing:-.02em;color:#1c1a16')}>{n}</div>
            <div style={css("font-family:'Spline Sans Mono',monospace;font-size:10px;letter-spacing:.13em;text-transform:uppercase;color:#8c8475;margin-top:4px")}>{label}</div>
          </div>
        ))}
      </section>

      <section style={css('padding:46px 0 22px')}>
        <div style={css("font-family:'Spline Sans Mono',monospace;font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:#8c8475;margin-bottom:6px")}>
          Four ways to explore
        </div>
      </section>
      <section style={css('display:grid;grid-template-columns:repeat(2,1fr);gap:18px;padding-bottom:60px')}>
        {MODES.map(([v, idx, glyph, title, desc, cta]) => (
          <div
            key={v}
            onClick={() => onNav(v)}
            {...lift('translateY(-3px)', '0 14px 30px rgba(28,26,22,.1)')}
            style={css('cursor:pointer;background:#fbf8f1;border:1px solid rgba(28,26,22,.13);border-radius:3px;padding:30px 30px 26px;display:flex;flex-direction:column;min-height:172px;transition:transform .15s,box-shadow .15s')}
          >
            <div style={css('display:flex;align-items:center;gap:13px')}>
              <div style={css("font-family:'Spline Sans Mono',monospace;font-size:11px;color:#8c3b2f;letter-spacing:.1em")}>{idx}</div>
              <div style={css('height:1px;flex:1;background:rgba(28,26,22,.12)')} />
              <div style={css("font-family:'Spline Sans Mono',monospace;font-size:13px;color:#c2bba9")}>{glyph}</div>
            </div>
            <h3 style={css('font-size:27px;font-weight:500;letter-spacing:-.015em;margin:18px 0 0')}>{title}</h3>
            <p style={css('font-size:16px;line-height:1.45;color:#5c564a;margin:9px 0 0;font-weight:300;flex:1')}>{desc}</p>
            <div style={css("font-family:'Spline Sans Mono',monospace;font-size:11px;letter-spacing:.08em;color:#8c3b2f;margin-top:16px")}>{cta} →</div>
          </div>
        ))}
      </section>
    </div>
  )
}
