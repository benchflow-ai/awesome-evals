import type { CSSProperties } from 'react'

/**
 * Parse a CSS declaration string into a React style object.
 * Lets us port the Design Composer's inline `style="…"` strings near-verbatim,
 * keeping visual fidelity while avoiding hand-conversion mistakes.
 */
export function css(s: string): CSSProperties {
  const out: Record<string, string> = {}
  for (const decl of s.split(';')) {
    const i = decl.indexOf(':')
    if (i < 0) continue
    const prop = decl.slice(0, i).trim()
    if (!prop) continue
    const val = decl.slice(i + 1).trim()
    const camel = prop.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase())
    out[camel] = val
  }
  return out as CSSProperties
}

/** Hover handlers that mutate the element's inline style, matching the source's lift effect. */
export function lift(transform: string, boxShadow: string) {
  return {
    onMouseEnter: (e: React.MouseEvent<HTMLElement>) => {
      e.currentTarget.style.transform = transform
      e.currentTarget.style.boxShadow = boxShadow
    },
    onMouseLeave: (e: React.MouseEvent<HTMLElement>) => {
      e.currentTarget.style.transform = 'none'
      e.currentTarget.style.boxShadow = 'none'
    },
  }
}
