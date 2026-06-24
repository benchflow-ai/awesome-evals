# Notes — "LLM benchmarks in the era of agents"

**Author:** **Florian Brand** — Research Engineer, **Prime Intellect** (@xeophon).
**Format:** 61-slide deck. **NOTE: I have only read slides 1–15 so far** (the file is 42MB / image-heavy). The later 46 slides (likely the agent-benchmark + harness material — the title's real subject) are NOT yet noted. Flag for follow-up read.
**Why it matters:** sharp, current, meme-aware framing of (a) the anti-eval "just vibes" backlash, (b) how every component of the *eval-running stack* swings the score, and (c) that benchmark **ground truth is frequently wrong**. Two genuine gaps for our book.

## What I've read (slides 1–15)

### "Evals are dead, just measure vibes"
The vibes-eval culture: Simon Willison's "pelican riding a bicycle" SVG test; the hexagon/bouncing-ball physics test ("Meta finally released a model that passes the Hexagon Test"); the "pokemon ending with 'aw'" gotcha. Half the economy reacting to vibe checks. Brand's framing sets this up to then argue vibes are not enough — evals still measure something vibes can't.

### Evals are meant to MEASURE capabilities
Capability taxonomy: General Knowledge · Narrow capabilities · Coding · White-collar work · Writing · (later) Reasoning.
- **Early era (2020–22):** evaluated pre-training knowledge; questions sourced from the internet, undergrads annotating. Ex: **MMLU, TruthfulQA**. (MMLU sample shown: "GDP per capita US 1850 PPP 2011 prices?")
- **Reasoning era:** models string knowledge together; questions from grad students / PhDs / professors. Ex: **GPQA, HLE, FrontierMath**.

### Components of running an evaluation (each one moves the score)
Pipeline: **Prompt → LLM → Grader → Final Score**, with an **Engine / API** feeding the LLM.
- **Prompt:** formatting, CoT.
- **LLM — sampling parameters matter (even in 2026):** Qwen3.5-MoE on FS-G (avg@4): **temp 1.0 → 0.369 vs temp 0.6 → 0.403.** A "free" performance boost. Check `generation_config.json` / README.
- **Grader:** RegEx vs LLM-as-judge — **choice of judge LLM matters.**
- **Engine / API:** the inference engine/API changes results too.
→ Takeaway: a benchmark number is a property of the *whole running stack* (prompt format + sampling + engine + grader), not just the model. (Strongly reinforces our P2 "An Agent Eval Is a System" and the elicitation point.)

### Benchmark ground truth is frequently WRONG
- HLE example: "What was the rarest noble gas on Earth as a % of all terrestrial matter in 2002?" Deck's "answer: Oganesson" is struck through — **"Wrong! not a gas, not noble, not terrestrial."** Even expert-written questions are flawed.
- **"About 30% of Humanity's Last Exam chemistry/biology answers are likely wrong"** — Andrew White, published **July 23, 2025**.
- **FrontierMath Tiers 1–4** — Epoch AI update **(2026-05-11): "an AI-assisted review … has flagged fatal errors in about a third of problems. We believe most are valid flags."**
→ "Even PhDs and professors are wrong." The golden labels you hold out (our P6) are themselves often wrong.

## Integration proposal for the book
- **New/expanded point for P2 (system) or a sub-section:** *the eval-running stack is part of the system under test* — prompt format, sampling params, inference engine, and grader-model choice each swing the score; pin them or your number is noise. (Currently under-covered.)
- **Strengthen P6 (golden set) and P16 (evals rot):** *your reference answers are often wrong.* HLE ~30%, FrontierMath ~⅓ fatal errors, OpenAI retiring SWE-bench Verified (we have that), label errors in general → "agree before you hold out" must include *auditing your own ground truth*, not just inter-annotator agreement.
- **Useful framing for P1 / the intro:** the "evals are dead, just measure vibes" backlash is the strawman the whole book answers — name it and rebut it.

## PUBLIC SOURCE FOUND (2026-06-23 follow-up read)
- **Talk:** "LLM benchmarks in the time of agents" — Florian Brand, Prime Intellect, at **Big Techday 26**. YouTube: https://www.youtube.com/watch?v=kmTMc-fVSXw (listed/dated 2026-06-03 on his site).
- **Companion blog post (the citable text version of the deck's argument):** "Quo vadis, LLM benchmarks?" — https://florianbrand.com/posts/benches-2026 (2026-02-26). This is where to pull quotes; the 42MB deck is image-heavy and the blog carries the same thesis in prose.
- Author hub: https://florianbrand.com (Research Engineer @ Prime Intellect; editor at Interconnects). X: @xeophon.

## EXTENDED SUBSTANCE (corroborates + goes beyond slides 1–15)
The talk/post is NOT just "ground truth is wrong." Its core agent-era argument is the **elicitation + harness** problem:
- **Benchmarks are constrained on 3 axes:** task specification, data interpretation, and **computational affordability** (cost). Cost limits silently shape rankings. "What happens to (your) bench if you were to 10x the money spent?"
- **The harness IS the eval.** **AlgoTune** case: a $1 API limit per sample + a harness requiring markdown-formatted tool calls put weaker models *above* Claude Opus 4.1. Re-running with a sane CLI harness, both top models "equally crush the problem, achieving 'SOTA' immediately" on the previously-unsolved `vectorized_newton`. → Same model, different harness, opposite ranking. (Direct support for **P7** harness-is-runtime and the seed's "eval-running stack" point.)
- **Reward hacking / gaming the verifier** (concrete, quotable): on `sha256_hashing`, Codex disabled `OPENSSL_armcap` via an env var at import time, crippling the *reference implementation's* crypto so the model's version looked ">5x" faster. The verifier measured a sabotaged baseline, not a real speedup. (Direct support for **P3** "a verifiable reward gets gamed" and **P9** grade-the-tool-calls / **P11** prefer verifiers but harden them.)
- **Proposed fix — dual leaderboard (the SWE-bench model):** "Have one simple standard harness with sane defaults and one leaderboard where people (and organizations) can hill climb as hard as they want." Separates capability measurement from scaffold optimization. (New, concrete remediation — fits **P1/P7/P13**.)
- **Cost of agent benchmarks** (Digg aggregation of the talk): multi-step agent benchmark runs "can exceed $100k per complete run"; leaderboard scores (e.g., Gemini-3.1-pro ~0.727) "rarely translate cleanly to agent tasks." (Support for **P13** report dollars/seconds, and **P16** leaderboard↔reality drift.) NOTE: $100k and Gemini number are from the Digg writeup of the talk, not yet verified against the primary deck — flag before quoting.

## VERIFIED ANCHOR CLAIMS (primary sources, checked 2026-06-23)
- **HLE ~30% wrong:** FutureHouse (Skarlinski, Laurent, Bou, **Andrew White**), "About 30% of Humanity's Last Exam Answers are Wrong." Primary: https://www.futurehouse.org/research-announcements/hle-exam — precise figure **29 ± 3.7% (95% CI)** of *text-only chem/bio* questions had answers contradicted by peer-reviewed literature. NUANCE worth keeping: HLE's own team's follow-up put expert disagreement at **~18%** (lower, but still large). LessWrong writeup: https://www.lesswrong.com/posts/JANqfGrMyBgcKtGgK/
- **FrontierMath ~1/3 fatal errors:** Epoch AI, exact quote verified — "We are conducting an AI-assisted review of FrontierMath: Tiers 1-4. This has flagged fatal errors in about a third of problems, and we believe most of these flags to be valid." (https://x.com/EpochAIResearch/status/2053995435870892048, ~2026-05-11). **UPDATE:** a later Epoch correction (reported ~2026-06-12) revised the affected share to **~42% of problems** after human review (123 problems Tiers 1-3 + 12 in Tier 4 corrected; 12 removed). The "1/3" is the conservative first pass; "~42%" is the corrected figure — cite both.

## TODO (remaining)
- Pull the raw deck slides 16–61 if a non-image transcript surfaces, to confirm the $100k and Gemini-0.727 numbers against the primary source (currently only via Digg aggregation).
