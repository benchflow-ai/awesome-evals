import type { ViewName } from '../types'
import { css } from '../lib/css'

const NAV: [ViewName, string, string][] = [
  ['path', 'Reading Path', '01'],
  ['catalog', 'Catalog', '02'],
  ['map', 'Map', '03'],
  ['learn', 'Learn', '04'],
]

interface Props {
  view: ViewName
  total: number
  readCount: number
  onNav: (v: ViewName) => void
  onHome: () => void
}

export function Masthead({ view, total, readCount, onNav, onHome }: Props) {
  const readPct = total ? Math.round((readCount / total) * 100) : 0
  return (
    <header style={css('flex:none;display:flex;align-items:stretch;border-bottom:1px solid rgba(28,26,22,.16);background:#f7f3ea;z-index:30')}>
      <div onClick={onHome} style={css('display:flex;align-items:center;gap:13px;padding:0 22px;cursor:pointer;border-right:1px solid rgba(28,26,22,.1)')}>
        <div style={css('width:30px;height:30px;border-radius:50%;border:1.5px solid #1c1a16;position:relative;flex:none')}>
          <div style={css('position:absolute;width:7px;height:7px;border-radius:50%;background:#8c3b2f;top:4px;left:11px')} />
          <div style={css('position:absolute;width:4px;height:4px;border-radius:50%;background:#1c1a16;bottom:5px;left:6px')} />
          <div style={css('position:absolute;width:4px;height:4px;border-radius:50%;background:#a8842c;bottom:7px;right:5px')} />
        </div>
        <div style={css('line-height:1')}>
          <div style={css('font-size:18px;font-weight:600;letter-spacing:-.01em')}>The Frontier of Evals</div>
          <div style={css("font-family:'Spline Sans Mono',monospace;font-size:9.5px;letter-spacing:.16em;text-transform:uppercase;color:#8c8475;margin-top:3px")}>
            A reading portal · awesome-evals
          </div>
        </div>
      </div>

      <nav style={css('display:flex;align-items:stretch')}>
        {NAV.map(([v, label, idx]) => (
          <div
            key={v}
            onClick={() => onNav(v)}
            title={label}
            style={css(
              `display:flex;flex-direction:column;justify-content:center;padding:0 20px;cursor:pointer;border-right:1px solid rgba(28,26,22,.07);transition:background .15s;background:${view === v ? 'rgba(140,59,47,.07)' : 'transparent'}`,
            )}
          >
            <div style={css("font-family:'Spline Sans Mono',monospace;font-size:8.5px;letter-spacing:.14em;color:#a8a193")}>{idx}</div>
            <div style={css(`font-size:15px;font-weight:500;margin-top:1px;color:${view === v ? '#8c3b2f' : '#1c1a16'}`)}>{label}</div>
          </div>
        ))}
      </nav>

      <div style={css('flex:1')} />

      <div style={css('display:flex;align-items:center;gap:18px;padding:0 22px;border-left:1px solid rgba(28,26,22,.1)')}>
        <div style={css('text-align:right;line-height:1.1')}>
          <div style={css("font-family:'Spline Sans Mono',monospace;font-size:9px;letter-spacing:.12em;color:#8c8475;text-transform:uppercase")}>Read</div>
          <div className="ef-num" style={css('font-size:16px;font-weight:600;white-space:nowrap')}>
            <span style={css('color:#8c3b2f')}>{readCount}</span> <span style={css('color:#bdb6a6')}>/ {total}</span>
          </div>
        </div>
        <div style={css('width:96px;height:5px;border-radius:3px;background:rgba(28,26,22,.1);overflow:hidden')}>
          <div style={css(`height:100%;background:linear-gradient(90deg,#8c3b2f,#a8842c);transition:width .4s;width:${readPct}%`)} />
        </div>
      </div>
    </header>
  )
}
