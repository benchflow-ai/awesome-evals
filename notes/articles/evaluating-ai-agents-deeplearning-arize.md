# Notes — "Evaluating AI Agents (DeepLearning.AI / Arize)"

**Author:** John Gilhuly (Head of DevRel, Arize AI) & Aman Khan (Director of Product, Arize AI) · **URL:** https://www.deeplearning.ai/courses/evaluating-ai-agents · **Type:** course · **Found:** true

## Summary (3-6 sentences)
A free ~2h16m beginner short course (15 video lessons, 6 code examples, 1 graded PRO assignment) built with Arize AI that teaches a systematic, observability-first loop for evaluating agents instead of "trial and error." The throughline: first **decompose** the agent into router + skills + memory, then **trace** every step, then attach the *right evaluator to the right component* — code-based for deterministic checks, LLM-as-a-judge for open-ended outputs, human annotation for the rest. It introduces a **convergence score** to measure whether the agent reaches answers in an efficient number of steps, and **structured experiments** to iterate on prompt/model/logic with response-accuracy and step-efficiency metrics. The labs are runnable Jupyter notebooks (L3, L5, L7, L9, L11) built on Arize Phoenix tracing. It is explicitly aimed at the production debugging workflow, not benchmark leaderboards.

## Key points (5-12 substantive bullets)
- **Decompose before you evaluate.** The agent is broken into a *router* (decides which skill/tool to call), *skills* (the individual tools/sub-functions), and *memory*. Evals are then attached per-component rather than only end-to-end — a key practitioner move that lets you localize failures.
- **Two distinct eval surfaces per agent:** *router/skill evals* (did it pick the right tool / did each skill produce a correct result — mix of code-based and LLM-judge) and *trajectory evals* (was the whole path/sequence reasonable). This component-vs-path split maps directly to the lessons "Adding router and skill evaluations" and "Adding trajectory evaluations."
- **Convergence score** is the signature technique: a 0–1 measure of step efficiency. Formula (per Arize docs): `convergence = minimum steps observed for this query type / steps in the run`, averaged across runs. 1.0 = the agent always takes the optimal path; lower means it diverges/wanders.
- **Honest limitation, stated explicitly:** because the "optimal path" is just the *shortest run your agent actually produced*, convergence "will miss cases where every run of your agent takes a suboptimal path." It's a relative-efficiency metric, not a ground-truth-optimal one — a useful caveat most blog posts skip.
- **Evaluator selection is the core decision.** The course frames choosing *code-based vs LLM-as-a-judge vs human annotation* as a per-component judgment call, not a one-size choice. Code-based "test a certain step" explicitly; LLM-judge for "more open-ended outputs"; humans for the ambiguous remainder.
- **Tracing/observability is prerequisite, not optional.** Built on Arize Phoenix (OpenTelemetry-style spans). You can't evaluate trajectory or convergence without first capturing the full step trace — lessons 5–6 ("Tracing agents") gate everything after.
- **Structured experiments** = the iteration engine: hold the eval suite fixed and sweep one variable at a time (prompt, LLM model, or agent logic), comparing on response accuracy and step efficiency. This is the "experiment" abstraction (datasets + task + evaluators) rather than ad-hoc prompt tweaking.
- **"Improving your LLM-as-a-judge"** is its own lesson — acknowledging the judge itself needs calibration/eval (aligning judge labels to human labels), not blind trust.
- **Eval ≠ traditional software testing** is the framing from lesson 2 ("Evaluation in the time of LLMs"): non-determinism and open-ended outputs break assert-style testing, motivating probabilistic/judge-based evals.
- **Production loop closes with monitoring** (lesson 14) — the same evals that ran offline get run as online monitors, not retired after dev.
- Public hands-on repos exist (community mirrors e.g. `ksm26/Evaluating-AI-Agents`) with the L3/L5/L7/L9/L11 notebooks runnable end-to-end.

## Verified quotes (1-4 verbatim, with URL)
- "Add observability to your agent to gain insights into its steps and know how to debug it" — https://www.deeplearning.ai/courses/evaluating-ai-agents
- "Set up evaluations for the skills and router decisions of the agent example using code-based and LLM-as-a-judge evaluators" — https://www.deeplearning.ai/courses/evaluating-ai-agents
- "Compute a convergence score to evaluate if the example agent can respond to a query in an efficient number of steps." — https://www.deeplearning.ai/courses/evaluating-ai-agents
- "Run structured experiments to improve the performance of the agent by exploring changes to the prompt, LLM model, or the agent's logic." — https://www.deeplearning.ai/courses/evaluating-ai-agents

(Convergence formula and its "will miss cases where every run … takes a suboptimal path" limitation are sourced from the Arize Phoenix agent-path-convergence docs: https://arize.com/docs/phoenix/evaluation/how-to-evals/running-pre-tested-evals/agent-path-convergence — paraphrased there, exact verbatim of that doc could not be fully re-fetched due to a redirect/404, but the formula and caveat are corroborated across Arize's pages.)

## What it adds / why it's good
Most "eval" content stops at "use an LLM judge." This course's non-BS contribution is **the component decomposition + per-component evaluator matching** (router-eval vs skill-eval vs trajectory-eval), which is exactly the structure you need to debug *where* a multi-step agent fails rather than just scoring final answers. The **convergence score** is a concrete, codeable agent-specific metric for the "is my agent wandering / burning steps" problem that pure accuracy metrics ignore — and it's refreshingly honest about its own blind spot (relative, not absolute, optimality). Because it's grounded in Arize Phoenix + runnable notebooks, it's a working blueprint (tracing → datasets → experiments → online monitoring), not just slides. Good complement to written sources like Eugene Yan/Hamel Husain: it operationalizes the "look at your traces" advice into an actual tooling loop with hands-on code.

## Themes
1 why-evals · 3 model/harness/skill · 4 observability · 5 eval infra · 8 judge/verifiers · 9 agent-specific
