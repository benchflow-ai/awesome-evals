# Reference-integrity audit (recursive)

Verifies our quotes AND the references cited *inside* each source. Run 2026-06-23.

## Eugene Yan (eval posts) — integrity: **solid** (23 quotes verified)

- **[verbatim-ok]** "If you've ran off-the-shelf evals for your tasks, you may have found that most don't work..." — evals post
  - Verbatim, correct attribution and URL.
  - primary: https://eugeneyan.com/writing/evals/
- **[verbatim-ok]** "IMHO, accuracy is too coarse a metric to be useful." — evals post
  - Verbatim.
  - primary: https://eugeneyan.com/writing/evals/
- **[verbatim-ok]** "Examining the separation of distributions is valuable because a model can have high ROC-AUC and PR-AUC but still not be suitable for production."
  - Verbatim (second clause is italicized in original; text identical).
  - primary: https://eugeneyan.com/writing/evals/
- **[verbatim-ok]** "Don't be paralyzed by the need for perfection or zero risk... succumb to Innovator's Dilemma. Instead, set realistic, risk-adjusted evaluation criteria, start small, collect feedback, and iterate frequently."
  - Verbatim (first sentence bold in original).
  - primary: https://eugeneyan.com/writing/evals/
- **[supported-by-primary]** "...typical factual inconsistency/irrelevance rate is 5 - 10%, even after grounding via RAG... it may be prohibitively hard to go below 2%."
  - Verbatim quote. NOTE: this is Eugene's own anecdotal estimate ('from what I've learned from LLM providers'), not a cited study — inherently unverifiable against a primary, but honestly framed as anecdote in the original.
  - primary: https://eugeneyan.com/writing/evals/
- **[verbatim-ok]** "Building product evals is simply the scientific method in disguise. That's the secret sauce. It's a cycle of inquiry, experimentation, and analysis."
  - Verbatim.
  - primary: https://eugeneyan.com/writing/eval-process/
- **[verbatim-ok]** "If teams don't apply the scientific method, practice eval-driven development... buying or building yet another evaluation tool won't save the product."
  - Verbatim.
  - primary: https://eugeneyan.com/writing/eval-process/
- **[verbatim-ok]** "Automated evaluators amplify our existing annotation and feedback processes."
  - Verbatim; appears as a figure caption in the original. Text matches exactly.
  - primary: https://eugeneyan.com/writing/eval-process/
- **[verbatim-ok]** "Align AI to human. Calibrate human to AI. Repeat." — AlignEval
  - Verbatim (section heading).
  - primary: https://eugeneyan.com/writing/aligneval/
- **[verbatim-ok]** "Many teams make the mistake of crafting elaborate eval criteria without first looking at the data..."
  - Verbatim.
  - primary: https://eugeneyan.com/writing/aligneval/
- **[verbatim-ok]** "The way to solve this—and build useful evals—is to work backward from the data..."
  - Verbatim.
  - primary: https://eugeneyan.com/writing/aligneval/
- **[verbatim-ok]** "One anti-pattern is building a single \"God Evaluator\" ... that attempts to assess 5 - 10 dimensions... I've never seen this work well."
  - Verbatim. The ' ... ' correctly elides a parenthetical '(also see God Object)' Wikipedia link; no meaning distorted.
  - primary: https://eugeneyan.com/writing/product-evals/
- **[verbatim-ok]** "The benchmark is human performance, not perfection."
  - Verbatim (section heading).
  - primary: https://eugeneyan.com/writing/product-evals/
- **[verbatim-ok]** "...the true benefit isn't higher accuracy than human annotators—it's scalability... 24/7, without being bottlenecked by human review."
  - Verbatim.
  - primary: https://eugeneyan.com/writing/product-evals/
- **[verbatim-ok]** "If we want to assess a model migration from Claude Haiku 3.5 to Haiku 4.5, we make a one-line config change... get lunch, and check results."
  - Verbatim.
  - primary: https://eugeneyan.com/writing/product-evals/
- **[verbatim-ok]** "I tend to be skeptical of correlation metrics... (though Cohen's κ is an exception). ... Thus, where possible, I have my evaluators return binary outputs."
  - Verbatim. The ' ... ' elides two intermediate sentences about translating correlation metrics to production; elision does not distort meaning.
  - primary: https://eugeneyan.com/writing/llm-evaluators/
- **[verbatim-ok]** "If using it as a guardrail in production (low latency, high throughput), consider investing in finetuning a classifier or reward model..."
  - Verbatim.
  - primary: https://eugeneyan.com/writing/llm-evaluators/
- **[supported-by-primary]** "Gpt-4 favored itself with a 10% higher win rate while claude-v1 favored itself with a 25% higher win rate." (summarizing Zheng et al., MT-Bench)
  - RECURSIVE CHECK PASSED. Primary (MT-Bench, Sec 3.3 self-enhancement bias) states verbatim: 'GPT-4 favors itself with a 10% higher win rate; Claude-v1 favors itself with a 25% higher win rate.' Numbers exact. CAVEAT: primary hedges strongly — 'Due to limited data and small differences, our study cannot determine whether the models exhibit a self-enhancement bias,' and notes GPT-3.5 does NOT favor itself. Eugene's attribution as 'summarizing Zheng et al.' is fair; recommend the book carry the primary's hedge so the stat isn't read as settled.
  - primary: https://arxiv.org/abs/2306.05685
- **[supported-by-primary]** "The LLM-evaluators had high variance in correlation with human judgments across the datasets. Each model performed poorly on some datasets... not reliable enough to systematically replace human judgments."
  - RECURSIVE CHECK PASSED. Quote is verbatim from Eugene's post; it summarizes Bavaresco et al. (2024), 'LLMs instead of Human Judges? A Large Scale Empirical Study across 20 NLP Evaluation Tasks.' Primary abstract: 'Our evaluations show substantial variance across models and datasets... LLMs should be carefully validated against human judgments before being used as evaluators.' Faithfully represented.
  - primary: https://arxiv.org/abs/2406.18403
- **[verbatim-ok]** "...intern test... If you took the exact input to the language model... gave it to an average college student in the relevant major... could they succeed?"
  - Verbatim.
  - primary: https://applied-llms.org/
- **[verbatim-ok]** "Input-output pairs from production are the \"real things, real places\" (genchi genbutsu) of LLM applications, and they cannot be substituted."
  - Verbatim.
  - primary: https://applied-llms.org/
- **[verbatim-ok]** "These \"vibe checks\" are signals of bad outputs; code and assertions operationalize them."
  - Verbatim.
  - primary: https://applied-llms.org/
- **[verbatim-ok]** "LLM-as-Judge is not a silver bullet though... conventional classifiers and reward models can achieve higher accuracy than LLM-as-Judge, and with lower cost and latency."
  - Verbatim. NOTE: the 'higher accuracy/lower cost' claim is the authors' own experiential assertion, not a cited study — consistent with the surrounding essay's framing.
  - primary: https://applied-llms.org/
- **[verbatim-ok]** "When a measure becomes a target, it ceases to be a good measure." — Goodhart's Law, cited in Yan et al.
  - Verbatim and explicitly attributed to Goodhart's Law in the source. (Strictly, this popular phrasing is Marilyn Strathern's restatement of Goodhart, but the common attribution to 'Goodhart's Law' as the book uses it is standard and matches the source.)
  - primary: https://applied-llms.org/

