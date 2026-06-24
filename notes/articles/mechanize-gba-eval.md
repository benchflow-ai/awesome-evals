# Notes — "Introducing GBA Eval: Giving frontier coding agents 24 hours to write a Game Boy Advance emulator"

**Author:** Stephen Yang, Ege Erdil, Tamay Besiroglu (Mechanize) · **URL:** https://www.mechanize.work/technical-blog/introducing-gba-eval/ · **Type:** eng-blog · **Found:** true

## Summary

Mechanize's GBA Eval tasks frontier coding agents with writing, from scratch, a Game Boy Advance emulator in Rust that compiles to WebAssembly — a task that would take a skilled human engineer multiple weeks — and gives them roughly 24 hours of agent time to do it. The interesting engineering is in the grading: rather than rely on hand-written assertions (which the authors argue are the root cause of most eval quality problems), they grade by *replay*, running the candidate emulator and a reference emulator in lockstep on pre-recorded input sequences and comparing output frame-by-frame. The reference oracle is a lightly modified fork of Mesen2 (one of the most accurate GBA emulators), exposed through a thin C ABI (`set_keys` / `run_frame` / `framebuffer`) with the emulation core left unmodified. This frame-exact comparison is only tractable because the GBA console has no entropy source — no RTC, wall clock, or analog input — so all randomness derives from input timing, making runs perfectly deterministic and reproducible. The post is positioned as a public proof-of-existence for the kind of high-investment, low-flaw eval/RL-environment work Mechanize does with AI labs, and as a recruiting piece. Concrete model results (Claude scoring ~70-74%, GPT-5.5 ~53%, Gemini variants failing to build a working emulator) appear on the companion leaderboard at gbaeval.com rather than in the post body itself.

## Key points

