# Notes — "Beyond pass@1: A Reliability Science Framework for Long-Horizon LLM Agents"

**Author:** Aaditya Khanal, Yangyang Tao, Junxiu Zhou (Northern Kentucky University) · **URL:** https://arxiv.org/abs/2603.29231 · **Type:** paper · **Found:** true

## Summary
The paper argues that benchmarks measure *capability* (can a model succeed on a single attempt, i.e. pass@1) while production needs *reliability* (does it succeed *consistently* across repeated attempts on tasks of varying duration), and that these two properties diverge systematically as task horizon grows. Because mainstream benchmarks report only pass@1 on short, atomic tasks, they are "structurally blind" to this divergence. The core contribution is a four-metric reliability framework — Reliability Decay Curve (RDC), Variance Amplification Factor (VAF), Graceful Degradation Score (GDS), and Meltdown Onset Point (MOP) — built on a pass^k formulation (all k repeats must succeed). They construct a 396-task benchmark across four duration buckets and three domains, and run 10 open-source models over 23,392 episodes. The headline finding: capability and reliability rankings diverge substantially at long horizons (with multi-rank inversions), and "frontier" models melt down up to ~19% of the time precisely because they attempt ambitious multi-step strategies that spiral.

## Key points
- **Capability ≠ reliability.** Capability is single-attempt success; reliability is consistent success across repeated invocations on longer tasks. The paper's whole thesis is that pass@1 conflates these and that they separate as duration increases.
- **pass^k, not pass@k.** The reliability primitive is pass^k — the probability that *all* k independent repeated episodes succeed — which is far harsher than the usual pass@k (probability at least one of k succeeds). This inverts the optimistic framing of standard sampling metrics.
- **Four metrics:**
  - **RDC (Reliability Decay Curve)** — how pass^k degrades with task duration.
  - **VAF (Variance Amplification Factor)** — how duration amplifies stochastic failure modes / run-to-run variance.
  - **GDS (Graceful Degradation Score)** — a partial-credit metric for agents that partially complete long tasks (rewards getting most of the way vs. binary fail).
  - **MOP (Meltdown Onset Point)** — detects behavioral collapse via sliding-window entropy over tool-call sequences; flags where the agent's tool-use distribution degenerates.
- **MOP mechanism:** window entropy at step t is H(t) = −Σ_i p_t(tool_i) log p_t(tool_i) over a sliding window [t−w, t] — a cheap, model-agnostic signal of looping/thrashing computed purely from the trace.
- **Scale:** 10 open-source models, 396 tasks, 23,392 episodes (k=3 repeats, two scaffolds), four duration buckets (≤5 min, 5–30 min, 30–120 min, ≥120 min), three domains: Software Engineering (SE), Agentic Web Research (WR), Multi-file Document Processing (DP).
- **Domain-stratified collapse:** SE GDS drops from 0.90 to 0.44 over the full duration range, while DP stays nearly flat (0.74 to 0.71). Reliability decay is highly domain-dependent, not a single model-level scalar.
- **Ranking inversions:** capability-based and reliability-based leaderboards reorder substantially between medium and very-long horizons — a model that looks best at pass@1 is not the most reliable long-horizon agent.
- **Frontier meltdown ~19%:** the strongest models show the *highest* meltdown rates (up to 19%) because they pursue ambitious multi-step strategies that sometimes spiral — capability and robustness can be in tension.
- **Memory scaffolds backfire:** memory scaffolds universally hurt long-horizon GDS — negative or neutral for all 10 models — a counterintuitive negative result for a popular agent design pattern.

## Verified quotes
- "Machine learning benchmarks evaluate _capability_ — whether a model succeeds on a single attempt. Production deployments require _reliability_ — whether a model _consistently_ succeeds across repeated invocations on tasks of varying duration." — https://arxiv.org/html/2603.29231v1
- "existing benchmarks are structurally blind to this divergence because they report only pass@1 on short, atomic tasks." — https://arxiv.org/html/2603.29231v1
- "Passk is the probability that _all_ kk independent repeated episodes succeed." — https://arxiv.org/html/2603.29231v1
- "frontier models exhibit the highest meltdown rates (up to 19%) because they pursue ambitious multi-step strategies" — https://arxiv.org/html/2603.29231v1
- "memory scaffolds universally hurt long-horizon GDS (negative or neutral for all 10 models)" — https://arxiv.org/html/2603.29231v1
- "SE GDS drops from 0.90 to 0.44 over the full duration range, while DP is nearly flat (0.74 to 0.71)" — https://arxiv.org/html/2603.29231v1

## What it adds / why it's good
Most "agents are unreliable" commentary is anecdotal; this paper operationalizes reliability as a measurable, separable axis from capability and gives four concrete, trace-derivable metrics to quantify it. The pass^k reframing is the load-bearing idea — it makes the metric *pessimistic in the right direction* for production (everything must succeed, repeatedly), which is exactly the regime pass@1 and pass@k hide. The MOP entropy signal is practical: it's computed from tool-call sequences alone, so it's a cheap observability hook you could bolt onto a live agent without ground-truth labels. Two findings have real teeth beyond the framing: (1) ranking inversions mean capability leaderboards actively mislead for long-horizon deployment, and (2) the negative results — frontier models melting down *more*, and memory scaffolds universally hurting — are the kind of counterintuitive, falsifiable claims that justify the measurement apparatus. Caveats for the skeptical reader: it's open-source models only (no closed frontier labs despite "frontier" language), n=10 models with k=3 is modest statistical power for variance claims, and partial-credit GDS scoring quality hinges on task-specific rubrics not fully scrutinized here.

## Themes
- **1 why-evals** — central: argues pass@1 is the wrong target and reliability is a distinct, deployment-relevant axis evals miss.
- **6 benchmark-vs-eval/integrity** — capability vs reliability ranking inversions; leaderboards mislead at long horizons.
- **9 agent-specific** — long-horizon agent behavior, tool-call traces, scaffolds, meltdown dynamics.
- **4 observability/surfaces** — MOP sliding-window entropy over tool calls is a label-free runtime collapse detector.
- **5 eval infra** — a concrete 396-task, multi-domain, multi-duration benchmark with 23k episodes and repeat/scaffold structure.