**Reference findings (recursive):**
- RECURSIVE CHECK 1 (MT-Bench self-bias): Eugene's '10% / 25%' figures are an EXACT transcription of Zheng et al. 2306.05685 (Sec 3.3). Telephone-game test PASSED on the numbers. However, the primary itself is far more cautious than the blog framing implies: it explicitly states it 'cannot determine whether the models exhibit a self-enhancement bias' due to limited data, and notes GPT-3.5 does not self-favor. If the book leans on this as evidence of self-preference, add the primary's hedge.
- RECURSIVE CHECK 2 (high-variance finding): Eugene's summary sentence faithfully represents Bavaresco et al. 2024 (arXiv:2406.18403, 'LLMs instead of Human Judges?'). Primary abstract confirms 'substantial variance across models and datasets' and recommends validating LLM judges against humans. PASSED.
- evals post additionally cites Krysciinski et al. (summarization eval dimensions), Fabbri et al. 2021 / Zhang et al. 2023 (generated > reference summaries), Stiennon et al. 2020 (reward models), Gehman et al. 2020 (RealToxicityPrompts), Dhamala et al. 2021 (BOLD), HELM/Liang et al. 2022, and a Voiceflow blog (~10% perf drop across ChatGPT versions). These back secondary points and were not individually re-verified to primary, as no quote in our cluster depends on them.
- aligneval cites 'Who Validates the Validators' (2404.12272), PoLL (2404.18796), Llama2 (2307.09288), and the FIB dataset (r-three/fib) — none load-bearing for our quoted text.
- product-evals cites Anthropic's 'Statistical Approach to Model Evals' and Harrison Chase; eval-process cites mainly Wikipedia (TDD, train/val/test) plus internal links — none load-bearing for our quotes.
- applied-llms.org: the 'classifiers/reward models beat LLM-as-Judge on accuracy/cost/latency' and Goodhart framing are authorial/aphoristic, not external-stat dependent; nothing to chase to a primary.

All 23 quotes are verbatim and correctly attributed to the right post and URL. Minor formatting-only notes: quote #3 and #4 (evals) have italic/bold styling in the original that the plain-text quote drops (no wording change); #8 (eval-process) is a figure caption; the two ellipses (#12 God Evaluator, #16 correlation metrics) legitimately elide a parenthetical link and two intermediate sentences respectively, without distorting meaning. The two recursive primary-source checks — MT-Bench 10%/25% self-bias and the Bavaresco 'high variance' study — both check out: numbers/claims are faithfully represented, no telephone-game distortion. The single watch-item is that the MT-Bench primary explicitly cannot conclude self-enhancement bias exists (limited data; GPT-3.5 doesn't self-favor); if the book presents the 10/25 stat as established self-preference, append that caveat. The 5-10%/below-2% inconsistency figures are Eugene's own anecdotal estimates (so labeled in source) and have no citable primary. Overall integrity: solid.

---

## Hamel Husain & Shreya Shankar (evals course/FAQ, EvalGen) — integrity: **solid** (24 quotes verified)

- **[verbatim-ok]** intern test passage
  - Verbatim in sec 1.4.3. Correctly attributed to the six co-authors (Yan, Bischof, Frye, Husain, Liu, Shankar). Only diff is straight vs curly quotes around 'intern test' — trivial.
  - primary: https://applied-llms.org/
- **[verbatim-ok]** 'Many people focus exclusively on #3 above...beyond a demo.'
  - primary: https://hamel.dev/blog/posts/evals/
- **[verbatim-ok]** 'You must remove all friction from the process of looking at data.'
  - primary: https://hamel.dev/blog/posts/evals/
- **[verbatim-ok]** 'Don't rely on generic evaluation frameworks...specific to your problem.'
  - primary: https://hamel.dev/blog/posts/evals/
- **[verbatim-ok]** 'You can never stop looking at data—no free lunch exists.'
  - primary: https://hamel.dev/blog/posts/evals/
- **[verbatim-ok]** '...assertions should run fast and cheaply...every time your code changes.'
  - primary: https://hamel.dev/blog/posts/evals/
- **[verbatim-ok]** '...better to build my own data viewing & labeling tool...onto one screen.'
  - primary: https://hamel.dev/blog/posts/evals/
- **[verbatim-ok]** 'track the correlation between model-based and human evaluation...'
  - primary: https://hamel.dev/blog/posts/evals/
- **[verbatim-ok]** 'Tracking a bunch of scores on a 1-5 scale is often a sign of a bad eval process'
  - Page continues '(I'll discuss why later).' — our excerpt stops before the parenthetical, fine.
  - primary: https://hamel.dev/blog/posts/llm-judge/
- **[verbatim-ok]** 'What makes something a 3 versus a 4? Nobody knows...'
  - primary: https://hamel.dev/blog/posts/llm-judge/
- **[verbatim-ok]** 'When domain experts must decide if an interaction passes or fails...'
  - primary: https://hamel.dev/blog/posts/llm-judge/
- **[verbatim-ok]** 'In most organizations there is usually one (maybe two) key individuals...'
  - primary: https://hamel.dev/blog/posts/llm-judge/
- **[verbatim-ok]** '...critique should be detailed enough so that you can use it in a few-shot prompt...new employee could understand it.'
  - Both sentences confirmed verbatim and consecutive.
  - primary: https://hamel.dev/blog/posts/llm-judge/
- **[verbatim-ok]** '...using raw agreement is generally not recommended and can be misleading when classes are imbalanced.'
  - primary: https://hamel.dev/blog/posts/llm-judge/
- **[verbatim-ok]** 'It took us only three iterations to achieve > 90% agreement between the LLM and Phillip.'
  - Self-reported Honeycomb case study; not independently verifiable, but quote is accurate.
  - primary: https://hamel.dev/blog/posts/llm-judge/
- **[verbatim-ok]** 'Remember, the whole point of the LLM as a judge is to help you find these errors...'
  - primary: https://hamel.dev/blog/posts/llm-judge/
- **[verbatim-ok]** 'Error analysis is the most important activity in evals.'
  - primary: https://hamel.dev/blog/posts/evals-faq/
- **[verbatim-ok]** 'Appointing a single domain expert as a benevolent dictator is the most effective approach.'
  - Full sentence is prefixed 'For most small to medium-sized companies,' — our excerpt drops the qualifier but does not distort meaning.
  - primary: https://hamel.dev/blog/posts/evals-faq/
- **[verbatim-ok]** 'Write evaluators for errors you discover, not errors you imagine.'
  - primary: https://hamel.dev/blog/posts/evals-faq/
- **[verbatim-ok]** '...aim to review at least 100 traces...if ~20 traces don't turn up a new category, you can stop...'
  - primary: https://hamel.dev/blog/posts/evals-faq/
- **[verbatim-ok]** 'Annotate only the first failure in the trace initially...cascade from the first issue.'
  - primary: https://hamel.dev/blog/posts/evals-faq/
- **[verbatim-ok]** '...transition failure matrices...rows represent the last successful state and columns represent where the first failure occurred.'
  - primary: https://hamel.dev/blog/posts/evals-faq/
- **[verbatim-ok]** 'Error analysis - the single most valuable activity in AI development and consistently the highest-ROI activity.'
  - primary: https://hamel.dev/blog/posts/field-guide/
