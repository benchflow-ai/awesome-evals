# Notes — "Introducing Scorers in Mastra"

**Author:** Yujohn Nattrass (Software Engineer, Mastra) · **URL:** https://mastra.ai/blog/mastra-scorers · **Type:** eng-blog · **Found:** true

## Summary (3-6 sentences)
Mastra (a TypeScript agent framework) replaces its older `evals` API with a new primitive called **Scorers**: composable functions that run asynchronously after an agent or workflow step responds and emit a normalized **0–1 quality signal plus a reason string**. The post's central engineering insight is that LLMs are unreliable at directly emitting numeric scores, so Mastra splits scoring into a structured-extraction phase (LLM outputs structured data) and a **deterministic `generateScore` function** that converts that structure into the number. Scorers are built on a four-step pipeline — `preprocess` → `analyze` → `generateScore` → `generateReason` — where only `generateScore` is required, and the whole pipeline runs on Mastra's own workflow engine to get async execution, error handling, and retries "for free." Scorers attach directly to agents with a `sampling.rate` knob (score 100%, 50%, etc. of live traffic), results land in a `mastra_scorers` DB table and a Playground "Scorers" tab, making this an online/live-eval story as much as an offline one. This is a useful TypeScript-ecosystem counterpoint to the Python-heavy corpus (DeepEval/Ragas/Braintrust): same model-graded-vs-deterministic tension, different framing and naming.

## Key points (5-12 substantive bullets)
- **Naming as a design statement.** Mastra deliberately rejected "evaluator" as "overly academic" and chose "scorers" because "that's what they do—they score things." Signals a practitioner-first, anti-jargon stance.
- **The core trick: don't let the LLM produce the number.** "LLMs are terrible at producing consistent numerical scores—ask the same model to rate something from 0-1 five times and you'll get five different numbers." Fix: LLM emits *structured data*, then a deterministic `generateScore` function maps structure → 0–1. This is the headline reusable lesson.
- **Four-step pipeline:** `preprocess` (data prep/extraction) → `analyze` (core eval logic) → `generateScore` (deterministic number) → `generateReason` (human-readable explanation). **Only `generateScore` is required**; the others are optional, so you can scale from a one-liner rule-based scorer up to a full LLM-judge pipeline.
- **Three scorer families** in the framing: model-graded (LLM-judge), rule-based/deterministic, and statistical — all returning the same 0–1 contract so they're interchangeable and comparable across agents/steps.
- **Async, non-blocking by design:** "Each scorer runs asynchronously after your agent responds, evaluating the output without blocking the response." Scoring is observability on the side, not in the request critical path.
- **Sampling for live traffic:** scorers attach to agents via config with `sampling: { type: "ratio", rate: 0.5 }` — "Set it to 1 to score everything, 0.5 for half, etc." This is an online-eval cost/coverage dial, important because LLM-judge scoring on 100% of prod traffic is expensive.
- **Built-in scorers shipped:** a **Bias scorer** (detects discriminatory language) and an **Answer Relevancy scorer** (does the response actually address the query), each parameterized with a judge model, e.g. `createAnswerRelevancyScorer({ model: openai("gpt-4o") })`.
- **Implementation eats its own dogfood:** "we use Mastra workflows to run the scoring pipeline. Each step…is a workflow step. This gives us async execution, error handling, and all the other workflow benefits for free." Each pipeline step is literally a workflow step.
- **Persistence + UI:** results auto-persist to a `mastra_scorers` table when storage is configured, and surface in a new Playground "Scorers" tab that auto-populates when you run scored agents/workflows in `mastra dev`.
- **Migration path:** old `evals` API → `createScorer`; "The core evaluation logic stays the same, you're just wrapping it differently." Install via `pnpm add @mastra/core@latest @mastra/evals@latest`.
- **Roadmap:** "Golden answers soon" — reference outputs that scorers compare against (i.e. ground-truth/reference-based scoring is not yet in this release).

## Verified quotes (VERBATIM, from https://mastra.ai/blog/mastra-scorers)
1. "LLMs are terrible at producing consistent numerical scores—ask the same model to rate something from 0-1 five times and you'll get five different numbers. So we have LLMs output structured data instead, then use a deterministic `generateScore` function to convert that into a number."
2. "Each scorer runs asynchronously after your agent responds, evaluating the output without blocking the response"
3. "So we went with 'scorers' because that's what they do—they score things." (the post frames "evaluator" as overly academic)
4. "we use Mastra workflows to run the scoring pipeline. Each step…is a workflow step. This gives us async execution, error handling, and all the other workflow benefits for free."

## What it adds / why it's good (non-BS practitioner value)
- **The structured-extraction-then-deterministic-score pattern is the real takeaway** and is provider/language-agnostic. Most LLM-judge advice tells you to ask the model for a score; Mastra explicitly argues against that and splits the judgment (LLM, fuzzy) from the scoring (code, deterministic and reproducible). That directly attacks the non-determinism/variance problem that plagues judge-based evals.
- **Strong TypeScript-ecosystem data point.** The Python corpus (DeepEval, Ragas, Braintrust, OpenAI Evals) dominates eval discourse; this shows the same model-graded/rule-based/statistical taxonomy converging independently in the TS/Node agent world, with the unified 0–1 contract as the interop layer.
- **Online > offline framing.** The `sampling.rate` knob and the async-after-response design make this an in-production live-eval/observability tool, not just a CI harness — and the explicit cost dial is the kind of detail benchmark-style posts omit.
- **Honest about what's missing:** no golden/reference answers yet ("soon"), so today it's mostly reference-free scoring (relevancy, bias) — useful to know before adopting.
- **Reusable-by-design:** "only `generateScore` required" is a clean minimal-contract API that lets a trivial regex rule and a multi-step LLM judge live under the same interface.

## Themes
1 why-evals · 3 model/harness/skill · 4 observability · 5 eval infra · 8 judge/verifiers · 9 agent-specific
