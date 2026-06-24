# Notes — "Improve agent quality with Insights Agent and Multi-turn Evals, now in LangSmith"

**Author:** The LangChain Team · **URL:** https://www.langchain.com/blog/insights-agent-multiturn-evals-langsmith · **Type:** eng-blog · **Found:** true

## Summary (3-6 sentences)
LangChain's product-announcement blog (Oct 23, 2025) ships two LangSmith features aimed squarely at the gap most eval write-ups miss: evaluating *whole multi-turn agent threads* rather than single trace steps. **Insights Agent** is an offline analysis agent that mines production traces at scale to auto-cluster usage patterns and failure modes, so teams don't have to hand-review interactions one by one. **Multi-turn Evals** are online, LLM-as-a-judge evaluations that fire automatically when a conversation (a "thread") completes and score whether the agent actually accomplished the user's goal across the entire exchange — along three axes: semantic intent, semantic outcome, and agent trajectory. The framing pillar is that "most other evaluation platforms only focus on individual traces or steps," which can't tell you whether the overall interaction succeeded. It's a vendor post (light on customer numbers), but the conceptual decomposition of thread-level evaluation is the substantive contribution.

## Key points (5-12 substantive bullets)
- **The core thesis is a real gap:** single-trace/single-step evals can't answer "did the user get what they wanted?" across a multi-turn conversation. The product carves out "threads" (the full multi-turn exchange between user and agent) as the unit of evaluation, not individual runs.
- **Two complementary loops:** Insights Agent answers *"what's happening in production"* (descriptive, offline, retrospective discovery), while Multi-turn Evals answer *"did the agent accomplish the goal"* (prescriptive, online, scored per thread). The pairing of unsupervised discovery + supervised scoring is the architecture worth stealing.
- **Insights Agent = auto-clustering of traces.** Three modes: (1) *Group by usage patterns* — cluster on how users actually engage; (2) *Group by poor interactions* — cluster on "how your agent is messing up," grouping root causes of failure; (3) *Customize* — define your own categories, filter on attributes, and define new attributes to extract.
- **Closing the loop into datasets:** from any discovered category you can "click into any category to explore the underlying traces and add them to datasets or annotation queues." This is the discovery→curation→eval-set pipeline that turns production traffic into eval data.
- **Multi-turn Evals decompose goal-achievement into three judge dimensions:**
  - *Semantic intent* — "What the user was actually trying to do" (infer the real goal, not the literal last message).
  - *Semantic outcome* — "Whether the task was completed (and if not, why)" — note it captures the failure *reason*, not just pass/fail.
  - *Agent trajectory* — "How the interaction unfolded, including tool calls and decisions made along the way" — i.e., process/path quality, not just final answer.
- **Online + automatic + completion-triggered:** "Multi-turn evals run automatically once a conversation is complete, and you define the LLM-as-a-judge prompt to guide scoring." So it's a user-authored judge prompt, run online at thread-completion — not a batch offline harness.
- **Scale motivation is explicit:** "Today's popular agents produce millions of traces per day—soon to be billions." This is the justification for automated clustering — manual review is "impossible at scale."
- **Insights Agent processing is batch-ish:** runs take up to ~15 minutes depending on data volume; results are shown by category with latency, run counts, and eval scores attached.
- **Availability split:** Insights Agent is GA for LangSmith Plus/Enterprise *cloud* customers; Multi-turn Evals are live for *all* LangSmith users.
- **Roadmap signals where thread-level eval is heading:** "the first of several thread-level features" — coming: thread-level metrics and dashboards, automations to push threads into annotation queues/datasets, and SDK support to "programmatically pull and analyze threads."

## Verified quotes (verbatim, from the URL above)
1. "Until now, that's been tricky — most other evaluation platforms only focus on individual traces or steps, making it hard to understand whether the overall interaction achieved the user's goal."
2. "Semantic intent: What the user was actually trying to do. Semantic outcomes: Whether the task was completed (and if not, why). Agent trajectory: How the interaction unfolded, including tool calls and decisions made along the way."
3. "Multi-turn evals run automatically once a conversation is complete, and you define the LLM-as-a-judge prompt to guide scoring."
4. "Today's popular agents produce millions of traces per day—soon to be billions."

## What it adds / why it's good (non-BS practitioner value)
The genuinely useful idea — and the reason this is worth a knowledge-base entry — is the **explicit three-way decomposition of "did the agent succeed across a whole conversation": intent vs. outcome vs. trajectory.** Most practitioner eval writing either evaluates the final answer (outcome-only) or scores trajectory/tool-correctness (process-only); separating *inferred intent* as its own dimension is the subtle move, because in multi-turn threads the user's real goal is rarely stated cleanly in any single message — you have to reconstruct it before you can judge outcome. Pairing that scored judge with an unsupervised **discovery** step (Insights Agent clustering failures and feeding them into datasets/annotation queues) sketches a complete production-eval flywheel: mine traffic → cluster failure modes → curate eval sets → score threads online → repeat. That said, it's a vendor announcement: no customer case studies, no judge-prompt examples, no agreement/calibration numbers, and the "soon to be billions" line is marketing. Treat it as a clean conceptual frame for thread-level eval design rather than a how-to with evidence.

## Themes
- **9 agent-specific** — thread-level / multi-turn agent evaluation is the central subject.
- **4 observability** — Insights Agent mines production traces; both features live in LangSmith's tracing/observability layer.
- **1 why-evals** — frames *why* single-trace evals are insufficient and goal-achievement matters.
- **8 judge/verifiers** — Multi-turn Evals are user-defined LLM-as-a-judge prompts scoring intent/outcome/trajectory.
- **5 eval infra** — online completion-triggered eval runs, clustering pipeline, datasets/annotation queues, roadmap for SDK/dashboards.
