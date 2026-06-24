# Notes — "Adversarial Examples for Evaluating Reading Comprehension Systems"

**Authors:** Robin Jia, Percy Liang · **Venue/Year:** EMNLP 2017 · **URL:** https://arxiv.org/abs/1707.07328 · **Type:** paper · **Found:** true

## Summary
Standard accuracy on SQuAD suggested reading-comprehension systems were rapidly approaching human performance, but this paper showed that headline metric was hollow. Jia & Liang propose an *adversarial evaluation* scheme: append a distractor sentence to each paragraph that is crafted to fool models without changing the gold answer or misleading humans. Under this attack the average F1 of sixteen published models collapses from 75% to 36%, and with unrestricted ungrammatical word insertions it falls to 7%. The work became a foundational citation in eval literature because it crisply demonstrated that high benchmark accuracy can mask shallow pattern-matching rather than genuine understanding, and it gave the field a concrete, reproducible recipe for stress-testing models with held-out adversarial perturbations. It seeded an entire line of "the benchmark is solved, but is the capability real?" evaluation work and the broader contrast-set / behavioral-testing tradition.

## Key points
- **Core insight:** standard held-out accuracy overstates language understanding; models exploit superficial cues, so a benchmark score alone is not evidence of the underlying capability.
- **AddSent (main attack):** generate a grammatical distractor sentence that looks similar to the question (swapping named entities/numbers with nearest GloVe neighbors and inserting a fake answer) and append it to the paragraph — it does not change the true answer, and human accuracy is essentially unaffected.
- **AddOneSent:** a model-independent variant that picks one distractor sentence at random rather than querying the model to find the worst case — nearly as damaging as AddSent, showing the vulnerability is not just an artifact of white-box search.
- **AddAny / AddCommon:** appends sequences of (possibly ungrammatical) words chosen by querying the model, a stronger, model-aware attack that drives scores far lower.
- **Headline numbers:** across 16 published models, average F1 drops from ~75% to ~36% under AddSent; with the ungrammatical AddAny attack on 4 models, average F1 falls to ~7% (reported as 75.7% → 31.3% for AddSent and → 6.7% for AddAny on the four-model subset).
- **Generality:** the attack degrades every model tested, including then-state-of-the-art architectures like BiDAF and Match-LSTM, indicating a systemic weakness rather than a single model's flaw.
- **Distractors placed at the end of the paragraph** still mislead models, exposing over-reliance on lexical overlap with the question rather than reasoning about answer location.
- **Adversarial training helps only narrowly:** training on one attack type does not robustly transfer to a different attack, foreshadowing the brittleness of adversarial-training defenses.
- **Introduced a methodology** for adversarial evaluation of NLP systems that preserves semantic correctness for humans — distinct from imperceptible pixel perturbations in vision.

## Verified quotes
- "In this adversarial setting, the accuracy of sixteen published models drops from an average of 75% F1 score to 36%; when the adversary is allowed to add ungrammatical sequences of words, average accuracy on four models decreases further to 7%." — https://arxiv.org/abs/1707.07328
- "Our method tests whether systems can answer questions about paragraphs that contain adversarially inserted sentences, which are automatically generated to distract computer systems without changing the correct answer or misleading humans." — https://arxiv.org/abs/1707.07328
- "Standard accuracy metrics indicate that reading comprehension systems are making rapid progress, but the extent to which these systems truly understand language remains unclear." — https://arxiv.org/abs/1707.07328

## Why it matters for agent evals
This paper is a canonical demonstration of the gap between *benchmark score* and *true capability* — the central anxiety of modern agent evaluation. Its method (insert adversarial-but-answer-preserving distractors and measure robustness) is the direct ancestor of contrast sets, behavioral/CheckList testing, and the practice of building held-out adversarial / perturbed eval splits to catch shortcut learning. For agent evals specifically: (1) it motivates adversarial and stress-test environments rather than relying on i.i.d. test accuracy; (2) it warns that LLM-judge or verifier pipelines built on surface lexical overlap are exploitable — the same heuristic that fools the reading-comprehension models can fool a naive grader; (3) it foreshadows prompt-injection and context-distraction attacks on retrieval-augmented agents, since "append a misleading sentence to the context" is structurally identical to injecting adversarial content into a tool/RAG result; and (4) it establishes the integrity principle that a benchmark can be "solved" on paper while the capability remains brittle, which is why agent benchmarks now pair headline metrics with adversarial / robustness probes.

## Themes
1 why-evals · 6 benchmark-vs-eval/integrity · 8 judge/verifiers · 9 agent-specific · 10 safety/adversarial
