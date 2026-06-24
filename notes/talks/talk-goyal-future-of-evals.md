# Notes — "The Future of Evals"
**Speaker/Guest:** Ankur Goyal (Braintrust) · **Venue:** AI Engineer 2025 · **Type:** talk · **URL:** https://www.youtube.com/watch?v=MC55hdWLq4o

## Summary (3-6 sentences — what it argues, why it matters for agent evals)
This is a short (~5 minute) product-launch talk in which Goyal argues that the *practice* of running evals, while now critical to building the best AI products, is still painfully manual: you stare at a dashboard and then hand-edit prompts, data sets, and scorers. His thesis is that this is about to be automated. Braintrust is launching "Loop," an agent built into the product that automatically optimizes the three pillars of an eval — prompts, data sets, and scorers — and he frames this as only newly possible because frontier models have just gotten good enough at eval-improvement tasks (he cites Claude 4 as a ~6x breakthrough over the prior leading model). For agent evals, the key claim is recursive: evals are themselves becoming an agent-driven optimization loop, and the quality of an eval is the *combination* of good prompts, good data, and good scorers, not any one alone. The talk is mostly product demo and a hiring pitch, light on hard methodology.

## Key points (6-14 substantive bullets)
- Adoption data from Braintrust's customer base: the average org that signs up runs **almost 13 evals/day**; some customers run **more than 3,000 evals/day**; the most advanced teams spend **more than two hours/day** working in the product on their evals.
- The core pain Goyal names: even with a good dashboard, the eval workflow ends with a human looking at it and deciding "what changes can I make to my code or prompts so this eval does better" — the improvement step is entirely manual.
- **Loop** is an agent built into Braintrust that automatically optimizes prompts — from a single prompt up through "very complex agents" — and, importantly, also helps build better **data sets** and better **scorers**.
- Explicit framing that great evals are the *combination of three things*: prompts + data sets + scorers. Loop targets all three, not just prompt optimization.
- Loop exists only because of a measured capability jump: every quarter for two years Braintrust ran evals on frontier models testing how well they improve prompts, data sets, and scorers — and "until very, very recently they actually weren't very good."
- **Claude 4** is called out as the breakthrough moment, performing "almost six times better than the previous leading model before it" at these eval-improvement tasks.
- Availability: shipping behind a **feature flag** ("Loop") that existing or new Braintrust users can flip on immediately.
- Model-agnostic: defaults to Claude 4 but you can point Loop at any model you have access to — OpenAI, Gemini, or your own custom LLMs.
- Human-in-the-loop UX is deliberate: a lesson from users was how important it is to *look at the data and prompts* while working, so every suggested edit (to data, to a scoring idea, or to a prompt) is shown **side-by-side** in the UI before acceptance.
- For "the more adventurous," a **"just go for it"** autonomous toggle lets Loop optimize end-to-end without per-edit review — which Goyal says "actually works really well."
- Forward claim: over the next year evals "are going to be completely revolutionized" by frontier-model capability, shifting eval work from manual dashboard-staring to agent-driven optimization.

## Verified quotes (verbatim, with timestamps)
- "The average org that signs up for Brain Trust runs almost 13 EVELs a day. Some of our customers run more than 3,000 EVELs a day." [01:00] *(ASR renders "evals" as "EVELs"; otherwise verbatim.)*
- "the best thing you can do is look at a dashboard ... and you walk away and think okay what changes can I make to my code or to my prompts so that this eval does better." [01:40]
- "Every quarter for the last two years, we've run evals on the frontier models to see how good they are at actually improving prompts, improving data sets, and improving scorers. And until very, very recently, they actually weren't very good." [02:11]
- "we think that Claude 4 in particular was a real breakthrough moment ... it performs almost six times better than the the previous leading model before it." [02:28]
- "it also helps you build better data sets and better scorers because it's really the combination of these three things that make for really great evals." [02:49]
- "there's also a toggle that you can turn on that says like just go for it and it will go and optimize away. Um, which actually works really well." [03:58]

## What it adds (non-obvious, talk-specific value vs canonical written sources)
- **Concrete usage telemetry** rarely published elsewhere: 13 evals/day median, 3,000/day at the high end, 2+ hours/day of hands-on eval work — useful priors for how heavy real-world eval workflows actually are.
- A **dated capability signal** for the "can a model improve evals?" question: Braintrust ran a quarterly internal benchmark for two years and reports Claude 4 as a discrete ~6x step-change. This is a rare longitudinal, vendor-measured data point on meta-eval (models optimizing evals), even if the exact benchmark is undisclosed.
- The **three-pillar framing** (prompts + data sets + scorers must improve together) reframes "eval optimization" away from prompt-tuning alone — the data set and the scorer/judge are co-equal optimization targets.
- A practical product stance that the **human-review-vs-autonomy tradeoff** is a toggle, not a fixed mode — side-by-side diff review by default, full autonomy opt-in — which is a concrete pattern for self-improving eval loops.

## Themes
5 eval infra · 1 why-evals · 2 eval⇄capability⇄RL-env · 9 agent-specific · 8 judge/verifiers
