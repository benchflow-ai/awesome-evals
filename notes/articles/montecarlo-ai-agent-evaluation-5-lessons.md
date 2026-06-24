# Notes — "AI Agent Evaluation: 5 Lessons Learned The Hard Way"

**Author:** Alik Peltinovich, Michael Segner, Elor Arieli, Lior Gavish (Monte Carlo) · **URL:** https://www.montecarlodata.com/blog-ai-agent-evaluation/ · **Type:** eng-blog · **Found:** true

## Summary (3-6 sentences)
Monte Carlo's data-reliability team shares five hard-won lessons from building and evaluating their Troubleshooting Agent — a production system that uses hundreds of sub-agents to investigate data incidents and determine root causes. The piece is explicitly war-stories framing: each lesson is something that broke a naive eval setup in practice. The throughline is that LLM-as-judge evals are themselves unreliable artifacts that need their own engineering — thresholding, retries, mandatory rationales, and meta-validation. They also tackle the economics nobody discusses: evals can quietly cost more than running the agent, so they localize tests to individual LLM calls and gate them on relevant PRs. It's grounded in a real CI/CD eval pipeline rather than a vendor capabilities checklist.

## Key points (5-12 substantive bullets)
- **Cosine similarity / semantic distance doesn't work for agent outputs.** They tried vector-based semantic-distance scoring and abandoned it because "the wording was similar, but the meaning was different" — surface similarity masks meaning divergence. This pushed them toward LLM-as-judge.
- **Soft-failure banding instead of binary pass/fail.** Judge scores are bucketed: below 0.5 is a hard failure, above 0.8 is a pass, and 0.5–0.8 is a "soft failure." Soft failures are allowed to merge individually but aggregate into a hard failure when 33% of tests soft-fail OR more than 2 soft failures occur total. This is a concrete, copyable thresholding policy for a CI gate.
- **Automatic retries to absorb judge flakiness.** Roughly one in ten tests produces a spurious result — the agent output is fine but the *evaluator* hallucinates. They auto re-run evaluations to catch these false negatives rather than blocking merges on judge noise.
- **Mandatory explanations from every judge.** Every LLM judge must emit a rationale alongside its score, not just a number. This speeds debugging (you can see *why* a test failed) and builds trust in the eval suite — a numeric-only score is uninspectable.
- **Evaluate the evaluators (meta-eval).** Tests themselves are validated by running them multiple times; flaky evaluations get revised or removed. The evals are treated as fallible code, not ground truth.
- **Localized tests over full agent runs.** "We won't spin up the agent and do an entire run to test the outputs of one LLM call." They test individual components/LLM calls in isolation, which is cheaper and more diagnostic.
- **Conservative triggers to control eval cost.** Tests only fire on PRs that modify the relevant component. This is driven by a real cost war story (below).
- **The eval-cost war story.** They spoke with a data + AI team whose eval costs "crept up to 10x the cost of running the agent itself" — motivating the localized-tests + conservative-trigger discipline. Implicit target is closer to a 1:1 eval-to-operation cost ratio.
- **A failure taxonomy across four axes:** Data (input drift, missing context), Systems (tool changes, orchestration), Code (prompts, formatting), and Model (version updates, model selection). This frames *where* agent regressions originate, useful for trace triage.
- **Product grounding:** the Troubleshooting Agent reportedly delivered 80%+ acceleration in root-cause analysis — the eval discipline exists to protect that production system through ongoing changes.

## Verified quotes (1-4 VERBATIM, with URL)
From https://www.montecarlodata.com/blog-ai-agent-evaluation/ :
1. "Anything less than a .5 is a hard failure, while anything above a .8 is a pass. Soft failures occur for scores between .5 to .8."
2. "In our experience, about one in ten tests produces a spurious result where the output is fine but the tests are hallucinating."
3. "We now ask every LLM judge to not just provide a score, but to explain it."
4. "We spoke with one data + AI team that told us the cost of their evaluations crept up to 10x the cost of running the agent itself!"

## What it adds / why it's good
Most "agent eval" posts stop at "use LLM-as-judge." This one starts there and treats the judge as an unreliable subsystem that needs its own SLA: thresholding bands, a documented soft-fail aggregation rule (33% / >2), retry logic for the empirically-measured ~10% judge hallucination rate, and meta-evaluation of the tests themselves. Two things are rare and valuable here: (1) the explicit *economics* of evals — the 10x-cost war story and the localized-test response are something almost no capabilities-checklist source mentions; and (2) concrete, copyable numeric policies (0.5/0.8 bands, 33% rule) rather than hand-wavy principles. The four-axis Data/Systems/Code/Model failure taxonomy is also a usable lens for trace triage that maps cleanly onto a data-tooling team's mental model. Caveat: it's still partly a Monte Carlo product narrative, and the numbers (1-in-10, 10x, 80%) are anecdotal/self-reported, not benchmarked.

## Themes
1 why-evals · 4 observability · 5 eval infra · 8 judge/verifiers · 9 agent-specific
