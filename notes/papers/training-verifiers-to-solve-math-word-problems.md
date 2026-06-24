# Notes — "Training Verifiers to Solve Math Word Problems"

**Authors:** Karl Cobbe, Vineet Kosaraju, Mohammad Bavarian, Mark Chen, Heewoo Jun, Lukasz Kaiser, Matthias Plappert, Jerry Tworek, Jacob Hilton, Reiichiro Nakano, Christopher Hesse, John Schulman (OpenAI) · **Venue/Year:** arXiv preprint, 2021 · **URL:** https://arxiv.org/abs/2110.14168 · **Type:** paper · **Found:** true

## Summary
This OpenAI paper introduces **GSM8K**, a dataset of 8.5K linguistically diverse grade-school math word problems, built specifically to diagnose the multi-step reasoning failures of large language models. The headline methodological contribution is **training verifiers**: instead of relying on a single finetuned generator, they sample many candidate solutions at test time and use a learned verifier model to judge correctness and select the best one. They show this verification-plus-sampling approach substantially outperforms finetuning a generator of equal size, and — crucially — that it **scales more effectively with additional data** than the finetuning baseline. The paper became foundational because it crystallized the generator/verifier split, established GSM8K as the default benchmark for LLM arithmetic reasoning, and provided the conceptual seed for later work on outcome- and process-reward models, best-of-N selection, and verifier-guided RL.

## Key points
- Introduces **GSM8K**: 8.5K high-quality, linguistically diverse grade-school math word problems (split ~7.5K train / 1K test), each requiring 2–8 steps of elementary arithmetic — conceptually simple but multi-step.
- Core finding: **even the largest transformer models fail** to achieve high test performance despite the conceptual simplicity, exposing a robustness gap in multi-step reasoning.
- **Method — verification:** train a separate verifier to score the correctness of full model completions; at test time **sample many candidates and select the one the verifier ranks highest** (a best-of-N / reranking scheme).
- Verifiers are trained on a dataset of model-generated solutions labeled by whether they reached the correct final answer (outcome-based correctness signal).
- **Verification beats finetuning** at the same model scale, and the gap widens with more data — i.e., verification has a better scaling trend than simply finetuning a larger generator.
- Token-level (per-step) verifier scoring outperformed solution-level scoring, foreshadowing later process-reward-model work.
- Establishes the **generator + verifier** decomposition that decouples producing candidate reasoning from judging it — a now-standard pattern in reasoning systems.
- GSM8K became one of the most widely adopted reasoning benchmarks, used to evaluate chain-of-thought, self-consistency, tool use, and later frontier reasoning models.
- Demonstrates that **test-time compute** (sampling more candidates and reranking) is a lever for accuracy, not just training scale.

## Verified quotes
- "we introduce GSM8K, a dataset of 8.5K high quality linguistically diverse grade school math word problems." — https://arxiv.org/abs/2110.14168
- "To increase performance, we propose training verifiers to judge the correctness of model completions. At test time, we generate many candidate solutions and select the one ranked highest by the verifier." — https://arxiv.org/abs/2110.14168
- "We demonstrate that verification significantly improves performance on GSM8K, and we provide strong empirical evidence that verification scales more effectively with increased data than a finetuning baseline." — https://arxiv.org/abs/2110.14168

## Why it matters for agent evals
This paper is a direct ancestor of the **verifier / reward-model** line that underpins modern eval and RL infrastructure. The generator+verifier split is the conceptual template for **LLM-as-judge** and **learned verifiers**: a model that scores candidate trajectories rather than producing them. The outcome-supervised verifier here is the precursor to **outcome reward models (ORM)** and **process reward models (PRM)** used in RLHF/RLVR pipelines, and GSM8K became a canonical **RL-environment / verifiable-reward benchmark** — math problems have checkable final answers, making them ideal for automated grading without human judges. The best-of-N reranking insight (spend test-time compute, then verify-and-select) is the foundation for self-consistency, tree search, and verifier-guided decoding in agentic systems. For agent evals specifically, it seeds the principle that **verification is often easier and more scalable than generation**, motivating eval designs where a trusted checker grades an agent's outputs, and it gave the field a clean, automatically-gradable benchmark that anchored years of reasoning-capability measurement.

## Themes
- **2 eval⇄capability⇄RL-env** — GSM8K is a verifiable-reward environment that ties a capability (multi-step reasoning) to an automatically-gradable eval/RL signal.
- **6 benchmark-vs-eval/integrity** — introduces a foundational, widely-cited benchmark (with the attendant saturation/contamination concerns it later raised).
- **8 judge/verifiers** — the central contribution is a trained verifier that judges completion correctness, the direct ancestor of ORM/PRM and LLM-as-judge.
