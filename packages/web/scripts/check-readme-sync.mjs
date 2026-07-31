#!/usr/bin/env node
// Reports whether the committed evals-data.json is still in sync with README.md.
// Parses the README with the *same* canonical parser the build uses (so this checks
// exactly what would be generated) and diffs entry URLs against the committed dataset.
// Informational by default; pass --strict to exit non-zero on drift (CI after a Scan PR).

import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { parseReadme, flattenEntries } from '../src/lib/parseReadme.js'

const here = dirname(fileURLToPath(import.meta.url))
const README = resolve(here, '../../../README.md')
const EDITORIAL = resolve(here, '../src/data/editorial.json')
const DATA = resolve(here, '../src/data/evals-data.json')

const strict = process.argv.includes('--strict')
const urlMap = (data) => new Map(flattenEntries(data).map((e) => [e.url, e.title]))

const fresh = urlMap(parseReadme(readFileSync(README, 'utf8'), JSON.parse(readFileSync(EDITORIAL, 'utf8'))))
const committed = urlMap(JSON.parse(readFileSync(DATA, 'utf8')))

const missingFromData = [...fresh].filter(([u]) => !committed.has(u))
const staleInData = [...committed].filter(([u]) => !fresh.has(u))

console.log(`README entries        : ${fresh.size}`)
console.log(`Committed dataset      : ${committed.size}`)
console.log('')

if (missingFromData.length) {
  console.log(`▸ In README but missing from the dataset (${missingFromData.length}) — run \`npm run data\`:`)
  for (const [u, t] of missingFromData) console.log(`    + ${t}\n      ${u}`)
  console.log('')
}
if (staleInData.length) {
  console.log(`▸ In the dataset but no longer in README (${staleInData.length}) — possibly renamed/removed:`)
  for (const [u, t] of staleInData) console.log(`    - ${t}\n      ${u}`)
  console.log('')
}

if (!missingFromData.length && !staleInData.length) {
  console.log('✓ Dataset is in sync with the README (by URL).')
} else if (strict) {
  console.error('✗ Drift detected (--strict).')
  process.exit(1)
}
