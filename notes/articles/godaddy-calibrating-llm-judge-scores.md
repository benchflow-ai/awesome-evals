# Notes — "Calibrating Scores of LLM-as-a-Judge"

**Author:** GoDaddy Engineering (no individual byline) · **URL:** https://www.godaddy.com/resources/news/calibrating-scores-of-llm-as-a-judge · **Type:** eng-blog · **Found:** true

## Summary (3-6 sentences)
GoDaddy's engineering blog (published 2025-11-24) argues that the raw output of an LLM-as-a-Judge (LLMJ) is untrustworthy on its own because of systematic bias and drift, and that this unreliability is exactly what produces the dangerous failure mode where a model looks great in offline evals but regresses in live A/B tests. The core prescription is to stop treating the judge as a "subjective human simulator" and instead force it to behave as a "consistent, rule-bound auditor" driven by expert-validated rubrics. They enumerate five named judge biases (positional, verbosity, positivity skew, prompt sensitivity, self-preference) each with a concrete mitigation, and they anchor the whole approach in a "Rubrics as Rewards" (RaR) framing that swaps an opaque preference score for a structured, binary-verifiable rubric. Calibration to humans is handled by normalizing judge scores against a small human-labeled gold set so the LLMJ tracks human judgment. They ground it in two real GoDaddy product surfaces — marketing-content generation and website generation — showing the actual rubric criteria used. The payoff they emphasize is diagnostic: sub-scores tell engineers precisely which criterion failed, turning the judge into a release/optimization signal rather than a vibe check.

## Key points (5-12 substantive bullets)
- **Thesis: raw judge scores are unreliable due to bias + drift**, and the danger is the offline↔online gap — "models perform well in offline evaluations but fail in live A/B testing environments."
- **Five named biases, each with a mitigation:** positional bias → randomize output order; verbosity bias → add explicit conciseness criteria; overly-positive skew → use Chain-of-Thought prompting; prompt sensitivity → normalize against a human-labeled gold set; self-preferential bias → use diverse judge ensembles.
- **Calibration to humans is explicit:** normalize scores against a small, human-labeled gold set so the LLMJ tracks human judgment — this is the practical "make it a trustworthy signal" step most posts skip.
- **Rubrics as Rewards (RaR):** replace the opaque subjective-preference reward with a detailed, structured, verifiable rubric. Criteria are categorized by importance — essential / important / optional / pitfall — and authored to be **binary-verifiable** (pass/fail) rather than on a fuzzy 1–10 scale.
- **Two aggregation strategies contrasted:** *explicit* aggregation (checklist with a fixed scoring formula) vs *implicit* aggregation (the LLM writes a detailed assessment, then assigns a holistic score). The post notes research finding implicit aggregation can be more accurate than explicit, though it cites no coefficient.
- **Diagnostic sub-scores are the real product value:** a failure surfaces as something like "Fails on Essential Criterion: Factual Correctness," pointing the engineer directly at what to fix — the judge doubles as a debugging signal, not just a gate.
- **Real GoDaddy rubric examples — marketing content:** regeneration-attempt thresholds, user rewrite rate after generation, topic consistency, and user-expectation management.
- **Real GoDaddy rubric examples — website generation:** intent-completion rate, address-accuracy capture, business-hours-accuracy capture (concrete, verifiable business-fact checks).
- **Pipeline shape:** target model generates output → judge receives the output plus the original prompt plus the rubric → judge returns sub-scores + rationale, producing a "transparent, verifiable reward signal" usable for model optimization decisions.
- **Caveat for the reader:** the post is light on hard numbers — it gives no correlation/agreement coefficients or specific gating thresholds, so the "alignment to human labels" is described as a method (gold-set normalization) rather than reported as a measured result.

## Verified quotes (1-4 VERBATIM)
- "This unreliability can create dangerous quality gaps where models perform well in offline evaluations but fail in live A/B testing environments." — https://www.godaddy.com/resources/news/calibrating-scores-of-llm-as-a-judge
- "Stop asking your LLM judge to act as a subjective human simulator and instead enforce its role as a consistent, rule-bound auditor guided by expert-validated rubrics." — same URL
- "RaR replaces the opaque reward signal of subjective preference with a detailed, structured, and verifiable rubric." — same URL
- "When a model fails, the sub-scores (\"Fails on Essential Criterion: Factual Correctness\") immediately tell the engineer *exactly* where to focus development and testing efforts." — same URL

## What it adds / why it's good
Most "LLM-as-judge" posts stop at "use a rubric and CoT." This one is useful because it connects three things practitioners actually need: (1) a named-bias checklist with a specific mitigation per bias (so it reads like an engineering runbook, not a survey), (2) an explicit human-calibration step — normalize against a small human-labeled gold set so the judge tracks human labels, which is the bridge from "raw score" to "release-gating signal," and (3) a categorized, binary-verifiable rubric (essential/important/optional/pitfall) whose sub-scores become a *diagnostic* output that tells engineers what regressed. The two GoDaddy product rubrics (marketing copy, website generation) are concrete enough to copy — e.g., address-accuracy and business-hours-accuracy capture are exactly the kind of verifiable business facts that make a judge defensible. Its honest limitation relative to the strongest sources (e.g., Eugene Yan's measured judge-vs-human agreement): it asserts the offline↔online gap and the value of gold-set normalization but reports no correlation/agreement numbers or concrete gating thresholds, so you get the method and the framing but not the receipts.

## Themes
- **1 why-evals** — frames the offline-eval vs live-A/B gap as the motivating failure.
- **8 judge/verifiers** — primary focus: calibrating, de-biasing, and rubric-grounding an LLM-as-a-Judge.
- **2 eval⇄capability⇄RL-env** — "Rubrics as Rewards" explicitly casts the judge output as a reward signal for model optimization.
- **5 eval infra** — describes the judge pipeline, gold-set normalization, and aggregation strategies as eval machinery.
