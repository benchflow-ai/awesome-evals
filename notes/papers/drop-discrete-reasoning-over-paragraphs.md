# Notes — "DROP: A Reading Comprehension Benchmark Requiring Discrete Reasoning Over Paragraphs"

**Authors:** Dheeru Dua, Yizhong Wang, Pradeep Dasigi, Gabriel Stanovsky, Sameer Singh, Matt Gardner · **Venue/Year:** ACL/NAACL-HLT 2019 (arXiv preprint, March 2019) · **URL:** https://arxiv.org/abs/1903.00161 · **Type:** paper · **Found:** true

## Summary
DROP is a 96k-question English reading-comprehension benchmark built specifically to force *discrete reasoning* — addition, subtraction, counting, sorting, comparison, and multi-span reference resolution — over the content of a paragraph, rather than the span-extraction lookup that SQuAD-style datasets reward. The questions were crowdsourced under an adversarial collection protocol that filtered out items existing systems could already answer, deliberately raising the difficulty floor. When the authors ran state-of-the-art reading-comprehension and semantic-parsing systems on DROP, the best scored only 32.7% F1 against 96.0% expert human F1, exposing a large reasoning gap that prior benchmarks had hidden. The paper's own model, NAQANet (a numerically-augmented QANet that can emit counts and arithmetic results, not just spans), reached 47.0% F1, demonstrating that closing the gap required architectural support for computation. DROP became foundational because it reframed reading comprehension as a *reasoning* task with a machine-checkable, numeric-aware answer space, and it remains a standard probe for the multi-step and numerical reasoning abilities of LLMs.

## Key points
- Introduces **DROP** (Discrete Reasoning Over Paragraphs): ~96,000 questions over Wikipedia paragraphs (drawn largely from sports summaries and history, which are number-dense).
- Answers go beyond extractive spans: they include **numbers, dates, and multi-span sets**, requiring operations like addition, subtraction, counting, sorting, comparison, and coreference across multiple positions.
- Uses an **adversarial / model-in-the-loop crowdsourcing** pipeline: a BiDAF baseline runs during collection and questions it answers correctly are discouraged, pushing annotators toward harder reasoning.
- Defines a **generalized (numbers-aware) F1 metric** plus exact match, so numeric and set-valued answers can be scored automatically — a verifier-friendly answer space.
- Headline gap: best off-the-shelf systems **32.7% F1** vs **96.0% expert human F1** — one of the starkest human-machine gaps published at the time.
- Proposes **NAQANet** (Numerically-Augmented QANet): augments a QANet reader with output heads that can predict counts and perform arithmetic (add/subtract over extracted numbers), reaching **47.0% F1**.
- Establishes that strong span-extraction performance does *not* imply reasoning ability — separating "comprehension" from "computation" as distinct capabilities.
- Seeded a large follow-up line (NumNet, NABERT, MTMSN, NeRd, GenBERT, QDGAT) on numerical/symbolic reasoning in reading comprehension.

## Verified quotes
- "We introduce a new English reading comprehension benchmark, DROP, which requires Discrete Reasoning Over the content of Paragraphs." — https://arxiv.org/abs/1903.00161
- "In this crowdsourced, adversarially-created, 96k-question benchmark, a system must resolve references in a question, perhaps to multiple input positions, and perform discrete operations over them (such as addition, counting, or sorting)." — https://arxiv.org/abs/1903.00161
- "The best systems only achieve 32.7% F1 on our generalized accuracy metric, while expert human performance is 96.0%." — https://arxiv.org/abs/1903.00161
- "We additionally present a new model that combines reading comprehension methods with simple numerical reasoning to achieve 47.0% F1." — https://arxiv.org/abs/1903.00161

## Why it matters for agent evals
DROP is a template for **reasoning-gated, auto-verifiable benchmarks**: because answers are numbers, dates, or span-sets scored by a generalized-F1/EM verifier, it gives a deterministic, cheap correctness signal with no LLM judge required — exactly the property that makes a task usable as an **RL-environment reward** or a programmatic verifier. Its adversarial, model-in-the-loop collection method is an early instance of **dynamic/adversarial benchmark construction** (later formalized by Dynabench), directly relevant to keeping agent evals from saturating and to integrity concerns about benchmarks that capability has outgrown. For modern agent and LLM evaluation, DROP persists as a **multi-step numerical-reasoning probe** in suites like the HELM/Eleuther harnesses and chain-of-thought evaluations, isolating the "can the model actually compute over retrieved evidence" axis from retrieval/extraction — a distinction that matters when judging tool-using and retrieval agents whose failures are reasoning failures, not lookup failures.

## Themes
6 benchmark-vs-eval/integrity · 8 judge/verifiers · 1 why-evals · 2 eval⇄capability⇄RL-env · 10 safety/adversarial
