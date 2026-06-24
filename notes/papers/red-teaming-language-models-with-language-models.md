# Notes — "Red Teaming Language Models with Language Models"

**Authors:** Ethan Perez, Saffron Huang, Francis Song, Trevor Cai, Roman Ring, John Aslanides, Amelia Glaese, Nat McAleese, Geoffrey Irving (DeepMind) · **Venue/Year:** arXiv preprint, Feb 2022 (later EMNLP 2022) · **URL:** https://arxiv.org/abs/2202.03286 · **Type:** paper · **Found:** true

## Summary
The paper introduces *automated red teaming*: instead of paying human annotators to hand-write adversarial test cases, it uses one language model (the "red LM") to generate test inputs that elicit harmful behavior from a target LM, and a learned classifier (the "red classifier") to judge whether each target reply is harmful. Applied to a 280B-parameter dialogue model, this pipeline surfaced tens of thousands of offensive replies plus a range of other harms (private data leakage, fabricated contact info, distributional bias, multi-turn conversational harms). It became foundational because it reframed safety evaluation as a *scalable generate-and-judge loop* — a red LM proposes attacks, an automated judge scores them, and the failure set grows far beyond what manual annotation can cover. The work is one of the canonical early demonstrations that you can use LMs to evaluate and stress-test LMs, seeding both the automated red-teaming literature and the broader "LM-as-evaluator / verifier" pattern that now underpins alignment pipelines. Its method ladder (zero-shot → few-shot → supervised → RL) also directly connects eval generation to RL optimization against a learned reward.

## Key points
- **Core loop:** a *red LM* generates test cases (questions/prompts), the *target LM* responds, and a *red classifier* (trained offensive-content detector) labels responses as harmful — fully automating the "write test cases + judge outputs" cycle that humans previously did by hand.
- **Method ladder of increasing power/diversity tradeoff:** zero-shot generation, few-shot (stochastic few-shot from prior successful attacks), supervised fine-tuning on found attacks, and reinforcement learning where the red LM is trained to maximize the classifier's harm score.
- **RL as adversarial optimization:** training the red LM with RL against the classifier reward produces high attack success rates but at the cost of diversity (mode collapse onto a narrow set of effective prompts) — a concrete illustration of the reward-hacking / diversity tension in optimizing against a learned judge.
- **Scale of findings:** uncovered *tens of thousands* of offensive replies from a 280B-parameter chatbot, far exceeding feasible manual annotation.
- **Many harm categories from one framework, via prompt engineering on the red LM:**
  - offensive / toxic generations,
  - **data leakage** — recovering memorized training data,
  - **generated contact info** — the bot emitting real personal and hospital phone numbers as its "own" contact details,
  - **distributional bias** — automatically finding groups of people the bot discusses offensively,
  - **dialogue/multi-turn harms** — harms that only emerge over the course of a conversation (red-teaming a full dialogue, not single turns).
- **Generate-then-cluster analysis:** generated attacks were clustered/analyzed to characterize *what kinds* of inputs trigger failures, not just count them — turning raw failures into actionable failure taxonomies.
- **Defense use:** found failure cases can be fed back to fix the target model (e.g., blacklisting phrases, fine-tuning to avoid topics), making red teaming part of a closed iterate-and-patch loop rather than a one-off audit.
- **Key eval insight:** safety evaluation coverage need not be bounded by human labeling throughput — an LM evaluator + an LM judge can search the input space adversarially and far more cheaply.

## Verified quotes
- "In this work, we automatically find cases where a target LM behaves in a harmful way, by generating test cases (\"red teaming\") using another LM." — https://arxiv.org/abs/2202.03286
- "We evaluate the target LM's replies to generated test questions using a classifier trained to detect offensive content, uncovering tens of thousands of offensive replies in a 280B parameter LM chatbot." — https://arxiv.org/abs/2202.03286
- "We explore several methods, from zero-shot generation to reinforcement learning, for generating test cases with varying levels of diversity and difficulty." — https://arxiv.org/abs/2202.03286
- "...automatically finding groups of people that the chatbot discusses in offensive ways, personal and hospital phone numbers generated as the chatbot's own contact info, leakage of private training data in generated text, and harms that occur over the course of a conversation." — https://arxiv.org/abs/2202.03286

## Why it matters for agent evals
This is one of the seminal "LM evaluates LM" papers and a template for several core agent-eval ideas. (1) **Automated judge/verifier:** the red classifier is an early instance of using a trained model as the scoring function for an eval — the same pattern that generalizes to LM-as-judge and learned verifiers used to grade agent trajectories. (2) **Eval generation as an RL environment:** the red LM trained against the classifier reward is literally an RL setup where the "environment" is the target model + judge, prefiguring how adversarial/test-case generation is now framed as RL with a reward model; it also surfaces the diversity-vs-success tradeoff that any eval-generating policy must manage. (3) **Adversarial / safety benchmarking:** it operationalizes red teaming as a *scalable, automatable* eval discipline rather than a manual audit — directly upstream of automated jailbreak/attack benchmarks and continuous safety evaluation for agents. (4) **Multi-turn and emergent harms:** by red-teaming whole dialogues it anticipates agent-specific evals where failures only manifest over a trajectory, not a single response. For agent systems, the takeaway is the closed loop: generate adversarial cases → judge automatically → cluster failures → patch → re-test.

## Themes
1 why-evals · 2 eval⇄capability⇄RL-env · 7 RL environments · 8 judge/verifiers · 9 agent-specific · 10 safety/adversarial
