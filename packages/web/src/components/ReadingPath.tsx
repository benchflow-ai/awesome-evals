import type { RawEntry, ViewName } from '../types'
import { TYPE_COLORS, TYPE_LABELS } from '../lib/constants'
import type { ReadingState } from '../lib/useReadingState'
import { css } from '../lib/css'

interface Props {
  starter: RawEntry[]
  reading: ReadingState
  openEntry: (url: string) => void
  onNav: (v: ViewName) => void
}

export function ReadingPath({ starter, reading, openEntry, onNav }: Props) {
  const pathRead = starter.filter((e) => reading.isRead(e.url)).length
  const pathPct = Math.round((pathRead / starter.length) * 100)

  return (
    <div style={css('max-width:880px;margin:0 auto;padding:54px 44px 90px')}>
      <div style={css("font-family:'Spline Sans Mono',monospace;font-size:11px;letter-spacing:.24em;text-transform:uppercase;color:#8c3b2f")}>
        The canon, sequenced
      </div>
      <h1 style={css('font-size:50px;font-weight:500;letter-spacing:-.02em;margin:14px 0 0')}>The must-read starter set</h1>
      <p style={css('font-size:19px;line-height:1.5;color:#4d473c;max-width:60ch;margin:16px 0 0;font-weight:300')}>
        Twelve pieces, in order. Read these first and you'll have the field's mental model — the <em>why</em>, the verifier's law, the
        harness, and where benchmarks break. Check each off as you go.
      </p>
      <div style={css('display:flex;align-items:center;gap:14px;margin:30px 0 8px')}>
        <div style={css('flex:1;height:6px;border-radius:3px;background:rgba(28,26,22,.1);overflow:hidden')}>
          <div style={css(`height:100%;background:linear-gradient(90deg,#8c3b2f,#a8842c);transition:width .4s;width:${pathPct}%`)} />
        </div>
        <div style={css("font-family:'Spline Sans Mono',monospace;font-size:12px;color:#6b6557")}>{pathRead}/{starter.length} read</div>
      </div>

      <div style={css('margin-top:30px;position:relative')}>
        {starter.map((e, i) => {
          const isR = reading.isRead(e.url)
          const isB = reading.isBookmarked(e.url)
          const typeColor = TYPE_COLORS[e.type] || '#6b6557'
          return (
            <div key={e.url} style={css(`display:flex;gap:24px;padding:22px 0;border-top:1px solid rgba(28,26,22,.1);animation:efIn .4s both;animation-delay:${i * 0.04}s`)}>
              <div style={css('flex:none;display:flex;flex-direction:column;align-items:center;gap:10px')}>
                <div
                  onClick={() => reading.toggleRead(e.url)}
                  title="Mark read"
                  style={css(
                    `cursor:pointer;width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:'Spline Sans Mono',monospace;font-size:14px;font-weight:600;transition:background .2s,border-color .2s,color .2s;border:1.5px solid ${isR ? '#4a6b46' : 'rgba(28,26,22,.3)'};background:${isR ? '#4a6b46' : 'transparent'};color:${isR ? '#fff' : '#1c1a16'}`,
                  )}
                >
                  {isR ? '✓' : String(i + 1).padStart(2, '0')}
                </div>
              </div>
              <div style={css('flex:1;min-width:0')}>
                <div style={css('display:flex;align-items:center;gap:9px;flex-wrap:wrap;margin-bottom:5px')}>
                  <span style={css(`font-family:'Spline Sans Mono',monospace;font-size:9.5px;letter-spacing:.1em;text-transform:uppercase;padding:1px 6px;border-radius:2px;color:${typeColor};border:1px solid ${typeColor}`)}>
                    {TYPE_LABELS[e.type] || e.type}
                  </span>
                  <span style={css("font-family:'Spline Sans Mono',monospace;font-size:11px;color:#9b9486")}>{e.authors || '—'}</span>
                  {e.isNew && <span style={css("font-family:'Spline Sans Mono',monospace;font-size:9px;letter-spacing:.08em;color:#a8842c")}>● NEW</span>}
                </div>
                <h3 onClick={() => openEntry(e.url)} style={css(`cursor:pointer;font-size:24px;font-weight:500;letter-spacing:-.01em;margin:0;color:${isR ? '#9b9486' : '#1c1a16'}`)}>
                  {e.title}
                </h3>
                <p style={css('font-size:16.5px;line-height:1.5;color:#56503f;margin:8px 0 0;font-weight:300')}>{e.annotation}</p>
                <div style={css('display:flex;gap:18px;margin-top:13px')}>
                  <a href={e.url} target="_blank" rel="noreferrer" style={css("font-family:'Spline Sans Mono',monospace;font-size:11px;letter-spacing:.06em;color:#8c3b2f;text-decoration:none")}>
                    Open source ↗
                  </a>
                  <div onClick={() => reading.toggleBookmark(e.url)} style={css(`cursor:pointer;font-family:'Spline Sans Mono',monospace;font-size:11px;letter-spacing:.06em;color:${isB ? '#8c3b2f' : '#a39c8d'}`)}>
                    {isB ? '★ Bookmarked' : '☆ Bookmark'}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
        <div style={css('border-top:1px solid rgba(28,26,22,.1);padding-top:26px;margin-top:4px;text-align:center')}>
          <div onClick={() => onNav('learn')} style={css('cursor:pointer;display:inline-flex;align-items:center;gap:10px;font-size:17px;color:#1c1a16')}>
            Next: work through the ten sections <span style={css('color:#8c3b2f')}>→</span>
          </div>
        </div>
      </div>
    </div>
  )
}