- **[verbatim-ok]** 'The single most impactful investment...isn't a fancy evaluation dashboard – it's building a customized interface...'
  - primary: https://hamel.dev/blog/posts/field-guide/
- **[supported-by-primary]** RECURSIVE: llm-judge & FAQ cite EvalGen 'Who Validates the Validators?' (Shankar et al.) for 'criteria drift'
  - Faithful. Paper's abstract: 'users need criteria to grade outputs, but grading outputs helps users define criteria.' Blog paraphrase matches with no distortion. Note self-citation: Shankar co-authors both the paper and the blog cluster.
  - primary: https://arxiv.org/abs/2404.12272
- **[supported-by-primary]** RECURSIVE: llm-judge cites Google ML Crash Course for 'raw agreement misleading when classes imbalanced'
  - Supported. Google page: a model predicting negative 100% of the time scores 99% accuracy on a 1%-positive set 'despite being useless'; recommends precision/recall for imbalanced data. Blog claim is faithful.
  - primary: https://developers.google.com/machine-learning/crash-course/classification/accuracy-precision-recall

**Reference findings (recursive):**
- EvalGen / 'Who Validates the Validators?' (arXiv 2404.12272, Shankar/Zamfirescu-Pereira/Hartmann/Parameswaran/Arawjo) — the load-bearing academic citation in this cluster, cited in both llm-judge and evals-faq for 'criteria drift'. Primary verified: the blog's paraphrase faithfully represents the paper's definition ('users need criteria to grade outputs, but grading outputs helps users define criteria'). No telephone-game distortion. Caveat: this is effectively a self-citation since Shreya Shankar co-authors both.
- Google ML Crash Course 'Accuracy, Precision, Recall' — cited in llm-judge to justify that raw agreement/accuracy misleads on imbalanced classes. Primary verified: the page gives the 99%-accuracy-on-1%-positive example and recommends precision/recall. Faithfully represented.
- FAQ '100 traces' / '~20 traces saturation' / 'transition failure matrices' — the author does NOT cite peer-reviewed research for these; they are explicitly framed as practitioner heuristics. The saturation idea is loosely linked to a 'theoretical saturation' concept from a qualitative-research blog (delvetool), and transition matrices to talks by Bryan Bischof. No misattribution — the author makes no academic claim, so these are honest heuristics rather than distorted citations.
- Honeycomb '>90% agreement with Phillip in 3 iterations' — self-reported case study (Honeycomb Query Assistant), not an independent primary; accurate as quoted but unverifiable externally.
- Other supporting links in the cluster (Databricks 'Grading Notes', Eugene Yan AlignEval/LLM-evaluators, OpenAI Cookbook custom-judge, LangChain Dosu case study) are corroborating practitioner sources, not load-bearing statistics; not individually distorted in the quotes we drew.

All 24 of our quotes/claims verify VERBATIM against the primary source pages with correct attribution and URLs — no misquotes, no fabricated attributions. Two minor, non-distorting truncations worth noting in the book if precision matters: (1) the 'benevolent dictator' quote drops the leading qualifier 'For most small to medium-sized companies,'; (2) the '1-5 scale' quote stops before the page's parenthetical '(I'll discuss why later).' Neither changes meaning. The intern-test quote differs only in straight vs curly quotation marks.

Recursive reference check (the part the author was challenged on): the cluster's two genuinely load-bearing external citations both hold up. The EvalGen 'criteria drift' citation is represented faithfully against the arXiv primary, though readers should know it is partly a self-citation (Shankar co-authors both). The Google ML Crash Course citation correctly supports the imbalanced-classes warning. The widely-repeated '100 traces / 20-trace saturation' and 'transition failure matrix' rules are honestly presented as practitioner heuristics, NOT dressed up as academic findings — so no telephone-game inflation there. Overall integrity: solid.

---

## Han-Chung Lee (agent eval infra; RL-env taxonomy) — integrity: **minor-issues** (23 quotes verified)

- **[verbatim-ok]** Eval infra quote: 'These scores are useful... task definitions, runtimes, snapshots... production feedback.'
  - Verbatim on page; correctly attributed (2026-06-13).
  - primary: https://leehanchung.github.io/blogs/2026/06/13/hidden-technical-debt-agent-evaluation-infra/
- **[verbatim-ok]** 'Scoring the final response is the easy part... explainable, reproducible, and actionable.'
  - Verbatim.
  - primary: https://leehanchung.github.io/blogs/2026/06/13/hidden-technical-debt-agent-evaluation-infra/
- **[verbatim-ok]** 'agents complete tasks by changing the environment, so final-output-only evals are no longer sufficient.'
  - Verbatim; on page preceded by 'This is all to say that'.
  - primary: https://leehanchung.github.io/blogs/2026/06/13/hidden-technical-debt-agent-evaluation-infra/
- **[verbatim-ok]** 'Traces should not be scored primarily on whether they follow one golden path... weak measure of agent intelligence.'
  - Verbatim.
  - primary: https://leehanchung.github.io/blogs/2026/06/13/hidden-technical-debt-agent-evaluation-infra/
- **[verbatim-ok]** 'The canonical trace-level failure is the empty tool result hallucination.'
  - Verbatim.
  - primary: https://leehanchung.github.io/blogs/2026/06/13/hidden-technical-debt-agent-evaluation-infra/
- **[verbatim-ok]** 'A polished final answer does not mean its faithful to the context...unsafe or excessive.'
  - Verbatim, including the source's own typo 'its' (for 'it's').
  - primary: https://leehanchung.github.io/blogs/2026/06/13/hidden-technical-debt-agent-evaluation-infra/
- **[verbatim-ok]** 'A 2.4-point move in an average can be a real improvement or pure noise; Simpson's paradox applies...'
  - Verbatim.
  - primary: https://leehanchung.github.io/blogs/2026/06/13/hidden-technical-debt-agent-evaluation-infra/
- **[verbatim-ok]** 'The useful question is not "did the number go up"... which tasks flipped and in which direction.'
  - Verbatim.
  - primary: https://leehanchung.github.io/blogs/2026/06/13/hidden-technical-debt-agent-evaluation-infra/
- **[verbatim-ok]** 'And an eval infrastructure that cannot restore the state to a checkpoint is logs, not eval infra.'
  - Verbatim.
  - primary: https://leehanchung.github.io/blogs/2026/06/13/hidden-technical-debt-agent-evaluation-infra/
- **[verbatim-ok]** 'State is the part... They are used to datasets. Agents need worlds. Agentic evaluation infra needs multiverses.'
  - Verbatim.
  - primary: https://leehanchung.github.io/blogs/2026/06/13/hidden-technical-debt-agent-evaluation-infra/
- **[verbatim-ok]** 'This is cargo cult evaluation - the number moved up and to the right because the measurement changed...'
  - Verbatim.
  - primary: https://leehanchung.github.io/blogs/2026/06/13/hidden-technical-debt-agent-evaluation-infra/
- **[verbatim-ok]** 'Agents do not only need datasets. Agents need worlds. Evaluation infrastructure is how those worlds become measurable.'
  - Verbatim.
  - primary: https://leehanchung.github.io/blogs/2026/06/13/hidden-technical-debt-agent-evaluation-infra/
- **[verbatim-ok]** 'If your eval does not capture the state delta, it is not flexible enough to evaluate tasks that are stateful.'
  - Verbatim.
  - primary: https://leehanchung.github.io/blogs/2026/06/13/hidden-technical-debt-agent-evaluation-infra/
