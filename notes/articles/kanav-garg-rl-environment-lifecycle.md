# Notes — "The Life Cycle of an RL Environment: From idea to large model training"

**Author:** Kanav Garg — Co-founder & Researcher, **Core Automation** (a new research lab, ~1 month old). Previously **Google DeepMind** for 2 years; one of the initial inventors of computer use; shipped the first computer-use product (**Project Mariner**); collaborated with 10+ RL-environment companies; integrated RL environments into the main Gemini models.
**Format:** 28-slide deck (read in full from local PDF).
**Why it matters to the book:** This is the single best answer to the reader's question — *how do you go from "if you can eval it, you have it" to actually having it?* The answer is the RL-environment lifecycle. It directly pressure-tests our thesis and Principle 3.

## The 6 components of an RL environment (≈ our "agent eval is a system")
1. **Prompt** — the task instruction. Should be specific, actionable, verifiable; feel natural; have stylistic variations.
2. **Initial State** — input files, instructions, setup scripts. "A poorly configured initial state can make a perfectly good task unlearnable." (≈ our P6 "task = world state + goal + verifier")
3. **Environment** — the substrate: Linux box / Docker container / user's computer / bash shell. (≈ our P7 "worlds")
4. **Configuration** — runtime tweaks: internet access, screen resolution, available tools, package install. (SWE-Bench: internet off, only bash exposed.) (≈ our P2 harness/config)
5. **Reward** — verifier functions. Scalar vs Boolean. Three reward types — **Model-judged, Agentic, Execution-based** — "all combined with different weights" = the foundation of **reward shaping**. (≈ our P11/P12 judges-vs-verifiers, but adds the *combine-with-weights* idea)
6. **Agent Loop (Harness)** — the main loop (like a Codex harness): expose tools → process tool calls → return responses. (≈ our P2/P4)

> A benchmark/eval and an RL environment share these components — **the eval IS the environment minus the policy-update loop.** (corroborates our P2/P3 + Han-Chung Lee.)

## The lifecycle (the part our book is MISSING)
1. **Design** → 2. **Verify** (it runs, produces non-zero reward) → 3. **Difficulty Calibration** → 4. **Single-Dataset Ablation** → 5. **Reward Shaping** → 6. **Full-Bundle Ablation** → 7. **Maintain**.

### Difficulty calibration (the crux)
- Goal: find tasks an open-source model passes at a **non-zero but low rate — ideally 1–4 out of 16 ("assay-16" / the Goldilocks zone).**
- **"Over 90% of data has been thrown out first-hand because tasks became too easy."**
- Too easy (12–16/16): no room to learn. Just right (1–4/16): RL can sharpen to 12–14/16. Too hard (0/16): maybe nothing to learn (partial scalar rewards still useful).

### Why the Goldilocks zone matters: **RL = variance reduction**
- Before RL: agent right **1–2 / 16** (unreliable, users can't depend on it). After RL: **12–14 / 16** (reliable).
- **"RL sharpens the distribution. If the agent can occasionally solve a task, RL makes it solve that task reliably."**
- **THIS is the bridge:** "if you can eval it" gets you a task the agent *sometimes* passes; turning *sometimes* into *reliably* is what RL/training does. Evaluation is necessary but not sufficient.

### Difficulty calibration ≠ done
- "This is only **40–50%** of the way there." Most reward-hacking stories **unfurl in later stages, during RL ablations** — low-hanging hacks get caught early; subtle hacks emerge under training pressure.

### Choosing what data to add to RL
Target capabilities; transfer to siblings (does SWE-Bench training help web-dev / reverse-engineering?); work backwards from the capability; **use evals honestly** ("Evals keep you focused. Vibe testing in products and transfer results keep you honest. Most evals are not fully representative of what users actually care about.").

### Stage 1 — single-dataset training
Train only on the new dataset, small batch, 4–5 epochs (isolate the signal). Watch reward slope, scalar rewards, qualitative behavior. Red flags: no improvement → unlearnable; reward shoots up too fast → new reward hack.

### Reward shaping
Reward self-verification (test-writing); reward exploring ≥3 files before editing; nuanced rubrics. "Simple rewards are hackable" → make them progressively more nuanced. Iterative science + art.

### Stage 2 — full-bundle ablation
Add the 500–1,000-task dataset at **~5% of the full data distribution**; train against a clear no-dataset baseline; check reward slope, cross-dataset transfer (+/-), downstream evals; try a 10% mixture. Mixture is "an art as much as a science."

### The most important thing: **look at traces**
"I can't stress enough how extremely important it is to look at the behavior changes." **10× more reward hacks are discovered during training** than during difficulty calibration. Hard tasks breed hacking → then learning. Evals don't tell the whole story; qualitative trace analysis after training is often more revealing than eval scores.

### Handling reward hacking
**Golden rule:** never reward a task completed in an unintended way — traces with reward hacking get a negative/bad reward, **always.** Counterintuitive: a task with early-stage reward hacking is **not necessarily a bad task** — with the right rewards it can become an excellent training signal. People throw away good tasks because they see early hacking. Don't.

### Automating the quality pipeline
Agent trace review (agent inspects traces for reward hacking) → multi-stage prompted-checkpoint filters → SFT seed traces (rejection-sampled RL runs for fine-tuning). "The art of RL-env creation has shifted: the majority of effort is now in **building the right pipeline**, not designing individual tasks." Using RL runs to improve SFT creates a **virtuous cycle**.

### Maintain (datasets are living)
Shrinking dataset lifespan as models improve; continuously monitor the same distributions you checked at creation; add complexity/scope instead of discarding; **maintain like a codebase.** "Era of experience" — human-data value approaching its ceiling; frontier = synthetic data / synthetic RL-env pipelines (cf. David Silver).

## Integration proposal for the book
- **Refine the thesis / P3.** "If you can eval it, you have built it" is too glib. The honest version: *a verifiable eval makes a capability **trainable and reliable**, but having it requires the lifecycle (difficulty calibration → variance reduction → reward shaping → de-hacking).* Eval = necessary, not sufficient.
- **Strong candidate for a new/expanded principle:** "From Eval to Capability: An Eval Is the Start of an RL Environment" — difficulty calibration (Goldilocks 1–4/16), RL = variance reduction, reward hacking unfurls under training pressure, look at traces.
- Reinforces P16 (Evals Rot / living datasets) and P12 (reward shaping vs hackable rewards) and P5 (look at traces).
