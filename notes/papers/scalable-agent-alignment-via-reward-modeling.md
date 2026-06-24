# Notes — "Scalable agent alignment via reward modeling: a research direction"
**Authors:** Jan Leike, David Krueger, Tom Everitt, Miljan Martic, Vishal Maini, Shane Legg (DeepMind) · **Venue/Year:** arXiv preprint, 2018 · **URL:** https://arxiv.org/abs/1811.07871 · **Type:** paper · **Found:** true

## Summary
This is a DeepMind research-agenda paper that frames the *agent alignment problem* — how to build agents that act in accordance with the user's intentions — and proposes **reward modeling** as the central scalable solution. The core recipe is a two-part loop: learn a reward function from user interaction (feedback, comparisons, demonstrations), then optimize that learned reward with RL. To scale beyond tasks a human can directly evaluate, the paper introduces **recursive reward modeling**, where agents trained by reward modeling are themselves used to assist the human in evaluating harder tasks, bootstrapping oversight to increasingly complex domains. It became foundational because it crystallized the "learn-a-reward-then-optimize" paradigm that underpins RLHF, articulated the scalable-oversight problem, and catalogued the concrete failure modes (reward gaming, feedback quality, reward tampering) that the later eval/safety literature spends its time attacking. It also lays out an agenda for *establishing trust* in trained agents via testing, interpretability, formal verification, and theory.

## Key points
- **Problem framing:** real-world RL is bottlenecked by the lack of suitable reward functions; users only have an *implicit* understanding of the task, which gives rise to the agent alignment problem.
- **Reward modeling = separation of concerns:** decouple *learning what to do* (the reward model, trained from human feedback) from *learning how to do it* (the RL policy optimizing that reward). This is the conceptual skeleton later called RLHF.
- **Evaluation is easier than behavior:** the key leverage assumption — judging whether a behavior is good is cheaper than producing it — which makes learned-reward supervision tractable and motivates judge/verifier-style oversight.
- **Recursive reward modeling:** apply reward modeling recursively, using trained assistant-agents to help the user evaluate outcomes they couldn't evaluate unaided, enabling a bootstrap from simpler to more general/complex tasks. Positioned alongside iterated amplification and debate as scalable-oversight approaches.
- **Catalog of challenges:** amount/quality of feedback, reward gaming (the optimizer exploiting flaws in the learned reward), unacceptable outcomes, reward–result gap, and reward tampering — these become the standard taxonomy of eval/alignment failure modes.
- **Mitigations proposed:** online feedback, leveraging existing data, hierarchical/model-based feedback, off-policy evaluation, adversarial/unsupervised checks, and combining feedback modalities.
- **Establishing trust:** the paper argues alignment must be backed by evidence — design choices, testing, interpretability, formal verification, and theory — i.e., evaluation is part of the safety case, not an afterthought.
- **Agenda, not results:** it is explicitly a *research direction* paper (no single benchmark/number), but it grounds claims in prior empirical reward-modeling work (e.g., learning from human preferences on Atari and simulated robotics).

## Verified quotes
- "This gives rise to the agent alignment problem: how do we create agents that behave in accordance with the user's intentions?" — https://arxiv.org/abs/1811.07871
- "We outline a high-level research direction to solve the agent alignment problem centered around reward modeling: learning a reward function from interaction with the user and optimizing the learned reward function with reinforcement learning." — https://arxiv.org/abs/1811.07871
- "We discuss the key challenges we expect to face when scaling reward modeling to complex and general domains, concrete approaches to mitigate these challenges, and ways to establish trust in the resulting agents." — https://arxiv.org/abs/1811.07871

## Why it matters for agent evals
This paper is the conceptual root of **learned-evaluator / judge-and-verifier** thinking in agent evals. Its central thesis — that you train a *model of the reward* (an automated judge) from human feedback and then optimize against it — is exactly the structure of modern LLM-as-judge pipelines, reward models, and RLHF training environments. Two ideas seed downstream eval methodology: (1) **scalable oversight via recursion** — using AI assistants to evaluate tasks humans can't directly grade, which is the lineage behind recursive reward modeling, debate, and amplification used to construct hard evals; and (2) **reward gaming / specification gaming** as a first-class failure mode, which is precisely the benchmark-integrity and reward-hacking problem that adversarial evals and verifier robustness work now target. For RL environments, it makes explicit that the *quality of the reward/evaluation signal* is the binding constraint, not the optimizer — a framing that motivates investing in verifiers, graders, and process-based evaluation rather than just outcome rewards. Its "establish trust" agenda (testing, interpretability, verification) directly prefigures safety-oriented evaluation as evidence-gathering.

## Themes
- 1 why-evals (evaluation as the binding constraint and the safety case)
- 2 eval⇄capability⇄RL-env (learned reward as the bridge between human feedback and RL optimization)
- 7 RL environments (reward functions, reward gaming, optimizing learned rewards)
- 8 judge/verifiers (reward modeling = learned automated judge; recursive evaluation)
- 10 safety/adversarial (alignment, reward hacking/tampering, establishing trust)