- **[verbatim-ok]** 'If memory is part of the harness, it is part of the evaluation surface.'
  - Verbatim.
  - primary: https://leehanchung.github.io/blogs/2026/06/13/hidden-technical-debt-agent-evaluation-infra/
- **[verbatim-ok]** 'One bad episode becomes a durable preference. A polluted memory narrows exploration...'
  - Verbatim.
  - primary: https://leehanchung.github.io/blogs/2026/06/13/hidden-technical-debt-agent-evaluation-infra/
- **[verbatim-ok]** 'A benchmark is a frozen environment.'
  - Verbatim.
  - primary: https://leehanchung.github.io/blogs/2026/06/13/hidden-technical-debt-agent-evaluation-infra/
- **[verbatim-ok]** 'A trajectory is what the trainer sees (state-action-reward tuples); a trace is what the observability system sees...'
  - Verbatim; correctly attributed (2026-03-21).
  - primary: https://leehanchung.github.io/blogs/2026/03/21/rl-environments-for-llm-agents/
- **[verbatim-ok]** 'Verifiable beats judgeable. Programmatic checks such as string match or code execution... not as the default.'
  - Verbatim.
  - primary: https://leehanchung.github.io/blogs/2026/03/21/rl-environments-for-llm-agents/
- **[verbatim-ok]** 'Static rubrics get gamed. Models learn to write answers that score well on your rubric rather than solving the problem.'
  - Verbatim.
  - primary: https://leehanchung.github.io/blogs/2026/03/21/rl-environments-for-llm-agents/
- **[verbatim-ok]** 'If you've built benchmarks before, you've already built an RL environment — just a frozen one.'
  - Verbatim.
  - primary: https://leehanchung.github.io/blogs/2026/03/21/rl-environments-for-llm-agents/
- **[verbatim-ok]** 'This is the generation-verification gap: generating outputs with AI agents is cheap, but verifying their quality...'
  - Verbatim.
  - primary: https://leehanchung.github.io/blogs/2026/03/21/rl-environments-for-llm-agents/
- **[verbatim-ok]** 'Using the same model family to both generate completions and judge them creates a feedback loop...'
  - Verbatim.
  - primary: https://leehanchung.github.io/blogs/2026/03/21/rl-environments-for-llm-agents/
- **[verbatim-ok]** 'Get these right, and the agent learns behaviors that transfer to production. Get them wrong... an expensive demo.'
  - Verbatim.
  - primary: https://leehanchung.github.io/blogs/2026/03/21/rl-environments-for-llm-agents/
- **[verbatim-ok]** 'While some express skepticism about the quality and trustworthiness of LLMs as judges... align with expectations.'
  - Verbatim in the Introduction; correctly attributed (2024-08-11).
  - primary: https://leehanchung.github.io/blogs/2024/08/11/llm-as-a-judge/
- **[supported-by-primary]** REFERENCE CHECK: Blog claims AutoEnv generates environments at ~$4 each.
  - Primary (AutoEnv, Zhang et al., 2025-11) abstract states 'low-cost (4.12 USD on average) generation of heterogeneous worlds.' Independently confirmed via search. Accurate.
  - primary: https://arxiv.org/abs/2511.19304
- **[supported-by-primary]** REFERENCE CHECK: Blog claims EnterpriseOps-Gym maintains 164 DB tables and 512 tools.
  - Primary abstract: 'EnterpriseOps-Gym features a containerized sandbox with 164 database tables and 512 functional tools.' Exact match.
  - primary: https://arxiv.org/abs/2603.13594
- **[supported-by-primary]** REFERENCE CHECK: Blog cites AgentScaler with a two-phase curriculum / fine-tuning strategy.
  - Primary paper 'Towards General Agentic Intelligence via Environment Scaling' (Fang et al.) describes 'a two-phase agent fine-tuning strategy'; the model is named AgentScaler. Note actual paper title differs from a generic 'AgentScaler: Scaling LLM Agent Training' label, but the blog's anchor + claim are accurate.
  - primary: https://arxiv.org/abs/2509.13311
- **[unverifiable]** REFERENCE CHECK: Blog states Step-DeepResearch 'deliberately injects 5-10% tool errors during training.'
  - PARTIAL/WEAK LINK. Primary (Step-DeepResearch Technical Report) supports the QUALITATIVE claim: it 'intentionally retained' a 'controlled proportion of trajectories containing tool-call errors, such as empty search results or tool failures' — but in the SFT stage and WITHOUT any 5-10% figure. The specific '5-10%' quantification could not be found in the abstract or HTML body; appears to be the blog author's own gloss. Flag as a number not substantiated by the primary.
  - primary: https://arxiv.org/abs/2512.20491
- **[supported-by-primary]** REFERENCE CHECK: Blog states Step-DeepResearch scales context 32K to 128K during mid-training.
  - Primary: Stage II mid-training 'further extends the maximum context length to 128K' (Stage I = 32K, per Table 3). Accurate.
  - primary: https://arxiv.org/abs/2512.20491
- **[supported-by-primary]** REFERENCE CHECK (LLM-as-judge post): cites Sclar et al. ~76 accuracy points from prompt formatting.
  - Primary (Sclar, Choi, Tsvetkov, Suhr) abstract: 'performance differences of up to 76 accuracy points when evaluated using LLaMA-2-13B.' Accurately represented.
  - primary: https://arxiv.org/abs/2310.11324

**Reference findings (recursive):**
- AutoEnv (arxiv 2511.19304, Zhang et al., 2025-11): REAL and correctly cited. Blog's '~$4/environment' matches the primary's '4.12 USD on average'. Existence independently confirmed via web search (HF, GitHub FoundationAgents/AutoEnv).
- EnterpriseOps-Gym (arxiv 2603.13594, Malay et al.): REAL and exactly cited. '164 database tables and 512 functional tools' is a verbatim match to the abstract.
- AgentScaler (arxiv 2509.13311): REAL. Actual title is 'Towards General Agentic Intelligence via Environment Scaling' (Fang et al.); AgentScaler is the resulting model. Blog's two-phase fine-tuning claim is supported. Only nuance: the paper title is not literally 'AgentScaler', but the link and substantive claim are correct.
- Step-DeepResearch (arxiv 2512.20491): REAL ('Step-DeepResearch Technical Report', 65 authors). The 32K->128K context-scaling claim checks out exactly. HOWEVER the blog's specific '5-10% tool errors' figure is NOT found in the primary — the paper only says it 'intentionally retained' a 'controlled proportion' of error trajectories (empty search results / tool failures) in SFT, with no percentage. This is the one telephone-game risk in the cluster: a qualitative practice was given an unsupported specific number. Recommend softening to 'a controlled proportion of tool-error trajectories' unless the 5-10% appears elsewhere in the full PDF.
- Sclar et al. (arxiv 2310.11324) in the 2024 LLM-as-a-Judge post: REAL and accurately represented — 'up to 76 accuracy points' from prompt-format sensitivity matches the abstract verbatim.
- SWE-bench (arxiv 2310.06770) and SciCode (arxiv 2407.13168): cited with correct, well-known arxiv IDs; standard benchmark references, no distortion observed.
- Foundational/namesake citations — Sculley et al. 2015 'Hidden Technical Debt in Machine Learning Systems' (NeurIPS) and Sutton & Barto 2018 — are correctly attributed and uncontroversial. Other cited resources (MCP, Open Reward Standard, OpenReward, Prime Intellect prime-rl, Ofir Press benchmarks guide) are project/blog links used illustratively, not load-bearing statistics.

