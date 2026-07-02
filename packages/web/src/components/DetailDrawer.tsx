import { useEffect } from 'react'
import type { RawEntry } from '../types'
import { TYPE_COLORS, TYPE_LABELS } from '../lib/constants'
import { articlePrompt } from '../lib/teachPrompt'
import type { ReadingState } from '../lib/useReadingState'
import { css } from '../lib/css'
import { LearnWithLLM } from './LearnWithLLM'

interface Props {
  entry: RawEntry
  sectionLabel: string
  reading: ReadingState
  onClose: () => void
}

export function DetailDrawer({ entry: e, sectionLabel, reading, onClose }: Props) {
  useEffect(() => {
    const onKey = (ev: KeyboardEvent) => {
      if (ev.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const isR = reading.isRead(e.url)
  const isB = reading.isBookmarked(e.url)
  const typeColor = TYPE_COLORS[e.type] || '#6b6557'

  return (
    <>
      <div onClick={onClose} style={css('position:fixed;inset:0;background:rgba(28,26,22,.34);z-index:40;animation:efFade .2s both')} />
      <aside className="ef-scroll" style={css('position:fixed;top:0;right:0;bottom:0;width:480px;max-width:92vw;background:#f7f3ea;border-left:1px solid rgba(28,26,22,.2);z-index:50;overflow-y:auto;box-shadow:-20px 0 50px rgba(28,26,22,.14);animation:efIn .25s both')}>
        <div style={css('padding:26px 34px 40px')}>
          <div style={css('display:flex;justify-content:space-between;align-items:center;margin-bottom:26px')}>
            <div style={css("font-family:'Spline Sans Mono',monospace;font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:#8c8475")}>
              {sectionLabel}
            </div>
            <div onClick={onClose} style={css('cursor:pointer;width:30px;height:30px;border-radius:50%;border:1px solid rgba(28,26,22,.22);display:flex;align-items:center;justify-content:center;color:#6b6557')}>
              ✕
            </div>
          </div>

          <div style={css('display:flex;gap:8px;margin-bottom:16px')}>
            <span style={css(`font-family:'Spline Sans Mono',monospace;font-size:9.5px;letter-spacing:.1em;text-transform:uppercase;padding:2px 8px;border-radius:2px;color:${typeColor};border:1px solid ${typeColor}`)}>
              {TYPE_LABELS[e.type] || e.type}
            </span>
            {e.isNew && <span style={css("font-family:'Spline Sans Mono',monospace;font-size:9.5px;letter-spacing:.1em;color:#a8842c;border:1px solid #d8c08a;padding:2px 8px;border-radius:2px")}>NEW · 2025–26</span>}
            {e.must && <span style={css("font-family:'Spline Sans Mono',monospace;font-size:9.5px;letter-spacing:.1em;color:#8c3b2f;border:1px solid #d3a99f;padding:2px 8px;border-radius:2px")}>MUST-READ</span>}
          </div>

          <h2 style={css('font-size:32px;line-height:1.12;font-weight:500;letter-spacing:-.018em;margin:0')}>{e.title}</h2>
          <div style={css("font-family:'Spline Sans Mono',monospace;font-size:12.5px;color:#8c8475;margin-top:12px")}>{e.authors || '—'}</div>

          <div style={css('margin:26px 0;height:1px;background:rgba(28,26,22,.12)')} />
          <div style={css("font-family:'Spline Sans Mono',monospace;font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:#8c3b2f;margin-bottom:10px")}>Why it belongs</div>
          <p style={css('font-size:18px;line-height:1.6;color:#332f27;margin:0;font-weight:300')}>{e.annotation}</p>
          {e.caveat && (
            <div style={css('margin-top:18px;background:rgba(168,132,44,.1);border-left:3px solid #a8842c;padding:11px 15px;font-size:14px;color:#6e5a24;font-style:italic')}>
              ⚠ Carries a caveat — verify before relying on this one.
            </div>
          )}

          <div style={css('margin:30px 0 0;display:flex;flex-direction:column;gap:11px')}>
            <a className="ef-press" href={e.url} target="_blank" rel="noreferrer" style={css('text-decoration:none;background:#1c1a16;color:#f3efe5;padding:14px 20px;border-radius:2px;font-size:16px;font-weight:500;display:flex;align-items:center;justify-content:center;gap:9px')}>
              Read the source ↗
            </a>
            <div style={css('display:flex;gap:11px')}>
              <div className="ef-press" onClick={() => reading.toggleRead(e.url)} style={css(`cursor:pointer;flex:1;text-align:center;padding:13px;border-radius:2px;font-size:15px;font-weight:500;border:1px solid ${isR ? '#4a6b46' : 'rgba(28,26,22,.25)'};background:${isR ? 'rgba(74,107,70,.12)' : 'transparent'};color:${isR ? '#3c5a39' : '#1c1a16'}`)}>
                {isR ? '✓ Read' : 'Mark as read'}
              </div>
              <div className="ef-press" onClick={() => reading.toggleBookmark(e.url)} style={css(`cursor:pointer;flex:1;text-align:center;padding:13px;border-radius:2px;font-size:15px;font-weight:500;border:1px solid ${isB ? '#8c3b2f' : 'rgba(28,26,22,.25)'};background:${isB ? 'rgba(140,59,47,.1)' : 'transparent'};color:${isB ? '#8c3b2f' : '#1c1a16'}`)}>
                {isB ? '★ Saved' : '☆ Bookmark'}
              </div>
            </div>
          </div>

          <div style={css('margin:28px 0;height:1px;background:rgba(28,26,22,.12)')} />
          <LearnWithLLM prompt={articlePrompt({ ...e, sectionLabel })} />

          <div style={css("margin-top:28px;font-size:13px;color:#9b9486;font-family:'Spline Sans Mono',monospace;word-break:break-all;line-height:1.5")}>{e.url}</div>
        </div>
      </aside>
    </>
  )
}
