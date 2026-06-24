# Notes — "Eval-driven development: Build better AI faster"

**Author:** Malte Ubl, Alice Alexandra Moore, Ido Pesok (Vercel) · **URL:** https://vercel.com/blog/eval-driven-development-build-better-ai-faster · **Type:** eng-blog · **Found:** true

## Summary (3-6 sentences)
Vercel's engineering team argues that traditional, deterministic testing breaks down for AI features because LLMs are probabilistic black boxes, so evals — described as "end-to-end tests for AI" — should become the central development loop instead. They lay out three grading modes (code-based, human, LLM-based) and a trade-off space between speed, cost, and the dimensions each can actually measure. The piece grounds this in their own product, v0 (the AI app/UI generator), where evals run in CI on every PR that touches the output pipeline, prompts are iterated daily, and safety/refusal evals are held to a 100% pass rate. The overarching mental model is an "AI-native flywheel": evals → data → models/strategies → user feedback, looping back to better evals. The thesis is to replace vibes with measurement so teams can iterate on prompts and models with confidence rather than fear of silent regressions.

## Key points (5-12 substantive bullets)
- **Core reframe:** "Evaluations (evals) are like end-to-end tests for AI and other probabilistic systems." Because LLMs "operate as black boxes," classic input→deterministic-output testing (their example: "two plus two always equals four") doesn't apply — you measure aggregate output quality, not individual code paths.
- **Three grading types, each with a trade-off:**
  - *Code-based grading* — automated assertions for objective criteria; fastest/cheapest feedback, but can only check what's mechanically verifiable.
  - *Human grading* — needed for subjective/nuanced quality (clarity, coherence, creativity); highest fidelity, least scalable.
  - *LLM-based grading (LLM-as-judge)* — scalable middle ground, but explicitly noted to cost ~**1.5x–2x more than code-based grading**.
- **Pick the cheapest grader that can measure the dimension you care about** — push as much as possible to code-based checks, escalate to LLM, reserve humans for what only humans can judge.
- **The AI-native flywheel:** a positive feedback loop of evals (measurement) → high-quality data → models & strategies (testing approaches) → user feedback (explicit, implicit, error reports), each turn feeding the next. "This positive feedback loop accelerates development and ensures your AI systems consistently improve."
- **Evals live in CI:** "Every GitHub pull request that impacts the output pipeline includes eval results." The automated suite reports both regressions and improvements, so eval deltas become a reviewable artifact on the PR, not an afterthought.
- **Concrete code-based checks in v0:** validating that generated code has correct imports, that files referenced are actually used, and balanced/correct comments — cheap deterministic signals on probabilistic output.
- **Safety as a hard gate:** refusal and safety evals are prioritized and held at a **100% pass rate** — a non-negotiable threshold distinct from quality evals that move on a gradient.
- **Daily prompt iteration:** prompts are tuned daily, with the eval suite providing the guardrail that lets them change prompts aggressively without silently degrading behavior.
- **War story / product grounding:** all of this is drawn from shipping v0, Vercel's AI product, which combines code checks, human feedback, and LLM grading rather than relying on any single signal.

## Verified quotes
All verbatim from https://vercel.com/blog/eval-driven-development-build-better-ai-faster:
- "Evaluations (evals) are like end-to-end tests for AI and other probabilistic systems."
- "LLMs, however, introduce probabilistic behavior. They operate as black boxes, making their responses difficult to predict."
- "We prioritize refusal and safety evals, maintaining a 100% pass rate."
- "Every GitHub pull request that impacts the output pipeline includes eval results."

## What it adds / why it's good
Unlike conceptual "why you need evals" essays, this is a shipping team's operational playbook: evals wired into GitHub PR review as a gating artifact, an explicit cost ratio (LLM judging ≈ 1.5–2x code-based) that forces you to be deliberate about which grader to spend on, and concrete code-based checks (imports resolve, files get used, comments balanced) that show how much can be graded deterministically before reaching for an LLM judge. The 100%-pass-rate safety gate vs. gradient quality evals is a useful distinction practitioners often blur. The "flywheel" framing connects evals to data and user feedback rather than treating evals as an isolated test step — it's evals as the development loop, not a QA checkbox. Caveat: it's a vendor/product post and light on raw numbers (only the cost ratio and the pass rate are quantified) and on judge-calibration detail.

## Themes
1 why-evals · 3 model/harness/skill · 5 eval infra · 8 judge/verifiers · 9 agent-specific · 10 safety