All 23 author quotes are VERBATIM and correctly attributed to the right post/date/URL across the three sources (eval-infra 2026-06-13, RL-env taxonomy 2026-03-21, LLM-as-judge 2024-08-11). One quote (#6) faithfully preserves the source's own typo 'its' for 'it's' — keep as-is for fidelity. Recursive reference check: the source's load-bearing external citations are real and, with one exception, accurately represented against their primaries — verified AutoEnv ($4.12 avg), EnterpriseOps-Gym (164 tables/512 tools), AgentScaler (two-phase), Sclar (76 accuracy points), and Step-DeepResearch context 32K->128K. SINGLE FLAG: the blog's claim that Step-DeepResearch 'deliberately injects 5-10% tool errors during training' adds a specific percentage that the primary paper does not state (it only describes retaining 'a controlled proportion' of tool-error trajectories, in the SFT stage). The qualitative point stands; the precise 5-10% figure is unverifiable against the primary. Overall integrity: solid quoting, one unsupported quantification to fix or soften.

---

## Anthropic (demystifying evals; error bars) — integrity: **minor-issues** (20 quotes verified)

- **[verbatim-ok]** An evaluation ('eval') is a test for an AI system: give an AI an input, then apply grading logic to its output to measure success.
  - Exact match; opens 'The structure of an evaluation'.
  - primary: https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents
- **[verbatim-ok]** A good task is one where two domain experts would independently reach the same pass/fail verdict.
  - Exact match; Step 2 (unambiguous tasks).
  - primary: https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents
- **[verbatim-ok]** Everything the grader checks should be clear from the task description; agents shouldn't fail due to ambiguous specs.
  - Exact match.
  - primary: https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents
- **[verbatim-ok]** So as not to unnecessarily punish creativity, it's often better to grade what the agent produced, not the path it took.
  - Exact match; Step 5 (design graders).
  - primary: https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents
- **[verbatim-ok]** A support agent that correctly identifies the problem and verifies the customer but fails to process a refund is meaningfully better than one that fails immediately.
  - Exact match; partial-credit discussion.
  - primary: https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents
- **[verbatim-ok]** Test both the cases where a behavior should occur and where it shouldn't. One-sided evals create one-sided optimization.
  - Exact match; Step 3 (balanced problem sets).
  - primary: https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents
- **[verbatim-ok]** You won't know if your graders are working well unless you read the transcripts and grades from many trials.
  - Exact match; Step 6 (check the transcripts).
  - primary: https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents
- **[verbatim-ok]** As a rule, we do not take eval scores at face value until someone digs into the details of the eval and reads some transcripts.
  - Exact match.
  - primary: https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents
- **[verbatim-ok]** When we evaluate 'an agent,' we're evaluating the harness and the model working together.
  - Exact match; definitions section.
  - primary: https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents
- **[verbatim-ok]** Eval saturation occurs when an agent passes all of the solvable tasks, leaving no room for improvement.
  - Exact match; Step 7 (capability eval saturation).
  - primary: https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents
- **[verbatim-ok]** Each trial should be 'isolated' by starting from a clean environment. Unnecessary shared state between runs (leftover files, cached data, resource exhaustion) can cause correlated failures due to infrastructure flakiness rather than agent performance.
  - Exact match; Step 4.
  - primary: https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents
- **[verbatim-ok]** It 'failed' the evaluation as written, but actually came up with a better solution for the user. (Opus 4.5 / tau2-bench policy loophole)
  - Quote verbatim and correctly attributed. NOTE: the Opus 4.5 tau2-bench loophole is Anthropic's own internal anecdote, not independently verifiable against an external primary; the linked tau2-bench paper (arXiv 2506.07982) is only the benchmark, not this finding.
  - primary: https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents
- **[verbatim-ok]** For AI product teams, owning and iterating on evaluations should be as routine as maintaining unit tests.
  - Exact match; Step 8.
  - primary: https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents
- **[verbatim-ok]** To avoid hallucinations, give the LLM a way out, like providing an instruction to return 'Unknown' when it doesn't have enough information.
  - Exact match; Step 5.
  - primary: https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents
- **[verbatim-ok]** It can also help to create clear, structured rubrics to grade each dimension of a task, and then grade each dimension with an isolated LLM-as-judge rather than using one to grade all dimensions.
  - Exact match; Step 5.
  - primary: https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents
- **[verbatim-ok]** Like the Swiss Cheese Model from safety engineering, no single evaluation layer catches every issue. With multiple methods combined, failures that slip through one layer are caught by another.
  - Exact match; article links 'Swiss Cheese Model' to Wikipedia. Analogy attribution is generic safety-engineering, fine.
  - primary: https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents
- **[verbatim-ok]** It's often best to quickly pick a framework that fits your workflow, then invest your energy in the evals themselves by iterating on high-quality test cases and graders.
  - Exact match; Appendix.
  - primary: https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents
- **[verbatim-ok]** pass@k measures the likelihood that an agent gets at least one correct solution in k attempts.
  - Quote verbatim. Article cites the NeurIPS 2019 SPoC paper (Kulal et al.) for pass@k; SPoC does originate pass@k and defines it as a task solved if at least one of k samples passes the tests — Anthropic's characterization is faithful to the primary.
  - primary: https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents
- **[verbatim-ok]** pass^k measures the probability that all k trials succeed.
  - Quote verbatim. pass^k originates with tau-bench (Yao et al.); article's definition is consistent with that primary.
  - primary: https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents
- **[verbatim-ok]** We make a number of specific recommendations for running language model evaluations and reporting experiment results in a way that minimizes statistical noise and maximizes informativeness. (attributed to 'Miller et al. (Anthropic)')
  - Quote is verbatim from the abstract; Anthropic affiliation correct (evanmiller@anthropic.com). ATTRIBUTION FLAW: the paper is single-author (Evan Miller), so 'Miller et al.' is wrong — should be 'Miller (Anthropic)'. Fix the 'et al.'
  - primary: https://arxiv.org/abs/2411.00640

**Reference findings (recursive):**
- pass@k -> SPoC: Search-based Pseudocode to Code (Kulal, Pasupat, Chandra, Lee, Padon, Aiken, Liang; NeurIPS 2019). The demystifying article links pass@k to this NeurIPS 2019 paper (proceedings.neurips.cc/.../7298332f...Paper.pdf). SPoC is a legitimate origin of pass@k and defines it as a task being solved if at least one of the top-k candidate samples passes the tests — Anthropic's phrasing ('at least one correct solution in k attempts') faithfully represents the primary. No telephone-game distortion. (The more cited unbiased-estimator version is Chen et al. 2021 Codex paper, but citing SPoC is defensible.)
- tau2-bench -> arXiv:2506.07982 and tau-bench -> arXiv:2406.12045: both links resolve to the correct benchmark papers. However, the article's load-bearing anecdote ('Opus 4.5 found a policy loophole... came up with a better solution') is Anthropic's own internal result, NOT something in the tau2-bench paper; it is unverifiable against an external primary. Correctly attributed to the article itself.
- Swiss Cheese Model -> Wikipedia: linked correctly; used as a generic safety-engineering analogy, no specific statistic borrowed, so no misrepresentation risk.
- Adding Error Bars to Evals -> arXiv:2411.00640: abstract quote verbatim; author Evan Miller is confirmed Anthropic (evanmiller@anthropic.com), so the Anthropic attribution is right, but the paper is SINGLE-AUTHOR — 'Miller et al.' is incorrect and should be corrected to 'Miller'.
- Other benchmark citations in the article (SWE-bench Verified, Terminal-Bench, WebArena arXiv:2307.13854, OSWorld) and tooling (Harbor, Braintrust, LangSmith, Langfuse, Arize Phoenix) link to correct primaries; none are load-bearing for the quotes we drew.

All 20 of our quotes are verbatim and correctly sourced to the right URL. Only defect found: one attribution error — the error-bars paper (arXiv:2411.00640) is single-authored by Evan Miller (Anthropic), so 'Miller et al.' should read 'Miller'. Quote text itself is exact. Recursive check of the source's OWN citations: the load-bearing ones (pass@k -> SPoC/Kulal 2019; pass^k -> tau-bench; Swiss Cheese -> Wikipedia) are represented faithfully, no telephone-game distortion. Caveat: the Opus 4.5 / tau2-bench 'policy loophole, came up with a better solution' anecdote is Anthropic's own internal claim and cannot be independently verified against the tau2-bench primary; it is correctly attributed to the blog but should be presented as Anthropic's self-report, not a third-party-verified result. Recommend fixing 'Miller et al.' -> 'Miller'.

---

## Ofir Press / SWE-bench (+ SWE-bench Illusion) — integrity: **solid** (13 quotes verified)

- **[verbatim-ok]** Try to build a benchmark that has natural questions that some category of humans ask on a frequent basis.
  - Opening of the 'Natural' section. Verbatim, correctly attributed to Ofir Press.
  - primary: https://ofir.io/How-to-Build-Good-Language-Modeling-Benchmarks/
- **[verbatim-ok]** I think that at launch, a good benchmark should have the top LMs achieving between 1% to 35% accuracy on it.
  - Under 'Challenging'. Verbatim.
  - primary: https://ofir.io/How-to-Build-Good-Language-Modeling-Benchmarks/
- **[verbatim-ok]** Due to the speed of development of AI I'm now asking my collaborators, not to think of benchmarks that would have AI systems achieving 0% at launch, but to think of benchmarks that would have systems achieving '-200%' at launch.
  - May 2025 edit. Verbatim.
  - primary: https://ofir.io/How-to-Build-Good-Language-Modeling-Benchmarks/
- **[verbatim-ok]** Benchmarks typically get saturated within a year.
  - Verbatim, but author provides NO citation/source for this empirical assertion (unsourced claim presented as fact). Fine to quote as his opinion; do not present as established/sourced finding.
  - primary: https://ofir.io/How-to-Build-Good-Language-Modeling-Benchmarks/
- **[verbatim-ok]** Beware- researchers are humans and humans have emotions. If at launch, the top model's accuracy is less than 10%, that might seem very intimidating for most researchers, and they might not want to work on your benchmark at all.
  - Confirmed verbatim on targeted re-fetch. (An initial fetch dropped 'want to' as a paraphrasing artifact; the source text does contain 'might not want to work'.)
  - primary: https://ofir.io/How-to-Build-Good-Language-Modeling-Benchmarks/
- **[verbatim-ok]** Could we build a benchmark such that even if the benchmark itself leaks into an LM's training data, it won't really help that LM in getting a good score on the benchmark?
  - 'Bonus Property' section. Verbatim.
  - primary: https://ofir.io/How-to-Build-Good-Language-Modeling-Benchmarks/
- **[verbatim-ok]** If you're asking coding questions, and your scaffolding doesn't allow for code execution, that's not a very good representation of reality.
  - 'Concluding Thoughts'. Verbatim.
  - primary: https://ofir.io/How-to-Build-Good-Language-Modeling-Benchmarks/
- **[verbatim-ok]** Have one number for your benchmark. One metric that people go for. 'We get 87% on HumanEval' is the vibe you are going for.
  - Verbatim. Note: '87% on HumanEval' is an illustrative example of communication style, NOT a factual claim about HumanEval scores — do not cite it as a real benchmark result.
  - primary: https://ofir.io/How-to-Build-Good-Language-Modeling-Benchmarks/
- **[verbatim-ok]** would a system that got better-than-baseline accuracy on this benchmark be useful to humans?
  - 'Natural' section. Verbatim.
  - primary: https://ofir.io/How-to-Build-Good-Language-Modeling-Benchmarks/
- **[verbatim-ok]** Resolving issues in SWE-bench frequently requires understanding and coordinating changes across multiple functions, classes, and even files simultaneously, calling for models to interact with execution environments, process extremely long contexts and perform complex reasoning that goes far beyond traditional code generation tasks.
  - Matches the published abstract verbatim. Author order confirmed: Jimenez, Yang, Wettig, Yao, Pei, Press, Narasimhan.
  - primary: https://arxiv.org/abs/2310.06770
- **[verbatim-ok]** The best-performing model, Claude 2, is able to solve a mere 1.96% of the issues.
  - Verbatim in abstract (rendered as $1.96$% in LaTeX). Correct attribution.
  - primary: https://arxiv.org/abs/2310.06770
- **[verbatim-ok]** We worked with 93 software developers experienced in Python to manually screen SWE-bench samples for quality. We annotated 1,699 random samples from the SWE-bench test set.
  - Verbatim; full source sentence continues '...test set to produce SWE-bench Verified.' Our quote truncates cleanly at a sentence boundary, no meaning altered. (openai.com 403'd to WebFetch; confirmed via a faithful mirror of the post + corroborating search.)
  - primary: https://openai.com/index/introducing-swe-bench-verified/
- **[verbatim-ok]** state-of-the-art models achieve up to 76% accuracy in identifying buggy file paths using only issue descriptions
  - Verbatim from the abstract of 'The SWE-bench Illusion' (Liang, Garg, Zilouchian Moghaddam). Correctly attributed.
  - primary: https://arxiv.org/abs/2506.12286

**Reference findings (recursive):**
- Ofir Press blog -> SWE-bench (his own paper, arxiv 2310.06770): the 1.96% Claude 2 figure and the SWE-bench framing used across this cluster are internally consistent with the primary paper (2,294 tasks, 12 Python repos). No telephone-game distortion.
- Ofir Press blog -> 'Benchmarks typically get saturated within a year': UNSOURCED. The author cites no reference or data for this empirical claim; it is his assertion/opinion. Safe to quote as his view, not as a sourced finding.
- Ofir Press blog -> '87% on HumanEval': this is an illustrative example of how to communicate a single headline metric, NOT a citation of an actual HumanEval result. No misrepresentation, but it should not be repeated as a real score.
- SWE-bench Illusion (2506.12286) -> OpenAI SWE-bench Verified (cited as OpenAI 2024) and Jimenez et al. 2024 (SWE-bench): both are cited and represented correctly. The paper states SWE-bench Verified is 'a human-validated subset... consisting of 500 curated samples from 12 open-source Python repositories', which matches OpenAI's primary (500 samples, screened by 93 devs from 1,699 annotated). Checks out.
- SWE-bench Illusion internal nuance (does NOT affect our verbatim quote): the abstract's headline 'up to 76%' is loosely attributed in one body sentence to 'o3-mini', but the paper's own Table 3 / Figure 4 show o3 (not o3-mini) is the model at ~76-77.44%, while o3-mini is 68.37%. The '76%' figure itself is the paper's own measurement and is correctly quoted; flag only that the '76%' belongs to o3. The 'up to 53%' comparison figure is measured on out-of-distribution 'Outside-Repo' tasks (pandas-dev/pandas, 123 tasks; pytorch/pytorch, 32 tasks) not in SWE-bench.

All 13 quotes are verbatim and correctly attributed; integrity is solid. Two process caveats: (1) openai.com returned HTTP 403 to WebFetch, so the SWE-bench Verified quote was confirmed via a faithful mirror plus corroborating search rather than the live page — re-verify against openai.com directly if you want a first-party screenshot. (2) The first automated fetch of the Ofir Press page dropped 'want to' from quote 5; a targeted re-fetch confirmed the source reads 'they might not want to work on your benchmark at all', matching our quote. Recommend the book add light framing for two items: the 'saturated within a year' line is the author's unsourced assertion, and '87% on HumanEval' is his illustrative example (not a real result). Recursive reference check found no telephone-game distortions: the Illusion paper faithfully represents both SWE-bench and SWE-bench Verified, and the cluster's cross-references (1.96% Claude 2, 500 verified samples, 93 devs / 1,699 annotated) are mutually consistent with the primaries.

---

## Kapoor et al. "AI Agents That Matter" + METR (plus Hamel Husain LLM-judge and Jason Wei verifier's-law posts grouped in this cluster) — integrity: **solid** (8 quotes verified)

- **[verbatim-ok]** Hamel Husain: 'However, using raw agreement is generally not recommended and can be misleading when classes are imbalanced.'
  - Verbatim on the page, correctly attributed. Hamel's recommended alternative is measuring precision and recall separately (not Cohen's kappa, despite kappa being the common textbook alternative) — does not affect our quote.
  - primary: https://hamel.dev/blog/posts/llm-judge/
- **[verbatim-ok]** Jason Wei: 'The ease of training AI to solve a task is proportional to how verifiable the task is.'
  - Verbatim, correctly attributed.
  - primary: https://www.jasonwei.net/blog/asymmetry-of-verification-and-verifiers-law
- **[verbatim-ok]** Jason Wei: 'All tasks that are possible to solve and easy to verify will be solved by AI.'
  - Verbatim. This is his formally-stated 'Verifier's rule' (a.k.a. verifier's law). Correctly attributed.
  - primary: https://www.jasonwei.net/blog/asymmetry-of-verification-and-verifiers-law
