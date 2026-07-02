#!/usr/bin/env node
// Build-time dataset generator: parse the awesome-evals README.md into
// src/data/evals-data.json. Runs as `prebuild`, so every Vercel deploy reflects
// the repo's current README. Reads the in-repo README by default and falls back
// to GitHub raw (so the package also builds if extracted standalone).
//
//   node scripts/build-data.mjs            # local README, GitHub-raw fallback
//   SOURCE=remote node scripts/build-data.mjs   # force GitHub raw

import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { parseReadme, flattenEntries, datasetIssues } from '../src/lib/parseReadme.js'
import { README_RAW_URL } from '../src/lib/source.js'

const here = dirname(fileURLToPath(import.meta.url))
const LOCAL_README = resolve(here, '../../../README.md')
const EDITORIAL = resolve(here, '../src/data/editorial.json')
const OUT = resolve(here, '../src/data/evals-data.json')

async function loadReadme() {
  if (process.env.SOURCE !== 'remote' && existsSync(LOCAL_README)) {
    return { md: readFileSync(LOCAL_README, 'utf8'), from: LOCAL_README }
  }
  const res = await fetch(README_RAW_URL)
  if (!res.ok) throw new Error(`Fetch ${README_RAW_URL} → ${res.status}`)
  return { md: await res.text(), from: README_RAW_URL }
}

const { md, from } = await loadReadme()
const editorial = JSON.parse(readFileSync(EDITORIAL, 'utf8'))
const data = parseReadme(md, editorial)

// Refuse to overwrite a good dataset with a malformed parse (bad fetch, README reformat).
const issues = datasetIssues(data)
if (issues.length) throw new Error('Parsed dataset failed validation:\n  - ' + issues.join('\n  - '))

writeFileSync(OUT, JSON.stringify(data, null, 2) + '\n')
const n = new Set(flattenEntries(data).map((e) => e.url)).size
console.log(`✓ evals-data.json ← ${from}`)
console.log(`  ${data.sections.length} sections · ${data.talks.categories.length} talk groups · ${n} unique resources`)
