# Notes — How Mastra & Han-Chung Lee structure their articles (the model for our rewrite)

Studied 2026-06-23. The user's directive: chapters must be **technical/practical via structure + illustration**, NOT code. "Illustration is even more important than code."

## Mastra — "Principles of Building AI Agents" (Sam Bhagwat)
- **Short**: ~150pp / ~33 chapters → 3–6pp each. Code-first, but only **~3 diagrams in the whole book** (MCP architecture, context-window comparison, RAG pipeline) — diagrams only where the concept is *spatial*, placed early to orient, one job each, never the centerpiece.
- **Chapter skeleton:** Hook (1–2 sentences: a problem/definition/question) → Frame (1 para: the trade-off + a human analogy) → Decompose (arrow/numbered list of **named** stages, e.g. RAG = Chunk→Embed→Index→Query→Rerank→Synthesize) → Show it (one concrete artifact) → **Rule of thumb** (one quotable imperative) → Transition.
- **Stays practical via:** named real-world examples as anchors ("Alana's book-rec agent", Replit's 4-agent arch, Perplexity A/B testing); comparison tables / "triangles"; **escalation ladders** instead of "it depends" (RAG: load-full-context → tools → full pipeline); named patterns ("seed crystal", "Size-Speed-Cost triangle"); a quotable closer per chapter.
- **Anti-patterns:** a principle with no named artifact; "it depends" with no ladder; decorative/redundant diagrams; essay drift (long intros, hedging, reflective endings); no take-home vocabulary; unquantified quality claims.

## Han-Chung Lee (leehanchung.github.io — agent eval infra, RL-env taxonomy, runtime, harness)
- **Diagram- and table-heavy** (5–7 figures/post). Arc: **debunk → reframe → decompose → systematize → close.**
- **Article skeleton:**
  1. **Hook** — quote the lazy consensus and puncture it in 2–3 sentences ("Most conversations about evals collapse into which SaaS tool to buy…").
  2. **Thesis** — one-line inversion ("Chat Eval Was a Spreadsheet. Agent Eval Is a System.").
  3. **Vocabulary** — define 4–6 load-bearing terms, distinguishing near-synonyms (rollout/episode/trajectory/trace/state-delta).
  4. **Framework** — a spine as notation or a plane/surface split + its diagram (control plane / data plane; E = {T,H,V,S,C}).
  5. **Component sections** — one heading per part, each with a comparison table.
  6. **Contrast table** — old world vs new world (the 8-row Chat-vs-Agent eval table carries the whole thesis).
  7. **Practice section** — how to operate it (experiment loop, checkpoints/branch/replay, gates).
  8. **Close** — map components → consequences + one aphorism ("Agents need worlds… get them wrong and you've trained an expensive demo.").
- **His 5 recreatable diagram types (Mermaid-able):**
  1. **"Swamped small box" debt diagram** — tiny "agent model call" node dwarfed by big infra boxes (runtime, harness, eval, state, tools). Job: model is a sliver of the system. (Book opener.)
  2. **Control-plane / data-plane pipeline** — `[T,C,G] → [M,A,R,S,τ] → traces/state-deltas → ship/rollback/retrain/acquire`. Job: eval is a closed control system whose output is a *decision*, not a score.
  3. **"Five surfaces" fan** — central "Agent behavior" → {Output, Trace, Memory, Environment, Mechanistic-interp}. Job: break out of the output-only trap; a recurring spine.
  4. **Canonical RL/eval loop** — Task → Harness ⇄ Tools/Env → Verifier → Trainer, reward looping back. Job: ground the abstract set in data-flow.
  5. **Annotated failure trace** — vertical trace rows (msg → tool call → empty result → fabricated answer) with the bad step boxed. Job: make a failure mode visceral.
- **Legibility devices:** set notation as memory anchor; tables as the workhorse (Type | Description | When-to-use); define near-synonyms once; concrete named systems (SWE-bench, MCP, Firecracker); analogies ("memory dark hole", "cargo cult evaluation"); coinages ("state delta", "release gates", "verifiable beats judgeable"); small-N enumerations.

## OUR new chapter format (synthesis — illustration-first, minimal code)
1. **Hook** — puncture the lazy version of the topic (Han), 1–2 sentences.
2. **Thesis** — one-line inversion = the maxim, restated operationally.
3. **Signature illustration** — ONE Mermaid diagram doing one job (plane-split / fan / loop / pipeline / annotated trace / contrast). The centerpiece.
4. **Decompose** — named parts (Mastra arrow-list / Han component sections), usually a **comparison or old-vs-new TABLE**.
5. **One named concrete example** — pin the abstraction to a real system (flight-booking agent's `bookings` row; SWE-bench tests; tau-bench DB state).
6. **Escalation ladder / decision rule** — not "it depends."
7. **Rule of thumb** — a quotable closer + 1-line transition to the neighbor principle.
- Code only where a 3–5 line snippet genuinely clarifies (or none). Tables + diagrams + named examples carry it. Target ~500–800 words + 1 diagram + ≤1 table.