- **[verbatim-ok]** Jason Wei: 'In RL terms, ability to verify solutions is equivalent to ability to create an RL environment.'
  - Verbatim, appears immediately before the Verifier's rule. Correctly attributed.
  - primary: https://www.jasonwei.net/blog/asymmetry-of-verification-and-verifiers-law
- **[verbatim-ok]** Kapoor et al.: 'many agent benchmarks have inadequate holdout sets, and sometimes none at all. This has led to agents that are fragile because they take shortcuts and overfit to the benchmark'
  - Verbatim from the abstract. Original continues '...overfit to the benchmark in various ways.' Our quote truncates cleanly without distortion. Authors confirmed: Kapoor, Stroebl, Siegel, Nadgir, Narayanan.
  - primary: https://arxiv.org/abs/2407.01502
- **[verbatim-ok]** Kapoor et al.: 'the benchmarking needs of model and downstream developers have been conflated, making it hard to identify which agent would be best suited for a particular application'
  - Verbatim from the abstract, correctly attributed.
  - primary: https://arxiv.org/abs/2407.01502
- **[verbatim-ok]** METR: 'the length of tasks (measured by how long they take human professionals) that generalist frontier model agents can complete autonomously with 50% reliability has been doubling approximately every 7 months'
  - Verbatim. Original sentence continues '...every 7 months for the last 6 years.' Our quote drops the duration clause but does not misrepresent it.
  - primary: https://metr.org/blog/2025-03-19-measuring-ai-ability-to-complete-long-tasks/
