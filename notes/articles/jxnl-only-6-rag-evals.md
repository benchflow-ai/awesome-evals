# Notes — "There Are Only 6 RAG Evals"

**Author:** Jason Liu (jxnl) · **URL:** https://jxnl.co/writing/2025/05/19/there-are-only-6-rag-evals/ · **Type:** blog · **Found:** true

## Summary
Jason Liu argues that the entire RAG-eval landscape — the sprawling zoo of frameworks, metrics, and dashboards — collapses into exactly six fundamental evaluations, derived from first principles. A RAG system has only three variables: the Question (Q), the retrieved Context (C), and the Answer (A). Every possible RAG failure is one *conditional relationship* between two of these three components, and since there are exactly six ordered pairs (C|Q, A|C, A|Q, C|A, Q|C, Q|A), there are exactly six evals. The piece is a closure argument: the framework is *complete* because there are no other relationships between Q, C, and A to measure. He stratifies the six into tiers (with cheap non-LLM retrieval precision/recall as a "Tier 1" foundation underneath) and prescribes a debugging workflow that maps each observed failure to the specific conditional that broke.

## Key points
- **Three variables, full stop.** "RAG systems have three core components: A question (Q), Retrieved context (C), An answer (A). That's it. Three variables." Every eval is a relationship among them.
- **The closure claim is the whole point.** Exhaustively enumerating the conditional relationships between three components yields exactly six ordered pairs — and that set is exhaustive. "There are no other relationships between Q, C, and A." This is what justifies "only 6."
- **The six evals (as conditional probabilities P(X|Y) — "quality of X given Y"):**
  - **C|Q — Context Relevance:** do retrieved chunks address the question's information need? (retrieval quality)
  - **A|C — Faithfulness / Groundedness:** is the answer restricted to verifiable claims from the context? (no hallucination)
  - **A|Q — Answer Relevance:** does the answer directly address the specific question asked?
  - **C|A — Context Support Coverage:** does the context actually contain everything needed to support the answer's claims?
  - **Q|C — Question Answerability:** can the question even be answered given the retrieved context?
  - **Q|A — Self-Containment:** can the original question be inferred from the answer alone?
- **Directionality matters — the conditionals are asymmetric.** C|Q (is the context relevant to the question) is a different eval from Q|C (is the question answerable from the context). Treating P(X|Y) ≠ P(Y|X) is what generates six evals instead of three pairs.
- **Tiered prioritization, not equal weight:**
  - *Tier 1 (foundation, pre-RAG):* retrieval precision & recall — classic IR metrics, fast, no LLM required, used for retriever tuning.
  - *Tier 2 (primary):* C|Q, A|C, A|Q — the three you almost always need.
  - *Tier 3 (advanced):* C|A, Q|C, Q|A — deeper diagnostics when the primaries aren't enough.
- **Prescriptive workflow:** "Start with Tier 1... Focus on Tier 2... Extend to Tier 3 when you need deeper insights." Add cost/complexity only when the cheaper layer can't explain the failure.
- **Failure localization is the payoff.** When a RAG system breaks, it breaks along exactly one of these six dimensions — so debugging becomes "which conditional failed?" rather than open-ended flailing. Bad retrieval is C|Q; hallucination is A|C; off-topic-but-grounded answers are A|Q; etc.
- **Anti-complexity stance.** The framing is explicitly a rebuke of "complexity theater" — the implication that you need a PhD's worth of metrics and dashboards to evaluate RAG. Six relationships cover it.
- **Traditional metrics (BLEU/ROUGE/BERTScore) get a limited role**; nuanced relationship judgments lean on LLM-based evaluation.

## Verified quotes
- "RAG systems have three core components: A question (Q), Retrieved context (C), An answer (A). That's it. Three variables." — https://jxnl.co/writing/2025/05/19/there-are-only-6-rag-evals/
- "if we look at this through the lens of conditional relationships — the quality of one component given another — we get exactly six possible relationships" — https://jxnl.co/writing/2025/05/19/there-are-only-6-rag-evals/
- "The beauty of this framework is that it's complete. There are no other relationships between Q, C, and A." — https://jxnl.co/writing/2025/05/19/there-are-only-6-rag-evals/
- "When your RAG system fails, it fails along one of these dimensions. Every time." — https://jxnl.co/writing/2025/05/19/there-are-only-6-rag-evals/
- "Every time you're debugging a RAG system, don't waste time on complexity theater. Focus on these six relationships" — https://jxnl.co/writing/2025/05/19/there-are-only-6-rag-evals/

## What it adds / why it's good
The non-BS value is the **closure argument**: instead of yet another laundry list of tools (RAGAS, TruLens, ARES, etc.), Liu gives a *generative* taxonomy that proves it's exhaustive. If you accept that RAG = (Q, C, A), then the six conditionals are forced — you can derive the eval set rather than memorize a vendor's menu. That's a genuinely different epistemic move from "here are 14 metrics." Two practical edges fall out of it: (1) **failure localization** — a single observed bug maps to exactly one conditional, turning eval into a decision tree; and (2) **anti-overbuild discipline** — the tiering tells you most teams only need three LLM-judged evals on top of cheap precision/recall, so the dashboards-and-frameworks sprawl is mostly noise. The asymmetry insight (C|Q ≠ Q|C; A|C ≠ C|A) is also subtler than the usual relevance/faithfulness/answer-relevance triad and explains *why* you sometimes need the "reverse" evals (e.g., Q|A self-containment to detect answers that smuggle in assumptions). The framing is the contribution; the actual scoring is left to LLM judges.

## Themes
- **1 why-evals** — argues for a principled, minimal eval set over tool sprawl ("complexity theater").
- **8 judge/verifiers** — the six relationships are operationalized primarily as LLM-judge evaluations.
- **9 agent-specific** — RAG-specific, but the Q/C/A conditional-decomposition pattern generalizes as a way to derive evals for any structured pipeline.
- **6 benchmark-vs-eval/integrity** (secondary) — pushes "eval as targeted unit test of a specific relationship" over aggregate leaderboard-style scoring.
