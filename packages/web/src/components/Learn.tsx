import { useState } from 'react'
import { CONCEPTS, TYPE_COLORS, TYPE_LABELS } from '../lib/constants'
import { useDataset } from '../lib/dataset'
import { sectionPrompt, sectionNotebookPrompt } from '../lib/teachPrompt'
import type { ReadingState } from '../lib/useReadingState'
import { css } from '../lib/css'
import { LearnWithLLM } from './LearnWithLLM'

interface Props {
  reading: ReadingState
  openEntry: (url: string) => void
}

export function Learn({ reading, openEntry }: Props) {
  const { data } = useDataset()
  const [expanded, setExpanded] = useState('1')

  return (
    <div style={css('max-width:1080px;margin:0 auto;padding:54px 44px 90px')}>
      <div style={css("font-family:'Spline Sans Mono',monospace;font-size:11px;letter-spacing:.24em;text-transform:uppercase;color:#8c3b2f")}>
        A curriculum in ten parts
      </div>
      <h1 style={css('font-size:50px;font-weight:500;letter-spacing:-.02em;margin:14px 0 0')}>Learn the field, section by section</h1>
      <p style={css('font-size:19px;line-height:1.5;color:#4d473c;max-width:62ch;margin:16px 0 0;font-weight:300')}>
        The ten sections are ordered as a path — from <em>why evals matter</em> to the adversarial frontier. Each is a lesson: the
        thesis, the concepts to hold, the must-reads, and everything else to go deeper.
      </p>

      <div style={css('margin-top:40px;display:flex;flex-direction:column;gap:20px')}>
        {data.sections.map((sec) => {
          const entries = sec.subsections.flatMap((ss) => ss.entries)
          const rc = entries.filter((e) => reading.isRead(e.url)).length
          const exp = expanded === sec.num
          const pct = entries.length ? Math.round((rc / entries.length) * 100) : 0
          const concepts = CONCEPTS[sec.num] || []
          return (
            <div key={sec.num} style={css('background:#fbf8f1;border:1px solid rgba(28,26,22,.13);border-radius:4px;overflow:hidden')}>
              <div onClick={() => setExpanded((cur) => (cur === sec.num ? '' : sec.num))} style={css('cursor:pointer;display:flex;align-items:flex-start;gap:22px;padding:26px 30px')}>
                <div style={css("flex:none;width:46px;height:46px;border-radius:50%;border:1.5px solid #1c1a16;display:flex;align-items:center;justify-content:center;font-size:21px;font-weight:500;font-family:'Spline Sans Mono',monospace")}>
                  {sec.num}
                </div>
                <div style={css('flex:1;min-width:0')}>
                  <h3 style={css('font-size:26px;font-weight:500;letter-spacing:-.015em;margin:0')}>{sec.title}</h3>
                  <p style={css('font-size:16px;color:#5c564a;margin:5px 0 0;font-weight:300')}>{sec.sub}</p>
                  <div style={css('display:flex;gap:8px;flex-wrap:wrap;margin-top:14px')}>
                    {concepts.map((c) => (
                      <span key={c} style={css("font-family:'Spline Sans Mono',monospace;font-size:11px;color:#5c564a;background:rgba(140,59,47,.07);border:1px solid rgba(140,59,47,.18);padding:3px 9px;border-radius:20px")}>
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
                <div style={css('flex:none;text-align:right')}>
                  <div style={css("font-family:'Spline Sans Mono',monospace;font-size:11px;color:#8c8475")}>{rc}/{entries.length}</div>
                  <div style={css('width:60px;height:4px;border-radius:2px;background:rgba(28,26,22,.1);margin-top:6px;overflow:hidden')}>
                    <div style={css(`height:100%;background:#8c3b2f;width:${pct}%`)} />
                  </div>
                  <div style={css("font-family:'Spline Sans Mono',monospace;font-size:15px;color:#bdb6a6;margin-top:8px")}>{exp ? '▴' : '▾'}</div>
                </div>
              </div>
              {exp && (
                <div style={css('border-top:1px solid rgba(28,26,22,.1);padding:6px 30px 14px 98px;animation:efFade .3s both')}>
                  <div style={css('padding:14px 0 6px')}>
                    <LearnWithLLM
                      label="Teach me this section"
                      prompt={sectionPrompt({ title: sec.title, sub: sec.sub, concepts, entries })}
                      notebook={{ sources: entries.map((x) => x.url), prompt: sectionNotebookPrompt({ title: sec.title, sub: sec.sub, concepts, entries }) }}
                    />
                  </div>
                  {entries.map((e) => {
                    const isR = reading.isRead(e.url)
                    const typeColor = TYPE_COLORS[e.type] || '#6b6557'
                    return (
                      <div key={e.url} onClick={() => openEntry(e.url)} style={css('cursor:pointer;display:flex;gap:14px;padding:13px 0;border-bottom:1px solid rgba(28,26,22,.07)')}>
                        <div
                          onClick={(ev) => {
                            ev.stopPropagation()
                            reading.toggleRead(e.url)
                          }}
                          style={css(`flex:none;margin-top:3px;width:17px;height:17px;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-size:10px;transition:background .15s,border-color .15s;border:1.5px solid ${isR ? '#4a6b46' : 'rgba(28,26,22,.32)'};background:${isR ? '#4a6b46' : 'transparent'}`)}
                        >
                          {isR ? '✓' : ''}
                        </div>
                        <div style={css('flex:1;min-width:0')}>
                          <div style={css('display:flex;align-items:baseline;gap:9px;flex-wrap:wrap')}>
                            <span style={css(`font-size:18px;font-weight:500;color:${isR ? '#9b9486' : '#1c1a16'}`)}>{e.title}</span>
                            {e.isNew && <span style={css("font-family:'Spline Sans Mono',monospace;font-size:8px;letter-spacing:.1em;color:#a8842c")}>NEW</span>}
                            <span style={css(`font-family:'Spline Sans Mono',monospace;font-size:9px;letter-spacing:.06em;text-transform:uppercase;color:${typeColor}`)}>{TYPE_LABELS[e.type] || e.type}</span>
                          </div>
                          <p style={css('font-size:14.5px;line-height:1.4;color:#6b6557;margin:3px 0 0;font-weight:300')}>{e.annotation}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
