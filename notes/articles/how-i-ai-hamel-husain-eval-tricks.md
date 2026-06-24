# Notes — "How I AI: Simple, High-Impact Eval Tricks (with Hamel Husain)"

**Author:** Claire Vo (host) with Hamel Husain (guest) · **URL:** https://www.youtube.com/watch?v=PgzOBNse2EA · **Type:** talk (podcast / screen-share walkthrough) · **Found:** true

> Note on sourcing: the YouTube transcript could not be fetched directly. This note is built from the episode's published recaps and show notes (Lenny's Newsletter, ChatPRD's detailed episode write-ups, and Claire Vo's own LinkedIn post). Quotes below are drawn from those recaps' renderings of the episode, not from a verified primary transcript — see the "Verified quotes" caveats. The episode (published Oct 13, 2025, ~55 min; titled on Lenny's/Spotify as "Evals, error analysis, and better prompts: A systematic approach to improving your AI products") is the same one Claire Vo promotes as "Simple, High-Impact Eval Tricks."

## Summary

Live on a "How I AI" episode, Claire Vo gets Hamel Husain to screen-share his actual consulting workflow on a real client product — Nurture Boss, an AI assistant for apartment/property managers — instead of talking eval theory. The throughline is anti-glamour: stop "vibe checking," sample ~100 real production traces, and *just read them* with your own eyes, writing a one-sentence note on the first thing that went wrong in each. Those freeform notes get bucketed and counted by an LLM into a prioritized list of failure modes, which becomes your eval roadmap. He's emphatic that LLM-as-judge evals must be **binary pass/fail for one specific failure**, not arbitrary 1–5 "helpfulness" scores, and that you must hand-label ground truth to validate the judge before trusting it. He also makes the case for a cheap, custom DIY annotation/eval viewer over heavyweight off-the-shelf platforms, because reducing review friction is what actually gets the work done.

## Key points

- **"Just look at your data" is the whole first move.** Randomly sample ~100 real production traces (he calls it open coding / error analysis) and read them. Real users are "vague, use slang, and make typos" — nothing like the clean test cases teams imagine. Claimed cost: "just a few hours of focused work," and he says some clients are thrilled by *this step alone*, before any eval code exists.
- **Annotate the most-upstream error only.** For each failing trace, write a one-sentence note about the *first* thing that went wrong — "the very first error in the sequence of events, because that's usually the root cause." Don't catalog every downstream symptom.
- **Counting beats intuition.** Dump all the freeform notes into Claude/ChatGPT, ask it to cluster them into themes, then count occurrences. "Counting is powerful" — frequency gives you a data-driven roadmap instead of guessing which fix matters.
- **Nurture Boss top failure modes (the war story):** (1) transfer/handoff issues, (2) tour-scheduling confusion (booking a *new* tour vs. rescheduling an existing one), (3) lack of follow-up / not asking clarifying questions. A concrete trace: user typed "Hello there, what's up to four month rent?" and the bot guessed about rent specials; Hamel's error note was that it should have asked a clarifying follow-up because the user's intent was unclear.
- **Two eval types, picked by the failure.** Objective/deterministic failures → cheap **code-based assertions** (e.g., "does the output contain a UUID?" / does it leak an ID). Subjective failures (tone, quality of a handoff) → **LLM-as-judge**.
- **LLM judges must be binary.** A judge should return pass/fail for *one specific problem*, not a score. He skewers vague composite scores like "Helpfulness: 4.2" / "Conciseness: 3.8" as essentially meaningless and un-actionable.
- **One judge per failure mode.** Because each judge is binary and scoped to a single problem, you end up with a small library of targeted judges rather than one omnibus "quality" grader.
- **You must validate the validator.** Hand-label a set of traces yourself to create ground truth, then measure how often the LLM judge agrees with your labels. If it doesn't agree, you can't trust it. (References the "Who Validates the Validators?" line of work.)
- **Build a small DIY eval/annotation viewer.** Rather than defaulting to a big platform, he favors a minimal custom tool that renders the full trace (system prompt, user turns, tool calls, RAG lookups, outputs) and makes labeling fast — friction reduction is the point, because the bottleneck is human review throughput, not features. Off-the-shelf options mentioned for logging/visualization: Braintrust, Arize Phoenix.
- **Close the loop.** Each counted, high-frequency failure becomes a targeted fix — prompt engineering, RAG improvement, or fine-tuning — and the same evals measure whether the fix worked. The framing for skeptics: "do the hard work," move past vibe checks.

## Verified quotes

(Quotes are rendered from the episode recaps named in the sourcing note above; I could not confirm them against the raw YouTube transcript, so treat exact wording as recap-level rather than transcript-verified.)

- On binary judges: "LLM judges should give you a simple binary result (yes/no, pass/fail) for a *specific problem*. They shouldn't be generating arbitrary scores (like a 'helpfulness score' of 4.2 vs. 4.7, which is pretty meaningless)." — via ChatPRD recap, https://www.chatprd.ai/how-i-ai/debugging-ai-writing-evals
- On validating judges: "You *must* hand-label some data and compare the LLM judge's scores to the human labels." — via ChatPRD recap, https://www.chatprd.ai/how-i-ai/debugging-ai-writing-evals
- On the upstream error: focus on "the *very first error* in the sequence of events, because that's usually the root cause." — via ChatPRD recap, https://www.chatprd.ai/how-i-ai/debugging-ai-writing-evals
- Nurture Boss trace note (user asked "Hello there, what's up to four month rent?"): "Should have asked follow up questions about the question... because it's unclear user intent." — via ChatPRD recap, https://www.chatprd.ai/how-i-ai/debugging-ai-writing-evals

## What it adds / why it's good

Most eval content (including Hamel's own blog) tells you *what* to do; this episode is valuable because it's a **live screen-share over a real, messy client product**, so you watch the unglamorous part: him scrolling through ugly real traces and typing one-line notes. That makes three things concrete that practitioners usually fumble: (1) the open-coding step is *qualitative reading*, not metric-staring — and it's the highest-ROI thing a PM can do day one with zero infra; (2) the bridge from freeform notes → counted, prioritized failure taxonomy via an LLM is a copyable mechanic, not a vibe; (3) the "binary judge per specific failure, then validate against hand labels" rule is delivered with a real anti-pattern (the 4.2 helpfulness score) that teams actually ship. The DIY-viewer argument — build the cheap thing that lowers labeling friction rather than buying a platform — is the non-obvious, anti-tooling-hype takeaway. Net: it's a workflow you can copy on a Tuesday, aimed squarely at PMs/builders "intimidated by evals," not researchers.

## Themes

1 why-evals · 4 observability · 5 eval infra · 8 judge/verifiers · 9 agent-specific
