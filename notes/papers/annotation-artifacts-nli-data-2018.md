# Notes — "Annotation Artifacts in Natural Language Inference Data"

**Authors:** Suchin Gururangan, Swabha Swayamdipta, Omer Levy, Roy Schwartz, Samuel R. Bowman, Noah A. Smith · **Venue/Year:** NAACL-HLT 2018 · **URL:** https://arxiv.org/abs/1803.02324 · **Type:** paper · **Found:** true

## Summary
This short paper exposes a now-canonical failure mode in benchmark construction: the crowdsourcing protocol used to build large NLI datasets (SNLI, MultiNLI) leaves systematic "annotation artifacts" in the hypotheses that let a model guess the gold label without ever reading the premise. A simple fastText-style text classifier reading only the hypothesis scores ~67% on SNLI and ~53% on MultiNLI, far above the ~33% majority/chance baseline — meaning a large fraction of these "inference" examples are solvable by surface heuristics rather than reasoning. The authors trace the artifacts to predictable annotator behaviors (e.g., negation words for contradiction, generic/vague words for neutral, purpose-stripping for entailment). They then show that reported model accuracy is inflated: when you re-evaluate on the "hard" subset (examples the hypothesis-only model gets wrong), strong models drop substantially. It became foundational because it crisply demonstrated that high leaderboard numbers can reflect dataset shortcuts rather than capability, seeding a whole literature on spurious correlations, shortcut learning, dataset-bias diagnostics, and hard/contrast evaluation splits.

## Key points
- **Diagnostic method — the hypothesis-only baseline:** train a classifier on hypotheses alone (premise withheld). If it beats chance, the dataset contains label-leaking artifacts. This is now a standard sanity check for any premise/hypothesis-style benchmark.
- **Concrete result:** hypothesis-only model reaches ~67% accuracy on SNLI and ~53% on MultiNLI, vs. a ~33% (3-class majority) baseline — so roughly two-thirds of SNLI labels are partially recoverable from the hypothesis alone.
- **Artifacts are class-specific lexical/stylistic tells:** negation words ("no", "never", "nobody") cue *contradiction*; purpose/specificity removal and superordinate ("animal", "outdoors", "instrument") generic words cue *entailment*; vague/modal and unrelated-detail words ("tall", "first", "sad") cue *neutral*. These come from how workers cheaply generate three hypotheses per prompt.
- **Length signal:** entailed hypotheses tend to be shorter (workers drop words), neutral ones longer (workers add unsupported detail) — another premise-independent give-away.
- **"Hard" vs "easy" split introduced:** partition the test set by whether the hypothesis-only model is correct. Models that look strong overall do much worse on the *hard* subset, quantifying how much of headline accuracy rides on artifacts.
- **Inflated capability claims:** the paper argues prior SNLI/MultiNLI accuracy overstated genuine inference ability; the task is "less solved" than leaderboards suggested.
- **Introduced reusable evaluation primitives:** the hypothesis-only probe and the artifact-stratified hard set became templates copied across NLI and many other crowdsourced tasks.
- **Cause is the protocol, not the workers:** elicitation by asking humans to *write* entailments/contradictions/neutrals systematically imprints style, so the fix has to be at dataset-design time.

## Verified quotes
- "We show that, in a significant portion of such data, this protocol leaves clues that make it possible to identify the label by looking only at the hypothesis, without observing the premise." — https://arxiv.org/abs/1803.02324
- "Specifically, we show that a simple text categorization model can correctly classify the hypothesis alone in about 67% of SNLI (Bowman et. al, 2015) and 53% of MultiNLI (Williams et. al, 2017)." — https://arxiv.org/abs/1803.02324
- "Our analysis reveals that specific linguistic phenomena such as negation and vagueness are highly correlated with certain inference classes." — https://arxiv.org/abs/1803.02324

## Why it matters for agent evals
This is a cornerstone "benchmark-integrity" result: it operationalizes the idea that a benchmark can be *passable without the intended capability*, and gives a concrete, cheap detector (the partial-input / hypothesis-only baseline) plus a remediation pattern (artifact-stratified hard splits). For agent and judge/verifier work the lessons transfer directly: (1) any eval built by human elicitation can encode the elicitation process's tells, so always run a degenerate-input baseline (e.g., answer the task with the question/tool-call/transcript partially hidden) before trusting a score; (2) model/agent rankings should be checked on hard, artifact-controlled subsets, not just aggregate accuracy, to avoid rewarding shortcut exploitation; (3) it foreshadows reward-hacking and spurious-correlation concerns in RL environments, where an agent will happily exploit a leaked label or environment artifact instead of solving the task. It is upstream of contrast sets, counterfactually-augmented data, and "dataset cartography"/data-difficulty methods that the eval-integrity community now relies on.

## Themes
6 benchmark-vs-eval/integrity · 1 why-evals · 8 judge/verifiers · 2 eval⇄capability⇄RL-env
