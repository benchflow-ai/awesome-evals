# Notes — "A large annotated corpus for learning natural language inference"

**Authors:** Samuel R. Bowman, Gabor Angeli, Christopher Potts, Christopher D. Manning · **Venue/Year:** EMNLP 2015 (arXiv Aug 2015) · **URL:** https://arxiv.org/abs/1508.05326 · **Type:** paper · **Found:** true

## Summary
This paper introduces the Stanford Natural Language Inference (SNLI) corpus, 570K human-written English sentence pairs each labeled entailment, contradiction, or neutral. NLI (a.k.a. recognizing textual entailment) is framed as a clean testbed for whether a system understands meaning: given a premise, decide whether a hypothesis is true, false, or undetermined. Prior NLI resources were tiny (hundreds to thousands of examples) and full of annotation artifacts; SNLI is roughly two orders of magnitude larger, which for the first time made it feasible to train data-hungry neural sentence-encoders on the task. The collection trick was to ground annotation in image captioning: Flickr30k captions served as premises, and crowd workers wrote a new hypothesis for each of the three labels, yielding naturalistic, balanced data. SNLI became foundational because it turned NLI into a standard supervised benchmark, seeded a long leaderboard of sentence-representation models, and established the data-collection and validation template later reused by MultiNLI and many other benchmarks.

## Key points
- **Task framing:** three-way classification over (premise, hypothesis) pairs into *entailment*, *contradiction*, *neutral* — a label set the paper argues is a tractable proxy for semantic understanding.
- **Scale:** 570,152 sentence pairs (about 550K train + 10K dev + 10K test), ~2 orders of magnitude larger than prior entailment corpora.
- **Grounded elicitation method:** premises are existing Flickr30k image captions; Mechanical Turk workers write one entailed, one neutral, and one contradicting hypothesis per premise — producing balanced labels and reducing degenerate premise reuse.
- **Validation / agreement:** a subset was relabeled by 5 annotators; overall inter-annotator **Fleiss kappa = 0.70**, with a 3-of-5 majority "gold" label on ~98% of validated pairs and **unanimous agreement on 58.3%**. Pairs lacking a majority label are marked `-` and typically excluded.
- **Baselines:** a feature-rich **lexicalized classifier reaches 78.2%** test accuracy; an unlexicalized/edit-distance style baseline is much weaker — showing the task is learnable but not trivially solved by surface overlap.
- **Neural result:** a 100D **LSTM RNN sentence-encoding model reaches 77.6%**, competitive with the lexicalized classifier — the paper's headline that neural nets can perform "competitively on natural language inference benchmarks for the first time."
- **Architecture pattern introduced:** independently encode premise and hypothesis into fixed vectors, then classify their combination — the canonical "sentence-embedding" evaluation that SNLI subsequently popularized.
- **Resource:** released freely, becoming a default benchmark and a standard pretraining/transfer signal for general-purpose sentence representations.

## Verified quotes
- "we introduce the Stanford Natural Language Inference corpus, a new, freely available collection of labeled sentence pairs, written by humans doing a novel grounded task based on image captioning." — https://arxiv.org/abs/1508.05326
- "At 570K pairs, it is two orders of magnitude larger than all other resources of its type." — https://arxiv.org/abs/1508.05326
- "This increase in scale ... allows a neural network-based model to perform competitively on natural language inference benchmarks for the first time." — https://arxiv.org/abs/1508.05326
- Reported metrics (from the EMNLP 2015 paper body, via ar5iv): overall validation **Fleiss kappa = 0.70**; lexicalized classifier **78.2%** and LSTM **77.6%** test accuracy. — https://arxiv.org/abs/1508.05326

## Why it matters for agent evals
SNLI is a template-setting artifact for how the field builds and validates discriminative benchmarks. Three ideas recur in modern agent/LLM evaluation: (1) **multi-annotator gold labels with an explicit agreement floor** (Fleiss kappa 0.70, 3-of-5 majority, abstain when no consensus) — the same human-agreement-as-ground-truth discipline that underpins judge/verifier calibration and the practice of discarding low-agreement items rather than forcing a label; (2) **scalable grounded elicitation** — bootstrapping a balanced, naturalistic dataset by anchoring crowd writing to an external stimulus (image captions), a precursor to synthetic-but-grounded data pipelines used to build RL/eval environments; and (3) **a fixed train/dev/test split with a public leaderboard**, which made NLI a reusable verifier for sentence-level semantic competence. NLI-style entailment checks are now reused directly as automatic *verifiers* — e.g. faithfulness/hallucination and contradiction detection where an entailment model scores whether a model's claim is entailed by its evidence, exactly the judge role in RAG and agent grounding checks. SNLI also surfaced the integrity lesson that drives later eval design: large crowd corpora carry annotation artifacts that let models pass via shortcuts, motivating partial-input and adversarial baselines now standard when validating any benchmark.

## Themes
6 benchmark-vs-eval/integrity · 8 judge/verifiers · 1 why-evals · 2 eval⇄capability⇄RL-env
