import type { RawEntry } from '../types'

/**
 * Teach-style tutoring prompts, distilled from Matt Pocock's "teach" skill:
 * competency/mission-driven, calibrated to the learner's zone of proximal
 * development, and optimized for *storage strength* (retrieval practice + tight
 * feedback) over the illusion of fluency. The goal is for the user to *learn* a
 * resource, not be summarized to.
 * https://github.com/mattpocock/skills/tree/main/skills/productivity/teach
 */
const stepsWith = (opener: string) => `1. ${opener}
2. Calibrate first: ask me 1–2 quick questions to gauge what I already know, then pitch your explanation just above my level — challenging, not overwhelming.
3. Teach for retention, not fluency: after each idea, ask a question that makes me retrieve or apply it. Wait for my answer, then give immediate, specific feedback.
4. Use a concrete example or analogy for the hardest concept.
5. Finish with one small "mission" — a tiny task or thought experiment that applies the idea to a real eval I might build.
Be Socratic, keep each step short, and begin by asking your calibration question.`

const STEPS = stepsWith('Open the link(s) and give me the core ideas in plain language — always grounded in *why they matter* for building and evaluating AI agents.')
// NotebookLM answers are grounded in sources the user has already added, so it draws on them rather than opening a link.
const NOTEBOOK_STEPS = stepsWith("Draw on the source(s) I've added and give me the core ideas in plain language — grounded in *why they matter* for building and evaluating AI agents; cite the source passages.")

/** Blocks are joined with blank lines; absent fields drop out cleanly. */
export function articlePrompt(e: RawEntry & { sectionLabel?: string }): string {
  const meta = [
    `Title: ${e.title}`,
    e.authors && `By: ${e.authors}`,
    `Link: ${e.url}`,
    e.annotation && `Why it's in the canon: ${e.annotation}`,
    e.sectionLabel && `Theme: ${e.sectionLabel}`,
  ]
    .filter(Boolean)
    .join('\n')
  return [
    'You are my patient, rigorous tutor and I want to *learn* this resource on AI agent evaluation.',
    meta,
    `Teach it to me — don't just summarize:\n${STEPS}`,
  ].join('\n\n')
}

export function sectionPrompt(opts: { title: string; sub?: string; concepts?: string[]; entries: RawEntry[] }): string {
  const shown = opts.entries.slice(0, 8)
  const readings = shown.map((e, i) => `${i + 1}. ${e.title} — ${e.url}`).join('\n')
  const more = opts.entries.length > shown.length ? `\n(+${opts.entries.length - shown.length} more in this section)` : ''
  const head = [
    `Topic: ${opts.title}${opts.sub ? ` — ${opts.sub}` : ''}`,
    opts.concepts?.length && `Key concepts: ${opts.concepts.join(' · ')}`,
  ]
    .filter(Boolean)
    .join('\n')
  return [
    'You are my patient, rigorous tutor for a topic in AI agent evaluation, and I want to *learn* it.',
    head,
    `Curated readings (use these as supporting evidence as we go):\n${readings}${more}`,
    `Start with the through-line — how these connect and why this topic matters — then:\n${STEPS}`,
  ].join('\n\n')
}

/** NotebookLM grounds answers in the sources you add first, so its prompt references them (not a link). */
export function sectionNotebookPrompt(opts: { title: string; sub?: string; concepts?: string[]; entries: RawEntry[] }): string {
  const head = [`Topic: ${opts.title}${opts.sub ? ` — ${opts.sub}` : ''}`, opts.concepts?.length && `Key concepts: ${opts.concepts.join(' · ')}`]
    .filter(Boolean)
    .join('\n')
  return [
    "You are my patient, rigorous tutor for a topic in AI agent evaluation. Using the sources I've added to this notebook, teach me the topic — don't just summarize:",
    head,
    'Start with the through-line — how the sources connect and why this topic matters — then:',
    NOTEBOOK_STEPS,
    'Tip: an Audio Overview of these sources makes a great primer.',
  ].join('\n\n')
}

export const NOTEBOOKLM_URL = 'https://notebooklm.google.com/'

/**
 * How each provider receives the prompt:
 * - `prefill`: a deep-link that pre-fills the chat box (ChatGPT, Claude — work reliably).
 * - `open`: Gemini has NO native URL prefill (it needs a browser extension), so we
 *   copy the prompt to the clipboard and open the app for the user to paste.
 */
export type LlmProvider =
  | { key: string; label: string; prefill: (p: string) => string }
  | { key: string; label: string; open: string }

export const LLM_PROVIDERS: LlmProvider[] = [
  { key: 'chatgpt', label: 'ChatGPT', prefill: (p) => `https://chatgpt.com/?q=${encodeURIComponent(p)}` },
  { key: 'claude', label: 'Claude', prefill: (p) => `https://claude.ai/new?q=${encodeURIComponent(p)}` },
  { key: 'gemini', label: 'Gemini', open: 'https://gemini.google.com/app' },
]
