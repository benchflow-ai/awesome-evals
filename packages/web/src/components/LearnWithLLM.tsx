import { useState } from 'react'
import { LLM_PROVIDERS } from '../lib/teachPrompt'
import { writeClipboard } from '../lib/clipboard'
import { css } from '../lib/css'
import { NotebookLmDialog } from './NotebookLmDialog'

interface Props {
  /** The teach-style prompt to prefill / copy for chat LLMs. */
  prompt: string
  label?: string
  /**
   * Section-only: multi-source material for NotebookLM. When present, shows a
   * "NotebookLM …" chip opening the two-step dialog. Omitted for single articles,
   * where a one-source notebook is overkill (the chat links already cover it).
   */
  notebook?: { sources: string[]; prompt: string }
}

/**
 * "Open in LLM (teacher mode)" controls. ChatGPT / Claude prefill a teach-style
 * prompt via URL; Gemini can't prefill from a link, so its chip copies the prompt
 * and opens the app to paste. The standalone Copy button serves any LLM / Codex /
 * Claude Code. In section context, a NotebookLM chip opens a sources + prompt dialog.
 */
export function LearnWithLLM({ prompt, label = 'Learn it with an LLM', notebook }: Props) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null)
  const [showNotebook, setShowNotebook] = useState(false)

  const flash = (key: string) => {
    setCopiedKey(key)
    setTimeout(() => setCopiedKey((k) => (k === key ? null : k)), 1800)
  }
  const copy = async (key: string) => {
    await writeClipboard(prompt)
    flash(key)
  }
  const openGemini = (url: string) => {
    // Open within the click gesture (popup-blocker safe), then stage the clipboard.
    window.open(url, '_blank', 'noopener,noreferrer')
    void copy('gemini')
  }

  return (
    <div>
      <div style={css("font-family:'Spline Sans Mono',monospace;font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:#8c3b2f;margin-bottom:10px")}>
        {label}
      </div>
      <div style={css('display:flex;flex-wrap:wrap;gap:8px')}>
        {LLM_PROVIDERS.map((p) =>
          'prefill' in p ? (
            <a key={p.key} className="ef-chip" href={p.prefill(prompt)} target="_blank" rel="noreferrer" title={`Open a teaching session in ${p.label} (prompt pre-filled)`}>
              {p.label} <span style={css('font-size:10px')}>↗</span>
            </a>
          ) : (
            <button
              key={p.key}
              type="button"
              className="ef-chip"
              onClick={() => openGemini(p.open)}
              title={`${p.label} can't pre-fill from a link — this copies the prompt and opens ${p.label} so you can paste (⌘/Ctrl+V)`}
            >
              {copiedKey === p.key ? '✓ Copied — paste' : `${p.label} ⧉↗`}
            </button>
          ),
        )}
        {notebook && (
          <button type="button" className="ef-chip" onClick={() => setShowNotebook(true)} title="NotebookLM learns from sources — opens a two-step dialog (copy sources, copy prompt)">
            NotebookLM …
          </button>
        )}
        <button type="button" className="ef-chip" onClick={() => copy('copy')} title="Copy the teaching prompt (paste into any LLM, Codex, or Claude Code)">
          {copiedKey === 'copy' ? '✓ Copied' : '⧉ Copy prompt'}
        </button>
      </div>
      <div style={css('font-size:12.5px;line-height:1.4;color:#9b9486;margin-top:8px;font-weight:300')}>
        Opens a tutor that teaches the {label.includes('section') ? 'section' : 'piece'} Socratically — calibrated to you, quizzing as you go.
      </div>
      {notebook && showNotebook && <NotebookLmDialog sources={notebook.sources} prompt={notebook.prompt} onClose={() => setShowNotebook(false)} />}
    </div>
  )
}
