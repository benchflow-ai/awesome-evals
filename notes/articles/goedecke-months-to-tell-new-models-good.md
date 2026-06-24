# Notes — "Why it takes months to tell if new AI models are good"
**Author:** Sean Goedecke (GitHub, works on GitHub Models) · **URL:** https://www.seangoedecke.com/are-new-models-good/ · **Type:** blog · **Found:** true

## Summary
A working engineer's argument that we have no reliable way to judge a frontier model at launch — neither benchmarks nor vibe-checks survive contact with reality. Benchmarks are a target the labs are financially incentivized to optimize against, so "strong evals" on launch day carry almost no signal. Subjective vibe-checks (SVG pelicans, word puzzles, Minecraft builds) lose discriminative power once models clear the easy bar, so they tell you little at the frontier. The only signal Goedecke trusts comes from personally doing hard real work alongside the model over weeks, because you can't judge a solution to a problem you haven't engaged with yourself. His worked example: GPT-5 was widely panned at launch, yet three months later GPT-5 / GPT-5-Codex turned out to be very strong for agentic work — illustrating the long lag between release and real verdict. The consequence is epistemic: it's genuinely hard to tell whether AI progress is stagnating, because the measurement layer is broken at exactly the moment everyone wants an answer.

## Key points
- **Launch-day uncertainty is total.** "Nobody knows how good a model is when it's launched. Even the AI lab who built it are only guessing." The people with the most information are still guessing.
- **Benchmarks are a gamed target.** Eval performance moves stock prices, so labs are incentivized to optimize for it ("teaching to the test"); since *every* new model ships with strong evals, the scores have no discriminative power between models.
- **Evals are mostly marketing.** It's hard to assess how good an eval even is, or whether a given model was tuned to it — so a high score is closer to a press release than a measurement.
- **Vibe-checks break at the frontier.** Cute probes (word puzzles, SVG drawings) work as a low-end filter, but "current models are too strong for obvious word puzzles," and "at some point it becomes difficult to draw conclusions from the images." Once models pass you, you can't rank what's above you.
- **The plateau illusion.** If models really were getting steadily smarter, the *felt* experience would be rapid subjective improvement followed by "an immediate plateau as the models surpass you and you become unable to tell how smart they are" — i.e., apparent stagnation can be an artifact of your own ceiling, not the model's.
- **Real signal requires doing the work.** "If you're not engaging with the problem yourself, you will have no idea if the model's solution is any good." Judging output on a hard task requires having done (or attempted) that task.
- **His concrete method:** ask a strong agentic coding model to do a real task *in parallel* with his own effort, then compare — a personal, expensive, slow A/B against ground truth he actually understands.
- **Evaluation is costly and risky.** "Testing out a new model can be risky. If it's no good, you've wasted a fair amount of time and effort" — which is why most people fall back on cheap, unreliable signals (benchmarks/vibes) instead.
- **Worked example of the lag:** GPT-5 launched to a negative consensus; "three months later it turns out that GPT-5 (and its derivative GPT-5-Codex) is a very strong model for agentic work." The real verdict trailed the launch by months.
- **Net consequence:** "it's very hard to tell if AI progress is stagnating or not" — the broken measurement layer, not the models, is the bottleneck on knowing.

## Verified quotes
- "Nobody knows how good a model is when it's launched. Even the AI lab who built it are only guessing and hoping it'll turn out to be effective for real-world use cases." — https://www.seangoedecke.com/are-new-models-good/
- "evals are a target for AI companies. How well Anthropic or OpenAI's new models perform on evals has a direct effect on the stock price" — https://www.seangoedecke.com/are-new-models-good/
- "if you're not engaging with the problem yourself, you will have no idea if the model's solution is any good" — https://www.seangoedecke.com/are-new-models-good/
- "and then an immediate plateau as the models surpass you and you become unable to tell how smart they are." — https://www.seangoedecke.com/are-new-models-good/
- "But three months later it turns out that GPT-5 (and its derivative GPT-5-Codex) is a very strong model for agentic work" — https://www.seangoedecke.com/are-new-models-good/
- "testing out a new model can be risky. If it's no good, you've wasted a fair amount of time and effort" — https://www.seangoedecke.com/are-new-models-good/

## What it adds / why it's good
Most benchmark-skepticism comes from researchers critiquing leaderboard methodology (contamination, Goodhart, Arena bias). This is the *practitioner's* version of the same critique, and it adds two things the academic sources don't. First, it names the failure of the obvious *alternative* to benchmarks — the vibe-check — and explains precisely why it fails (it's a low-pass filter that goes blind above your own skill ceiling). Second, it reframes "stagnation" debates as an *observability* problem rather than a capability fact: the felt plateau may be your measurement ceiling, not the model's. The GPT-5 launch-vs-three-months-later example is a clean, dated case study of the launch-day-signal gap, grounded in someone who evaluates models for a living at GitHub Models. The non-BS takeaway for eval design: trustworthy signal is expensive, requires a human who has independently done the task, and arrives on a timescale of weeks — not on launch day. It's short and informal (not rigorous data), but the core argument is sound and useful.

## Themes
- **1 why-evals** — central: argues no current method reliably tells you if a model is good.
- **6 benchmark-vs-eval/integrity** — central: benchmarks as gamed, stock-price-linked marketing targets vs. real-task evaluation.
- **9 agent-specific** — his real-work signal is agentic coding (GPT-5-Codex, parallel task execution).
- **4 observability/surfaces** — reframes "is progress stagnating?" as a measurement/observability ceiling problem (the plateau illusion).
