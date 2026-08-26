import { useEffect, useState } from 'react'
import { NOTEBOOKLM_URL } from '../lib/teachPrompt'
import { writeClipboard } from '../lib/clipboard'
import { css } from '../lib/css'

interface Props {
  sources: string[]
  prompt: string
  onClose: () => void
}

/**
 * NotebookLM is source-grounded (add sources, then chat) and has no URL prefill,
 * so this splits the hand-off into the two steps the workflow actually needs:
 * (1) copy the source URLs to add, (2) copy the teach prompt to paste.
 */
export function NotebookLmDialog({ sources, prompt, onClose }: Props) {
  const [copied, setCopied] = useState<string | null>(null)
  const sourcesText = sources.join('\n')

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const copy = async (text: string, key: string) => {
    await writeClipboard(text)
    setCopied(key)
    setTimeout(() => setCopied((k) => (k === key ? null : k)), 1800)
  }

  const boxStyle = css(
    "max-height:132px;overflow:auto;background:#f3efe5;border:1px solid rgba(28,26,22,.14);border-radius:3px;padding:10px 12px;font-family:'Spline Sans Mono',monospace;font-size:12px;line-height:1.55;color:#5c564a;white-space:pre-wrap;word-break:break-word",
  )
  const hint = css('font-size:12.5px;line-height:1.45;color:#9b9486;margin:8px 0 0;font-weight:300')
  const stepLabel = css("font-family:'Spline Sans Mono',monospace;font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:#8c3b2f;margin-bottom:9px")

  return (
    <div onClick={onClose} style={css('position:fixed;inset:0;z-index:60;background:rgba(28,26,22,.44);display:flex;align-items:center;justify-content:center;padding:24px;animation:efFade .2s both')}>
      <div className="ef-scroll" onClick={(e) => e.stopPropagation()} style={css('width:540px;max-width:100%;max-height:86vh;overflow-y:auto;background:#f7f3ea;border:1px solid rgba(28,26,22,.2);border-radius:5px;box-shadow:0 30px 70px rgba(28,26,22,.28);animation:efIn .22s both')}>
        <div style={css('padding:24px 28px 28px')}>
          <div style={css('display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:6px')}>
            <div>
              <h2 style={css('font-size:26px;font-weight:500;letter-spacing:-.015em;margin:0')}>NotebookLM</h2>
              <div style={css("font-family:'Spline Sans Mono',monospace;font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:#8c8475;margin-top:5px")}>Learn from sources · two steps</div>
            </div>
            <div onClick={onClose} style={css('cursor:pointer;flex:none;width:30px;height:30px;border-radius:50%;border:1px solid rgba(28,26,22,.22);display:flex;align-items:center;justify-content:center;color:#6b6557')}>✕</div>
          </div>
          <p style={css('font-size:14.5px;line-height:1.5;color:#5c564a;margin:12px 0 22px;font-weight:300')}>
            NotebookLM grounds its answers in sources you add, so it can't be pre-filled from a link. Add the source{sources.length > 1 ? 's' : ''}, then paste the prompt.
          </p>

          <div style={css('margin-bottom:22px')}>
            <div style={stepLabel}>1 · Copy the source{sources.length > 1 ? 's' : ''}{sources.length > 1 ? ` (${sources.length})` : ''}</div>
            <div style={boxStyle}>{sourcesText}</div>
            <button type="button" className="ef-chip" style={css('margin-top:10px')} onClick={() => copy(sourcesText, 'sources')}>
              {copied === 'sources' ? '✓ Copied' : '⧉ Copy sources'}
            </button>
            <p style={hint}>In NotebookLM: <b style={css('font-weight:600')}>New notebook → Add source → Website</b>, and paste (one URL per source).</p>
          </div>

          <div style={css('margin-bottom:24px')}>
            <div style={stepLabel}>2 · The prompt for NotebookLM</div>
            <div style={boxStyle}>{prompt}</div>
            <button type="button" className="ef-chip" style={css('margin-top:10px')} onClick={() => copy(prompt, 'prompt')}>
              {copied === 'prompt' ? '✓ Copied' : '⧉ Copy prompt'}
            </button>
            <p style={hint}>Paste into the notebook chat once the sources finish importing.</p>
          </div>

          <a href={NOTEBOOKLM_URL} target="_blank" rel="noreferrer" style={css('text-decoration:none;background:#1c1a16;color:#f3efe5;padding:13px 20px;border-radius:2px;font-size:15px;font-weight:500;display:flex;align-items:center;justify-content:center;gap:9px')}>
            Open NotebookLM ↗
          </a>
        </div>
      </div>
    </div>
  )
}
