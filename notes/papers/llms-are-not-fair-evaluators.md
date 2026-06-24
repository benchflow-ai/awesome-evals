# Notes — "Large Language Models are not Fair Evaluators"

**Authors:** Peiyi Wang, Lei Li, Liang Chen, Zefan Cai, Dawei Zhu, Binghuai Lin, Yunbo Cao, Qi Liu, Tianyu Liu, Zhifang Sui · **Venue/Year:** ACL 2024 (Long Papers); arXiv May 2023 · **URL:** https://arxiv.org/abs/2305.17926 · **Type:** paper · **Found:** true

## Summary
This paper exposes a systematic and easily exploitable bias in the now-ubiquitous "LLM-as-a-judge" paradigm: when an LLM (e.g., GPT-4, ChatGPT) is asked to score or compare two candidate responses, its verdict depends heavily on the *order* in which the two responses are presented. The authors show this positional bias is severe enough to be adversarially weaponized — by simply swapping the order, they made a clearly weaker model (Vicuna-13B) "beat" a stronger one (ChatGPT) on the majority of queries. To fix it they propose a lightweight calibration framework of three strategies — Multiple Evidence Calibration, Balanced Position Calibration, and Human-in-the-Loop Calibration — that markedly improves agreement with human judgments. It became foundational because it was one of the earliest, cleanest demonstrations that automated LLM judges are not neutral measuring instruments but biased systems with reproducible failure modes, motivating a large downstream literature on judge bias, calibration, and meta-evaluation.

## Key points
- Identifies **positional bias** as a systematic failure of pairwise LLM-as-judge evaluation: the same two responses can swap ranking purely by reordering them in the prompt.
- Headline adversarial result: **Vicuna-13B could beat ChatGPT on 66 of 80 tested queries** with ChatGPT as the evaluator, just by manipulating response order — showing the bias is large enough to fully invert conclusions.
- Proposes a three-part **calibration framework**:
  - **Multiple Evidence Calibration (MEC):** require the judge to *generate evaluation evidence/rationale before assigning scores*, stabilizing ratings (a chain-of-thought-before-score pattern).
  - **Balanced Position Calibration (BPC):** run each candidate in *both positions* and average the two scores, canceling order effects.
  - **Human-in-the-Loop Calibration (HITLC):** introduces a **balanced position diversity entropy** metric to flag hard/ambiguous examples and route only those to human reviewers.
- Reports the combined framework improves alignment with human assessment by **up to ~14.3%**.
- Bias is not isolated to one model — demonstrated across LLM judges including GPT-4 and ChatGPT.
- The diversity-entropy idea provides a principled *uncertainty signal* for deciding when an automated judge cannot be trusted and human review is warranted.
- Authors released code and human annotations (ChatGPT vs. Vicuna-13B on the Vicuna Benchmark prompts) to support reproducible meta-evaluation.

## Verified quotes
- "We find that the quality ranking of candidate responses can be easily hacked by simply altering their order of appearance in the context." — https://arxiv.org/abs/2305.17926
- "Vicuna-13B could beat ChatGPT on 66 over 80 tested queries with ChatGPT as an evaluator." — https://arxiv.org/abs/2305.17926
- "we propose a calibration framework with three simple yet effective strategies: 1) Multiple Evidence Calibration ... 2) Balanced Position Calibration ... 3) Human-in-the-Loop Calibration, which introduces a balanced position diversity entropy to measure the difficulty of each example and seeks human assistance when needed." — https://arxiv.org/abs/2305.17926

## Why it matters for agent evals
LLM-as-judge is the workhorse of modern agent and model evaluation — it scores open-ended outputs, ranks agent trajectories, and supplies reward signals for RLHF/RLAIF where no programmatic verifier exists. This paper is a core reference for why such judges must be treated as *measurement instruments with characterizable bias*, not ground truth. Its concrete mitigations are now standard practice: BPC (swap-and-average over both orderings) is the canonical positional-debiasing trick used in MT-Bench, AlpacaEval, Arena-style pairwise eval, and reward-model pipelines; MEC (rationale-before-score) is the basis for rationale-first judge prompting. The balanced-position-diversity-entropy idea seeds the broader pattern of *judge uncertainty/abstention* and selective human-in-the-loop escalation. For agent evals specifically, it warns that any leaderboard or RL environment built on a naive single-pass pairwise judge is vulnerable to order-induced artifacts and to adversarial gaming — directly relevant to benchmark integrity and reward hacking.

## Themes
1 why-evals · 6 benchmark-vs-eval/integrity · 8 judge/verifiers · 10 safety/adversarial
