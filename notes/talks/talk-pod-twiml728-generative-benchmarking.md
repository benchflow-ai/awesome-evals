# Notes — "#728 Generative Benchmarking"
**Speaker/Guest:** Kelly Hong (TWIML) · **Venue:** TWIML AI · **Type:** podcast · **URL:** https://www.youtube.com/watch?v=3kbiGPn0cOo

## Summary (3-6 sentences — what it argues, why it matters for agent evals)
Kelly Hong (researcher at Chroma) argues that public retrieval benchmarks like MTEB are a poor basis for picking embedding models because they are generic, use clean/polished data, and are likely contaminated by memorization — so their scores don't transfer to your domain-specific production use case. Her "generative benchmarking" project instead builds a custom retrieval eval set from your *own* documents in two steps: (1) LLM-judge document/chunk filtering, and (2) context-and-example-steered query generation, validated against real logged production queries from Weights & Biases. The headline empirical result: rankings flip vs. public benchmarks — Jina AI's model beat OpenAI text-embedding-large on MTEB but lost on real W&B data, and Voyage-3-large won. A central methodological point is that an LLM judge must be *aligned* to human labels (via the EvalGen framework) before you trust it: their naive judge scored only ~46% alignment, lifted to >70% by iterating on criteria. The talk repeatedly stresses this is human-in-the-loop, not a hands-off "auto-eval" button.

## Key points (6-14 substantive bullets)
- **The transfer-failure war story:** On real W&B production data, Jina AI's embedding model performed *worse* than OpenAI text-embedding-large, the opposite of their published MTEB rankings; Voyage-3-large performed best. Public-benchmark scores "don't necessarily translate to your specific use case." [20:54–21:33]
- **Generative benchmarking = custom eval set from your own data:** user supplies documents + context describing the application; the system generates query→document pairs to test retrieval. Two steps: document/chunk filtering, then query generation. [09:28–09:55]
- **Filtering is a core differentiator, done at the chunk level:** filter out chunks users wouldn't realistically ask about (e.g., funding-news pages in a tech-support corpus, or a podcast's "goodbye, goodbye" outro chunk) so the benchmark reflects the true use case. [10:17–11:13, 13:52–14:45]
- **Query generation is steered, not naive:** feed the same context plus *example queries* to make generated queries match real production style — vague, statement-like, not well-formed questions with question marks. [14:55–15:31]
- **Naive query generation inflates scores deceptively:** feeding just a chunk and asking for a query yields queries *more* relevant than real production queries, boosting retrieval numbers that don't reflect production. "You don't just want to get high numbers — you want something that's more realistic." [42:40–43:26]
- **LLM-judge alignment via EvalGen:** write a small set of criteria (relevance, completeness, ~3 total), manually label 200 of ~13,000 chunks as good/bad, pass chunks + criteria to the LLM, apply a pass-threshold (e.g., 2 of 3 criteria), compare to ground truth to get an alignment score, then iterate criteria. Raised alignment from ~46% to the 70s. [24:11–27:42]
- **Judges are very sensitive to prompting:** small rewordings of the three criteria, or adding/removing one, swing alignment "quite a bit." [25:31–26:13]
- **Labeling cost is small:** ~200 manually labeled chunks out of ~13,000 (chunks ~400 tokens each); align the judge on those, then extend to the full corpus. [28:08–30:14]
- **Representativeness is *proven*, two ways:** (1) generated queries reproduce the *same embedding-model ranking* as ground-truth queries; (2) on contaminated public sets (Wikipedia), naive generation reproduces near-identical / word-for-word ground-truth queries, evidence of data leakage/memorization (clearest cases are in the report appendix, not the obvious "Deliverance" example). [46:40–47:55, 43:46–45:46]
- **Metric choice: recall@K, not NDCG.** Ranking within retrieved context doesn't materially affect LLM output, so they only ask "was the relevant doc retrieved." Real data needed recall@10 where public benchmarks were readable at recall@1. [22:42–23:18, 41:04–41:35]
- **Domain specificity makes retrieval harder:** narrow internal corpora are hard to disambiguate between chunks (vs. broad Wikipedia), so retrieval performance drops a lot — an open area to improve. [35:39–36:42]
- **Distractors degrade generation:** too many retrieved chunks (e.g., create/query/filter-a-collection all retrieved when you asked only "create") distract the LLM; pick K empirically, "as few distractors as possible," no universal number. [39:20–41:01]
- **Debug components, not just I/O:** people over-focus on the LLM output and tweak prompts when the real problem is retrieval — garbage in, garbage out; inspect what documents are actually retrieved. [37:58–39:06]
- **Not auto-eval:** human-in-the-loop enters via user-provided context/example queries and via judge alignment; "it's not 100% autogenerated." Future work: iterating the eval set from logged queries (query alignment, surfacing document-corpus gaps), and a multi-party alignment open question (aligning to both the query-issuing user and the system creator). Next project at Chroma: agent memory. [48:00–53:01]

## Verified quotes (verbatim, with timestamps)
- "So in spite of performing better on the public benchmarks, it performed worse on real world data." [21:10]
- "I think a mistake that a lot of people make is they just blindly use an LLM judge without any alignment just assuming that it is aligned." [24:43]
- "It only got around like 46% alignment, which is pretty bad. So, we basically use this framework ... to like iterate on our LLM criteria and get it up to like over 70%." [24:36] *(ASR: "or like eval" lightly corrected to "EvalGen," the framework named elsewhere in the talk)*
- "If you're just looking at the numbers it looks good but it's not really reflective of what you'll actually see in production." [43:02]
- "You don't just want to get like high numbers like you want something that's more realistic." [43:23]
- "We do need some like human in the loop to actually make this process more reliable ... So it's not 100% autogenerated." [49:21] *(lightly de-duplicated ASR filler; wording faithful)*

## What it adds (non-obvious, talk-specific value vs. canonical written sources)
- A concrete, reproducible **transfer-failure data point** (Jina vs. OpenAI rank flip; Voyage-3-large winning) that operationalizes the abstract "benchmarks don't generalize" warning into a specific embedding-model decision.
- A **validation methodology for synthetic evals** that most "generate-a-test-set" tools skip: prove representativeness by checking that generated queries reproduce the same *model ranking* as real logged queries — the thing a developer actually cares about.
- Hard numbers on **judge-alignment economics**: ~46%→70s alignment from iterating just three criteria, achieved by labeling only 200/13,000 chunks — a cheap, concrete recipe vs. the usual hand-wavy "align your judge" advice.
- A sharp distinction between **naive vs. steered generation**, including the counterintuitive finding that naive generation makes scores look *better* while being less faithful — a trap for anyone bootstrapping evals.
- The **data-leakage detector**: using word-for-word query regeneration on public sets as evidence of memorization/contamination.
- Explicit framing that generative benchmarking positions evals as an *early, approachable first step* (for teams with no golden set / no logged queries), not an advanced stage — plus the open **multi-party alignment** framing (aligning a judge to both end-user and system-creator simultaneously).

## Themes
6 benchmark-vs-eval · 8 judge/verifiers · 1 why-evals · 4 observability · 9 agent-specific
