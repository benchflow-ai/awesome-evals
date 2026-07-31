/** Copy text to the clipboard, with a fallback for non-secure contexts. */
export async function writeClipboard(text: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(text)
  } catch {
    // Non-secure contexts (or older browsers) block the async clipboard API.
    const ta = document.createElement('textarea')
    ta.value = text
    ta.style.cssText = 'position:fixed;top:-1000px;opacity:0'
    document.body.appendChild(ta)
    ta.select()
    try {
      document.execCommand('copy')
    } catch {
      /* give up silently */
    }
    document.body.removeChild(ta)
  }
}
