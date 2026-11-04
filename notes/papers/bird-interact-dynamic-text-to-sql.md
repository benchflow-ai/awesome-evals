# Notes — "BIRD-INTERACT: Re-imagining Text-to-SQL Evaluation via Lens of Dynamic Interactions"

**Authors:** Nan Huo, Xiaohan Xu, Jinyang Li, Per Jacobsson, Shipei Lin, et al. · **Venue/Year:** ICLR 2026 Oral · **URL:** https://openreview.net/forum?id=nHrYBGujps · **Code:** https://github.com/bird-bench/BIRD-Interact · **Type:** paper / benchmark · **Found:** true

## Summary

BIRD-INTERACT asks a more realistic question than whether a model can translate one clean request into SQL: can it work through an underspecified data task with a user, find the missing schema or business context, recover from execution errors, and still produce the right database outcome?

The benchmark turns that question into two evaluation protocols over the same database environments. In `c-Interact`, the workflow is guided and the model is tested as a conversational assistant. In `a-Interact`, the model receives a higher-level goal and decides when to inspect metadata, search the knowledge base, execute SQL, or ask the user simulator for clarification. The ICLR paper reports 600 full-set tasks, each with an ambiguous priority sub-task followed by a dependent follow-up. Coverage extends beyond analytical `SELECT` queries to state-changing database work, and correctness is checked with executable tests rather than SQL string matching.

The useful shift is not simply “multi-turn Text-to-SQL.” The interaction policy becomes part of the system under test. A model can fail with perfectly valid SQL because it asked the wrong question, spent its action budget on trial and error, or committed before resolving an ambiguity. That makes BIRD-INTERACT an agent benchmark, not just a larger semantic-parsing dataset.

## Key points

- **Two protocols separate communication from autonomous tool use.** `c-Interact` follows a predefined conversation and debugging flow; `a-Interact` exposes nine actions and lets the model choose how to use the database, metadata, hierarchical knowledge base, and user simulator.
- **The task is intentionally underspecified.** The first sub-task contains annotated ambiguity, while the second depends on the result of the first. This tests clarification and state carried across turns, not only query generation.
- **The user simulator is constrained before it speaks.** A parser maps each question to `AMB()` for an annotated ambiguity, `LOC()` for a reasonable local clarification, or `UNA()` for a request it should refuse. A separate generator then produces the response. This design is meant to reduce ground-truth leakage and keep different runs comparable.
- **Functional correctness is executable.** BI queries are compared by normalized execution results under task-specific conditions. Data-management tasks use hand-written postcondition checks for state changes. This avoids rejecting every SQL formulation that differs from the reference while still checking the database outcome.
- **Success and partial progress are not collapsed into one number.** The paper reports success separately for the priority and follow-up sub-tasks, then adds normalized reward to distinguish first-attempt success, recovery after debugging, and partial completion.
- **The action budget is part of the benchmark design.** Clarifications and environment actions consume a synthetic budget, so the benchmark measures whether an agent gathers the right evidence before acting. It should not be read as a direct estimate of real user patience or production cost.
- **The two modes expose different failure patterns.** The paper ties `c-Interact` failures mainly to communication quality; in `a-Interact`, models tend to spend budget on direct execution and user questions instead of systematic schema and knowledge exploration.
- **The headline results are difficult but narrow.** On the paper's full-set run, GPT-5 completes 8.67% of follow-up tasks in `c-Interact` and 17.00% in `a-Interact`. Those values come from one run per model at temperature 0 and `top_p=1`, with default reasoning settings and fixed interaction budgets. They are benchmark results under that harness, not timeless model rankings.

## The evaluator also needs evaluation

The most interesting part of the paper is its treatment of the simulated user as a possible source of measurement error. The authors test the function-driven simulator on 2,100 expert-labeled questions and separately compare simulated-user and human-user outcomes on 100 tasks. Their constrained design reduces failures on unanswerable requests and correlates more strongly with the human runs than a free-form baseline.

That is useful evidence, but it does not make the simulator equivalent to a real user. The alignment study is still a sample of benchmark interactions, and one part of the simulator analysis uses an LLM judge. Product teams would still need real-user review for domain language, clarification burden, trust, and permission expectations.

## Reproduction and reporting caveats

- The published model table uses a single run per model because commercial API calls were expensive. Deterministic decoding reduces one source of variance, but it does not establish run-to-run reliability for the full agent harness.
- The official repository distributes public task data separately from the ground-truth SQL and test cases; evaluators request the protected fields through an automated email flow. This helps limit leakage, but adds a setup step that should be recorded in a reproduction report.
- The repository warns that database-loading errors can leave some Docker databases empty without stopping the run. A low score is not interpretable until the database logs and loaded schemas have been checked.
- The paper's reported setup and the live repository are not interchangeable. The repository continues to update datasets, Docker images, agent scaffolds, and leaderboard results; comparisons should pin the commit, dataset version, model alias, budgets, and evaluator configuration.

## Verified quotes

- “real-world data interaction is rarely a single, perfectly-formed query” — https://openreview.net/forum?id=nHrYBGujps
- “conducting single runs due to cost” — https://openreview.net/forum?id=nHrYBGujps

## What I would carry into a product eval

The practical lesson is to test the decision loop, not just the final SQL. A useful data-agent eval should record what the agent knew, what it chose to inspect, which ambiguity it surfaced, what it changed, and how the database ended up. I would keep at least four result slices separate: task completion, clarification quality, unsafe or unintended state changes, and cost or interaction burden. Rolling them into one score would hide the trade-off the benchmark is trying to expose.

BIRD-INTERACT also makes a clean boundary visible: executable tests can verify whether the database reached an expected state, but they do not prove that the agent was authorized to make that change. Permission checks, tenant scope, and human confirmation for consequential writes remain product requirements outside the benchmark's task-success metric.

## Themes

4 observability/output space · 6 benchmark-vs-eval/integrity · 7 evals/RL environments · 9 agent-specific evaluation · 10 safety/action authorization
