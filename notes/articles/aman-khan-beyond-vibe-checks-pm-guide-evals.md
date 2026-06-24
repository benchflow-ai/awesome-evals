# Notes — "Beyond vibe checks: A PM's complete guide to evals"

**Author:** Aman Khan (Director of Product, Arize AI) · **URL:** https://www.lennysnewsletter.com/p/beyond-vibe-checks-a-pms-complete · **Type:** newsletter · **Found:** true

## Summary (3-6 sentences)
A high-reach, PM-facing guide (co-written with Lenny Rachitsky) that argues "vibe checks" — eyeballing a few outputs to decide if an AI feature is good — don't scale, and that writing evals is the defining skill for AI PMs going forward. Khan frames evals as the AI equivalent of regression tests/benchmarks: they define what "good" looks like beyond latency or pass/fail. He lays out three eval approaches (human, code-based, LLM-as-judge) with their tradeoffs, then gives a concrete four-part formula for constructing an LLM-as-judge prompt (role → context → goal → terminology/label). Examples are grounded in an agentic trip-planning assistant, including a real failure mode (booking San Diego instead of San Francisco), making it accessible to non-engineers. The piece is explicitly a 0→1 starter for PMs shipping AI products, not an academic treatment.

## Key points (5-12 substantive bullets)
- **Core thesis / why-evals:** evals are "how you measure the quality and effectiveness of your AI system. They act like regression tests or benchmarks," defining what "good" actually looks like "beyond the kind of simple latency or pass/fail checks you'd usually use for software." Vibe checks (manually spot-checking a handful of outputs) feel fine early but collapse as volume and surface area grow.
- **Three eval types and their tradeoffs:**
  - *Human evals* — thumbs-up/down user feedback loops or expert labelers. Pro: directly tied to real end-users. Cons: signal is sparse and labelers are costly/slow.
  - *Code-based evals* — deterministic checks (did the API call succeed? does generated code run? regex/format checks). Pro: cheap and fast to write. Con: weak for subjective qualities like tone or helpfulness.
  - *LLM-based evals (LLM-as-judge)* — an external "judge" LLM grades the system's output via a natural-language prompt, producing classification labels automatically. Pro: scalable and explainable, approximates human labeling without labeling everything. Con: needs upfront setup and enough volume to be reliable.
- **The four-part LLM-judge formula** (the load-bearing technique of the piece):
  1. *Set the role* — prime the judge-LLM with a defined role (e.g., "you are examining written text").
  2. *Provide the context* — the actual data you'll send to be graded (message chains, agent-generated outputs).
  3. *Provide the goal* — clearly articulate exactly what to measure; this is framed as the difference between mediocre and delightful AI.
  4. *Define terminology and label* — ground ambiguous terms (e.g., "toxicity" means different things in different contexts) and specify the output labels the judge should emit.
- **Concrete agent example (trip-planning):** user asks for "a relaxing weekend getaway near San Francisco for under $1,000"; the agent calls flight APIs, hotel databases, and mapping services. A real failure mode cited: the agent booked flights to **San Diego instead of San Francisco** — a vivid illustration of why correctness/grounding evals matter for multi-tool agents.
- **Common eval criteria to start from:** hallucination detection, toxicity/tone, overall correctness, code generation, summarization quality, and retrieval relevance — a menu PMs can map onto their own product surfaces.
- **Agent-specific angle:** evals aren't just for a single LLM call — they apply to agent trajectories that span tool calls (APIs, DBs, maps), where the failure surface is much larger than a chatbot reply.
- **Skill/career framing:** Khan positions eval-writing as "rapidly becoming the defining skill for AI PMs in 2025 and beyond," not an engineer-only concern; PMs own the definition of "good."
- **Author credibility:** Director of Product at Arize AI (an LLM observability/eval company), co-developed an evals course with Andrew Ng (DeepLearning.AI), prior roles at Spotify, Cruise, Zipline, and Apple — i.e., someone who ships evals as product, not theory.

## Verified quotes (verbatim, from the article URL)
- "Prompts may make headlines, but evals quietly decide whether your product thrives or dies." — https://www.lennysnewsletter.com/p/beyond-vibe-checks-a-pms-complete
- "Evals are how you measure the quality and effectiveness of your AI system. They act like regression tests or benchmarks, clearly defining what 'good' actually looks like for your AI product beyond the kind of simple latency or pass/fail checks you'd usually use for software." — https://www.lennysnewsletter.com/p/beyond-vibe-checks-a-pms-complete
- "the ability to write great evals isn't just important—it's rapidly becoming the defining skill for AI PMs in 2025 and beyond." — https://www.lennysnewsletter.com/p/beyond-vibe-checks-a-pms-complete
- On the four-part formula's third step: "Clearly articulating what you want your judge-LLM to measure isn't just a step in the process; it's the difference between a mediocre AI and one that consistently delights users." — https://www.lennysnewsletter.com/p/beyond-vibe-checks-a-pms-complete

*(Note: a later "workflow for writing effective evals" section sits behind Lenny's paywall; the four-part formula, definitions, and quotes above were verified from the publicly fetchable portion.)*

## What it adds / why it's good (practitioner value vs. obvious sources)
Most eval writing is either academic (benchmark papers) or engineer-facing (eval harness docs). This piece's value is translation: it gives a **non-technical PM a concrete, reusable prompt template** (role/context/goal/terminology-label) they can hand to an engineer or paste into a judge prompt today, plus a clean mental model for choosing among human/code/LLM evals based on cost vs. subjectivity. The trip-planning agent with the San Diego-vs-San Francisco failure is a memorable, transferable war story that makes the abstract "why evals" argument land for the people who actually decide what "good" means in a product. Its reach (Lenny's audience) and the author's dual standing — Arize PM + Andrew Ng course co-author — make it a canonical on-ramp document rather than a deep technical reference.

## Themes
1 why-evals · 8 judge/verifiers · 9 agent-specific · 4 observability (secondary, via Arize lineage)
