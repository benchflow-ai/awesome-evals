# Notes — "BERTScore: Evaluating Text Generation with BERT"
**Authors:** Tianyi Zhang, Varsha Kishore, Felix Wu, Kilian Q. Weinberger, Yoav Artzi · **Venue/Year:** ICLR 2020 (arXiv April 2019) · **URL:** https://arxiv.org/abs/1904.09675 · **Type:** paper · **Found:** true

## Summary
BERTScore is an automatic, reference-based evaluation metric for text generation that replaces n-gram surface matching (BLEU, METEOR, ROUGE) with token-level similarity over contextual BERT embeddings. Rather than requiring exact lexical overlap, it greedily matches each candidate token to its most similar reference token (and vice versa) by cosine similarity, then aggregates into precision, recall, and F1. Across the outputs of 363 machine-translation and image-captioning systems, it correlates better with human judgments and yields stronger model-selection performance than prior metrics, and it is more robust on an adversarial paraphrase-detection task (PAWS). It became foundational because it offered a simple, training-free, embedding-based metric that captures meaning-preserving paraphrase and synonymy — a recurring failure mode of n-gram metrics — and is trivially reusable as a drop-in semantic-similarity scorer. It is one of the most-cited "model-based metric" papers and a direct precursor to the broader shift toward learned/neural evaluators and eventually LLM-as-judge.

## Key points
- Core idea: compute token-token similarity with contextual embeddings instead of exact n-gram matches, so semantically equivalent but lexically different outputs score highly.
- Matching: greedy matching (not optimal assignment) — each candidate token pairs with its highest-cosine reference token; recall does the reverse.
- Aggregation: token cosine similarities are summed into Precision (candidate→reference), Recall (reference→candidate), and their harmonic mean F1 (BERTScore-F1 is the headline number).
- Optional IDF importance weighting: rarer, more informative tokens get higher weight; common tokens are downweighted.
- Baseline rescaling: empirically rescales raw scores against a random-candidate baseline to make values more human-readable/interpretable (does not change ranking).
- Empirical scope: evaluated on outputs of 363 MT and image-captioning systems; compared against BLEU, METEOR, and other established metrics.
- Result: higher correlation with human judgments and better model selection than existing metrics across these systems.
- Robustness: on the adversarial PAWS paraphrase-detection task, BERTScore is more robust to challenging examples that fool n-gram metrics.
- Training-free: no metric-specific supervised training required — it reuses pretrained BERT (and variants), making it cheap to adopt.
- Practical legacy: shipped as an easy-to-use library and became a standard reported metric for summarization, MT, captioning, and dialogue generation.

## Verified quotes
- "We propose BERTScore, an automatic evaluation metric for text generation." — https://arxiv.org/abs/1904.09675
- "However, instead of exact matches, we compute token similarity using contextual embeddings." — https://arxiv.org/abs/1904.09675
- "BERTScore correlates better with human judgments and provides stronger model selection performance than existing metrics." — https://arxiv.org/abs/1904.09675
- "Finally, we use an adversarial paraphrase detection task to show that BERTScore is more robust to challenging examples when compared to existing metrics." — https://arxiv.org/abs/1904.09675

## Why it matters for agent evals
BERTScore is a canonical example of a model-based, reference-grounded verifier: it operationalizes "does the output mean the same thing as a gold answer?" rather than "does it overlap lexically?", which is precisely the gap that breaks n-gram metrics when scoring free-form agent or model outputs. For agent evals it seeds several patterns: (1) embedding-similarity scorers as cheap, deterministic graders for open-ended responses where exact-match is too brittle but a full LLM judge is too expensive or noisy; (2) the precision/recall/F1 decomposition over semantic content, useful for verifiers that care about coverage vs. hallucination separately; (3) the explicit adversarial-robustness evaluation (PAWS), an early signal that metrics must be stress-tested against paraphrase/spurious-overlap attacks — directly relevant to reward-hacking and judge-gaming concerns in RL environments. It is a key historical waypoint on the path from surface metrics → learned metrics (BLEURT, COMET) → LLM-as-judge, and is still used as a reference-based reward/verification signal when ground-truth references exist.

## Themes
- 1 why-evals
- 6 benchmark-vs-eval/integrity
- 8 judge/verifiers
- 10 safety/adversarial
