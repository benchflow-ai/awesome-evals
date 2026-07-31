import { useMemo } from 'react'
import { TYPE_COLORS, TYPE_LABELS, TYPE_ORDER } from '../lib/constants'
import { useDataset } from '../lib/dataset'
import type { ReadingState } from '../lib/useReadingState'
import { css } from '../lib/css'

interface Props {
  reading: ReadingState
  openEntry: (url: string) => void
}

const MAP_W = 1180
const MAP_H = 760
const CENTERS: Record<string, [number, number]> = {
  '1': [200, 170],
  '2': [470, 150],
  '3': [760, 160],
  '4': [1000, 210],
  '5': [600, 400],
  '6': [280, 430],
  '7': [930, 440],
  '8': [180, 640],
  '9': [520, 650],
  '10': [850, 650],
  T: [1030, 610],
}
const GA = Math.PI * (3 - Math.sqrt(5)) // golden angle for the phyllotaxis spiral
const LEGEND = TYPE_ORDER.map((t) => [TYPE_COLORS[t], TYPE_LABELS[t]] as const)

export function MapView({ reading, openEntry }: Props) {
  const { all, secMeta } = useDataset()
  const { read } = reading
  const nodes = useMemo(() => {
    const byMap: Record<string, typeof all> = {}
    for (const e of all) (byMap[e.section] = byMap[e.section] || []).push(e)
    const out: {
      url: string
      title: string
      x: number
      y: number
      d: number
      color: string
      glow: string
      op: number
    }[] = []
    for (const num of Object.keys(CENTERS)) {
      const arr = byMap[num] || []
      const [cx, cy] = CENTERS[num]
      arr.forEach((e, i) => {
        const r = 14 + Math.sqrt(i + 0.6) * 12.4
        const ang = i * GA
        const x = cx + Math.cos(ang) * r
        const y = cy + Math.sin(ang) * r * 0.82
        const d = e.must ? 11 : e.isNew ? 7 : 5
        out.push({
          url: e.url,
          title: e.title,
          x: Math.round(x),
          y: Math.round(y),
          d,
          color: TYPE_COLORS[e.type] || '#6b6557',
          glow: e.must ? '0 0 0 2px rgba(140,59,47,.2)' : e.isNew ? '0 0 0 2.5px rgba(168,132,44,.32)' : 'none',
          op: read.includes(e.url) ? 0.5 : 0.92,
        })
      })
    }
    return out
  }, [all, read])

  return (
    <div style={css('padding:30px 44px 60px')}>
      <div style={css('display:flex;align-items:flex-end;justify-content:space-between;flex-wrap:wrap;gap:16px;margin-bottom:8px')}>
        <div>
          <div style={css("font-family:'Spline Sans Mono',monospace;font-size:11px;letter-spacing:.24em;text-transform:uppercase;color:#8c3b2f")}>The landscape</div>
          <h1 style={css('font-size:40px;font-weight:500;letter-spacing:-.02em;margin:10px 0 0')}>A constellation of the field</h1>
          <p style={css('font-size:16px;color:#5c564a;margin:8px 0 0;font-weight:300;max-width:64ch')}>
            Every resource, clustered by section. Dot size marks the must-reads; gold rings mark what's new. Click any star to read why
            it belongs.
          </p>
        </div>
        <div style={css('display:flex;gap:16px;flex-wrap:wrap')}>
          {LEGEND.map(([dot, label]) => (
            <div key={label} style={css('display:flex;align-items:center;gap:7px')}>
              <div style={css(`width:9px;height:9px;border-radius:50%;background:${dot}`)} />
              <div style={css("font-family:'Spline Sans Mono',monospace;font-size:11px;color:#6b6557")}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={css(`position:relative;margin:24px auto 0;background:radial-gradient(circle at 50% 45%,#faf7f0,#efeadf);border:1px solid rgba(28,26,22,.12);border-radius:4px;overflow:hidden;width:${MAP_W}px;height:${MAP_H}px`)}>
        {Object.keys(CENTERS).map((num) => {
          const [x, y] = CENTERS[num]
          return (
            <div key={num} style={css(`position:absolute;transform:translate(-50%,-50%);text-align:center;pointer-events:none;left:${x}px;top:${y}px`)}>
              <div style={css("font-family:'Spline Sans Mono',monospace;font-size:10px;letter-spacing:.1em;color:#8c3b2f;font-weight:600")}>{num}</div>
              <div style={css('font-size:13px;font-weight:500;color:rgba(40,38,32,.5);max-width:130px;line-height:1.15;margin-top:2px')}>{secMeta[num] ? secMeta[num].title : ''}</div>
            </div>
          )
        })}
        {nodes.map((n, i) => (
          <div
            key={n.url + i}
            onClick={() => openEntry(n.url)}
            title={n.title}
            onMouseEnter={(ev) => {
              ev.currentTarget.style.transform = 'scale(2.1)'
              ev.currentTarget.style.zIndex = '5'
            }}
            onMouseLeave={(ev) => {
              ev.currentTarget.style.transform = 'none'
              ev.currentTarget.style.zIndex = 'auto'
            }}
            style={css(`position:absolute;border-radius:50%;cursor:pointer;transition:transform .12s;left:${n.x}px;top:${n.y}px;width:${n.d}px;height:${n.d}px;margin-left:${-n.d / 2}px;margin-top:${-n.d / 2}px;background:${n.color};box-shadow:${n.glow};opacity:${n.op}`)}
          />
        ))}
      </div>
    </div>
  )
}
