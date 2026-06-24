# Notes — "An FAQ on Reinforcement Learning Environments"

**Author:** Jean-Stanislas Denain & Chris Barber (Epoch AI) · **URL:** https://epochai.substack.com/p/an-faq-on-reinforcement-learning · **Type:** blog · **Found:** true

## Summary
An Epoch AI "Gradient Updates" FAQ that synthesizes interviews with 18 practitioners across RL-environment startups, neolabs, and frontier labs into a practitioner-grounded snapshot of how the RL-environments industry actually works. It is structured as six questions: what RL environments and tasks are, how labs use them, who builds them, what they cost, what domains they cover, and what the top priorities and challenges are. The core contribution is hard numbers that are otherwise locked inside vendor conversations — target pass rates (2-3%, or ~1 success in 64-128 rollouts), per-task costs ($200-$2,000), full-environment costs (a website replica ~$20k, a Slack-like product ~$300k), and the order-of-magnitude scale of lab spend (Anthropic reportedly discussing $1B+ on RL environments). Its central qualitative claim is that robustness to reward hacking — making "high reward" actually mean "task solved" — is the dominant quality bar, and that maintaining quality while scaling is the number-one bottleneck. For an evals library, this is essentially a field report on the verifier/grader economy that sits underneath agentic RL.

## Key points
- **Sample is explicitly bounded**: 9 live calls + 9 text/email inputs + 4 sanity-check-only contacts = the "18 people" figure. The authors are honest that this is interview-derived, not a measured dataset.
- **Target difficulty is calibrated, not maximized**: practitioners aim for a *minimum* pass rate of ~2-3%, i.e. roughly 1 success per 64-128 rollouts. Too-hard tasks give no learning signal; the band is chosen so RL gets gradient.
- **Reward hacking is the #1 quality dimension.** A good environment must guarantee that high reward implies the task was genuinely solved, not gamed (e.g. model searching up the answer, or checking out future git commits to read the solution). This takes "many many iterations" to harden.
- **Per-task economics**: $200-$2,000 per task is the common range, with $20k as a rare ceiling. Tasks are the unit of cost, and quality verification dominates that cost.
- **Per-environment economics**: a website replica runs ~$20k; a complex product clone like Slack ~$300k. Exclusive deals command a 4-5x premium over non-exclusive.
- **Scale of demand**: Anthropic reportedly discussed $1B+ on RL environments for the following year — signal that env-buying is now a first-class lab capex line, not a side experiment.
- **The bottleneck is scaling quality, not generating volume.** "Maintaining quality while scaling is the number one bottleneck" — i.e. the hard part is keeping verifiers sound as you multiply tasks.
- **Skill profile is inverted from ML intuition**: domain expertise and expert-level prompting matter more than ML chops for building good environments — because the work is task design + verification, not model training.
- **Direction of travel is long-horizon, end-to-end agentic tasks** rather than short single-step problems — which makes verification harder and reward hacking more dangerous.
- **Soundness > coverage**: the framing is that a verifier that is gameable is worse than useless because it teaches the model to hack, making robustness the binding constraint on the whole pipeline.

## Verified quotes
- "Multiple interviewees mentioned wanting a minimum pass rate of around 2-3%, or at least one success out of 64 or 128 rollouts." — https://epochai.substack.com/p/an-faq-on-reinforcement-learning
- "Reward hacking is a big issue. The model might cheat by searching up a solution, or if you're not careful with how you script the repo, by checking out future commits. It needs to be robust." — https://epochai.substack.com/p/an-faq-on-reinforcement-learning
- "Soundness matters most: high reward must mean the task was actually solved, not hacked." — https://epochai.substack.com/p/an-faq-on-reinforcement-learning
- "It takes many many iterations to check against reward hacking." — https://epochai.substack.com/p/an-faq-on-reinforcement-learning
- "Maintaining quality while scaling is the number one bottleneck that people see." — https://epochai.substack.com/p/an-faq-on-reinforcement-learning
- "I've seen $200 to $2000 mostly. $20k per task would be rare but possible." — https://epochai.substack.com/p/an-faq-on-reinforcement-learning

## What it adds / why it's good
Most public writing on RL environments is either abstract ("RL is the second half") or vendor marketing. This FAQ does the un-glamorous thing: it puts numbers on the verifier economy. The 2-3% / 1-in-64-128 pass-rate target is the single most useful artifact — it operationalizes "good task difficulty" as a measurable property, and it's exactly the kind of design constraint an evals library needs when deciding whether a benchmark task carries usable signal. The cost figures ($200-$2k/task, $20k-$300k/env, $1B-scale lab budgets) let you reason about *why* verifier quality is rationed and where the incentives to cut corners on soundness come from. And the reward-hacking material is the bridge from "RL environment" to "eval integrity": the failure mode that vendors fight (high reward without real solving) is the same failure mode that makes a benchmark a bad proxy for capability. The non-BS value is that it's sourced from people who ship these environments and is candid about its own methodology limits.

## Themes
- **7 RL environments** (primary — this is a direct field report on the RL-environment industry)
- **8 judge/verifiers** (the soundness/reward-hacking core is fundamentally about verifier robustness)
- **2 eval⇄capability⇄RL-env** (pass-rate targeting and long-horizon direction tie env design to capability signal)
- **6 benchmark-vs-eval/integrity** (reward hacking = gameable graders, the integrity failure mode)
- **10 safety/adversarial** (reward hacking is an adversarial-robustness problem against the model itself)
- **5 eval infra** (cost/economics and scaling-quality bottleneck are infra-level concerns)
