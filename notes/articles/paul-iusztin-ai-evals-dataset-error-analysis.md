# Notes — "No Evals Dataset? Here's How to Build One from Scratch"

**Author:** Paul Iusztin (Decoding ML / Decoding AI Magazine) · **URL:** https://www.decodingai.com/p/build-an-ai-evals-dataset-with-error-analysis · **Type:** newsletter (part of the multi-part "AI Evals & Observability" series) · **Found:** true

## Summary (3-6 sentences)
This is the hands-on, code-forward entry in Iusztin's "AI Evals & Observability" series where he walks the full flywheel from production traces to a working evals dataset and specialized evaluators. The core thesis (lifted directly from Hamel Husain / Shreya Shankar's error-analysis school) is data-first: start with 20–50 real production traces, have a single domain expert binary-label them Pass/Fail with written critiques, fix the obvious bugs, then bootstrap LLM judges whose real signal comes from few-shot examples (the expert critiques) rather than the system prompt. He then runs error analysis as a coding exercise — open codes → axial codes (clustered with LLM help) → a Frequency × Severity × Business-Value prioritization — and only builds 4–7 specialized single-failure-mode evaluators for the persistent high-impact clusters. The running example is "Brown," his writer agent from the Agentic AI Engineer course capstone (the broader course/series also features "Nova," a deep-research agent). Tooling is concrete: Opik for observability/tracing, Eugene Yan's AlignEval for the labeling loop, and an MCP server over the Opik API to pull traces.

## Key points (5-12 substantive bullets)
- **6-step flywheel**: (1) build dataset from 20–50 real traces, (2) manual binary labeling + critiques, (3) manually fix obvious errors and convert fixes into regression tests, (4) build evaluators iteratively, (5) error analysis, (6) build specialized evaluators. The cycle is explicitly continuous, not one-shot.
- **Data-first, not criteria-first**: the entire piece is organized against the failure mode of "crafting elaborate eval criteria without first looking at the data" (quoting Hamel Husain). Look at traces before writing any judge.
- **Binary Pass/Fail only** — no Likert/5-star scoring. A "3.2 out of 5" is uninterpretable and unactionable; binary forces you to articulate what "good enough" actually means. (Echoes his separate "The 5-Star Lie" piece.)
- **One domain expert labels, focusing on the first/most-upstream error** rather than exhaustively cataloguing every problem in a trace — keeps labeling tractable and causally meaningful.
- **The judge's signal lives in few-shot examples, not the prompt**: the expert critiques written during labeling become the few-shot examples; the LLM-judge system prompt "can be almost neutral." This is the load-bearing practitioner insight.
- **Open codes → axial codes → prioritization matrix**: informal per-failure notes (open codes) are clustered into higher-level categories (axial codes) with LLM assistance, then ranked by a 2×2 Frequency × Severity matrix, with Priority = Frequency × Severity × Business Value.
- **Concrete numbers**: 20–50 traces minimum (grow to 50–100 early); first error-analysis round is a ~3–4 day one-time investment, then ~30 min/week maintenance; target 4–7 specialized evaluators initially, adding more only when error analysis demands it.
- **War-story metric**: a first error-analysis pass over 200 new traces surfaced 60 failures (~30% failure rate), used to illustrate the clustering/prioritization step.
- **Code vs LLM split**: objective/deterministic criteria get code-based checks; reserve LLM judges for genuinely subjective judgments — avoids paying LLM cost/variance where an assertion suffices.
- **Train/Dev/Test discipline on the labeled set**: build/tune on train, iterate on dev, validate judge↔human agreement before trusting it; final check on a held-out test split — applying ML hygiene to eval development.
- **Tooling**: Opik (LLMOps observability, 25K spans/month free tier, multimodal trace rendering) + Eugene Yan's open-source AlignEval for labeling/optimizing + an MCP server wired to the Opik API to extract traces programmatically.
- **Running example is a real shipped agent** ("Brown," the writer agent capstone), not a toy — the series' deep-research agent is "Nova."

## Verified quotes (verbatim, from the article URL)
1. "Many teams make the mistake of crafting elaborate eval criteria without first looking at the data" (attributed in-article to Hamel Husain). — https://www.decodingai.com/p/build-an-ai-evals-dataset-with-error-analysis
2. "The real power lies in your few-shot examples and dataset, not your prompt... the system prompt for your LLM judge can be almost neutral... The real guidance comes from the few-shot examples you include in the prompt." — same URL
3. "The first round of error analysis is a one-time investment of about 3–4 days. After the initial setup, 30 minutes per week is enough to review the latest failures." — same URL
4. "Binary decisions force clarity. A score of '3.2 out of 5' is hard to interpret and even harder to act on... Pass/fail forces you to articulate exactly what 'good enough' means." — same URL

## What it adds / why it's good (non-BS practitioner value)
Most "evals" content stays abstract; this is an end-to-end, reproducible recipe on a real shipped agent with real tooling (Opik, AlignEval, MCP) and hard numbers (20–50 traces, 3–4 days, 4–7 evaluators, 200 traces → 60 fails). It faithfully operationalizes the Husain/Shankar error-analysis methodology but adds the engineer's plumbing the canonical sources gloss over: how to pull traces via an MCP server over an observability API, where the train/dev/test split goes, and the code-check-vs-LLM-judge decision boundary. The standout, non-obvious takeaway is the insistence that an LLM judge's quality is dominated by curated few-shot critiques rather than prompt wording — a concrete, testable claim a practitioner can act on immediately. It's a good complement to Eugene Yan and Hamel Husain (it cites both) by being the "here's the actual pipeline and the buttons to click" version rather than the conceptual framing.

## Themes
- **1 why-evals** — frames evals against the cost of un-actionable metrics and unmeasured failure modes.
- **4 observability** — production traces via Opik are the raw material; tracing is step zero.
- **5 eval infra** — datasets, train/dev/test splits, MCP-to-Opik trace extraction, AlignEval labeling loop.
- **8 judge/verifiers** — binary LLM judges, few-shot-driven critiques, code-checks vs LLM-judges, specialized single-failure-mode evaluators.
- **9 agent-specific** — built on a real shipped agent (Brown/Nova), evaluating multi-step agent traces (tool calls, retrieved docs, spans).
