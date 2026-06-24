# Notes — "Stochasticity in Agentic Evaluations: Quantifying Inconsistency with Intraclass Correlation"

**Author:** Zairah Mustahsan, Abel Lim, Megna Anand, Saahil Jain, Bryan McCann (You.com) · **URL:** https://arxiv.org/abs/2512.06710 · **Type:** paper · **Found:** true

## Summary
The paper argues that the standard agentic-eval practice — a single accuracy number from a single run — hides the run-to-run variance that makes it impossible to tell a real capability gain from lucky sampling. It imports the Intraclass Correlation Coefficient (ICC) from measurement science as a primitive that decomposes observed variance into *between-query* variance (genuine task-difficulty signal) and *within-query* variance (agent inconsistency / measurement noise). Evaluating eight-plus models on GAIA (Levels 1–3) and FRAMES, the authors show ICC swings dramatically with task structure (FRAMES 0.4955–0.7118; GAIA 0.304–0.774), and use convergence analysis to give practitioners evidence-based resampling budgets (n≈8–16 for structured tasks, n≥32 for the hardest reasoning). Its sharpest operational claim: for sub-agent replacement, an accuracy bump is only trustworthy if ICC improves too. They propose reporting accuracy alongside ICC and within-query variance as standard practice, captured in updated "Evaluation Cards."

## Key points
- **Core primitive:** ICC, borrowed from behavioral/measurement science, separates true between-query signal from within-query (run-to-run) noise. ICC = σ_b² / (σ_b² + σ_w²) — between-query variance over total variance.
- **Variant used:** ICC(1,1) — one-way random effects, single-trial reliability (citing Shrout & Fleiss 1979). Tasks are treated as random effects sampled from a population of eval items; trials are random effects capturing stochasticity in agent behavior; within-task variance is pooled across all tasks. (Note: a PDF-summarizer pass mis-reported this as ICC(3,1) — the rendered text clearly states ICC(1,1).)
- **Interpretation bands** (standard ICC convention): poor <0.5, moderate 0.5–0.75, good 0.75–0.9, excellent ≥0.9 — meaning much of agentic evaluation sits in "poor-to-moderate" reliability territory.
- **Benchmarks:** GAIA (Levels 1–3, agentic capability across reasoning complexity) and FRAMES (retrieval + factuality over multiple documents), each query run many times to estimate within-query variance.
- **Headline numbers:** FRAMES ICC = 0.4955–0.7118 across models; GAIA ICC = 0.304–0.774 across models. ICC "varies dramatically with task structure" — harder/more open-ended agentic tasks are noisier.
- **Resampling budgets:** ICC estimates converge by n≈8–16 trials for GAIA Levels 1–2 (structured) and n≈32 for Level 3 (complex reasoning) — giving a principled stopping rule for how many reruns an eval actually needs.
- **Decision rule (the load-bearing contribution):** "accuracy improvements are only trustworthy if ICC also improves." A swap that raises mean accuracy but lowers consistency may be introducing brittleness into a downstream multi-agent system.
- **Models spanned:** GPT-4o (and search/deep-research variants), GPT-5, o4-mini, Claude 4.5 Sonnet, Claude 4.5 Haiku, Gemini 2.5 Pro, Qwen3-235B-A22B, DeepSeek-v3p1 — a broad, current-frontier panel.
- **Evaluation Cards:** proposed reporting artifact bundling accuracy + ICC + within-query variance (with CIs) so stability travels with the headline number rather than being discarded.
- **Framing:** explicitly positions itself as moving agentic benchmarking "from opaque leaderboard competition toward principled, reproducible experimental science."

## Verified quotes
- "Yet current evaluation practice, reporting a single accuracy number from a single run, obscures the variance underlying these results, making it impossible to distinguish genuine capability improvements from lucky sampling." — https://arxiv.org/abs/2512.06710
- "We employ the one-way random effects model, ICC(1,1) (shrout1979intraclass) ... We report single-trial reliability: ICC(1,1) measures the reliability of an individual trial, with within-task variance estimated by pooling variances across all tasks." — https://arxiv.org/html/2512.06710v1
- "For sub-agent replacement decisions in agentic systems, accuracy improvements are only trustworthy if ICC also improves." — https://arxiv.org/html/2512.06710v1
- "Convergence occurs by n≈8−16 for Levels 1–2 and by n≈32 for Level 3." — https://arxiv.org/html/2512.06710v1
- "By making evaluation stability visible, we aim to transform agentic benchmarking from opaque leaderboard competition to trustworthy experimental science." — https://arxiv.org/abs/2512.06710
- "By moving agentic evaluation from opaque leaderboard competition toward principled, reproducible experimental science, we aim to establish evaluation rigor as a foundation for trustworthy agentic systems development." — https://arxiv.org/html/2512.06710v1

## What it adds / why it's good
Most "evals are noisy" discourse stops at "run it a few times and report a std-dev or a confidence interval." This paper supplies the missing *statistical object*: ICC gives a single, interpretable number for what fraction of a benchmark's spread is real signal versus run-to-run noise, with established interpretation bands and a 50-year measurement-science pedigree behind it. That converts vibes ("this delta feels real") into a decidable test. Two pieces are genuinely actionable: (1) the convergence analysis turns "how many reruns?" into an evidence-based budget per task type instead of a guess, and (2) the "accuracy gain must be matched by an ICC gain" rule is a concrete, non-obvious gate for sub-agent swap decisions in compound systems — it catches the failure mode where a more capable-on-average component actually makes the overall system flakier. The Evaluation Card proposal is the right plumbing to make this stick. Limitations to flag honestly: ICC(1,1) assumes a particular variance-components model (tasks and trials as random effects, pooled within-task variance) that may not hold for all eval designs; the bands are conventions imported wholesale; and the framework measures consistency, not correctness — a confidently-wrong-every-time agent scores high ICC.

## Themes
- **1 why-evals** — central: argues single-run accuracy is epistemically broken and reframes benchmarking as experimental science.
- **5 eval infra** — proposes Evaluation Cards and resampling budgets as standard reporting/tooling.
- **6 benchmark-vs-eval/integrity** — directly attacks leaderboard deltas that don't survive a noise test.
- **8 judge/verifiers** — bears on judge/evaluator reliability (within-query variance of stochastic evaluators).
- **9 agent-specific** — sub-agent replacement decisions in compound agentic systems are the motivating application.
