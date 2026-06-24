# Notes — "Dense Passage Retrieval for Open-Domain Question Answering"
**Authors:** Vladimir Karpukhin, Barlas Oğuz, Sewon Min, Patrick Lewis, Ledell Wu, Sergey Edunov, Danqi Chen, Wen-tau Yih · **Venue/Year:** EMNLP 2020 · **URL:** https://arxiv.org/abs/2004.04906 · **Type:** paper · **Found:** true

## Summary
DPR shows that open-domain QA passage retrieval — long dominated by sparse lexical methods like TF-IDF and BM25 — can be done better with purely *dense* learned embeddings, trained with a simple dual-encoder over a relatively small number of question–passage pairs. Two independent BERT encoders map questions and passages into a shared space; retrieval is a maximum inner-product search executed efficiently over millions of passages with FAISS. Trained with in-batch negatives plus BM25-mined hard negatives, the dense retriever beats a strong Lucene-BM25 baseline by 9–19 absolute points in top-20 retrieval accuracy, and the better retrieval propagates into new state-of-the-art end-to-end QA. It became foundational because it demonstrated that learned dense retrieval is practical and superior at scale without expensive pretraining, seeding the modern retriever stack behind RAG, dense-retrieval benchmarks (BEIR), and retrieval-augmented LLMs. It is one of the most-cited works underpinning the "retriever + reader" and retrieval-augmented generation paradigms.

## Key points
- **Dual-encoder architecture:** separate BERT encoders for questions and passages produce dense vectors; relevance = dot-product / inner product of the two embeddings, so retrieval reduces to maximum inner-product search.
- **Training objective:** contrastive loss using in-batch negatives (each batch's other passages serve as negatives, giving many negatives cheaply) plus **BM25 hard negatives** (lexically-similar-but-wrong passages), which materially improves accuracy.
- **Data efficiency:** competitive embeddings learned from a relatively small number of labeled question–passage pairs — no additional retrieval-specific pretraining required to beat BM25.
- **Indexing/serving:** passage embeddings are precomputed offline and indexed with **FAISS** for fast approximate nearest-neighbor search over millions of passages, making dense retrieval practical at scale.
- **Eval insight:** retrieval quality is measured by top-k retrieval accuracy (fraction of questions whose top-k passages contain the answer), decoupling retriever evaluation from the downstream reader.
- **Retrieval results:** outperforms Lucene-BM25 by ~9%–19% absolute in top-20 passage retrieval accuracy across datasets (e.g., Natural Questions top-20 ~79.0% vs ~59.1% for BM25).
- **End-to-end QA:** the better retriever drives a "retriever + reader" pipeline to new state-of-the-art exact-match on multiple open-domain QA benchmarks.
- **Benchmark suite:** evaluated across Natural Questions, TriviaQA, WebQuestions, CuratedTREC, and SQuAD — a broad open-domain QA testbed.
- **Conceptual contribution:** reframed first-stage retrieval as a learnable, supervised dense-embedding problem rather than a fixed lexical heuristic.

## Verified quotes
- "In this work, we show that retrieval can be practically implemented using dense representations alone, where embeddings are learned from a small number of questions and passages by a simple dual-encoder framework." — https://arxiv.org/abs/2004.04906
- "our dense retriever outperforms a strong Lucene-BM25 system largely by 9%-19% absolute in terms of top-20 passage retrieval accuracy, and helps our end-to-end QA system establish new state-of-the-art on multiple open-domain QA benchmarks." — https://arxiv.org/abs/2004.04906
- "traditional sparse vector space models, such as TF-IDF or BM25, are the de facto method." — https://arxiv.org/abs/2004.04906

(Quotes verified verbatim from the arXiv abstract page. Body-text quotes could not be reliably decoded from the PDF and were not used.)

## Why it matters for agent evals
DPR is the canonical "learned retriever" that the modern RAG/tool-augmented-agent stack rests on: when an agent retrieves documents to ground its answers, the retriever is usually a DPR-style dense dual-encoder (or its descendants). For evals this matters in three ways. (1) It cleanly separates *retriever* evaluation (top-k retrieval accuracy: did the gold evidence make it into the context?) from *reader/generator* evaluation (did the model use it correctly?) — a decomposition that agent harnesses reuse to localize whether failures are retrieval or reasoning. (2) Its top-k accuracy metric is the ancestor of the recall/grounding metrics used to score RAG verifiers and faithfulness judges, and of retrieval benchmarks like BEIR that became standard eval infrastructure. (3) For RL-environment and agent design, DPR establishes retrieval as a learnable, swappable component whose quality directly bounds downstream task success, so eval suites for retrieval-augmented agents must measure retrieval coverage and hard-negative robustness, not just final-answer correctness. It also models a clean, reproducible benchmark setup (fixed corpora, multiple QA datasets, an answer-recall proxy) that informs how grounded-QA agent benchmarks are constructed.

## Themes
2 eval⇄capability⇄RL-env · 6 benchmark-vs-eval/integrity · 8 judge/verifiers · 9 agent-specific