- **[verbatim-ok]** METR: 'AI agents often seem to struggle with stringing together longer sequences of actions more than they lack skills or knowledge needed to solve single steps.'
  - Verbatim, correctly attributed.
  - primary: https://metr.org/blog/2025-03-19-measuring-ai-ability-to-complete-long-tasks/
- **[supported-by-primary]** RECURSIVE — Hamel's cited source for the imbalanced-class claim: Google ML Crash Course (accuracy/precision/recall)
  - Hamel links this Google page as support for 'raw agreement misleading when imbalanced.' The primary explicitly says accuracy is a poor metric for imbalanced data ('a model that predicts negative 100% of the time would score 99% on accuracy, despite being useless'; guidance table: 'Avoid for imbalanced datasets'). Hamel represents it faithfully.
  - primary: https://developers.google.com/machine-learning/crash-course/classification/accuracy-precision-recall
- **[supported-by-primary]** RECURSIVE — Kapoor's HumanEval comparison numbers (LDB 91.0, LATS 88.0, Reflexion 87.8 vs GPT-4 zero-shot 89.6, warming baseline 93.2)
  - These figures (Table A1) are Kapoor's OWN reproductions with bootstrap CIs, not figures copied from the agent papers — so they legitimately differ from originally-reported numbers (e.g., the LDB repo advertises ~95% with GPT-4o/Reflexion seeds). Their load-bearing claim 'SOTA agent architectures for HumanEval do not outperform simple baselines' is internally consistent with the numbers shown. No telephone-game distortion of an external statistic, since the numbers are self-generated.
  - primary: https://arxiv.org/html/2407.01502
- **[supported-by-primary]** RECURSIVE — Kapoor's characterization that the STeP agent 'hardcodes policies to solve the specific tasks included in WebArena'
  - STeP (Sodhi et al.) does compose hand-designed, task-category-specific LLM policies and reports the 14.9%->35.8% WebArena gain Kapoor references. 'Hardcodes' is Kapoor's pointed framing, but the underlying fact (developer-authored policies tuned to the WebArena task set with no holdout) is accurate and supports their overfitting argument. Defensible, not a misrepresentation.
  - primary: https://arxiv.org/abs/2310.03720

**Reference findings (recursive):**
- Hamel -> Google ML Crash Course: the one external citation backing our quoted claim checks out. The primary unambiguously states accuracy is misleading for imbalanced classes and recommends precision/recall. Faithful representation.
- Kapoor 'AI Agents That Matter' HumanEval numbers are self-reproduced (with CIs), not lifted from the LDB/LATS/Reflexion papers; this is the correct scientific move and avoids inheriting the agent papers' optimistic self-reported figures. Worth noting in the book that Kapoor's 91.0 for LDB is THEIR reproduction, not LDB's advertised ~95%.
- Kapoor's STeP/WebArena overfitting example is grounded in the actual STeP paper (Sodhi et al. 2023, arXiv:2310.03720), which does rely on task-specific designed policies and reports the cited WebArena improvement. 'Hardcodes' is rhetorical but factually defensible.
- Jason Wei post cites AlphaEvolve, BrowseComp, Brandolini's law, and Alperen Keles' 'Verifiability is the Limit' — all are illustrative references, not load-bearing statistics, so no telephone-game risk to our quotes.
- METR headline figures (7-month doubling, ~1hr horizon for Claude 3.7 Sonnet, <10% success on >4hr tasks) are METR's own primary measurements from their task suites (HCAST/RE-Bench/SWAA), not third-party citations, so the recursive-citation risk is low for the two quotes we use.

