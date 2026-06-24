# Notes — "What is ORS? — Open Reward Standard"

**Author:** General Reasoning (GR Inc) / OpenReward · **URL:** https://openrewardstandard.io/ · **Type:** docs · **Found:** true

## Summary
The Open Reward Standard (ORS) is an open-source, HTTP-based protocol specification for connecting language-model agents to reinforcement-learning environments. Its core design move is "actions are tools": agents interact with an environment using the same function-calling primitives modern LLMs already support, and ORS adds the RL/eval-specific pieces that plain tool-calling lacks — reward signals, episode termination (a `finished` flag), task definitions, and reproducible task splits (train/validation/test plus custom splits). It is explicitly positioned as a complement to MCP rather than a replacement: MCP for general tool access and workflows, ORS for RL training and structured evaluation. The standard is language-agnostic (any language with HTTP), uses HTTP + Server-Sent Events for transport, and is paired with OpenReward (openreward.ai / gr.inc), a managed platform hosting 330+ environments built on ORS. The pitch is portability: the same environment runs locally, on your own infra, or on managed hosting, and works "with any compatible training or evaluation stack." This makes ORS an emerging interoperability layer for verifiable-reward environments.

## Key points
- **Core abstraction — "actions are tools":** agents manipulate environment state only by calling tools/functions; the same function-calling interface LLMs already use, extended with RL primitives. The spec says "the only way agents interact with environments is by calling tools."
- **Episodes:** a session *is* an RL episode. It continues until a tool returns `finished: true` — episode termination is an explicit, in-band signal, unlike MCP which has no notion of it.
- **Rewards:** tool results carry numeric reward feedback for RL training (can be sparse/dense/shaped per implementation). Plain MCP has no reward concept.
- **Four server-provided components:** an ORS environment server exposes **tools** (actions), **tasks** (problems to solve), **splits** (task groupings), and **prompts** (initial instructions per task).
- **Splits / curriculum:** standard splits are `train`, `validation`, `test`; plus *custom* splits (e.g. different environment versions or different hardware requirements). Splits group tasks into deterministic orderings for reproducible training and eval workflows — this is the curriculum/reproducibility lever.
- **Transport:** HTTP for control operations + Server-Sent Events for streaming tool-call results. Language-agnostic — implementable in anything that speaks HTTP.
- **Explicit MCP positioning:** a side-by-side table shows ORS adds episode termination (Yes vs No), rewards (Yes vs No), and tasks & splits (Yes vs No). Guidance: "Use MCP for general tool access, ORS for RL training and structured evaluation."
- **Portability is the thesis:** environment code stays on GitHub; the same env can be served on your machine, your infra, or OpenReward; works with any compatible training/eval stack and any sandbox provider (Daytona, E2B, Modal). ORS environments are described as "portable assets that you can run anywhere."
- **Platform layer (OpenReward):** managed hosting on top of the open standard, 330+ environments, including community efforts like nebius/SWE-rebench-V2, Eigent/SETA, and kanishk/EndlessTerminals. "Switch between local and managed hosting anytime."
- **Provenance:** built by GR Inc / General Reasoning — a team that says it previously built Papers with Code and helped kick off the open-weight movement (Llama 2/3). Note: this "OpenReward platform/standard" is distinct from the separate arXiv paper "OpenReward: Learning to Reward Long-form Agentic Tasks via RL" (a reward *model*, OpenRM) — don't conflate them.

## Verified quotes
- "The Open Reward Standard (ORS) is an open-source HTTP-based protocol for connecting AI models to reinforcement learning (RL) environments." — https://openrewardstandard.io/
- "It specifies how an AI model can interact with an environment to manipulate its state and obtain results and rewards." — https://openrewardstandard.io/
- "Sessions are RL episodes that continue until a `finished` signal" — https://openrewardstandard.io/
- "The episode continues until a tool returns `finished: true`." — https://openrewardstandard.io/introduction
- "Use MCP for general tool access, ORS for RL training and structured evaluation." — https://openrewardstandard.io/
- "Tasks are organised into splits for training and evaluation" — https://openrewardstandard.io/

## What it adds / why it's good
The non-BS value is that ORS names and standardizes the exact things that turn a "tool server" into a *trainable, evaluable environment*: reward, episode termination, and reproducible splits. MCP gives you tool access but is agnostic to whether you're training or evaluating; OpenAI-style function-calling gives you actions but no reward or episode boundary; Gym/Gymnasium-style RL APIs give you reward/termination but assume a Python in-process loop, not a portable HTTP service usable by arbitrary LLM agents and remote trainers. ORS sits in the gap: it reuses LLM-native function-calling as the action space (so any tool-calling model is already an ORS agent) while bolting on the RL/eval contract over HTTP+SSE so the *same environment artifact* is portable across training stacks, eval harnesses, and sandbox providers. The deliberate "complement to MCP, not competitor" framing plus a working platform with 330+ real environments (SWE-rebench, terminal envs, etc.) makes it more credible as an interoperability layer than a paper-only spec. The main caveat: it is vendor-originated (GR Inc) and early, so "open standard" adoption breadth beyond OpenReward's own platform is the thing to watch, and the train/val/test split discipline is only as good as each environment author's honesty about leakage.

## Themes
- **7 RL environments** (primary — this is the portable env interface/standard)
- **2 eval⇄capability⇄RL-env** (explicitly unifies train and eval splits over one environment contract)
- **5 eval infra** (HTTP+SSE serving, splits, reproducible task orderings, hosting platform)
- **6 benchmark-vs-eval/integrity** (train/validation/test splits and deterministic orderings target reproducibility and leakage control)
- **3 model/harness/skill** (decouples environment from training/eval harness so envs are harness-portable)
