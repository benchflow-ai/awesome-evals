# Notes — "Evaluating Large Language Models Trained on Code"

**Authors:** Mark Chen, Jerry Tworek, Heewoo Jun, Qiming Yuan, Henrique Ponde de Oliveira Pinto, Jared Kaplan, et al. (OpenAI, ~58 authors) · **Venue/Year:** arXiv preprint (cs.LG), 2021 · **URL:** https://arxiv.org/abs/2107.03374 · **Type:** paper · **Found:** true

## Summary
This paper introduces Codex, a GPT model fine-tuned on public GitHub code that powered GitHub Copilot, and—more consequentially for the eval literature—introduces **HumanEval**, a hand-written benchmark of 164 programming problems that measures *functional correctness* by executing model-generated code against unit tests rather than matching reference text. It formalizes the **pass@k** metric (the probability that at least one of k sampled solutions passes all tests) and provides an unbiased estimator for it, establishing execution-based, test-driven evaluation as the standard for code generation. The key empirical finding is that repeated sampling dramatically lifts measured capability: a single sample solves 28.8% of problems but 100 samples solve 70.2%. The paper became foundational because HumanEval/pass@k became the default code-eval harness for nearly every subsequent code LLM, and because it pioneered the now-standard pattern of grading generative models by running their outputs in a verifier (test suite) instead of comparing strings. It is also an early, careful treatment of the safety, security, alignment, and economic risks of deploying code-generation models.

## Key points
- Introduces **Codex**, GPT fine-tuned on public GitHub Python, the model behind GitHub Copilot.
- Introduces **HumanEval**: 164 original, hand-written programming problems (function signature + docstring + hidden unit tests) designed to avoid training-set contamination.
- Defines **functional correctness** evaluation: a sample is correct iff it passes all unit tests when executed—an execution/verifier-based metric, not BLEU or exact-match.
- Formalizes **pass@k** and gives a numerically stable *unbiased estimator* (generate n ≥ k samples, count correct c) to reduce variance versus naively computing 1−(1−p)^k.
- Headline numbers: Codex solves **28.8%** of HumanEval (pass@1-ish single sample); **GPT-3 solves 0%**, **GPT-J solves 11.4%**.
- **Repeated sampling is highly effective**: with 100 samples per problem and an oracle that picks any passing sample, **70.2%** of problems are solved.
- Practical ranking insight: choosing the highest mean-log-probability sample recovers much of the oracle gain when you cannot run tests, foreshadowing reranking/best-of-n.
- Fine-tuned variants (Codex-S on standalone functions) and filtered/curated training improve performance over raw Codex.
- Documents concrete **limitations**: difficulty with docstrings describing long chains of operations and with binding operations to variables (compositional reasoning failures).
- Extensive **broader-impacts** analysis: over-reliance, misalignment, bias, security (insecure code generation), and economic/labor effects.

## Verified quotes
- "On HumanEval, a new evaluation set we release to measure functional correctness for synthesizing programs from docstrings, our model solves 28.8% of the problems, while GPT-3 solves 0% and GPT-J solves 11.4%." — https://arxiv.org/abs/2107.03374
- "Using this method, we solve 70.2% of our problems with 100 samples per problem." — https://arxiv.org/abs/2107.03374
- "Careful investigation of our model reveals its limitations, including difficulty with docstrings describing long chains of operations and with binding operations to variables." — https://arxiv.org/abs/2107.03374
- "Finally, we discuss the potential broader impacts of deploying powerful code generation technologies, covering safety, security, and economics." — https://arxiv.org/abs/2107.03374

## Why it matters for agent evals
This is arguably the origin point of the execution-grounded eval pattern that dominates agentic coding and tool-use evaluation. HumanEval established that you grade a generative model by *running its output against a verifier* (a unit-test suite) rather than scoring surface text—the same verifier-based reward signal that powers code RL environments, SWE-bench-style agent benchmarks, and RLVR (RL from verifiable rewards). The **pass@k** estimator made sampling-and-checking a first-class evaluation primitive, directly motivating best-of-n, self-consistency, and agent loops that generate many candidates and filter by a checker. The paper's "rank by mean log-prob when you can't execute" result prefigures LLM-judge/verifier reranking. For agents specifically, the execution-test harness is the conceptual ancestor of sandboxed test-running environments used to score multi-step coding agents, and the safety/security analysis (insecure code, misuse) seeds the adversarial and safety-eval thread for code-capable agents.

## Themes
1 why-evals · 2 eval⇄capability⇄RL-env · 6 benchmark-vs-eval/integrity · 7 RL environments · 8 judge/verifiers · 9 agent-specific · 10 safety/adversarial