- **The task:** "We task models with writing, from scratch, a Game Boy Advance (GBA) emulator in Rust that compiles to WebAssembly." This is a multi-week project for a skilled human; agents get on the order of 24 hours (per the title and external coverage; the budget is not stated in the post body).
- **Thesis — bad graders cap capability:** the authors open by arguing that "current evals, benchmarks, and RL environments for LLM capabilities have significant quality problems, and that these problems pose a major barrier to future improvements in model capabilities." Examples they cite: "Nearly 60% of the problems in that subset had flawed tests that would reject correct solutions," plus easily-cheatable problems (solutions/grader code in git history) and underspecified LLM-judge rubrics.
- **The grading insight is replay, not assertions:** "The grading for this task consists of several components, but the most interesting is replay, where we check whether actual gameplay works on the emulator in various games." They "pre-record input sequences for the game (e.g., passing the first few levels)," then "the candidate and reference emulators consume identical inputs, and their outputs are compared on every frame." Audio can be compared the same way.
- **Determinism is the load-bearing trick:** "This kind of grading is tractable because the GBA console itself has no entropy source. There is no RTC, wall clock, or analog input on the console." All randomness "derives entirely from the exact timing of inputs" — the same property speedrunners exploit for RNG manipulation in tool-assisted speedruns. This is what makes a frame-exact oracle comparison a *valid* grader rather than a flaky one.
- **The oracle is a real, accurate emulator, minimally forked:** "We use a lightly modified fork of Mesen2, an open-source cross-platform emulator widely regarded as one of the most accurate GBA emulators available, as the reference."
- **Surgical oracle interface:** "Our changes are limited to a thin C ABI exposing the lockstep emulator interface (`set_keys` / `run_frame` / `framebuffer`) and a deterministic input-replay harness; the emulation core itself is unmodified from upstream Mesen2." Keeping the core untouched means the oracle stays trustworthy — the harness drives it in lockstep but doesn't change what "correct" means.
- **Black-box oracle CLI given to the agent (per external coverage):** the agent's container ships the Rust + wasm32 toolchain, the ABI specification, a BIOS stub, dev ROMs, and an "oracle CLI" that is a black-box wrapper around Mesen2 — the agent cannot read Mesen2's source or access the internet, so it must actually implement correct emulation rather than copy a reference. (Sourced from search snippets of the article / Adafruit coverage; not confirmed verbatim in the body text WebFetch returned.)
- **Model results (from gbaeval.com / external coverage, not the post body):** Claude Opus 4.8 ~70.9% (described as the top score "to date" at one point, beating GPT-5.5's 53.2% in under an hour); a later Claude "Fable 5" reportedly ~74.5%, beating Opus 4.8's 24-hour result in under 2 hours; Gemini 3.1 Pro "failed to produce a working emulator" and Gemini 3.5 Flash scored ~6.7%. Treat these specific numbers as leaderboard-sourced and time-varying.
- **Honest caveat on interpretation:** the authors warn that "Rankings of models on GBA Eval are not necessarily representative of their general 'software engineering capability'" — i.e., one hard task is a probe, not a verdict.
- **Why a human-expert floor matters:** they note many existing test cases "contain poorly specified problem statements or environments, where even a human expert software engineer would fail in the place of the model, which effectively caps achievable scores" — GBA Eval is designed to avoid that failure mode by grading observable behavior against ground truth.
- **Positioning:** "GBA Eval is analogous to the work we do at Mechanize with top AI labs when we make environments for evaluating and training LLMs," released "as an example of what it looks like to invest time in careful grading." The post closes as a hiring pitch for environment/eval software engineers.

## Verified quotes

All quotes below are verbatim from https://www.mechanize.work/technical-blog/introducing-gba-eval/ :

1. "We task models with writing, from scratch, a Game Boy Advance (GBA) emulator in Rust that compiles to WebAssembly."
2. "This kind of grading is tractable because the GBA console itself has no entropy source. There is no RTC, wall clock, or analog input on the console. This means that randomness in these ROMs derives entirely from the exact timing of inputs."
3. "Our changes are limited to a thin C ABI exposing the lockstep emulator interface (`set_keys` / `run_frame` / `framebuffer`) and a deterministic input-replay harness; the emulation core itself is unmodified from upstream Mesen2."
4. "Then, the candidate and reference emulators consume identical inputs, and their outputs are compared on every frame."

(Note: the specific per-model leaderboard scores and the "24 hours" / "oracle CLI black-box" / Docker-container details were sourced from search snippets and the companion gbaeval.com leaderboard rather than confirmed verbatim in the article body that could be fetched. The Adafruit re-coverage returned HTTP 403 and could not be independently verified.)

## What it adds / why it's good

This is a rare, concrete war-story on building a *behavioral, non-assertion-based* grader for a genuinely hard agentic coding task — the part most eval write-ups gloss over. The non-BS practitioner value:

- **A reusable design pattern: oracle-by-differential-replay.** Instead of writing thousands of brittle test assertions (the exact thing they show is ~60% flawed in existing suites), they grade by running candidate vs. a trusted reference implementation in lockstep and diffing outputs. This generalizes far beyond emulators to any domain where you have a trusted oracle and deterministic inputs (compilers, parsers, replication engines, simulators).
- **It names the precondition that makes replay grading valid:** determinism / absence of an entropy source. Most people who try frame-diffing or output-diffing graders get burned by hidden nondeterminism (clocks, RNG, timing); this post makes the prerequisite explicit and shows how to pick/shape a task so the prerequisite holds.
- **Minimal-fork oracle discipline:** keeping Mesen2's emulation core untouched and only adding a thin C ABI + replay harness is a concrete trustworthiness practice — the grader's notion of "correct" comes from an unmodified, widely-validated implementation, not from the eval author's own re-derivation.
- **Anti-cheat by construction:** giving the agent a black-box oracle CLI (no Mesen2 source, no internet) forces real implementation work rather than retrieval/copying — a direct answer to the "solution-in-git-history" contamination problem they criticize.
- **Honesty most leaderboards skip:** the explicit "this ranking is not general SWE capability" caveat is the kind of calibration the obvious benchmark sources (SWE-bench-style aggregate scores) tend to omit.

Versus the obvious sources (Eugene Yan on LLM-judge patterns, generic SWE-bench discourse): this is end-to-end *eval-infra* engineering with a verifier you can trust precisely, grounded in a single hard task, with real model deltas — closer to how frontier RL environments are actually built than to a survey of judge prompts.

## Themes

- **1 why-evals** — opens by arguing flawed graders cap model capability and block future progress.
- **2 eval⇄capability⇄RL-env** — explicitly frames GBA Eval as analogous to the RL environments Mechanize builds with labs; grader quality as the lever on capability.
- **5 eval infra** — core contribution: the replay harness, oracle CLI, Mesen2 fork, container toolchain.
- **8 judge/verifiers** — the central technique is a deterministic, frame-exact differential verifier (oracle) replacing brittle assertions and LLM judges.
- **9 agent-specific** — long-horizon (~24h) autonomous coding agent task graded on the artifact's runtime behavior.
- **6 benchmark-vs-eval** — argues for behavior-grounded, contamination-resistant grading over cheatable benchmark test cases; notes rankings aren't a general-capability verdict.
