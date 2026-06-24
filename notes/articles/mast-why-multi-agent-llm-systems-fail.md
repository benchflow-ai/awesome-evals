# Notes — "Why Do Multi-Agent LLM Systems Fail?"

**Author:** Mert Cemri, Melissa Z. Pan, Shuyi Yang, Lakshya A. Agrawal, Bhavya Chopra, Rishabh Tiwari, Kurt Keutzer, Aditya Parameswaran, Dan Klein, Kannan Ramchandran, Matei Zaharia, Joseph E. Gonzalez, Ion Stoica (UC Berkeley / CMU / UCSD) · **URL:** https://arxiv.org/abs/2503.13657 · **Type:** paper · **Found:** true

## Summary
A grounded-theory study of *why* multi-agent LLM systems (MAS) fail, not just whether they do. The authors hand-annotate 1,600+ execution traces across 7 popular MAS frameworks (e.g., MetaGPT, ChatDev, HyperAgent, AG2/AppWorld) and inductively derive **MAST** (Multi-Agent System Failure Taxonomy; called "MASFT" in v1): **14 failure modes clustered into 3 categories** — system/specification design, inter-agent misalignment, and task verification. The taxonomy is built via iterative inter-annotator agreement studies reaching **Cohen's κ = 0.88**, then operationalized as an **LLM-as-a-judge** annotator that scales the labeling (**94% accuracy, κ = 0.77** vs. human labels). The core thesis is organizational: most failures stem from flawed coordination and design — the way agents are wired together — rather than the raw limitations of the underlying models. A reliability case study shows targeted fixes help but don't fully close the gap, implying structural rather than tactical solutions are needed. Data, taxonomy, and judge are released openly.

## Key points
- **14 failure modes across 3 categories** (the canonical 5/6/3 split):
  - **FC1 — Specification / System Design (5):** FM-1.1 Disobey task specification · FM-1.2 Disobey role specification · FM-1.3 Step repetition · FM-1.4 Loss of conversation history · FM-1.5 Unaware of termination conditions.
  - **FC2 — Inter-Agent Misalignment (6):** FM-2.1 Conversation reset · FM-2.2 Fail to ask for clarification · FM-2.3 Task derailment · FM-2.4 Information withholding · FM-2.5 Ignored other agent's input · FM-2.6 Reasoning-action mismatch.
  - **FC3 — Task Verification (3):** FM-3.1 Premature termination · FM-3.2 No or incomplete verification · FM-3.3 Incorrect verification.
- **Grounded theory, not armchair taxonomy:** modes emerge inductively from ~150 traces analyzed by expert annotators with iterative refinement; validated by high inter-annotator agreement (**κ = 0.88**) before being applied at scale.
- **Scale of evidence:** MAST-Data = **1,600+ annotated traces** across **7 MAS frameworks**, spanning coding, math, and general-agent tasks, and multiple model backbones (GPT-4, Claude 3, Qwen2.5, CodeLlama).
- **LLM-as-a-judge annotator:** a scalable pipeline with in-context examples reaches **94% accuracy and κ = 0.77** against human labels — the reusable tool that lets others auto-diagnose their own traces.
- **The thesis is organizational, not just capability-bound:** failures map onto well-studied human-organization breakdowns; the paper deliberately *excludes* generic single-LLM failures (e.g., plain text repetition) because they don't pertain specifically to MAS.
- **Verification is a thin, leaky layer:** FC3 modes (premature termination, missing/incorrect verification) show that adding more agents doesn't add rigor — many systems lack any genuine checking step, so wrong outputs sail through.
- **Roughly even spread across categories:** failures are distributed across all three buckets (no single mode dominates), undercutting the simplistic "it's just hallucination" explanation — the problems are systemic and varied.
- **Fixes help but don't close the gap:** an intervention case study (e.g., improved orchestration/verification on AG2-style systems) yielded a meaningful task-completion bump (~14% in one setting) yet still left tasks failing — evidence that structural redesign, not prompt patches, is required.
- **Open release:** taxonomy, the 1,600+ trace dataset, and the LLM annotator are public — making MAST a shared diagnostic vocabulary and reproducible measurement substrate.

## Verified quotes
- "Despite increasing adoption of MAS, the gain in accuracy or performance remains minimal compared to single agent frameworks (Xia et al., 2024) or even simple baselines such as best-of-N sampling on popular benchmarks" — https://arxiv.org/html/2503.13657
- "even organizations of sophisticated individuals can fail catastrophically (Perrow, 1984) if the organization structure is flawed." — https://arxiv.org/html/2503.13657
- "many MAS failures arise from the challenges in inter-agent interactions rather than the limitations of individual agents." — https://arxiv.org/html/2503.13657
- "Even though we encountered some common LLM failure modes like text-repetition, we exclude them from MASFT as these issues do not pertain specifically to MAS, and can occur even in single-LLM call pipelines. On the other hand, we find evidence of MAS facing similar issues as complex human organizations, as the failure modes align with common failure modes observed in human organizations." — https://arxiv.org/html/2503.13657
- "As we achieve an accuracy of 94% and a Cohen's Kappa value of 77%, we deem that the LLM annotator, with in context examples provided, to be a reliable annotator." — https://arxiv.org/html/2503.13657

## What it adds / why it's good
Most agent papers report a single scalar — pass@1, task success — and stop. This paper supplies the missing **failure vocabulary**: a structured, empirically-grounded answer to *where* multi-agent systems break, so a regression can be attributed to a named mode (e.g., "premature termination" or "information withholding") rather than a shrug at "the model." Three things make it non-BS: (1) it's grounded theory over 1,600+ real traces with a measured κ = 0.88, not a speculative list; (2) it ships an **automated annotator** (94% / κ = 0.77) so the taxonomy is operational at scale, not just descriptive; and (3) it reframes the problem as **organizational design** — borrowing from high-reliability-organization theory — and then *shows* with a case study that tactical patches leave the gap open. The honest negative result (fixes help but don't solve it) is itself valuable signal. For an evals library, MAST is the reference label set for diagnostic, mode-level scoring of agent traces.

## Themes
- **9 agent-specific** (primary): the central artifact is a failure taxonomy purpose-built for multi-agent LLM systems.
- **8 judge/verifiers**: ships a validated LLM-as-a-judge annotator (94% / κ = 0.77) and treats verification failures (FC3) as a first-class category.
- **1 why-evals**: argues benchmark scalars alone hide *why* systems fail and motivates mode-level diagnostic evaluation.
- **4 observability/surfaces**: trace-level annotation of where breakdowns occur is exactly an observability surface for agent runs.
- **6 benchmark-vs-eval/integrity**: highlights that benchmark gains are minimal/illusory and that the meaningful signal is in failure structure, not aggregate scores.
