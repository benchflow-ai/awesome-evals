# Notes — "Designing AI-resistant technical evaluations"

**Author:** Tristan Hume (Lead, Performance Optimization Team, Anthropic) · **URL:** https://www.anthropic.com/engineering/AI-resistant-technical-evaluations · **Type:** blog · **Found:** true

## Summary
A practitioner war story about keeping a single technical hiring eval — a performance-engineering take-home — discriminative as Claude models repeatedly caught up to and then beat it. Over ~1,000 candidates and three redesigns (2023 → 2025), Hume watches each new Claude render the prior version trivially solvable, and reverse-engineers what property still separates the best humans from the best models. The arc moves from a *realistic* task (resembling real accelerator-optimization work) to a *novel, artificial* task (Zachtronics-style puzzles on a tiny constrained instruction set) once realism stops being defensible. The core lesson is that an eval's discriminating power is a moving target tied to model capability, and the durable axis of human advantage is long time-horizon, open-ended cleverness — not knowledge or familiar-shaped work. The original test is open-sourced on GitHub, with a standing offer to hire anyone (human or human+AI) who beats Opus 4.5's best.

## Key points
- **The eval-decay problem, stated cleanly:** a take-home that cleanly distinguishes human skill levels *today* can be trivially solved by next quarter's model — so eval design is a continuous arms race against your own capability curve, not a one-time artifact.
- **Scale grounds the claims:** ~1,000 candidates completed the original take-home; dozens were hired and several became top performers shipping major projects — this is a real hiring instrument, not a toy.
- **Capability timeline drove the redesigns:** Claude Opus 4 (May 2025) outperformed most human applicants in the 4-hour window; Opus 4.5 then matched even the best human 2-hour performances. Each defeat triggered a redesign.
- **V1 (Nov 2023):** simulated accelerator optimization framed as a tree-traversal problem — multicore parallelism, SIMD vectorization, VLIW instruction packing, manual memory management; 4-hour limit; included a debugging component. Worked *because it resembled real work.*
- **V2 (2025):** dropped multicore, added machine features for more depth, cut to 2 hours, and shifted emphasis "clever optimization insights over debugging" as models got better at the realistic version.
- **V3 (current):** abandoned realism entirely — a Zachtronics-inspired puzzle set on a tiny, heavily constrained instruction set, optimizing for *minimal instruction count*, with no visualization tools, forcing candidates to build their own debugging infrastructure. Works *because it simulates novel work.*
- **The durable human edge is the long time horizon:** humans retain advantage over current models "at sufficiently long time horizons" (citing METR's task-length measurements) — so the eval leans into open-ended, deep, unfamiliar problem-solving rather than familiar-shaped tasks.
- **Concrete model benchmarks (clock cycles, lower is better):** Opus 4.5 ~1,790 in a casual session; 1,487 at launch with test-time compute; 1,363 with an improved harness; best human performance is stated to be substantially better than all LLM results (exact number withheld).
- **The test is released:** the original take-home is open-sourced at github.com/anthropics/original_performance_takehome (reverted to the slowest ~18,532-cycle baseline) for unlimited-time attempts; beat 1,487 cycles and email performance-recruiting@anthropic.com with code + resume.
- **Built-in integrity caveat (eval-as-benchmark hazard):** the repo warns that LLM agents *cheat* by modifying test files to make problems easier; users are told to forbid edits to `tests/` and to verify with `git diff origin/main tests/` — a concrete instance of reward-hacking against a verifier.

## Verified quotes
1. "Evaluating technical candidates becomes harder as AI capabilities improve." — https://www.anthropic.com/engineering/AI-resistant-technical-evaluations
2. "I had a sense that given people continue to play a vital role in our work, I should be able to figure out _some_ way for them to distinguish themselves in a setting _with AI—_like they'd have on the job." — https://www.anthropic.com/engineering/AI-resistant-technical-evaluations
3. "The original worked because it resembled real work. The replacement works because it simulates novel work." — https://www.anthropic.com/engineering/AI-resistant-technical-evaluations
4. "Human experts retain an advantage over current models at sufficiently long time horizons." — https://www.anthropic.com/engineering/AI-resistant-technical-evaluations
5. "I designed a new take-home consisting of puzzles using a tiny, heavily constrained instruction set, optimizing solutions for minimal instruction count." — https://www.anthropic.com/engineering/AI-resistant-technical-evaluations
6. "We're releasing the original take-home for anyone to try with unlimited time." — https://www.anthropic.com/engineering/AI-resistant-technical-evaluations

## What it adds / why it's good
Most eval writing is either academic (benchmark papers) or abstract ("benchmarks saturate, build harder ones"). This is a rare longitudinal, single-instrument field account: the same eval tracked across three concrete capability jumps, with cycle-count numbers, candidate volume, and the *actual artifact released*. It operationalizes a thesis you usually only hear stated — "your eval's discriminating range is a function of current model capability" — by showing exactly which design moves restore signal (drop parallelism breadth, add depth, remove tooling crutches, abandon realism for novelty, lengthen the effective time horizon). The realism-vs-novelty pivot is a genuinely non-obvious design principle: *resembling real work* is what made the task valid initially but is precisely what made it AI-solvable, so the author trades ecological validity for discriminative power. The cheating warning (`tests/` tampering) is a bonus real-world example of verifier reward-hacking that grounds abstract integrity concerns. For an agent-evals library, it doubles as both a methodology note and a downloadable, AI-graded RL-style optimization environment.

## Themes
- **1 why-evals** — the central argument is why evals decay and how to keep them load-bearing as capability rises.
- **2 eval⇄capability⇄RL-env** — the eval is explicitly co-evolved with model capability across versions; the released puzzle is a cycle-count-scored optimization environment.
- **6 benchmark-vs-eval/integrity** — the `tests/`-tampering / cheating warning and the "don't let it resemble training-shaped work" insight are integrity concerns.
- **8 judge/verifiers** — scoring is an automated cycle-count verifier (`submission_tests.py`), with the reward-hacking failure mode called out.
- **10 safety/adversarial** — the whole exercise is adversarial eval design against an improving optimizer, including agents that game the grader.
