# Notes — "SuperGLUE: A Stickier Benchmark for General-Purpose Language Understanding Systems"

**Authors:** Alex Wang, Yada Pruksachatkun, Nikita Nangia, Amanpreet Singh, Julian Michael, Felix Hill, Omer Levy, Samuel R. Bowman · **Venue/Year:** NeurIPS 2019 · **URL:** https://arxiv.org/abs/1905.00537 · **Type:** paper · **Found:** true

## Summary
SuperGLUE is the direct successor to GLUE, built because within a year of GLUE's release pretraining (notably BERT) pushed model performance past the non-expert human baseline, leaving little headroom. The authors assembled a harder, more diverse suite of eight English language-understanding tasks, retained GLUE's single-number leaderboard format, and shipped a software toolkit plus a public leaderboard at super.gluebenchmark.com. They establish a strong BERT-based baseline (~69) that still trails a measured human baseline (~89.8) by nearly 20 points, restoring meaningful research headroom. SuperGLUE became foundational because it codified a reusable recipe for building "stickier" benchmarks — explicit selection criteria, human baselines as a saturation tripwire, and format diversity beyond simple sentence-pair classification — and served as the standard NLU yardstick during the GPT-3 / T5 era. Its rapid eventual saturation also became a canonical cautionary tale about benchmark lifespan in the LLM era.

## Key points
- Motivation: GLUE saturated fast — "performance on the benchmark has recently surpassed the level of non-expert humans, suggesting limited headroom for further research."
- Composition: eight tasks — BoolQ (yes/no QA), CB (3-class NLI), COPA (2-choice causal reasoning), MultiRC (multi-answer reading comprehension), ReCoRD (cloze-style coreference QA), RTE (2-class entailment), WiC (word-sense disambiguation), WSC (Winograd pronoun coreference).
- Retains the two hardest GLUE tasks (RTE, WSC); the rest came from an open public call for task proposals, then filtered by criteria.
- Six explicit selection criteria: task substance (reasoning over English), difficulty (beyond SOTA but solvable by college-educated speakers), evaluability (automatic metric ~ human judgment), public data with usable licenses, simple unified formats, and format diversity (longer contexts, not just sentence/sentence-pair classification).
- Introduces format diversity deliberately to discourage task-specific architectural hacks and push toward general-purpose models.
- Headline numbers: best BERT-based baseline (BERT++) ≈ 69.0 overall vs. human baseline ≈ 89.8 — a ~20-point gap by design.
- Ships not just data but a software toolkit (built on jiant) and a public leaderboard with a single summary score, lowering the cost of standardized evaluation.
- Human baselines are collected per-task and aggregated, making "distance to human" a first-class, comparable metric across heterogeneous tasks.
- Includes diagnostic/analysis sets (e.g., a broad-coverage diagnostic and Winogender for gender-bias measurement) alongside the core scored tasks.
- Established the template later inherited by harder successors and informed the broader "benchmarks keep saturating" critique that motivated dynamic and adversarial evaluation.

## Verified quotes
- "performance on the benchmark has recently surpassed the level of non-expert humans, suggesting limited headroom for further research." — https://arxiv.org/abs/1905.00537
- "In this paper we present SuperGLUE, a new benchmark styled after GLUE with a new set of more difficult language understanding tasks, a software toolkit, and a public leaderboard." — https://arxiv.org/abs/1905.00537
- "Tasks should be beyond the scope of current state-of-the-art systems, but solvable by most college-educated English speakers." — https://arxiv.org/abs/1905.00537 (ar5iv full text)
- "On average, there is a nearly 20 point gap between BERT++ and human performance." — https://arxiv.org/abs/1905.00537 (ar5iv full text)

## Why it matters for agent evals
SuperGLUE encodes two ideas that remain central to evaluating capable agents. First, the human baseline as a saturation tripwire: it operationalizes "is this benchmark still measuring anything?" by anchoring scores to measured human performance and tracking the gap — the same diagnostic now applied to agent benchmarks that risk ceiling-out. Second, the explicit design-criteria recipe (difficulty calibrated above SOTA but human-solvable, format diversity to resist architecture-specific gaming, automatic metrics validated against human judgment) is a reusable spec for constructing trustworthy eval suites, including the verifiable-task and RL-environment design that agent training depends on. Its single-number aggregate leaderboard plus open toolkit prefigured standardized harnesses (lm-eval-harness, HELM). Equally instructive for eval integrity: SuperGLUE was itself saturated within roughly a year of release by large models, making it the canonical example of why static, contamination-prone benchmarks have short shelf lives and why agent evals trend toward dynamic, adversarial, and held-out-verifier designs.

## Themes
1 why-evals · 6 benchmark-vs-eval/integrity · 5 eval infra
