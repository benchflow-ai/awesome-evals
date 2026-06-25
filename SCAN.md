# The Scan — autonomous audit + update workflow

This repo curates itself. **The Scan** is a recurring [Claude Code](https://docs.anthropic.com/en/docs/claude-code) workflow that finds new high-quality agent-eval content, vets it against a strict non-BS bar, and opens a PR with the additions. It runs **in the cloud on a schedule** (GitHub Actions) and can be **dogfooded locally** first.

## What it does (the loop)

1. **Read** `README.md` + `CONTRIBUTING.md`; collect every URL already listed → dedup set.
2. **Discover** (parallel web research across known authors, company eng blogs, eval podcasts, new benchmarks/tools, and *eval mentions inside general agent talks/posts*).
3. **Vet** every candidate with a strict judge — real data/code/method/insight only; reject SEO/marketing/thin recaps/dupes. *When in doubt, leave it out.*
4. **Integrate** the survivors as clickable, annotated entries in the right section.
5. **PR** — branch `scan/<date>`, commit (no AI attribution), open a PR that justifies each addition. Never pushes to `main` directly.

The bar is the same one in [CONTRIBUTING.md](CONTRIBUTING.md): *show your work; one-line why; verify the URL; prune the dead; quality over volume.*

## Cloud setup (runs on YOUR Claude subscription)

The GitHub Action lives at [`.github/workflows/eval-scan.yml`](.github/workflows/eval-scan.yml) (daily at 08:23 UTC + manual `workflow_dispatch`). It authenticates with a **Claude subscription OAuth token** — no metered API key needed.

**One-time setup:**

```bash
# 1. Generate a subscription token (opens your browser; uses your Pro/Max plan)
claude setup-token

# 2. Add it as a repo secret
gh secret set CLAUDE_CODE_OAUTH_TOKEN -R benchflow-ai/awesome-evals
#   (paste the token from step 1)

# 3. Test it immediately (don't wait for the schedule)
gh workflow run "Eval Scan (audit + update)" -R benchflow-ai/awesome-evals
#   optional focus:  -f focus=podcasts
```

The scan opens a PR you review and merge — so an autonomous run can never silently change the canon.

## Dogfood it locally

Run the same loop on your machine before trusting the cloud:

```bash
# headless Claude Code with the scan prompt (prints what it would add)
claude -p "$(sed -n '/Follow the workflow/,/curation, not volume/p' SCAN.md)"
```

…or run the project's research/vetting workflows directly (see `desearch/scripts/` in the source project) and inspect the PR diff before merging.
