# Notes — "Deep Reinforcement Learning from Human Preferences"

**Authors:** Paul Christiano, Jan Leike, Tom B. Brown, Miljan Martic, Shane Legg, Dario Amodei · **Venue/Year:** NeurIPS 2017 (arXiv 2017) · **URL:** https://arxiv.org/abs/1706.03741 · **Type:** paper · **Found:** true

## Summary
This paper introduced the now-canonical recipe for learning a reward function from human comparisons of agent behavior, rather than from a hand-specified reward. A human is shown pairs of short trajectory-segment clips and simply picks which one is better; these binary preferences train a reward-predictor network, and a standard deep RL algorithm optimizes against that learned reward. The headline result is extreme label-efficiency: complex Atari and simulated-locomotion tasks are solved with feedback on less than 1% of the agent's interactions, and entirely novel behaviors (e.g. a Hopper backflip) can be elicited with about an hour of human time. It became foundational because it is the direct technical ancestor of RLHF as later applied to language models (InstructGPT, ChatGPT, Claude): the "train a reward model from pairwise human preferences, then optimize a policy against it" loop originates here. The work also frames preference learning as a scalable solution to the reward-specification and human-oversight problem, tying it to AI safety/alignment.

## Key points
- **Core method:** learn a reward function r̂ from human preferences over pairs of trajectory segments, then train a policy with deep RL on r̂. The reward predictor, RL training, and human queries run as three asynchronous processes in a loop.
- **Preference model:** a Bradley-Terry / Luce-Shephard style model — the probability a human prefers a segment depends exponentially (softmax) on the sum of predicted latent reward over the clip; the predictor is fit by cross-entropy to human labels. An ensemble of 3 predictors is used.
- **Human interface:** raters watch 1–2 second video clips of pairs of segments and click which is better (or "equal" / "incomparable"); contractors reported ~3–5 seconds per comparison.
- **RL backends:** A2C (Advantage Actor-Critic) for Atari, TRPO (Trust Region Policy Optimization) for MuJoCo robotics.
- **Label efficiency — MuJoCo:** ~700 human comparisons were enough to nearly match RL trained on the true reward on several continuous-control tasks (Hopper, Walker, Swimmer, Cheetah, Ant, Reacher, Pendulum, etc.).
- **Label efficiency — Atari:** ~5,500 queries on games like Beamrider, Breakout, Enduro, Pong, Qbert, SpaceInvaders, Seaquest; competitive with real-reward RL on some, weaker on others.
- **Headline efficiency claim:** feedback on **less than 1%** of the agent's environment interactions suffices, making human oversight cheap enough for state-of-the-art RL.
- **Novel behaviors:** trained a Hopper backflip and other behaviors with no programmed reward — about 900 queries / under an hour of human time — demonstrating goals that would be hard to specify by hand.
- **Synthetic vs. real feedback:** experiments used both a synthetic oracle (the true reward acting as a "human") and real human contractors; real feedback performed comparably, sometimes with fewer labels, though with some cross-rater inconsistency.
- **What it introduced:** the modern reward-model-from-pairwise-preferences pipeline (the "RM" stage of RLHF), and the argument that preference comparison is an easier, more scalable supervision signal than demonstrations or hand-coded rewards.

## Verified quotes
- "In this work, we explore goals defined in terms of (non-expert) human preferences between pairs of trajectory segments." — https://arxiv.org/abs/1706.03741
- "We show that this approach can effectively solve complex RL tasks without access to the reward function, including Atari games and simulated robot locomotion, while providing feedback on less than one percent of our agent's interactions with the environment." — https://arxiv.org/abs/1706.03741
- "To demonstrate the flexibility of our approach, we show that we can successfully train complex novel behaviors with about an hour of human time." — https://arxiv.org/abs/1706.03741

## Why it matters for agent evals
This is the origin of the learned-reward-model paradigm that underpins both how modern agents are trained and how they are judged. The reward predictor here is the direct ancestor of (a) the reward models in RLHF used to fine-tune LLM agents, and (b) the family of **LLM-as-judge / preference-based evaluators** that score outputs by learned human preference rather than ground-truth correctness. It establishes the central eval insight that **pairwise comparison is a more reliable, cheaper, and more scalable elicitation format than absolute scoring or hand-specified metrics** — the foundation of arena-style and preference-based benchmarks. It also seeds the **RL-environment ⇄ eval** coupling: the same preference signal that defines the task is the signal you evaluate against, which raises the integrity question (reward hacking / overfitting to an imperfect learned proxy) that recurs throughout agent evaluation. Finally, it is an explicitly safety-motivated paper: scalable human oversight and value learning from preferences are framed as alignment tools, making it a load-bearing citation for verifier/judge reliability and reward-model gaming in agent-safety evals.

## Themes
2 eval⇄capability⇄RL-env · 7 RL environments · 8 judge/verifiers · 10 safety/adversarial
