# Notes — "Successful language model evals"

**Author:** Jason Wei · **URL:** https://www.jasonwei.net/blog/evals · **Type:** blog · **Found:** true

## Summary
A practitioner's checklist from inside a frontier lab (Wei was at Google Brain / OpenAI) on why most evals never get adopted, even when the task seems reasonable. The framing thesis is that evals are *incentives*: they function as the objective function the research community optimizes against, so a successful eval is one that gets buy-in and survives, not merely one that is well-designed on paper. The bulk of the post is a list of seven properties of a good eval — equivalently, seven common ways people "mess up" an eval — covering sample size, data quality, simplicity, cost to run, task meaningfulness, grading correctness, and resistance to saturation. The recurring message is that adoption is fragile: a single visible grading or parsing error makes researchers distrust and abandon an eval immediately. It is a distinct, more pragmatic companion to Wei's "verifier's law" writing — this one is about what makes a benchmark *actually used* rather than about the theory of verifiability.

## Key points
- **Evals are incentives.** "Evals are incentives for the research community, and breakthroughs are often closely linked to a huge performance jump on some eval." Good evals with buy-in become the objective function AI researchers optimize.
- **Enough examples (≥1,000).** Too few examples makes the eval noisy and creates a "bad UI" — score fluctuations between checkpoints swamp real signal. Rule of thumb: at least ~1,000 examples, possibly more for multiple-choice evals (where guessing inflates variance).
- **High-quality data.** Errors in the ground-truth labels destroy community trust. Wei cites stopping use of Natural Questions once GPT-4-level models surfaced cases where the "wrong" model answer was actually right and the label was wrong.
- **Simplicity / single-number metric.** "It's critical to have a single-number metric—I can't think of any great evals that don't have one." Over-complicated evals (original HELM is cited as having too many metrics/subsets) are hard to understand and therefore used less.
- **Low cost to run.** If an eval takes too much work to run it won't gain traction even if everything else is good. BIG-Bench is the cautionary example — needing different infra for log-prob vs. generation evals created adoption friction.
- **Meaningful task.** Researchers won't deeply care unless the eval measures something central to intelligence (language understanding, exam problems, math) rather than peripheral tasks (e.g., movie recommendations).
- **Grading must be extremely correct.** Parsing bugs or a poor autograder/judge prompt cause researchers to distrust the whole eval the moment they spot one bad grade. This is the highest-leverage failure mode — correctness of the grader matters as much as correctness of the data.
- **Avoid saturation.** For an eval to stand the test of time, performance must not saturate too quickly. GLUE/SuperGLUE are cited as evals abandoned once models plateaued near ceiling.
- **Pairwise/side-by-side evals are a double-edged sword.** Their generality is appealing, but "you aren't exactly sure what you're measuring" — you trade interpretability for coverage.
- **Meta-point on craft:** building an eval that lasts "takes a lot of care"; it's far easier to mess one up than to make a good one.

## Verified quotes
- "Evals are incentives for the research community, and breakthroughs are often closely linked to a huge performance jump on some eval." — https://www.jasonwei.net/blog/evals
- "It's critical to have a single-number metric—I can't think of any great evals that don't have one." — https://www.jasonwei.net/blog/evals
- "It's good to have at least 1,000 examples for your eval; perhaps more if it's a multiple choice eval." — https://www.jasonwei.net/blog/evals
- "If an eval takes too much work to run, it won't gain traction" (even if everything else is good). — https://www.jasonwei.net/blog/evals
- "For the eval to stand the test of time, performance must not become saturated." — https://www.jasonwei.net/blog/evals
- "Good evals (with proper buy-in) are the objective function for AI researchers." — https://www.jasonwei.net/blog/evals

## What it adds / why it's good
Most eval writing is either academic (how to design a fair benchmark) or alarmist (contamination, gaming). This post is about the *sociology of adoption* from someone who shipped and used internal lab evals: the binding constraint on an eval's value isn't its statistical design, it's whether researchers trust it enough to make it their objective function. The concrete, opinionated thresholds (≥1,000 examples, mandatory single-number metric) and the named failure cases (HELM's metric sprawl, BIG-Bench's dual-infra cost, Natural Questions' label rot, GLUE/SuperGLUE saturation) give it teeth the generic "make good benchmarks" advice lacks. The sharpest insight is that grading/parsing correctness is a *trust* problem, not just an accuracy problem — one visible bad grade poisons the whole eval — which is a non-obvious, high-leverage point for anyone building an eval harness or LLM-judge pipeline. Note it does not deeply cover contamination/leakage; the "why it's flagged" mention of contamination overstates that angle — its real emphasis is sample size, single-metric simplicity, grading correctness, cost, and saturation.

## Themes
- **1 why-evals** — central; evals as incentives / the field's objective function.
- **6 benchmark-vs-eval / integrity** — core; data-label quality, saturation, what makes a benchmark durable and trusted.
- **8 judge / verifiers** — grading correctness, autograder prompts, and the trust cost of a single bad grade.
- **5 eval infra** — cost-to-run and implementation friction as an adoption gate (BIG-Bench dual-infra example).
- (Light) **2 eval⇄capability⇄RL-env** — evals as the optimization target that drives capability jumps.