All 8 of our quotes are verbatim and correctly attributed to the right author and URL. Two quotes are clean truncations that drop a trailing clause without changing meaning: the Kapoor holdout-sets quote omits '...in various ways,' and the METR doubling quote omits '...for the last 6 years.' Both are honest truncations. The recursive layer (the references INSIDE the sources we cite) holds up: Hamel's supporting citation (Google ML Crash Course) genuinely backs the imbalanced-class claim; Kapoor's HumanEval numbers are their own reproductions rather than uncritically forwarded agent-paper figures; and Kapoor's STeP/WebArena overfitting example is grounded in the real STeP paper. One soft recommendation for the book: when citing Kapoor's LDB=91.0 HumanEval figure, note it is Kapoor's reproduction (the LDB authors advertise ~95% with stronger seed models) so a reader doesn't mistake it for LDB's self-reported number. No misrepresentations or fabricated attributions found.</notes>


---

## Nathan Lambert (Interconnects; RLVR) — integrity: **minor-issues** (0 quotes verified)

- **[unverifiable]** OUR QUOTES list was empty — no verbatim quotes attributed to this cluster were supplied to verify.
  - Nothing on our side to check verbatim. Audit therefore focused entirely on the recursive reference-check of the source's own citations.
- **[supported-by-primary]** Representative load-bearing post: 'Reinforcement learning with random rewards actually works with Qwen 2.5' (interconnects.ai). Central claim: spurious/random rewards in RLVR improve Qwen2.5-Math-7B math reasoning almost as much as ground-truth rewards.
  - This IS the paper's central finding (Spurious Rewards, Shao et al.). Crucially, Lambert is himself a co-author of the primary ('I was along for the ride with some great students'), so this is contributor-reporting, not third-party citation.
  - primary: https://arxiv.org/abs/2506.10947
- **[quote-mismatch]** Blog's MATH-500 improvement table: ground truth +24.6, majority vote +23.2, one-shot RL +21.4, format +19.8, incorrect labels +21.2, random rewards +15.8.
  - VERSION SKEW / TELEPHONE RISK. The published arXiv abstract gives DIFFERENT (revised, higher) figures: random +21.4, format +13.8, incorrect label +24.1, 1-shot RL +26.0, majority voting +27.1, ground truth +29.1. The blog (~late May 2025) reported the earlier Notion/preprint numbers; the arXiv v1 (June 2025) superseded them. The qualitative direction holds, but a book must NOT cite the blog's specific magnitudes — cite the arXiv numbers. Notably the random-reward figure differs by ~5.6 pts (+15.8 vs +21.4).
  - primary: https://arxiv.org/abs/2506.10947
- **[supported-by-primary]** Code reasoning (reasoning in code without execution) rises from ~65% to 90%+ after RLVR with spurious rewards.
  - Matches the published primary exactly: 'code-reasoning frequency increases from 65 percent to over 90 percent with spurious rewards.' Clean.
  - primary: https://arxiv.org/abs/2506.10947
- **[supported-by-primary]** Spurious rewards that work for Qwen often fail for other families (Llama3, OLMo2).
  - Paper explicitly states the effect is largely Qwen-specific and does not transfer to Llama/OLMo. Correctly represented.
  - primary: https://arxiv.org/abs/2506.10947
- **[supported-by-primary]** Blog cites TTRL (arXiv 2504.16084) for the 'majority voting as reward' result.
  - TTRL: Test-Time Reinforcement Learning does use majority-voting from test-time scaling as a reward signal for LLM math reasoning on unlabeled data. Correctly characterized.
  - primary: https://arxiv.org/abs/2504.16084
- **[supported-by-primary]** Blog cites one-shot RL (arXiv 2504.20571) for the 'one-shot RLVR' row.
  - 'RL for Reasoning in LLMs with One Training Example' shows single-example RLVR lifts Qwen2.5-Math-1.5B on MATH500 from 36.0% to 73.6%. Correctly characterized.
  - primary: https://arxiv.org/abs/2504.20571
- **[unverifiable]** Compute-allocation estimates: o1 used ~1-3% of total compute on post-training, o3 ~10-30%; o3 used ~10x o1's compute.
  - No primary exists; author explicitly labels these as his own back-of-envelope estimates. Honestly flagged in the post, so not a citation-integrity failure — but uncitable as fact.

**Reference findings (recursive):**
- Spurious Rewards (arXiv 2506.10947, Shao, Li, Xin, Geng, Wang, ... Lambert ... Zettlemoyer): the source's central reference. Qualitative claims (random/format/incorrect-label rewards rival ground truth on Qwen2.5-Math; code-reasoning 65%->90%+; effect is Qwen-specific) all check out against the published primary. BUT the specific magnitude numbers in the blog are the preliminary Notion-release figures and were revised upward in the arXiv version (e.g. random reward blog +15.8 vs published +21.4; ground truth +24.6 vs +29.1). Lambert is a co-author, so this is early self-reporting later superseded, not a misread of someone else's work.
- TTRL: Test-Time Reinforcement Learning (arXiv 2504.16084): cited for the 'majority voting' reward row. Primary confirms majority-vote-as-reward on unlabeled math data (claimed ~211% pass@1 gain on AIME24 for Qwen2.5-Math-7B). Correctly represented.
- One-Shot RLVR (arXiv 2504.20571, 'RL for Reasoning in LLMs with One Training Example'): cited for the 'one-shot RL' row. Primary confirms single-example RLVR substantially improves math reasoning (MATH500 36.0%->73.6% on Qwen2.5-Math-1.5B). Correctly represented.
- Background references linked (Qwen2.5 base 2412.15115, Qwen2.5-Math 2409.12122, MATH benchmark 2103.03874, MATH-Perturb 2502.06453, sampling/pass@k baseline 2504.13837) are used as pointers rather than for load-bearing numbers; not individually re-verified but consistent with their known content.
- NET: the source's citations are accurate in direction and attribution. The one actionable integrity issue is VERSION SKEW on the headline numbers — the blog's improvement table predates and disagrees with the citable arXiv primary. Any quote our book draws from this post must use the arXiv 2506.10947 figures, not the blog's.

No quotes were supplied in OUR QUOTES, so quotesVerified=0 and there was nothing on our side to confirm verbatim. The recursive reference check is the substance here. Bottom line: Nathan Lambert's RLVR writing represents its cited primaries faithfully (TTRL, one-shot RLVR, and the Spurious Rewards paper of which he is a co-author all check out qualitatively, and the 65%->90% code-reasoning stat matches the published paper verbatim). The single caveat — enough to rate the cluster 'minor-issues' rather than 'solid' — is that the blog's specific MATH-500 improvement magnitudes are preliminary numbers later revised upward in the published arXiv paper (random reward +15.8 in the blog vs +21.4 published; ground truth +24.6 vs +29.1). If the book cites any of these magnitudes, pull them from arXiv 2506.10947, not the Interconnects post. Source pages: https://www.interconnects.ai/p/reinforcement-learning-with-random and primary https://arxiv.org/abs/2506.10947 .

---

