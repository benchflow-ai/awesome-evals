# Notes — "Ep 50: A Field Guide to Rapidly Improving AI Products"
**Speaker/Guest:** Hamel Husain (Vanishing Gradients) · **Venue:** Vanishing Gradients · **Type:** podcast · **URL:** https://www.youtube.com/watch?v=rWToRi2_SeY

## Summary (3-6 sentences — what it argues, why it matters for agent evals)
Hamel Husain argues that "evals" is not a metric but an entire process: the disciplined work of looking at your data, doing error analysis, and externalizing what "better" actually means for your product. His central claim is that humans cannot articulate what they want from an LLM in the abstract — they only discover it by reacting to real LLM outputs, so evaluation and product development are the same activity. He repeatedly observed (in public office hours and courses) that practitioners get lost not because they lack agent frameworks, RAG databases, or prompting tricks, but because they skip the fundamentals: looking at traces and doing error analysis. The talk is essentially a tour of his "Field Guide to Rapidly Improving AI Products" blog post — data viewers, integrated/admin prompt environments for domain experts, error-analysis-driven prioritization, and knowing when (and when not) to write an eval. For agent evals specifically it matters because it frames evals as a prioritization and discovery loop driven by the most-upstream observed failure, not a saturated test suite.

## Key points (6-14 substantive bullets)
- **"Evals" is a process, not a metric.** If you think of evals as just a number, you're thinking about it wrong; it's the whole loop of looking at data, error analysis, and refining your vision of what the AI should do. ([00:04], [20:53])
- **Error analysis reveals the highest-ROI improvements** and is how you prioritize across an "infinite surface area" of things you could test. Let error analysis show you that RAG — and specifically retrieval — is the problem before you build eval harnesses for retrieval. ([01:28], [14:56])
- **A simple data viewer is your most important AI investment.** Hamel/Greg vibe-code custom JSON viewers (and spreadsheets) with pass/fail, reason, and logging fields to look at LLM logs and telemetry. ([07:53], [16:01])
- **Don't write evals for obvious engineering bugs.** When you first do error analysis you'll see broken things (RAG syntax errors, docs not being pulled) — just go fix those. This is unlike code TDD where you'd write a test for any error. ([12:25], [13:43])
- **Write evals for things you're not yet sure how to fix** and need to iterate on (e.g., dates being interpreted incorrectly when users make appointments; model parroting "would you like to go to the next step?"; system-prompt content like user IDs leaking into output). ([13:09], [18:30])
- **Choose hard / non-trivial evals** — ones you don't quite know the answer to yet. Trivial always-passing evals tell you nothing. ([14:32])
- **LLM evals carry overhead, so do a cost-benefit analysis per eval** — more so than with unit tests. Costs aren't just compute/API; the scarcest cost is your limited **attention bandwidth**. Curate and remove evals to keep signal high. ([13:23], [17:42])
- **Don't saturate your evals / don't chase 100% pass rate.** He cites a YC company, Case Text, advising "get to 100% pass rate" as bad advice — a 100% pass rate means the eval is telling you nothing. ([18:11])
- **Don't over-write evals prospectively** for every conceivable brainstormed problem; that paralyzes you. Respond to error analysis instead. ([14:38])
- **Fix the most-upstream failure first.** In a chain or multi-turn conversation, stop at the first failure you notice, note it, and fix upstream failures before downstream ones — a simplifying heuristic. ([16:21])
- **During first-pass error analysis, just observe — don't categorize.** Build intuition first, categorize later. It's diagnostic, not prescriptive, at this stage. ([16:52])
- **Empower domain experts, not just engineers, via "integrated prompt environments."** A key failure mode: infrastructure where only engineers can change prompts. Build an admin view in your app (with templating/settings) so domain experts can edit prompts; hiding prompts from them slows you down tremendously. ([08:55], [09:43])
- **Start with vibe checks and an MVP, then add a minimum viable evaluation (MVE).** Hugo's framing: alongside the MVP build a small harness so swapping the model gives results you can iterate on; don't be dogmatic about evals at the very start. ([11:42], [11:59])
- **Levers to tune, error-analysis-driven:** prompt engineering, few-shot examples, fine-tuning with curated data, chunking strategies, retrieval changes — choose whichever your system gives you access to, guided by error analysis. ([23:44])
- **Qualitative vs quantitative:** qualitative evals suit LLM-as-judge; quantitative is often code-based. RAG is special — use standardized information-retrieval metrics, especially for the retrieval ("R") component. ([25:05])
- **Backed by research:** he points to Shreya Shankar et al.'s paper — "alignment is iterative, criteria- and implementation-specific": participants needed to externalize criteria to grade outputs, but also needed to grade outputs (with feedback on why they were bad) in order to externalize their criteria — a large-scale study, not just anecdote. ([23:08], [24:47])

## Verified quotes (VERBATIM with [mm:ss] timestamps)
- "If in your mind, if evals is just a metric, then you're thinking about evals wrong. It's not a metric. It's a entire process." ([00:04] / repeated [20:53])
- "There's an infinite surface area for you to test and for you to eval. And so, you need to let the error analysis help you prioritize." ([01:28])
- "Discovering what you want takes work. Discovering what your users want, that takes work. So, evals in in that is wrapped up so tightly together." ([01:14])
- "A YC company called Case Text, they went on this podcast and said, 'Hey, you should try to get to 100% pass rate on your evals.' And that is bad because if you get to 100% pass rate, it means... your eval is not telling you anything. So, you should not saturate your evals." ([18:18], lightly trimmed ASR filler; wording faithful)
- "There's compute API costs, there's all but the most important one is your attention. You have a limited attention bandwidth... and you need to be very careful not to completely overwhelm that and have it be high signal as possible." ([17:42], minor ASR cleanup)
- "You can't really make the LLM better if you don't have a precise definition of what that is." ([22:29], lightly fixed from ASR "if you don't give it if you don't have")

## What it adds (non-obvious, talk-specific value vs canonical written sources)
- The **office-hours war story**: Hamel stopped running public office hours because *every single* conversation went the same way — people building agentic/multi-turn things, asking "what next?", and universally not looking at traces or doing error analysis. This is the lived evidence behind the written field guide. ([07:22], [08:01])
- The explicit **"don't write an eval for it" rule**: drawing a sharp line between obvious engineering bugs (just fix them) and genuine model-behavior uncertainty (worth an eval) — a nuance softer in TDD-flavored eval advice. ([12:25])
- **Attention as the binding constraint** on how many evals to keep — reframing eval cost away from $ toward human signal-bandwidth, and the corollary to actively prune evals. ([17:42])
- The **anti-100%-pass-rate / don't-saturate** point with a named source (Case Text on a podcast) as a concrete cautionary tale. ([18:18])
- The **most-upstream-failure heuristic** for multi-turn/agent traces as a concrete triage rule. ([16:21])
- **"Observe first, categorize later"** for first-pass error analysis — actionable workflow detail rarely spelled out. ([16:52])
- Grounding the "you discover what you want by reacting to outputs" thesis in Shreya Shankar's empirical study of many AI engineers, not just intuition. ([23:08])

## Themes
1 why-evals · 3 model/harness/skill · 4 observability · 5 eval infra · 6 benchmark-vs-eval · 8 judge/verifiers · 9 agent-specific
