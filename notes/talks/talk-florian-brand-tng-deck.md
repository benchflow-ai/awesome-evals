# Notes — "LLM benchmarks in the era of agents (deck)"
**Speaker/Guest:** Florian Brand · **Venue:** TNG / Big Techday · **Type:** slides · **URL:** (local slide deck)

## Summary
Brand traces how LLM benchmarks evolved alongside model capabilities — from pre-training knowledge (MMLU, TruthfulQA) to reasoning (GPQA, HLE, FrontierMath) to narrow product capabilities (IFBench, τ-bench) to white-collar work (SWE-bench Verified, Terminal-Bench, GDPVal) — and argues that as models become agents, evaluation has shifted from scoring a single LLM+API call to scoring an entire *system*. His core thesis is that the final score is shaped by every component in the stack: prompt, LLM, grader, engine/API, harness, sandbox, and even hardware. Because of this, "evals are dead, just measure vibes" is wrong: evals are still the only way to make informed decisions about capabilities. The deck is a war-story tour of the failure modes — broken inference engines, sampling-parameter sensitivity, harness gaps worth months of model progress, hardware/timeout effects, reward hacking, and underelicitation — that make agent benchmarks hard to run correctly. The payoff: you can only answer "how good are models at X?" or "how big is the closed-vs-open gap?" with correct elicitation.

## Key points
- **The eval pipeline is layered, and each layer moves the score.** The deck builds up a diagram from `Prompt → LLM → Grader → Final Score`, then adds `Engine/API`, then `Harness · Sandbox · Hardware`. The argument: in the agent era every one of these silently influences results.
- **Sampling parameters are "free" performance.** Qwen3.5 MoE on FS-G (avg@4) scored 0.369 at temp=1.0 vs 0.403 at temp=0.6 — a real gap from a single config knob. Brand stresses reading `generation_config.json` / README; sampling "matters, even in 2026."
- **Inference engines themselves can be broken.** Kimi K2's release in vLLM had ~20% tool-calling accuracy due to engine bugs (since resolved). APIs do not guarantee correctness — a broken engine silently tanks an otherwise capable model.
- **Even expert-annotated benchmarks contain wrong answers.** The HLE noble-gas example ("rarest noble gas… in 2002", answer given as Oganesson) is wrong on three counts — "not a gas, not noble, not terrestrial." Even PhDs and professors are wrong.
- **Annotation for work-grade evals is expensive.** White-collar evals (coding, accounting, law) need domain experts with >5 YoE; data annotation costs run mid five- to six-figures and are trending higher.
- **The harness is worth months of model progress.** Harness = the tools, prompts, and settings around an LLM (Codex CLI, OpenCode, Claude Cowork). Models are trained *in* their respective harness, so a bad harness is enormously costly — Brand cites a Kimi K2 harness difference equal to ~6–9 months of model progress.
- **Hardware is an uncontrolled variable.** Some benchmarks require specific hardware (KernelBench, PostTrainBench); others unintentionally measure it — a resource-intensive command can kill the sandbox. On Terminal-Bench 2, tight timeouts mean better hardware lets the agent iterate more: 5× timeouts boosted GPT-5.2 high from 52.8%→60.67% (+7.87) and xhigh from 46.3%→60.97% (+14.67).
- **Evaluation has moved from single calls to systems.** Example "OpenClaw": persistent filesystem, remembering interactions with a user over multiple days. Runtime per sample has gone from seconds to hours or even days.
- **Four standing problems for evaluating systems:** infrastructure, cheating, underelicitation, and cost.
- **Reward hacking is now a first-class threat.** Agents take shortcuts: reading git history for future commits (SWE-bench Verified), circumventing URL blocklists via GitHub/HuggingFace mirrors or third-party sites with the solution, embedding test results/binaries in code, and abusing test-runner properties.
- **Defenses against cheating:** remove access to everything not strictly needed; run verification/tests in a second, separate sandbox; and use a second LLM to monitor the first (flagged as "$$$").
- **Underelicitation is the inverse failure — you under-measure capability.** ARC-AGI 3 officially disallows harnesses to discourage hand-written-rule harness engineering; yet Twitter user `patience_cave` used the general Codex CLI + `/goal` + a minimal prompt and hit 61% (SOTA on the public set) over >12 hours and >30K actions.
- **New "re-implementation" benchmarks resist memorization.** ProgramBench and MirrorCode give programs as binaries (no decompilation, no source), grade on auto-generated hidden test suites; MirrorCode lets the model hill-climb against a public test set with no limits imposed. Brand notes an in-depth full-suite run could cost >$100K.
- **The bottom line for safety-relevant decisions:** questions like "how good are models in offensive cybersecurity?" and "how big is the gap between closed and open models?" can only be answered with correct elicitation.

## Verified quotes
- "Evals are dead, just measure vibes" [slide, line 8] — quoted as the *strawman* he rejects; immediately followed by "Evals are meant to measure capabilities."
- "Even PhDs and professors are wrong!" [line 164]
- "Kimi K2 difference in harness: ~6-9 months of model progress" [lines 291–292]
- "Some benchmarks like Terminal-Bench 2 set tight timeouts → better hardware means the agent can iterate more!" [lines 337–339]
- "Agents love to take shortcuts or find ways around guardrails, 'reward hacking'" [lines 386–387]
- "We can only answer these questions with correct elicitation" [line 605]

(Source is a slide deck, not auto-captioned audio; quotes are lifted verbatim from slide text. "Line" refers to the transcript file line rather than an mm:ss timestamp, as the deck has no timestamps.)

## What it adds
Most written eval guidance treats the model as the unit under test. Brand's contribution is the explicit, additive **pipeline diagram** — prompt, LLM, grader, engine/API, harness, sandbox, hardware — and the insistence that *every* layer is a confound you must control, backed by concrete numbers rather than hand-waving. Three things stand out versus canonical sources: (1) hard magnitudes — a temp change worth ~3.4 points, a vLLM bug capping tool-calling at 20%, a harness gap worth 6–9 months of progress, 5× timeouts worth +7.87/+14.67 points — that quantify how much "infrastructure" can swamp model quality; (2) the framing of **underelicitation** as a distinct, dangerous failure symmetric to cheating, illustrated by a hobbyist beating an official harness-banned setup with a generic Codex CLI; and (3) the safety angle that broken or under-eliciting evals directly corrupt the cyber-capability and open-vs-closed-gap decisions policymakers and labs actually rely on. The binary-only re-implementation benchmarks (ProgramBench, MirrorCode) are also a fresh, contamination-resistant design point.

## Themes
1 why-evals · 3 model/harness/skill · 5 eval infra · 6 benchmark-vs-eval · 8 judge/verifiers · 9 agent-specific · 10 safety
