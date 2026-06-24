# Notes — "Speedrunning an RL environment"
**Author:** sidbin (Sid) · **URL:** https://sidb.in/posts/rl-env-speedrun · **Type:** blog · **Found:** true

## Summary
A hands-on war-story walking through how to convert AgentDojo (a prompt-injection security benchmark) into a trainable RL environment using the `verifiers` framework, end-to-end: dataset creation, wrapping AgentDojo's non-standard tool runtime, defining a rubric/reward, and running rollouts. The core contribution is not a new method but the *operational* knowledge of adapting an existing benchmark into an RL-trainable env — the specific glue code, the serialization gotchas, and the debugging. It documents two real, easy-to-hit bugs: HuggingFace `Dataset.from_list` merging JSON types via PyArrow (corrupting nested OpenAI tool schemas) and the resulting OpenAI 400 "Invalid schema for function" error, both fixed by JSON-encoding `state['info']`. It also shows how to bridge AgentDojo's `FunctionsRuntime`/`TaskEnvironment` model into verifiers' `ToolEnv` lifecycle hooks (`setup_state`, `call_tool`, `env_response`, `is_completed`). The throughline is a reusable recipe and a set of hard-won principles for anyone turning a static eval into an RL environment.

## Key points
- **Goal/recipe:** take an existing benchmark (AgentDojo) and make it a trainable RL env in `verifiers` without rewriting the benchmark — "convert the dataset on the fly" and push fixes upstream rather than hotfixing.
- **`verifiers` as the substrate:** described as a framework for building RL-environment evaluations that "defines good primitives and hooks that you use to wire up your environment" — you subclass `vf.ToolEnv` and override lifecycle hooks.
- **Three-tier state model:** initial state (from a dataset row: prompt + info metadata), setup state (task-specific objects like the runtime, environment, injections, created in `setup_state()`), and runtime state (evolves per turn: messages, turn counter).
- **PyArrow schema bug (the headline footgun):** `Dataset.from_list` merges all JSON types when converting a list/dict into dataset format, so nested OpenAI tool-parameter schemas get corrupted on round-trip through HuggingFace Datasets.
- **Resulting OpenAI 400:** `Invalid schema for function 'send_email': None is not of type 'object', 'boolean'` — a downstream symptom of the PyArrow type-merging, not an LLM/API problem.
- **The fix:** JSON-encode the `state['info']` field (which holds `oai_tools`, task ids, suite, attack_type, etc.) before dataset creation; verifiers deserializes it back. Anything stored in `state['info']` must survive PyArrow serialization, which "doesn't do well with objects and BaseModels with changing types."
- **Wrapping a non-standard tool runtime:** AgentDojo needs a `FunctionsRuntime` that registers tools and runs them against a `TaskEnvironment`; the env instantiates this in `setup_state()` and dispatches via `runtime.run_function(env=..., function=tool_name, kwargs=tool_args)` inside `call_tool()`.
- **Tool schema conversion:** uses AgentDojo's `_function_to_openai()` to produce the OpenAI-style tool definitions that get stored (and which trigger the PyArrow issue).
- **Reward/rubric:** a `Rubric` with an async function returning a float reward in 0.0–1.0; reward must encode both task success and (for this security benchmark) whether the injection attack succeeded.
- **Performance reality:** RL-env training is I/O-bound — a slow `env_response()` leaves GPUs idle during distributed rollouts; concurrency and fast env setup matter (sandbox setup, e.g. AndroidWorld, called out as a bottleneck).
- **Full skeleton code** is provided for the `ToolEnv` subclass and the dataset row structure, making it a copyable template, not just narrative.

## Verified quotes
- "RL environments are glorified obstacle scenarios for LLMs to operate in and get evaluated or trained on." — https://sidb.in/posts/rl-env-speedrun
- "`verifiers` is a framework for building RL environments evaluations. It defines good primitives and hooks that you use to wire up your environment." — https://sidb.in/posts/rl-env-speedrun
- "I always forget this and it always bites me back. huggingface `Dataset.from_list` merges all the JSON types when it converts a list or a dict into dataset format." — https://sidb.in/posts/rl-env-speedrun
- "Anything you store in `state['info']` has to be serialised by PyArrow and it doesn't do well with objects and BaseModels with changing types." — https://sidb.in/posts/rl-env-speedrun
- "Always adapt and use the original framework and code released as closely as possible. Convert the dataset on the fly. If needed, make upstream changes to the original framework rather than hotfixes." — https://sidb.in/posts/rl-env-speedrun

## What it adds / why it's good
Most RL-environment writing is conceptual (what a rollout/reward/rubric *is*); this is the missing operational layer — the actual friction of getting a real benchmark to run as a trainable env. The two documented bugs (PyArrow JSON-type merging → corrupted tool schemas → OpenAI 400) are non-obvious, reproducible, and exactly the kind of thing that costs hours and never makes it into docs; capturing them with the JSON-encode-`state['info']` fix is genuinely useful institutional knowledge. The pattern for wrapping a non-standard tool runtime (`FunctionsRuntime`/`TaskEnvironment` → verifiers `ToolEnv` hooks) generalizes to any benchmark whose tool execution model doesn't match the framework's assumptions. And the adaptation principle — adapt the original closely, convert datasets on the fly, fix upstream not via hotfixes — is solid engineering guidance for eval/RL-env infra. It clears the non-BS bar: concrete, code-backed, and specific.

## Themes
- **7 RL environments** (primary): the whole piece is building a trainable RL env.
- **2 eval⇄capability⇄RL-env** (primary): explicitly converts a static eval/benchmark (AgentDojo) into an RL training env.
- **5 eval infra**: dataset serialization, PyArrow/HF Datasets pitfalls, runtime wrapping, concurrency/I/O-bound rollouts.
- **8 judge/verifiers**: uses the `verifiers` framework and a `Rubric` reward function.
- **10 safety/adversarial**: source benchmark is AgentDojo, a prompt-injection / adversarial security eval, and the reward must capture attack success.
- **9 agent-specific**: tool-calling agents in a multi-turn `ToolEnv` with environment state.
