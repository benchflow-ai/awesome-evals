# Notes — "Adversarial NLI: A New Benchmark for Natural Language Understanding"

**Authors:** Yixin Nie, Adina Williams, Emily Dinan, Mohit Bansal, Jason Weston, Douwe Kiela · **Venue/Year:** ACL 2020 (arXiv Oct 2019) · **URL:** https://arxiv.org/abs/1910.14599 · **Type:** paper · **Found:** true

## Summary
ANLI introduces a large-scale Natural Language Inference benchmark built through an iterative, **human-and-model-in-the-loop** adversarial procedure (HAMLET): human annotators are paid to write hypotheses that fool a strong current model, those fooling examples are verified by other humans, and the fooled-on examples become the test/train set for the next round, with a fresh stronger model trained on the accumulated data each round. The result is a benchmark that is hard *by construction* — it targets the live weaknesses of state-of-the-art models rather than sampling a static distribution. The paper showed that even RoBERTa, near-ceiling on SNLI/MNLI, collapses on ANLI, and that training on ANLI improves performance across other NLI benchmarks. It became foundational because it operationalized "dynamic adversarial benchmarking" — reframing a benchmark as a *moving target* that resists saturation, an idea that seeded Dynabench and a wave of human-in-the-loop adversarial evaluation work. It is heavily cited as the canonical reference both for the NLI dataset itself and for the broader argument that static benchmarks saturate and mislead.

## Key points
- **Method (HAMLET):** annotators see a premise (context) and a target label and must write a hypothesis that makes the target model *mis*classify; examples that fool the model are kept, then validated by independent human annotators before entering the dataset.
- **Three rounds with escalating adversaries:** Round 1 (A1) targets a BERT-Large model; Rounds 2 and 3 (A2, A3) target progressively stronger RoBERTa models trained on the accumulated data — the model is retrained each round so the bar keeps rising.
- **Scale:** ~162,865 total examples across the three rounds — A1 ≈ 16,946, A2 ≈ 45,460, A3 ≈ 100,459 training examples (rounds grow as the adversary gets harder to fool).
- **Headline difficulty:** RoBERTa-Large reaches roughly **73.8% on A1, 48.9% on A2, 44.4% on A3** test — i.e. near chance on the hardest round, despite being state-of-the-art on SNLI/MNLI.
- **Capability transfer:** training on ANLI yields **state-of-the-art performance on existing NLI benchmarks** while the ANLI test set remains a much harder challenge — adversarial data is useful training signal, not just a hard test.
- **Diagnostic value:** the analysis characterizes *why* models fail (numerical/quantitative reasoning, references/names, lexical traps, hard negation), turning the benchmark into an error taxonomy of model weaknesses.
- **Non-experts find the weaknesses:** crowd annotators, not domain experts, were able to reliably break SOTA models — adversarial weakness-finding scales cheaply with people.
- **Never-ending / moving-target framing:** the collection loop can run indefinitely, so the benchmark co-evolves with models rather than being a fixed artifact that quickly saturates.
- **Verification loop:** a separate human-validation step on fooling examples controls label noise, distinguishing genuine model errors from bad annotations — a precursor pattern for trustworthy adversarial eval data.

## Verified quotes
- "We introduce a new large-scale NLI benchmark dataset, collected via an iterative, adversarial human-and-model-in-the-loop procedure." — https://arxiv.org/abs/1910.14599
- "We show that training models on this new dataset leads to state-of-the-art performance on a variety of popular NLI benchmarks, while posing a more difficult challenge with its new test set." — https://arxiv.org/abs/1910.14599
- "Our analysis sheds light on the shortcomings of current state-of-the-art models, and shows that non-expert annotators are successful at finding their weaknesses." — https://arxiv.org/abs/1910.14599
- "The data collection method can be applied in a never-ending learning scenario, becoming a moving target for NLU, rather than a static benchmark that will quickly saturate." — https://arxiv.org/abs/1910.14599

## Why it matters for agent evals
ANLI is one of the cleanest early demonstrations of the core agent-eval failure mode: a benchmark that looks "solved" (RoBERTa near-ceiling on SNLI/MNLI) hides systematic capability gaps that only appear under adversarial pressure. Its **human-and-model-in-the-loop loop** is a direct template for how to build evals that don't saturate — point an annotator (or, today, a red-team model/agent) at the *current* system, harvest its failures, verify them, retrain, and repeat. That loop is the conceptual ancestor of dynamic/adversarial benchmarking (Dynabench), of red-teaming pipelines for LLMs and agents, and of the general "evaluator-as-adversary" stance behind judge/verifier robustness work. The mandatory human-verification stage prefigures the integrity concerns in modern eval design: adversarial examples are only useful if their labels are trustworthy, which maps onto verifier reliability and label-noise control in RL reward and judge pipelines. For agent builders, the durable lesson is that **a benchmark's value decays as soon as systems are optimized against it**, so evals worth keeping must be regenerable against the live frontier rather than a frozen test set.

## Themes
1 why-evals · 6 benchmark-vs-eval/integrity · 8 judge/verifiers · 10 safety/adversarial
