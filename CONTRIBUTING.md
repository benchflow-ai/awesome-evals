# Contributing to Awesome Agent Evals

Thanks for helping keep this the best **non-BS** map of agent-evaluation resources.

## What belongs here
Resources for **building and evaluating AI agents**: papers, blog posts, talks/podcasts, courses, tools/frameworks, and benchmarks — that a practitioner at the Eugene-Yan / Han-Chung-Lee bar would actually send a colleague.

## Bar for inclusion
- **Show your work.** Real data, code, war-stories, or a genuinely novel framework — not generic "you need evals" takes or SEO listicles.
- **One-line *why*.** Every entry gets a short annotation: what it is + why it belongs in its section.
- **Verify the URL.** Use the canonical repo/site (check for moved/archived repos). Note ⚠️ caveats.
- **Prune the dead.** Discontinued or abandoned tools get removed or clearly flagged — never silently listed.
- **Right section.** Match the theme; cross-list only when genuinely warranted.
- **Tools need evidence someone else uses them.** Stars, external issues/PRs, or a third-party write-up. There is no fixed star threshold, and the current floor is low (several listed projects are under 50★) — but a brand-new repo with no users outside the authoring org is a "come back later," not a listing. `benchflow-ai` projects are held to the same bar.
- **Disclose affiliation.** If you wrote or maintain the resource, say so in the PR body. Self-submissions are welcome and several listed entries are self-submitted — undisclosed ones are not, because the annotation is what asks a reader to trust the entry.
- **Every number must be quotable.** If an annotation cites a figure, it has to appear verbatim in the linked source. Numbers that are only on a live leaderboard get pinned to a dated run, or dropped.

## Format
```
- **[Title](https://url)** — Author/Org — <https://url> · *type* — one-line note. 🆕 (if 2025–2026)
```
Sections vary a little — the §5 tool subsections often drop `· *type*`, and talks end at the venue. When in doubt, copy the shape of the nearest existing entry in the section you're adding to. Caveats go last, after 🆕, as `⚠️ short reason.`

## How
Open a PR editing `README.md` — or `MENTIONS.md` if the resource only *mentions* evals (an agent-building post or talk with a good eval segment, rather than an eval-first resource). For a substantive source, consider adding a deep note under `notes/` (summary · key points · **verbatim** quotes · themes). One change per PR where possible. Be ready to say why it clears the bar.
