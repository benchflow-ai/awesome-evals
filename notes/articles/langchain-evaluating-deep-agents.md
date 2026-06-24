# Notes — "Evaluating Deep Agents: Our Learnings"

**Author:** The LangChain Team · **URL:** https://www.langchain.com/blog/evaluating-deep-agents-our-learnings · **Type:** eng-blog · **Found:** true

## Summary (3-6 sentences)
LangChain distills five evaluation patterns learned while shipping four "Deep Agents" applications (DeepAgents CLI, LangSmith Assist, a Personal Email Assistant, and the no-code Agent Builder). Their core thesis: long-horizon, stateful agents break the standard assumption that you only score the final message — you must instead assert against the agent's *trajectory* (which tools were called), its *state/artifacts* (files written, memories updated), AND its final response, often with bespoke per-datapoint success criteria. About half their test cases were "single-step" evals that constrain the agent loop to one turn (via `interrupt_before=["tools"]`) to cheaply test a specific decision, while the rest run full turns or simulated multi-turn conversations with conditional early-exit logic. They emphasize reproducible environments: temp dirs per test, Docker/sandboxes, and recording/replaying HTTP via vcr (Python) or a Hono fetch proxy (JS). All of it is wired through LangSmith's pytest/Vitest integrations (`@pytest.mark.langsmith`, `log_inputs/outputs/feedback`).

## Key points (5-12 substantive bullets)
- **Per-datapoint bespoke test logic.** Unlike classic LLM evals where every datapoint is scored the same way, Deep Agent success criteria differ per case and "may involve specific assertions against the agent's trajectory and state." Example: a calendar agent that learns preferences should be checked for (a) calling `edit_file` on the `memories.md` path, (b) telling the user it updated memory, and (c) the file actually containing the right content (validated via regex or LLM-as-judge).
- **Single-step evals (~half of test cases).** Constrain the agent to run a single turn so you can validate one decision point cheaply, without paying for full execution. Implemented by invoking with `interrupt_before=["tools"]` and inspecting the messages/state captured *before* the tool executes.
- **Full agent turns evaluated along three axes.** (1) **Trajectory** — were specific tools called, regardless of ordering/timing; (2) **Final response** — output quality for open-ended tasks like coding; (3) **Other state** — artifacts or files the agent produced. The point is you score more than the last message.
- **Multi-turn simulation with conditional early-exit.** To avoid cascading/garbage failures, they add conditional logic in Pytest/Vitest: run turn 1, check output; only proceed to the next turn if the output was as expected, otherwise fail the test early.
- **Clean, reproducible environments per run.** Coding agents get a fresh temp directory per test; agents run in Docker containers or sandboxes; reproducibility is treated as a first-class eval concern, not an afterthought.
- **Mock the outside world by record/replay.** Record HTTP requests to the filesystem and replay them during tests — vcr for Python, and for JS they proxy fetch requests through a Hono app. This removes network flakiness and external-state drift from eval runs.
- **Four real apps as the evidence base.** The learnings are grounded in production builds (DeepAgents CLI, LangSmith Assist, Personal Email Assistant, Agent Builder), not a toy benchmark.
- **LangSmith pytest/Vitest plugin is the harness.** Decorator `@pytest.mark.langsmith` plus `log_inputs()`, `log_outputs()`, `log_feedback()` thread results into LangSmith experiments, so trajectory/state assertions become tracked, comparable eval data rather than ad-hoc asserts.

## Verified quotes (1-4 VERBATIM lines with the URL)
- "Deep Agents breaks this assumption. You'll want to test more than just the final message." — https://www.langchain.com/blog/evaluating-deep-agents-our-learnings
- "When running our evals for Deep Agents, about half of our test cases looked like single step evals" — https://www.langchain.com/blog/evaluating-deep-agents-our-learnings
- "We addressed this by adding conditional logic in our Pytest and Vitest tests. For example, we would: Run the first turn, and then check the agent output. If the output was expected, run the next turn. If it was not expected, fail the test early." — https://www.langchain.com/blog/evaluating-deep-agents-our-learnings
- "For Python, vcr works well; for JS, we proxy fetch requests through a Hono app works." — https://www.langchain.com/blog/evaluating-deep-agents-our-learnings

## What it adds / why it's good
This is a rare *concrete, code-level* practitioner account rather than the usual "evals matter" hand-waving. The non-obvious, load-bearing ideas: (1) the explicit single-step-vs-full-turn split with a real number (~half single-step) gives a usable cost/coverage heuristic — most teams default to expensive full-trajectory runs; (2) `interrupt_before=["tools"]` as the mechanism to freeze the loop and assert on the *pre-tool* decision is a specific, reusable LangGraph technique; (3) the conditional early-exit pattern for multi-turn tests is a pragmatic answer to the "turn 2 fails because turn 1 already derailed" noise that plagues multi-turn evals; (4) record/replay (vcr / Hono proxy) names actual tooling for the hardest reproducibility problem — external API state. It also operationalizes the trajectory + state + final-response triad against state-bearing agents (filesystem, memories.md), which is exactly where final-answer-only scoring silently fails.

## Themes
9 agent-specific · 5 eval infra · 8 judge/verifiers · 4 observability · 1 why-evals
- **9 (agent-specific):** entire piece is about long-horizon, stateful Deep Agents and trajectory/state assertions.
- **5 (eval infra):** LangSmith pytest/Vitest harness, single-step vs full-turn structure, reproducible envs, record/replay mocking.
- **8 (judge/verifiers):** per-datapoint success criteria mixing programmatic assertions (regex, tool-call checks) with LLM-as-judge on file contents.
- **4 (observability):** `log_inputs/outputs/feedback` into LangSmith experiments for tracked, comparable results.
- **1 (why-evals):** opening argument that final-message-only evaluation is insufficient for these agents.
