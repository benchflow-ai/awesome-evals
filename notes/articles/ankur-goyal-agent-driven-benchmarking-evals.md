# Notes — "How I AI: Ankur Goyal's Playbook for Agent-Driven Benchmarking and AI Evals"

**Author:** Claire Vo (host, ChatPRD) with guest Ankur Goyal (CEO/founder, Braintrust) · **URL:** https://www.chatprd.ai/how-i-ai/ankur-goyals-playbook-for-agent-driven-benchmarking-and-ai-evals · **Type:** blog (transcript/recap of a "How I AI" video episode) · **Found:** true

## Summary (3-6 sentences)
This is a hands-on episode of Claire Vo's "How I AI" series featuring Braintrust founder/CEO Ankur Goyal demonstrating two concrete agent workflows. The first is **agent-driven benchmarking**: pointing a coding agent (Codex-style, orchestrated via tmux on beefy remote EC2 boxes) at a hard infrastructure problem — e.g., "why is this query so slow?" — and letting it run exhaustive, multi-day experiments across a solution space no human would patiently explore. The second is **"evals as the new PRD"**: framing an eval as a product spec made of real test cases plus quantifiable success criteria, where you write a basic prompt, pick a model, and then ask an LLM to *generate the scoring function itself*. A recurring theme is that because models are now so good at writing code, the highest-leverage human move is authoring genuinely hard evals. Goyal also describes a "scale the expert" loop where quantitative evals carry a system to ~90% and a human's qualitative taste ("the tone is off here") gets converted into new eval criteria rather than replacing the human.

## Key points (5-12 substantive bullets)
- **Benchmarking is itself an agent task, not just "AI evals."** Goyal stresses the agent benchmarking he's excited about is for systems problems — "why is this query so slow?" — not only LLM-output scoring. The agent becomes a tireless infra-optimization engine.
- **War story — bloom filters via brute force.** A real problem: users searching billions of traces over a 90-day window were hitting slowness. The agent was set loose to test essentially *every* open-source column-store format and execution engine plus multiple index types, running continuously for about a week before landing on bloom filters as the optimal index. The point: a human engineer would have superficially tested two or three options; the agent exhausted the space.
- **Production-like environment is the unlock.** The setup gives the agent real/production-like data from object storage, plus tools — tmux for multi-session orchestration, remote high-powered EC2 instances for compute — so results are representative rather than toy benchmarks.
- **Evals = PRD reframe.** Claire's framing: "An eval is a PRD with quantifiable examples and success criteria." Goyal's version: evals "are just a way to define *what* you want, not *how* to get it." This reframes eval-writing as the modern product spec.
- **The replicable eval recipe.** (1) Build a dataset of real user questions/test cases; (2) write a basic prompt and pick a model; (3) have an LLM *auto-generate the scoring function*; (4) run across the whole dataset for aggregate performance.
- **AI-generated scoring functions.** Instead of hand-coding rubrics, you describe the qualities you want and let the model write the scorer — e.g., asking for concise code snippets in a single language and avoiding em-dashes. The judge/verifier itself is bootstrapped by an agent.
- **"Scale the expert," don't replace.** Quantitative evals push the system to ~90% quality; then a domain expert (referred to in the recap as "David") does a qualitative vibe check ("You think it's good, but it's not. The tone is off here"); that feedback becomes a *new eval criterion*. Net: the expert's taste is applied across a far larger product surface area.
- **Models as building material.** The thesis underneath both workflows: now that models reliably write code, the scarce/high-value human work shifts to (a) posing hard problems with clear success criteria and (b) authoring rigorous evals — the coding/benchmarking grunt work is delegated.
- **Concrete stack named:** Braintrust (eval platform), Codex (coding agent), tmux, AWS EC2, a RAG server over docs for the Q&A example; models include GPT-4.5-mini for initial prompts and Claude as the evaluator/scorer-generator.
- **Scale figures:** datasets of dozens-to-hundreds of test cases for aggregate eval analysis; the infra benchmark ran "for days"/about a week of continuous experimentation.

## Verified quotes (verbatim, from the URL above)
- Ankur Goyal: "Now that models are so good at actually writing code, one of the best things that we can do is create really hard evals."
- Ankur Goyal: "And I'm not talking about like AI evals. I mean things like why is this query so slow?"
- Claire Vo: "An eval is a PRD with quantifiable examples and success criteria."
- Ankur Goyal (on the expert's qualitative check): "You think it's good, but it's not. The tone is off here."
- Claire Vo (on scaling the expert): "It allows his high-quality taste to be applied across a much larger surface area of the product."

## What it adds / why it's good (non-BS practitioner value vs the obvious sources)
Most eval writing treats "evals as PRD" as a slogan; this episode actually shows the mechanics end-to-end and, crucially, two things the canonical sources (Yan, Hamel/Shankar) under-emphasize. First, **benchmarking-as-agent-task for infrastructure**, not just model output — letting an agent brute-force a real query-optimization problem over days is a genuinely different use of agents than the usual "LLM-as-judge" framing, and the bloom-filter war story makes the exhaustiveness argument concrete. Second, **bootstrapping the scorer with an LLM**: rather than hand-authoring rubrics, you describe desired qualities and let a model write the scoring function, lowering the activation energy of starting an eval suite. The "scale the expert" loop (90% quantitative + human taste re-encoded as new criteria) is a clean, repeatable answer to the "but evals can't capture taste" objection. It's a builder's transcript you can replicate the same afternoon, with a named stack.

## Themes
- **1 why-evals** — central: evals reframed as the PRD/spec that defines what you want.
- **6 benchmark-vs-eval** — explicitly distinguishes infra benchmarking from "AI evals."
- **2 eval⇄capability⇄RL-env** — hard evals as the high-leverage artifact now that models can code; exhaustive solution-space search.
- **8 judge/verifiers** — LLM-generated scoring functions; auto-bootstrapped scorers.
- **9 agent-specific** — coding agents orchestrated (tmux/EC2) for multi-day autonomous benchmarking.
- **5 eval infra** — Braintrust platform, datasets, aggregate scoring runs.
- (Lighter touch: 3 model/harness/skill — model selection GPT-4.5-mini vs Claude-as-judge.)
