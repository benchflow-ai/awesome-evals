# Notes — "Pressure Testing GPT-4 / Claude 2.1 — Needle In A Haystack"
**Author:** Greg Kamradt · **URL:** https://github.com/gkamradt/LLMTest_NeedleInAHaystack · **Type:** repo · **Found:** true

## Summary
This is the original "needle in a haystack" (NIAH) long-context eval: the practitioner project, run with early model access in November 2023, that everyone else cites. The method is brutally simple — hide one out-of-place fact (the "needle") at a controlled depth inside a large body of filler text (the "haystack," built from Paul Graham essays), then ask the model to retrieve it, sweeping across two axes: **context length** (1K tokens up to each model's limit) and **needle depth** (0% = top to 100% = bottom). Each cell is scored and the grid is rendered as a depth × context-length **heatmap** of retrieval accuracy, which became the canonical visual for long-context recall. The headline finding: at the largest context lengths neither GPT-4 (128K) nor Claude 2.1 (200K) reliably retrieves a placed fact, and recall degrades non-uniformly — facts near the top of long documents are recalled worse than facts at the very top/bottom. The repo has since been rewritten into a "v2" CLI (`niah`) that generalizes the idea into pluggable tasks (single, multi, uuid, uuid_chain) with reproducible YAML run configs.

## Key points
- **The needle (original):** an out-of-place sentence — "The best thing to do in San Francisco is eat a sandwich and sit in Dolores Park on a sunny day." — inserted into Paul Graham essay text; the model is then asked what the best thing to do in San Francisco is, using only the provided context.
- **Two-axis sweep → heatmap.** The core artifact is a grid of (context length × document depth) cells, each scored for retrieval, visualized as a heatmap. This depth × length heatmap is the format the entire field copied.
- **Depth matters, and not symmetrically.** Facts at the very top and very bottom were recalled with near-100% accuracy; facts placed near the *top* of long documents were recalled worse than those near the bottom — a "lost in the middle"-style effect, observed on both models.
- **Length matters.** GPT-4 (GPT-4-128K, run 11/8/2023) recall started degrading well below the limit; Claude 2.1 (200K, run 11/21/2023) held near-perfect to ~90K tokens, after which bottom-of-document recall got increasingly worse. Practitioner-reported, not formal: ~65K (GPT-4 Turbo) vs ~90K (Claude 2.1) as rough onset points.
- **Scale of the runs.** GPT-4 was a ~15×15 grid (~225 cells, hundreds of API calls, ~$215); Claude 2.1 was scaled up to a ~35×35 grid (~1,225 calls), with Anthropic providing credits but not influencing results.
- **Evaluation = LLM-as-judge.** The original harness used LangChain evals with GPT-4 grading whether the model's answer contained the needle — an early, influential instance of LLM-judged retrieval scoring rather than exact string match.
- **Practitioner provenance.** Built with pre-release access from OpenAI/Anthropic and published as code + heatmaps on Twitter and a blog; this is the primary source, not a paper, which is why it spread so fast and is reproducible.
- **v2 generalization.** The current repo is a CLI (`niah run/validate/reconstruct/demo`) driven by YAML, with sweep controls (`context_lengths`, `depth_percents`, scales, seeds, concurrency, retries, resume) and JSONL output (token usage + cost per cell).
- **Pluggable tasks in v2:** `single` (one fact, exact-match), `multi` (N facts, fractional score), `uuid` (repeat a fresh UUID), and `uuid_chain` (A→B→C hops the model must discover unaided) — pushing past pure retrieval toward multi-hop reasoning. Providers: OpenAI, Anthropic, Cohere.
- **The actionable conclusion** for builders: placed facts are not guaranteed to be retrieved, so don't assume retrieval in your apps; RAG remains important; and reducing context tends to increase recall accuracy.

## Verified quotes
- "Pressure-test LLM long-context retrieval. Now in v2." — https://github.com/gkamradt/LLMTest_NeedleInAHaystack
- "Chain of A → B → C → … links spread through the context. The question asks 'what is the value associated with A?' without revealing the chain structure — the model has to discover the hops on its own." — https://github.com/gkamradt/LLMTest_NeedleInAHaystack
- "Supported providers out of the box: OpenAI, Anthropic, Cohere." — https://github.com/gkamradt/LLMTest_NeedleInAHaystack
- "At the largest token lengths, neither GPT-4 or Claude 2.1 can reliably retrieve placed facts" — https://mail.gregkamradt.com/posts/pressure-testing-gpt-4-claude-2-1-long-context
- "Your facts are not guaranteed to be retrieved." — https://mail.gregkamradt.com/posts/pressure-testing-gpt-4-claude-2-1-long-context
- "They didn't bias the results at all, just gave credits" — https://mail.gregkamradt.com/posts/pressure-testing-gpt-4-claude-2-1-long-context

## What it adds / why it's good
This is the **primary source** for an eval pattern that became a de-facto industry standard, so it's worth citing directly rather than through the dozens of secondary writeups (Arize, TDS, vendor blogs) that paraphrase it. Its non-BS value is threefold: (1) it shows how a single sharp, cheap, reproducible probe — one inserted sentence + a two-axis sweep — can surface a real, previously-underappreciated capability gap (position- and length-dependent recall failure) that vendor context-window numbers hide; (2) it's an early, concrete template for **LLM-as-judge scoring of retrieval** wired into a real harness (LangChain evals, GPT-4 grader); and (3) the v2 rewrite is a clean, honest evolution of an eval that got saturated — adding multi-needle and `uuid_chain` multi-hop tasks precisely because plain single-needle retrieval became too easy for frontier models. It's also a candid case study in benchmark integrity: the author flags the Anthropic credits and that they didn't bias results, and the heatmap-everyone-copies later drew scrutiny (prompt-sensitivity, the needle being too salient/contrived), which is itself a useful lesson about how popular evals get gamed or misread.

## Themes
- **1 why-evals** — canonical demonstration that a simple, targeted eval reveals capability gaps that spec-sheet numbers (context window size) obscure.
- **3 model/harness/skill** — a concrete harness with pluggable tasks, sweep configs, scoring, and reproducible runs.
- **5 eval infra** — YAML-driven CLI, JSONL outputs, cost/token tracking, seeds, resume/concurrency.
- **6 benchmark-vs-eval/integrity** — saturation of the original test (driving v2's harder tasks), prompt-sensitivity caveats, and disclosed vendor credits.
- **8 judge/verifiers** — LLM-as-judge (GPT-4 + LangChain evals) grading retrieval, alongside exact-match and fractional scorers in v2.
- **9 agent-specific** — `uuid_chain` pushes from retrieval toward multi-hop reasoning the model must discover unaided.
