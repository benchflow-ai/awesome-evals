# Notes — "Evals Are Not Unit Tests"
**Speaker/Guest:** Ido Pesok (Vercel v0) · **Venue:** AI Engineer 2025 · **Type:** talk · **URL:** https://www.youtube.com/watch?v=L8OoYeDI_ls

## Summary
An introductory, application-layer (not research-lab) framing of evals, built entirely around one extended analogy: an eval is a basketball court, not a unit-test suite. Pesok argues that because LLMs are non-deterministic, the demo-to-prod gap is real and dangerous ("demo savvy" apps that hallucinate in production), and that the hard part is the crucial 5% of behavior that classic unit/E2E tests can't cover. The core discipline he prescribes is "understand your court": collect the real distribution of user queries, plot where the system succeeds (blue) vs fails (red), and avoid wasting effort on out-of-bounds (off-domain) queries. He decomposes an eval into data (points on the court), task (the shot / the code path you're testing), and score (did the ball go in), and pushes for deterministic pass/fail scoring, factoring constants into data and variables into the task, sharing code between eval and production, and wiring evals into CI for regression reports. The throughline: "improvement without measurement is limited and imprecise."

## Key points
- **Concrete war story (the framing device):** "Fruit Letter Counter," a joke app counting letters in fruit (a riff on "how many R's in strawberry"). GPT-4.1 returns "three" twice in testing, ships, then a user ("John") gets "two" in prod — illustrating non-determinism surviving manual spot-checks.
- **The demo-to-prod trap:** AI apps are "demo savvy" — they look great in a demo for coworkers, then "hallucinations come and get you" in production. This is presented as a distinct failure mode of AI products vs normal software.
- **The 5% that matters:** "95% of our app works 100% of the time" — you can unit-test/E2E-test login, signout, every function — but the crucial ~5% of LLM behavior is what fails, and it's exactly what traditional tests don't catch.
- **Users invent inputs you can't imagine:** the second failure comes from a compound multi-fruit query. Lesson: production users generate queries "you could have never imagined."
- **The basketball-court model:** data = a point on the court; distance from the basket = difficulty (farther shots are harder); court boundaries = your domain. Blue dot = make, red dot = miss; a make that lands out of bounds doesn't count.
- **Eval = data + task + score** (using Braintrust's vocabulary, which he names): data is the point, the **task** is "the way you shoot the ball" (the code path under test), and the **score** checks whether it went in.
- **"Understand your court" is the most important step.** Two traps: (1) out-of-bounds — don't build evals for queries users don't care about (e.g. "how many syllables in carrot"); (2) concentrated points — don't cluster all test cases in one region; test across the whole court including boundaries.
- **Data-collection tactics:** thumbs up/down (noisy but good signal on where you struggle); reading ~100 random log samples once a week if you have observability ("highly recommended"); community forums; X/Twitter (great but noisy). "There really is no shortcut here."
- **Factor constants into data, variables into the task** — like factoring constants in math/programming. The user question ("how many R's in strawberry") is a constant that lives in data; the system prompt / preprocessing / RAG you're varying lives in the task. This means changing your system prompt doesn't force you to rebuild the dataset.
- **Share code between eval and production:** recommends AI SDK **middleware** as the abstraction holding preprocessing/RAG/system-prompt logic, shared between the live API route and the evals — "you want your practice to be as similar as possible to the real game."
- **Scoring: lean deterministic, pass/fail.** Over-engineered scores are hard to debug and hard to share across teams ("no one will understand how these things are getting scored"). Guiding question: "what am I looking for to see if this failed?" — for v0 it's "did the code not work."
- **Human review is acceptable when code can't capture the signal** — "you must do human review to get the correct signal... it will pay off in the long run."
- **Scoring trick:** add a little extra to the prompt for eval-time only — e.g. "output your final answer in these answer tags" — to make string matching easy, even though you wouldn't want that in production.
- **Evals in CI:** Braintrust eval reports run the task across all data and surface improvements/regressions per PR — visualize whether a prompt change flipped tiles red→blue, and crucially whether it fixed one region while breaking another.
- **Run on a schedule:** the v0 team runs evals "every day at least" to catch regressions; a Q&A point raised running the same question N times (e.g. 4/5, 5/5) as a reliability percentage, especially for harder (farther) questions.
- **Payoff framing:** good evals → better reliability/quality, higher conversion and retention, and less time on support/ops.

## Verified quotes
- "by nature, LMS can be very unreliable. And this principle scales from a small letter counting app all the way to the biggest AI apps in the world." [02:44]
- "an interesting thing if you think about it is 95% of our app works 100% of the time. We can have unit tests for every single function... but it's that most crucial 5% that can fail on us." [04:16]
- "To make good evals, you must understand your court. This is the most important step." [06:13]
- "you want to put constants in data, variables in the task. So just like in math or programming, you want to factor constants so it improves clarity, reuse, and generalizations." [09:17]
- "you want your practice to be as similar as possible to the real game. That's what makes a good practice. So you want to share pretty much the exact same code between evals and what you're actually running." [10:30]
- "improvement without measurement is limited and imprecise. And evals give you the clarity you need to systematically improve your app." [13:39]

*Note: lines are auto-captioned. I lightly corrected obvious ASR errors (e.g. "Verscell"→Vercel, "Vzero"→v0, "ChachiBT"→ChatGPT, "evout"→evals are not changed inside quotes; the quoted "LMS" is left as in the transcript). Wording is otherwise faithful.*

## What it adds
- **A genuinely useful pedagogical model**: the basketball-court visualization (difficulty = distance, domain = boundaries, red/blue tiles) is a memorable, talk-specific way to reason about *test coverage of an input distribution* — something canonical written guides describe abstractly. The "out-of-bounds trap" and "concentrated points trap" are concrete coverage anti-patterns most write-ups don't name.
- **The "constants in data, variables in the task" factoring rule** is a crisp, practical insight: it decouples your dataset from your system-prompt/RAG iteration so you don't rebuild datasets every time you change the harness — a workflow point rarely stated this explicitly.
- **Concrete tooling specifics from a high-volume production app (v0, 100M+ messages):** the Braintrust data/task/score vocabulary, AI SDK middleware as the shared abstraction between eval and prod, eval-in-CI regression reports, and "run daily." This grounds the advice in a real shipping system rather than theory.
- **The eval-time prompt-tweak hack** (adding answer tags only for scoring) is a tactical detail that's easy to miss and rarely written down.
- Caveat for a curated base: this is an *intro* talk at the application layer. It does not cover LLM-as-judge rubrics in depth, agent/multi-step trajectory evals, RL environments, or statistical rigor (sample sizes, confidence intervals) — the N-times reliability idea only surfaces briefly in Q&A.

## Themes
1 why-evals · 4 observability · 5 eval infra · 6 benchmark-vs-eval · 8 judge/verifiers · 9 agent-specific
