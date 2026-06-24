# Notes — "My benchmark for large language models"

**Author:** Nicholas Carlini · **URL:** https://nicholas.carlini.com/writing/2024/my-benchmark-for-large-language-models.html · **Type:** blog · **Found:** true

## Summary
Carlini (a security/ML researcher, then at Google DeepMind) released a personal benchmark of nearly 100 tests harvested directly from his own real LLM conversations, plus a small dataflow DSL for authoring them. The thesis is that academic benchmarks measure the wrong thing — homework-style problems — while the tasks people actually bring to models (bootstrap a project, modify existing code, answer un-searchable questions) go untested. Each test is a chain of stages written with a `>>` ("and then do") operator: prompt the model, extract the code it writes, run that code safely in a Docker container, then check the output with an evaluator (substring match, a Python check, or even a vision-model judge). The core contribution is not a leaderboard but a reusable, extensible harness that turns "annoying things a model failed at" into regression tests, and an explicit, opinionated stance on what an eval built from real usage should optimize for. He is candid that this is deliberately *not* a general-capability benchmark — it measures utility for his use cases.

## Key points
- **Built from real friction, not curated tasks.** The ~100 tests are extracted from Carlini's actual conversations, organized around his three real uses: starting a new project from a text description, modifying existing code (make it faster, convert language, add a feature), and answering questions "hard to search for because there's no good way to describe it with nice keywords."
- **Dataflow DSL with a `>>` operator** ("and then do") chains stages: `LLMRun() >> ExtractCode() >> PythonRun() >> SubstringEvaluator("hello world")`. Disjunction (`|`) lets multiple answers count as correct.
- **Rich stage vocabulary**: execution stages like `PythonRun()`, `CRun()`, `TerminalRun()`; evaluators like `SubstringEvaluator()`, `PyEvaluator()`, and `VisionLLMRun()` (using a vision model to grade image output). This makes the harness an LLM-as-judge / verifier framework as much as a test runner.
- **Model-written code is actually executed, in Docker** — the eval doesn't just match text, it runs the program the model produced and checks behavior, sandboxed so untrusted generated code can't escape.
- **Anti-prompt-engineering by design.** He rejects chain-of-thought scaffolding, role-play, and incentive tricks; the bar is typing a plain question and getting a right answer. He frames this partly as deliberate laziness — the eval should reflect how a normal user actually interacts.
- **Outcome-only grading.** He explicitly doesn't care *why* a model is right (memorization vs. reasoning) — only whether the answer is correct. This sidesteps the contamination/reasoning debates that dominate academic benchmark discourse.
- **Task variety is unusually concrete**: Python→C conversion, explaining minified JavaScript, identifying encodings (uuencoding), BNF grammar parsing, English→SQL, bash one-liners, reading assembly, generating .bmp images, interactive DB exploration, and creative tasks (encode a movie as emoji).
- **Findings/signal**: GPT-4 does well at interactive SQL exploration and clever encodings (The Godfather as 👴🔫🍊💼🐴); models broadly fail at decoding uuencoded data, evaluating the gnarly C expression `-~++*x--`, reading novel assembly languages, and multi-step interactive terminal tasks.
- **Honest scoping**: he states outright it is not a good general-capability benchmark and doesn't want it used in serious academic work — its value is being a faithful proxy for *his* daily usage, and a template anyone can fork.
- **Open code**: https://github.com/carlini/yet-another-applied-llm-benchmark — tests are individually inspectable and results link to actual model outputs. Published 2024-02-19.

## Verified quotes
- "I just want to type my question and get the right answer." — https://nicholas.carlini.com/writing/2024/my-benchmark-for-large-language-models.html
- "Specifically: this also means that I don't care _why_ the model managed to get the answer right." — same URL
- "I'm fairly proud of the little data flow domain specific language I wrote to implement the test cases." — same URL
- "Most questions are evalauted by actually running the code the model writes safely, in a docker container... don't worry too much." — same URL (typo "evalauted" is verbatim on the page)
- "Now that people actually use models to do real things, we probably should have at least a few benchmarks that actually test for real uses." — same URL
- "Does this make it a good benchmark for general model capabilities? No." — same URL

## What it adds / why it's good
Most "build your own eval" advice is abstract; this is a worked, open-source artifact from a serious researcher showing exactly how to convert lived annoyance into durable regression tests. The non-BS value is threefold: (1) the **dataflow DSL** is a genuinely good design pattern — composing prompt → extract → execute → judge as a pipeline maps cleanly onto how agent evals work, and it lowers the cost of adding a test to near-zero, which is the actual bottleneck for personal evals; (2) **executing model-written code in a Docker sandbox** is the canonical pattern for code/agent evals (functional correctness over text match, with isolation for untrusted output) shown in a tiny readable codebase rather than a heavyweight framework; (3) the **epistemics are unusually honest** — he explicitly disclaims generality and refuses prompt-engineering crutches, which is a useful counterweight to leaderboard culture. Compared to the obvious sources (MMLU/HumanEval papers, vendor cards), this is the rare primary document on *eval-as-personal-instrument*: small, opinionated, real-task-driven, and forkable.

## Themes
- **1 why-evals** — the central argument: benchmarks should test real uses, not homework.
- **3 model/harness/skill** — the `>>` DSL and stage library are a concrete harness design.
- **5 eval infra** — Docker-sandboxed execution, extractors, evaluators, regression-test workflow.
- **6 benchmark-vs-eval/integrity** — explicitly an eval (his use cases) not a general benchmark; outcome-only grading sidesteps "why it's right."
- **8 judge/verifiers** — `SubstringEvaluator`, `PyEvaluator`, `VisionLLMRun` as graders, including LLM-as-judge.
- **9 agent-specific** — interactive terminal/DB tasks and run-the-code loops prefigure agentic evaluation.
