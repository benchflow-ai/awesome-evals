# Changelog

All notable additions, corrections, and removals to this list. Format loosely follows
[Keep a Changelog](https://keepachangelog.com/); since this is a curated list rather than
software, entries are grouped by **date of the release PR**, not semver.

Cut roughly **biweekly** by [`.github/workflows/changelog.yml`](.github/workflows/changelog.yml),
which opens a PR rolling up everything merged since the last entry — a human reviews and merges
it like any other PR (see [CONTRIBUTING.md](CONTRIBUTING.md); the bot never pushes to `main`).

## [Unreleased]

## [2026-08-20]
### Added
- Petri (Meridian Labs / UK AISI / Anthropic) — automated behavioral-auditing agent, §10
- Caliper — pass@k reliability harness for agent skills, §5a
- Coder Eval (UiPath) — §5a
- PerspectiveGap, Open Multi-Agent evaluation, Dr. Bench, RewardHarness, ClawBench — §9 benchmarks
- TAC (Travel Agent Compassion), Manager Coercion Benchmark (MCB) — §9 multi-agent benchmarks
- Scan 2026-07-31: 8 new eval finds (#69)
### Changed
- Corrected stale annotations (Harbor star count, note count) and wrote down the enforced
  curation bar explicitly into CONTRIBUTING.md (#67)
- Made the daily scan's "no new items" result independently verifiable via a tool-call audit
  trail and run-start-gated PR lookup (#66)

## [2026-07-30]
### Added
- Doubleword open-source-LLM release-forecasting blog — §6 (benchmark vs. eval)
- whatbroke — §5f (observability + eval platforms)
- truescore, Tura coding-agent cost study
- Two benchmark-auditing resources ("How We Broke Top AI Agent Benchmarks", RewardHackingAgents) — §6/§10
- Scan 2026-06-29: 6 new eval finds (#33)

## [2026-06-26]
### Added
- Awesome-Evals Responder — comment-only PR assistant for this repo (#7)
- Daily scan → Slack thread notifications, distributed into themed sections by topic (#8, #10, #32)
- Scan 2026-06-26: 18 verified eval finds (#8)
