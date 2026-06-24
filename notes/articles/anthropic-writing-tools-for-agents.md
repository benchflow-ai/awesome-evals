# Notes — "Writing effective tools for AI agents—using AI agents"

**Author:** Anthropic (Engineering) · **URL:** https://www.anthropic.com/engineering/writing-tools-for-agents · **Type:** eng-blog · **Found:** true

## Summary (3-6 sentences)
Anthropic argues that agent tools are a distinct class of software — a "contract between deterministic systems and non-deterministic agents" — and should not be thin wrappers over existing APIs but ergonomic affordances designed around how LLMs actually reason and consume context. The core method is a prototype → evaluate → collaborate loop: build a fast prototype (often via a local MCP server in Claude Code), run a realistic evaluation grounded in genuine workflows with verifiable outcomes, then collaborate with Claude itself to read the transcripts and refactor the tools. The eval is the heart of the piece: tasks should mirror real multi-tool workflows (dozens of calls), and metrics span accuracy, runtime, total tool calls, token consumption, and error rates. Most striking is the self-improvement loop — you concatenate eval transcripts and paste them into Claude Code, and the agent diagnoses its own failure modes and rewrites the tools, with a held-out test set guarding against overfitting. The article then distills concrete tool-design principles (consolidation, namespacing, meaningful context over raw IDs, token efficiency, prompt-engineered descriptions) that came out of exactly this loop.

## Key points (5-12 substantive bullets)
- **The loop:** (1) prototype tools (wrap in a local MCP server or call via API, dogfood in Claude Code); (2) run comprehensive evals with realistic tasks; (3) collaborate with Claude to analyze transcripts and refactor — "most of the advice in this post came from repeatedly optimizing our internal tool implementations with Claude Code."
- **Eval tasks must be grounded in real usage, not toy sandboxes.** Strong tasks come from "realistic data sources and services," require many tool calls (potentially dozens), and mirror actual workflows (e.g., schedule a meeting and attach context; resolve a customer issue spanning multiple systems). Weak tasks are single-tool, superficial operations.
- **Verifiable outcomes** matter — eval tasks should have checkable end states so you can score accuracy programmatically rather than vibe-check.
- **Metrics tracked:** accuracy, runtime, total tool calls, token consumption, and error rates — i.e., not just "did it succeed" but how efficiently.
- **Self-refactoring via transcript analysis:** "You can even let agents analyze your results and improve your tools for you. Simply concatenate the transcripts from your evaluation agents and paste them into Claude Code." Claude reads its own failure traces and rewrites tool code/descriptions. A held-out test set prevents overfitting to the eval.
- **War story (web search):** "When we launched Claude's web search tool, we identified that Claude was needlessly appending `2025` to the tool's `query` parameter, biasing search results and degrading performance." Fixed via a description change, not code — a clean example of prompt-engineering the tool surface.
- **Consolidate functionality:** because agents have "limited context" whereas "computer memory is cheap and abundant," prefer a single `search_contacts` over list-everything-then-filter. One tool can hide multiple API calls / discrete operations under the hood.
- **Namespacing** with common prefixes/suffixes (`asana_search`, `asana_projects_search`) helps tool selection; they found prefix- vs suffix-based namespacing has "non-trivial effects" on agent performance.
- **Return meaningful context, not low-level identifiers:** replace cryptic UUIDs with semantic names; this "significantly improves Claude's precision in retrieval tasks by reducing hallucinations." Prioritize contextual relevance over flexibility.
- **Token efficiency:** add `response_format` enum (`"concise"` vs `"detailed"`), pagination, filtering, truncation with sensible defaults. Concise Slack-thread responses used "~⅓ of the tokens." Claude Code caps tool responses at 25,000 tokens by default; truncated responses should include steering text nudging the agent toward more targeted strategies.
- **Prompt-engineer tool descriptions** — called one of the most effective levers; be explicit about query formats, niche terminology, and resource relationships. "Even small refinements to tool descriptions can yield dramatic improvements" (cites Claude 3.5 Sonnet SWE-bench gains from description tuning).
- **Reported gains:** held-out test-set improvements documented for both the internal Slack and Asana tool suites comparing human-written vs Claude-optimized implementations (article shows charts rather than a single headline %).

## Verified quotes (1-4 VERBATIM lines with the URL)
> "Tools are a new kind of software which reflects a contract between deterministic systems and non-deterministic agents." — https://www.anthropic.com/engineering/writing-tools-for-agents

> "You can even let agents analyze your results and improve your tools for you. Simply concatenate the transcripts from your evaluation agents and paste them into Claude Code." — same URL

> "When we launched Claude's web search tool, we identified that Claude was needlessly appending `2025` to the tool's `query` parameter, biasing search results and degrading performance." — same URL

> "In fact, most of the advice in this post came from repeatedly optimizing our internal tool implementations with Claude Code." — same URL

## What it adds / why it's good
This is one of the few practitioner pieces that closes the full loop from eval → diagnosis → automated capability improvement, written by the lab that ships the model. The non-obvious value: (1) it treats the agent as the analyst of its own eval transcripts — turning evaluation output into a refactoring signal rather than just a scoreboard, with a held-out set to keep it honest; (2) it insists tasks be grounded in real services and span dozens of tool calls, which is a sharper bar than the usual single-call function-calling demos; (3) the concrete, falsifiable war stories (the `2025`-appending bug fixed by a description edit; ⅓-token concise responses; the 25k-token cap) give you specific, copyable levers rather than platitudes. Versus generic "write good docstrings" advice, it frames tools as the deterministic↔non-deterministic contract and shows that the highest-leverage edits are often in the tool description and the shape of returned context, not the underlying API.

## Themes
- **1 why-evals** — evals are the central instrument for tool quality
- **2 eval⇄capability⇄RL-env** — transcript-driven self-refactoring is the eval→capability feedback loop
- **3 model/harness/skill** — tool design as harness/skill engineering
- **5 eval infra** — grounded tasks, verifiable outcomes, held-out test sets, metric suite
- **8 judge/verifiers** — verifiable-outcome scoring of tasks
- **9 agent-specific** — entirely about agent tool-use ergonomics
