---
title: "Evidence-Gated Problem Trees: A Lightweight Protocol for Goal-Preserving Problem Solving with Agents"
date: 2026-10-05
summary: >-
  A working paper on keeping what must be solved separate from what is being
  done: per-node acceptance criteria, six evidence-conditioned decisions, and the
  conditions under which local agent loops add up to a solved problem.
standfirst: Working paper, draft v0.2
tags: [agents, verification, methodology, systems]
thumb: /assets/img/egpt-cooking-analogy.webp
---

> This is a personal working paper, draft v0.2. It has not been peer reviewed.
> It describes a protocol and argues for its soundness. The single case study
> shows that the protocol can be operated, not that it outperforms
> alternatives. The case was run on the author's own project files. Every event
> in it occurred as reported; none was staged.

<figure>
  <img src="/assets/img/egpt-cooking-analogy.webp"
       width="928" height="1152" loading="eager" decoding="async"
       alt="A cooking analogy. A locked goal, a better new taste while keeping the original nutrition, splits into three steps: tasting to find why a new batch of tomatoes is sour, an adjust-and-taste recipe loop, and a nutrition check. In the loop, adding lots of sugar improves taste but loses nutrition and is not accepted; a pinch of salt improves taste and keeps nutrition and is retained. A final tasting of the whole dish re-checks the joint result; if it fails, the recipe is rewritten rather than adjusted again. Side cards map the three conditions: the test reflects the purpose, the steps are sufficient for the goal, and the joint state holds.">
  <figcaption>An illustrative cooking analogy, not data. In the paper's terms, the sugar candidate is deferred: held aside because it breaks the nutrition constraint, not admitted by relaxing it.</figcaption>
</figure>

## Abstract

Language-model agents can now carry out long sequences of actions, but a long sequence of actions is not the same thing as a solved problem. Agents drift from the stated goal, relax constraints when doing so improves a metric, declare completion when a task has merely stopped, and generalise from a single success. We describe *Evidence-Gated Problem Trees* (EGPT), a protocol that keeps *what must be solved* (a problem tree whose nodes carry their own acceptance criteria) separate from *what is being done* (an execution tree). It restricts every update to one of six evidence-conditioned decisions: *retain*, *defer*, *retract*, *gather*, *escalate*, and *re-decompose*. Two of these are, to our knowledge, not explicit in prior agent loops. *Defer* holds a gain that violates a constraint instead of relaxing the constraint. *Gather* selects the next observation by its power to discriminate between live hypotheses, rather than repeating a run.

We argue that the protocol is sound by an inductive argument over the tree. Local evidence loops compose into a solution of the root problem when each node's acceptance test is valid for its purpose, each decomposition is sufficient for its parent, and sibling interactions are checked at the parent. When any condition fails, the parent-level check exposes it and triggers *re-decompose*. Applicability thus reduces to a problem's decomposable depth: how far it can be split while the three conditions hold.

The protocol needs no infrastructure beyond a Markdown task card and a JSON index. As a feasibility check we run it on one real diagnostic task with off-the-shelf coding agents. The run took fifteen minutes and eight execution nodes. Five of the six decisions were triggered by real conditions: two external blockers, one measurement error, two dead evidence routes, and one mis-scoped sub-question. The task was delivered with every claim labelled as observed or documented. We make no claim yet about effectiveness relative to a baseline; we state the evaluation that would test it.

## 1. Introduction

Coding and research agents built on large language models <a href="#ref-1">[1]</a><a href="#ref-2">[2]</a> now run for hours, call tools, and edit real artefacts. The failure that matters most in such runs is rarely a single wrong step. More often the agent produces plenty of activity that does not add up to the outcome that was asked for. We observe five recurring failure modes in agent-assisted work:

- **F1 — Activity mistaken for progress.** Steps are completed, but no acceptance condition is checked.
- **F2 — Goal drift.** The goal or acceptance criteria are rewritten, often implicitly, while the work is being executed.
- **F3 — Constraint relaxation.** A result that improves a metric while breaking a constraint is accepted because the metric improved.
- **F4 — Premature closure.** A node that has *stopped* is reported as a node that has *succeeded*.
- **F5 — Over-generalisation.** One successful episode is promoted to a reusable rule.

Prior work addresses parts of this. Decomposition methods split problems into sub-problems <a href="#ref-3">[3]</a><a href="#ref-4">[4]</a><a href="#ref-5">[5]</a>. Hypothesis-tree systems link hypotheses, evidence and insights across time <a href="#ref-6">[6]</a>. Experiment runners lock plans and keep ledgers <a href="#ref-7">[7]</a>. Skill and insight libraries accumulate experience <a href="#ref-8">[8]</a><a href="#ref-9">[9]</a>. These systems are mostly built for one task family, typically optimisation against a benchmark. Their safeguards are tied to that setting.

This paper describes a protocol that applies across task types: answering, diagnosis, implementation, optimisation, and planning. It is deliberately thin. It is a set of rules for what may be written where and when, operated by an ordinary agent with ordinary files. Our contributions are:

1. **Separation of problem and execution trees**, so that the definition of success cannot be edited by the process that pursues it (addresses F2), and **per-node acceptance criteria** fixed when a node is created (F1).
2. **A closed set of six evidence-conditioned decisions**, including *defer* (F3), *gather* for discriminating evidence, runtime *escalate*, and *re-decompose*. Every node also has separate *status* and *verdict* fields (F4). It also includes rules for testing several single-change hypotheses per round without being misled by selection (Section 4.6).
3. **A soundness argument** (Section 5): local evidence loops compose into a solution of the root problem under three stated conditions, each checked by a concrete protocol step. The method's scope then reduces to a problem's *decomposable depth*: how far it can be split while the conditions hold. This framing poses an open research question: how should sub-issues be generated so that the multi-level loop structure is optimal? We state a cost objective and five testable hypotheses for it (Section 5.3).
4. **A promotion rule for reusable methods** that requires stated applicability conditions and evidence from more than one context (F5).
5. **A feasibility demonstration** on a real task with off-the-shelf agents, reported with its full execution trace (Section 6).

## 2. Related Work

**Decomposition.** Least-to-most prompting decomposes a problem into easier sub-problems solved in sequence <a href="#ref-3">[3]</a>. Tree of Thoughts searches over intermediate reasoning states <a href="#ref-5">[5]</a>. ADaPT decomposes *as needed*: it plans and decomposes a sub-task only when the executor fails to complete it, and recurses <a href="#ref-4">[4]</a>. EGPT combines an *ex-ante* gate, which asks whether the task needs a tree at all, with ADaPT-style as-needed refinement through *re-decompose*.

**Hypothesis trees for autonomous research.** Arbor's Hypothesis Tree Refinement maintains a persistent tree whose nodes hold a hypothesis, a reusable insight, and metadata. Executor evidence is written to leaves and propagated toward the root, falsified subtrees are pruned, and candidates are promoted only through a held-out merge gate <a href="#ref-6">[6]</a>. EGPT keeps the evidence-propagation idea but splits Arbor's single tree into two: a problem tree, which is edited only by task versioning, and an execution tree, which is edited by the loop. EGPT also targets non-optimisation tasks, where no merge gate or score exists. Hypothesis-driven issue trees are also standard in consulting practice <a href="#ref-10">[10]</a>.

**Bounded experiment loops.** research-loop binds user approval to an exact plan hash, base commit, commands and metric; any change invalidates approval. Results are classified as `promising`, `keep`, `discard`, `inconclusive`, `crash` or `invalid` in an append-only ledger <a href="#ref-7">[7]</a>. Its approval is fixed *before* the run starts. EGPT's *escalate* fires *during* the run, whenever a needed action exceeds the current authority. EGPT also avoids a separate ledger: the tree is an index whose entries point to the artefacts themselves. Fully automated research systems such as the AI Scientist <a href="#ref-11">[11]</a> pursue end-to-end autonomy. EGPT is complementary: it concerns the bookkeeping discipline of any such loop.

**Experience libraries.** Voyager adds a program to its skill library once self-verification confirms that the task was completed <a href="#ref-8">[8]</a>. ExpeL extracts natural-language insights by comparing failed with successful trajectories and by finding patterns across successes on different tasks. It maintains these insights with ADD/EDIT/UPVOTE/DOWNVOTE operations and an importance count, and removes an insight when its count reaches zero <a href="#ref-9">[9]</a>. EGPT's library is closer to ExpeL's cross-task requirement but differs in form. An entry must state its applicability conditions, its failure or rollback conditions, and its evidence. An entry supported by a single case remains a *case note*.

**Choosing observations.** The *gather* decision follows the logic of differential diagnosis and Bayesian experimental design: choose the observation whose outcome is expected to be most informative about the hypotheses still in play <a href="#ref-12">[12]</a>. EGPT applies this qualitatively and does not compute information gain.

*Table 1. Comparison with the closest systems, based on the descriptions in the cited sources. "—" means the mechanism is not a stated component of that system, not that it is impossible.*

| | Arbor | research-loop | ADaPT | EGPT (ours) |
|---|---|---|---|---|
| Decomposition trigger | coordinator expands tree | — | on executor failure | ex-ante gate + *re-decompose* |
| Goal vs. execution record | one tree | plan + ledger | — | two trees; goal edited only by versioning |
| Gain that breaks a constraint | — | `invalid` | — | *defer* |
| Insufficient evidence | next iteration | `inconclusive` | — | *gather* discriminating evidence |
| Authority limits | — | approval before run | — | *escalate* at run time |
| Promotion to reusable knowledge | insight propagation; held-out gate | `keep` after confirmation | — | conditions + multi-context evidence |
| Task scope | optimisation | optimisation | interactive decision tasks | answer, diagnose, implement, optimise, plan |

## 3. Problem Setting

A *task* is a tuple

<p style="text-align:center"><i>T</i> = (<i>g</i>, <i>d</i>, <i>A</i>, <i>C</i>, <i>O</i>, <i>Z</i>, <i>v</i>)</p>

where *g* is the goal, *d* the deliverable, *A* = {*a*<sub>1</sub>, …, *a*<sub>k</sub>} the acceptance conditions, *C* the constraints, *O* the items explicitly out of scope, *Z* the authority granted (which actions are permitted), and *v* a version number. The task type *τ* ∈ {answer, diagnose, implement, optimise, plan} determines the default evidence and the default authority. In particular, *diagnosis does not authorise repair, and planning does not authorise execution*.

The agent may change the world only through actions in *Z*. It may change *T* only by creating a new version *T*<sup>(v+1)</sup> with a recorded reason. Both rules exist to block F2 and F3 by construction rather than by exhortation.

## 4. The Protocol

Figure 1 shows the overall loop. We describe each step and then the records it writes.

<figure>
  <img src="/assets/img/egpt-loop.webp" width="1200" height="844" loading="lazy" decoding="async"
       alt="A vertical flow: receive problem, with a branch to answer simple tasks directly; goal alignment; task card and minimal problem tree; select next action; execute and verify; decide from evidence with six outcomes. Two loops return from the decision to action selection and, for re-decompose, to the problem tree. A final step checks the parent and delivers against the original acceptance conditions. Dashed arrows write to three records: problem tree, execution tree, method library.">
  <figcaption>Figure 1. The EGPT loop. Solid arrows are control flow; dashed arrows are writes to the records. Every decision except retain-with-parent-satisfied returns to action selection; re-decompose returns to the problem tree.</figcaption>
</figure>

### 4.1 Entry gate

Before building anything, the agent decides whether the task needs a tree. A simple, unambiguous request is answered or executed directly. The gate is ex ante, but it is not final: if a node later turns out to be too large to act on, *re-decompose* splits it, which recovers ADaPT's as-needed behaviour <a href="#ref-4">[4]</a>.

### 4.2 Goal alignment

For complex or ambiguous tasks, alignment takes two short rounds. First, the agent restates *g*, the problem level, the inputs, and the boundaries. Second, it gives one example that would satisfy the goal and one that would not, or a single concrete acceptance example. The negative example is the part that matters. It turns "what not to do" into a checkable condition. Example: "asserting the cause from general knowledge" is a non-solution for a diagnosis. The agent asks only about questions that would materially change the result or the required authority.

### 4.3 Problem tree

The problem tree is a directed acyclic graph of nodes

<p style="text-align:center"><i>n</i> = (<i>q</i><sub>n</sub>, parent<sub>n</sub>, <i>D</i><sub>n</sub>, <i>a</i><sub>n</sub>, <i>s</i><sub>n</sub>, <i>r</i><sub>n</sub>, <i>E</i><sub>n</sub>)</p>

with question *q*<sub>n</sub>, dependencies *D*<sub>n</sub>, a node-level acceptance test *a*<sub>n</sub>, evidence references *E*<sub>n</sub>, a status *s*<sub>n</sub> ∈ {`planned`, `running`, `blocked`, `closed`}, and a verdict *r*<sub>n</sub> ∈ {`null`, `satisfied`, `not_supported`, `inconclusive`, `cancelled`}. Three rules govern the tree:

- **Acceptance at birth.** *a*<sub>n</sub> is written when *n* is created. A node without a checkable *a*<sub>n</sub> is not a node; it is a note. This gives every local loop a target to converge to.
- **Hypotheses are labelled as hypotheses.** A candidate cause is a node whose verdict is open, never a fact.
- **Status is not verdict.** Closing a node (*s*<sub>n</sub> = `closed`) says that work has stopped; *r*<sub>n</sub> says what was found. This separation blocks F4: `closed` with `inconclusive` is a legitimate and reportable outcome.

Shared sub-problems are expressed as references, so that two parents depending on one fact do not duplicate it. The initial tree has three to five nodes. A node is split only when current evidence requires it.

### 4.4 Action selection

Candidate actions are ranked lexicographically by the risk they address:

1. misunderstanding of the goal or the authority, which can invalidate all work;
2. safety, irreversibility, and facts that block other nodes;
3. cheap actions that discriminate between the main hypotheses and would change the next step;
4. reversible small changes with clear benefit;
5. polish that does not affect any current decision, which is deferred or dropped.

The agent records a one-line reason for its choice and does not invent numerical priority scores. When information is scarce, the default is the lowest-risk action with the highest information content.

### 4.5 Evidence-conditioned decisions

After each action the agent must choose exactly one decision. Table 2 gives the triggering condition for each decision and the write it makes.

*Table 2. The six decisions. Each is triggered by a condition on the evidence and has a fixed effect on the records.*

| Decision | Condition | Effect |
|---|---|---|
| *retain* | Evidence meets *a*<sub>n</sub> and respects *C* (a *correction*); or the result is not worse and structural complexity falls (a *simplification*) | *r*<sub>n</sub> ← `satisfied`, recording which kind; check whether the parent's test is now met; do not add work by default |
| *defer* | Gain observed, but some constraint in *C* is violated | Hold the result outside the accepted set; study the risk or seek an alternative; *never* relax *C* to admit it |
| *retract* | Hypothesis contradicted, or an evidence route proves uninformative | Record what is excluded; switch to a hypothesis or route that still has support; repeating the same action is not allowed |
| *gather* | Evidence insufficient to decide | Choose the observation that best discriminates between the live hypotheses, with a positive control where possible; if none is obtainable, report the limit |
| *escalate* | Next useful action exceeds *Z* or the budget | Stop that branch; state what is needed and the condition for resuming; continue other branches within *Z* |
| *re-decompose* | Node too coarse to act on, or children all satisfied while the parent's test fails | Split the node, or revise the parent's split with a recorded reason; old nodes stay in the record |

Two remarks. First, a *measurement or implementation error* is not a decision outcome. It invalidates the evidence, the faulty part is repaired, and the decision is taken on the repaired evidence. Second, the decisions act on execution nodes, while verdicts belong to problem nodes. A problem node can receive several *retract* and *gather* decisions before its verdict is set.

### 4.6 Batched hypotheses within a leaf loop

In an optimisation leaf, one iteration can test several hypotheses at once. Five rules keep the extra throughput from turning into noise.

- **One change per hypothesis, judged on its own.** Each candidate changes one thing and receives its own decision. A round in which the aggregate barely moves can still retain a candidate that clearly improves its target without harming anything else.
- **A frozen incumbent.** Every candidate in a round is compared with the best state frozen at the start of that round, never with another candidate from the same round. This removes order effects and a target that moves within the round.
- **Judgment at the candidate's scope.** A candidate that acts only on one category of inputs is judged on that category, against a pre-stated threshold, and must leave every constraint within that category no worse. A candidate that acts on all inputs is judged on all of them. A scope-level judgment never bypasses the constraints in *C*.
- **Simplification is structural.** Retaining a simplification requires a measurable fall in structural complexity or cost: fewer intervention sites, components, mechanisms or calls. A smaller value of the same parameter does not count. The result must be no worse within a non-inferiority margin stated before the round.
- **Retained means candidate.** Everything retained inside the loop remains a development candidate until it is confirmed on independent, sealed data. The report states the total number of comparisons made, counted as candidates × scopes, so that readers can judge the risk that a winner was lucky.

### 4.7 Method library

Reusable knowledge is admitted in three tiers. A *case note* records what worked once. A *candidate method* states its applicability conditions, its action, its verification, its failure and rollback conditions, its cost, and its evidence. A *rule* additionally has supporting evidence from at least two distinct contexts and at least one checked counter-condition. Nothing is required to be trained into a model, and the library is not created until a real reuse need appears.

### 4.8 Records

A one-page task card (Appendix A) holds *T* and the initial tree. A JSON file holds the problem and execution nodes (Appendix B). Evidence lives in the actual artefacts: logs, outputs, files. The tree stores references to them, never copies. There is deliberately no second ledger, because two records of the same fact eventually disagree. Each evidence reference carries an *evidence level*: `observed` (produced in this task), `documented` (stated by an authoritative external source), or `inferred`. This field was added after the case study, where the distinction between observed and documented findings turned out to be essential.

Evidence must carry new information. Re-evaluating an unchanged procedure on unchanged inputs is not replication. Under deterministic generation it reproduces the same output byte for byte, and it adds nothing. Replication requires inputs the procedure has not been selected on: a held-back split that is reported but never used to choose, or a sealed set.

## 5. Why the Protocol Works: Compositional Acceptance

The central premise is that a problem worth a tree can be split into sub-issues, each with its own purpose. If each purpose is made checkable, each sub-issue can be pursued by its own evidence loop. In optimisation nodes this loop is the familiar one: a benchmark serves as the target, initial data as the baseline, and an automatic improvement loop runs against it. In diagnosis, writing or planning nodes the acceptance test is not a score, but the structure is the same. We now state when such local loops add up to a solution of the root problem.

### 5.1 Conditions and claim

For a node *n* with children ch(*n*), let sat(*m*) denote "the purpose of *m* is actually achieved" and pass(*m*) denote "*a*<sub>m</sub> is passed". Consider:

- **C1 — Validity.** For every leaf ℓ, pass(ℓ) ⇒ sat(ℓ): the acceptance test is a faithful operationalisation of the leaf's purpose, not a proxy that can be gamed.
- **C2 — Sufficiency.** For every internal node *n*, ⋀<sub>m ∈ ch(n)</sub> sat(*m*) ⇒ sat(*n*): the split leaves nothing out.
- **C3 — Non-interference.** Achieving one child does not undo another. The conjunction in C2 refers to the children's *joint* final state, not to their states when each was closed.

**Claim.** Under C1–C3, if every leaf passes its test then the root's purpose is achieved.

*Argument.* By induction on height. Leaves are achieved by C1. If all children of *n* are achieved in their joint final state (C3), then *n* is achieved by C2. ∎

The claim is elementary. Its value lies in naming exactly what can go wrong, and in the fact that each condition corresponds to a protocol step that tests it:

- **C1 can fail through proxy overfitting.** The local loop optimises the test instead of the purpose. Defences: acceptance is fixed at node creation and edited only by versioning; positive and negative examples are fixed in alignment; held-out checks apply where a score exists, in the spirit of Arbor's merge gate <a href="#ref-6">[6]</a>; and *defer* quarantines gains that break constraints. Selection is a second route to C1 failure: when many candidates are tried, some pass by chance. Hence retained candidates remain development candidates until sealed confirmation, and the number of comparisons is reported (Section 4.6).
- **C2 can fail through mis-decomposition.** All children pass, but the parent does not. Defence: every internal node keeps its own *a*<sub>n</sub>, which is re-run when its children close. A failure here is evidence about the *split*, so the decision is *re-decompose*, not another round of the local loop.
- **C3 can fail through interaction.** One child's fix breaks a sibling. Defence: the parent check runs on the combined state; methods are re-verified after they are combined. A parent check may be *derived* rather than re-run only when three things hold. The children act on disjoint inputs. Their effects do not stack. And each child's recorded outputs can be reused unchanged in the combination. In that case C3 holds by construction and the parent result is computed from the children's records. Otherwise the combination is a new procedure and must be measured.

The conditions cannot be verified in advance. They are hypotheses about the tree, and the parent-level checks are what test them. This is why a tree with per-node acceptance and parent re-checks is self-correcting rather than merely hierarchical: a violated condition surfaces as a failed parent test at the lowest level where it matters.

### 5.2 Scope: decomposable depth

The applicability question therefore narrows to this: *which problems admit a decomposition that satisfies C1–C3?* Every problem admits a trivial one, the root alone, whose acceptance test is the user's judgment. C2 and C3 then hold vacuously, and C1 rests on goal alignment. The useful quantity is therefore not whether a valid decomposition exists, but its *decomposable depth*: how far a problem can be split before some condition fails. Each condition has a characteristic way of limiting that depth.

- **C1 limits depth when a purpose resists operationalisation.** Examples are aesthetic judgments, and open research questions in which defining success is part of the discovery. The test must then be human judgment, which a local loop cannot iterate against cheaply.
- **C2 limits depth when the parent has emergent properties.** Examples are system-level security, coherence of a user experience, and non-separable objectives. Children can all pass while the parent fails, and no finer split repairs this.
- **C3 limits depth under tight coupling.** The remedy is to merge coupled children into one coarser node, which makes the tree shallower.

Even when a valid decomposition exists, finding it can be as hard as solving the problem; *re-decompose* is the protocol's search over decompositions. When the decomposable depth is zero, EGPT degrades to a goal-aligned loop at the root. It keeps its bookkeeping invariants and loses only its compositional advantage, at the cost of a small overhead. This yields a testable prediction for the evaluation in Section 7: *the benefit of EGPT over an unstructured loop increases with the decomposable depth of the task.*

### 5.3 Toward optimal decomposition

C1–C3 say when a decomposition is *correct*. Many correct decompositions usually exist, and they differ greatly in cost. The research question this protocol opens is therefore: *how should sub-issues be generated so that the resulting multi-level loop structure is optimal?*

**Objective.** Let 𝒯 be a decomposition, i.e. a tree of nodes with acceptance tests. We define its expected cost to root acceptance as

<p style="text-align:center"><i>J</i>(𝒯) = Σ<sub>ℓ ∈ leaves(𝒯)</sub> <i>c</i><sub>ℓ</sub> · 𝔼[<i>k</i><sub>ℓ</sub>] + Σ<sub>n ∈ internal(𝒯)</sub> ( <i>c</i><sub>n</sub><sup>chk</sup> + <i>p</i><sub>n</sub> <i>R</i><sub>n</sub> )</p>

where *c*<sub>ℓ</sub> is the cost of one iteration of leaf ℓ's loop and *k*<sub>ℓ</sub> is the number of iterations it needs to pass *a*<sub>ℓ</sub>. For an internal node *n*, *c*<sub>n</sub><sup>chk</sup> is the cost of its composition check, *p*<sub>n</sub> the probability that C2 or C3 fails at *n*, and *R*<sub>n</sub> the rework cost of the resulting *re-decompose*. An optimal decomposition minimises *J* subject to C1 holding at every leaf. A C1 failure cannot be priced inside the tree, because it is invisible to the tree's own checks.

**The trade-off.** Deeper trees shrink *c*<sub>ℓ</sub> and 𝔼[*k*<sub>ℓ</sub>]: each local loop gets a smaller search space and a sharper, faster signal. But every added level adds check costs and further chances for *p*<sub>n</sub>*R*<sub>n</sub>. Shallower trees reverse both effects. The optimum is interior whenever splitting sharpens feedback faster than it adds coupling. The same trade-off appears inside a leaf. Testing *m* hypotheses per round (Section 4.6) reduces 𝔼[*k*<sub>ℓ</sub>], but the number of comparisons grows with *m* times the number of scopes, and with it the probability of a lucky winner. That cost belongs in *J* as the price of the sealed confirmation needed to rule such winners out.

**Hypothesised properties of good splits.** We state these as hypotheses for evaluation, not as results.

- **H1 — Cheap valid tests.** Prefer splits whose children admit tests with low *c*<sub>ℓ</sub> and high fidelity to their purpose (C1).
- **H2 — Cut along weak coupling.** Prefer splits that place strongly interacting parts in the same child. This keeps *p*<sub>n</sub> low through C3, in the sense of near-decomposable systems <a href="#ref-13">[13]</a>.
- **H3 — Exhaustive, non-overlapping children.** These make the parent's check cheap and C2 easy to audit <a href="#ref-10">[10]</a>.
- **H4 — Split where uncertainty is highest.** Expanding the node whose resolution most changes the remaining plan has the highest expected reduction in *J*, mirroring the logic of *gather*.
- **H5 — Stop at cost parity.** Stop splitting when a child's test would cost about as much as running its parent's loop directly.

**Learning decompositions.** Each completed task leaves a record of which splits held and which triggered *re-decompose*, and at what cost. The method library can therefore store *decomposition patterns* together with their applicability conditions, which makes the decomposition policy itself something that improves with use. Testing H1–H5 requires running the same tasks under different decomposition policies and comparing *J* as realised: total cost, number of *re-decompose* events, and the level at which failures surfaced.

### 5.4 Invariants

The protocol maintains six invariants that an external checker could verify on the records:

- **I1 — Goal integrity.** *g*, *A* and *C* change only by creating *T*<sup>(v+1)</sup> with a reason; execution nodes never write task fields. A new version takes effect at an iteration boundary, so that the iteration in flight finishes under the rules it started with.
- **I2 — Constraint preservation.** No result that violates *C* is ever retained.
- **I3 — Closure is not success.** Delivery reports every *a*<sub>i</sub> ∈ *A* as met (with evidence) or unmet; *s*<sub>n</sub> = `closed` never stands in for *r*<sub>n</sub> = `satisfied`.
- **I4 — Authority monotonicity.** No decision expands *Z*; *escalate* is the only route to more authority.
- **I5 — Provenance.** Every non-null verdict cites evidence with a stated evidence level.
- **I6 — Bounded growth.** The same action is not repeated on unchanged inputs, and such a repeat is never counted as replication; each *re-decompose* records why the previous split failed.

## 6. Feasibility Case Study

**Question.** Can the protocol be operated end to end by an off-the-shelf agent, with real tools and real blockers, at low overhead? Does each decision type correspond to something that actually happens? We do not ask here whether EGPT outperforms an unstructured agent loop; Section 7 states the evaluation needed for that.

**Task (C01).** The protocol's own project folder sits inside an unrelated paper project. The parent's instruction file mandates research-only rules: real experiments on a cloud GPU and mandatory Monte Carlo runs. These contradict the new project's rule that no such defaults apply. The task was a *diagnosis*: do agents launched inside the folder inherit the parent rules? Authority was restricted to read-only probes; moving folders, editing the parent files, logging in, or buying usage credits were out of scope. The agent was Claude Code (Opus 5.5) in a desktop session. The CLIs under test were Claude Code 2.1.215 and Codex CLI 0.144.6. The complete task card, tree and evidence log are kept with the project.

**Alignment.** The positive example was "a probe run inside the folder shows, in the agent's own record, whether the parent rules are present". The negative example was "asserting inheritance from general knowledge of the tools, or moving the folder and declaring the issue fixed". Four problem nodes were created: Q1 (Claude Code), Q2 (Codex), Q3 (which rules conflict; depends on Q1, Q2) and Q4 (remediation options; depends on Q3).

**Execution.** Table 3 lists all eight execution nodes.

*Table 3. Execution trace of case C01. Every decision was triggered by a real event; none was staged.*

| Node | For | Outcome | Decision |
|---|---|---|---|
| E1 | Q1 | Claude CLI probe: OAuth session expired | *escalate* + *gather* |
| E2 | Q2 | Codex probe: prompt split by shell quoting | measurement error, repaired |
| E3 | Q2 | Codex probes (parent as positive control; child as test): usage limit reached | *escalate* + *gather* |
| E4 | Q2 | Local Codex session records show the injected instructions: parent markers present in control (10/4 hits), absent in test (0/0) | *retain* |
| E5 | Q1 | Claude debug log lists no instruction files | *retract* (route) |
| E6 | Q1 | Claude transcript does not persist instruction context | *retract* (route) |
| E7 | Q1 | Official documentation of instruction loading | *re-decompose* Q1 → Q1a–c |
| E8 | Q3 | Parent rules located at lines 22–24, 33, 111–112 | *retain* |

Three points in the trace show the protocol doing work that an unstructured loop is not obliged to do.

*Blockers became questions about evidence, not about authority.* Both model-based probes were blocked: E1 by an expired login and E3 by a usage limit. The two obvious ways to get unblocked, logging in and buying credits, lay outside *Z*, so the branch was escalated. At the same time, *gather* asked whether any *other* observation could discriminate between the hypotheses. For Codex, one could. The CLI writes its full request payload, including the injected instruction files, to a local session record before contacting the model. The blocked runs therefore still contained the answer. This evidence is stronger than the original probe would have been, because it records what was injected instead of relying on the model's report of its own context.

*The positive control made the negative result meaningful.* The probe was run in the parent folder as well as in the child folder. Markers that appear only in the parent's instructions were found in the control run ("Kaggle" 10 times, "T4 GPU" 4 times) and not in the test run (0 and 0). Without the control, the absence of markers in the child folder could equally have meant that the probe was blind. Q2's verdict is therefore `not_supported` (Codex does not inherit), at evidence level `observed`.

*Re-decomposition exposed a risk the original question missed.* For Claude Code, no local trace of loaded instructions existed (E5, E6), so the agent fell back to documentation (E7) and labelled the result `documented`. According to the documentation, `CLAUDE.md` files in directories above the working directory are loaded at launch, and `AGENTS.md` is not read by default when such a file exists <a href="#ref-14">[14]</a>. This showed that Q1 as posed, "are the parent rules inherited?", was too coarse. It was split into three nodes:

- Q1a: the parent's `CLAUDE.md`, a two-line pointer, is loaded (`satisfied`).
- Q1b: the parent rules themselves arrive only if the agent follows that pointer (`inconclusive`).
- Q1c: the child folder's *own* rules are not loaded at all (`not_supported`).

The problem was thus partly the opposite of the one first posed. The new project's rules are missing, and a pointer to the old project's rules is present. The original framing would have produced a yes/no answer that missed this.

**Delivery.** The deliverable reported, for each CLI, its answer and evidence level. It also listed three remediation options, each with the authority it needs: moving the folder, adding a local `CLAUDE.md` that imports the folder's own rules, or excluding the parent file by configuration. None was executed, because diagnosis does not authorise repair. One item remained open, with a resume condition: observe Claude Code's actual context once the user re-authenticates. The task verdict is `satisfied` against *A*, because *A* required each answer to be *labelled* observed or documented, not necessarily observed.

**Overhead.** The run produced one task card, one JSON index, one evidence log and two raw probe outputs. It took eight execution nodes and about fifteen minutes of wall-clock time. No infrastructure was built, and no model call to the systems under test succeeded. Five of the six decisions were triggered. *Defer* was not, because nothing in a read-only diagnosis can produce a constraint-violating gain. Exercising it requires an optimisation task.

## 7. Limitations and Next Steps

**One case, one operator.** The feasibility case is a single diagnostic task. It was operated by an agent that had also drafted the protocol, which favours compliance. It shows that the protocol *can* be run and that its decisions correspond to real events; it does not show that the protocol improves outcomes.

**The conditions are only partly checkable.** C1–C3 are tested by parent-level checks, but a test that is itself invalid (C1 failing at the root) cannot be caught from inside the tree. The root's acceptance therefore rests on goal alignment with the user.

**Compliance is not enforced.** The invariants are stated so that a checker could verify them, but no checker exists yet. In this draft they hold because the operator followed them.

**Evaluation needed.** The claim that EGPT reduces F1–F5 should be tested on a task suite that spans the five task types.

- Measures: constraint violations admitted, completion claims not supported by the acceptance conditions, repeated actions on unchanged inputs, and wall-clock and token cost.
- Comparisons: an unstructured agent loop, and EGPT with each decision type ablated in turn.
- Operators should be agents and users who did not design the protocol. An optimisation task is required to exercise *defer*.
- Tasks should be stratified by decomposable depth (Section 5.2), to test the prediction that EGPT's benefit grows with it.
- A second study should hold the tasks fixed and vary the decomposition policy, to test H1–H5 (Section 5.3).

**Second case in progress.** A second feasibility case, an optimisation task that uses batched hypotheses (Section 4.6), is under way. It is expected to exercise *defer* and both kinds of *retain*. It will be reported only after its sealed confirmation, and only as it actually occurred.

## 8. Conclusion

EGPT is a small protocol with a specific claim. If every sub-problem receives a checkable purpose when it is created, and every update is one of six evidence-conditioned decisions, then the definition of success cannot be quietly rewritten. Local evidence loops compose into a solution exactly when their tests are valid, their splits sufficient, and their interactions checked, and each of those conditions has a step that tests it. A single real case shows that the protocol runs on ordinary files with ordinary agents. It also shows that its decisions are triggered by the blockers, errors and mis-scoped questions that occur in practice. Whether it makes agents better at solving problems is the next question, and Section 7 sets out how to answer it.

## Appendix A. One-Page Task Card

1. **Goal and acceptance.** Task id, type, version; the problem actually to be solved; deliverable and completion condition; one positive and one negative example (optional for simple tasks); known facts, assumptions, unknowns; scope, constraints, resources, authority.
2. **Minimal problem tree.** For each node: sub-question, dependencies, reason for priority, acceptance test.
3. **Current execution path.** Current node and why; baseline or reference practice (if comparison is needed); hypothesis or option under test; smallest action and expected evidence; verification and side effects; how each possible outcome changes the next step.
4. **Result and stopping.** Evidence references; decision and reason; whether the parent test is met; open items and resume conditions; reusable method and its scope (only with evidence).

## Appendix B. Node Schema

```text
problem node   : { id, parent, question, depends_on[], acceptance,
                   status: planned|running|blocked|closed,
                   verdict: null|satisfied|not_supported|inconclusive|cancelled,
                   evidence_level: observed|documented|inferred,
                   evidence_refs[] }
execution node : { id, for, action, outcome,
                   decision: retain|defer|retract|gather|escalate|re-decompose }
task           : { id, version, type, goal, deliverable, acceptance[],
                   constraints[], out_of_scope[], authorization_ref,
                   status, verdict }
open item      : { id, what, resume_condition }
```

## Revision history

- **v0.2 (5 October 2026).** Adds rules for batched single-change hypotheses within a leaf loop (Section 4.6). Splits *retain* into correction and structural simplification. Adds the requirement that evidence carry new information, so that re-evaluation on unchanged inputs is not replication. States when a parent check may be derived rather than re-run (Section 5.1). Adds selection as a route to C1 failure, version changes at iteration boundaries (I1), and a note on a second case in progress.
- **v0.1 (5 October 2026).** First draft.

## References

<ol class="refs">
  <li id="ref-1">S. Yao, J. Zhao, D. Yu, N. Du, I. Shafran, K. Narasimhan, Y. Cao. ReAct: Synergizing Reasoning and Acting in Language Models. <em>International Conference on Learning Representations</em>, 2023.</li>
  <li id="ref-2">N. Shinn, F. Cassano, A. Gopinath, K. Narasimhan, S. Yao. Reflexion: Language Agents with Verbal Reinforcement Learning. <em>Advances in Neural Information Processing Systems</em>, 2023.</li>
  <li id="ref-3">D. Zhou, N. Schärli, L. Hou, J. Wei, N. Scales, X. Wang, D. Schuurmans, C. Cui, O. Bousquet, Q. Le, E. Chi. Least-to-Most Prompting Enables Complex Reasoning in Large Language Models. <em>International Conference on Learning Representations</em>, 2023.</li>
  <li id="ref-4">A. Prasad, A. Koller, M. Hartmann, P. Clark, A. Sabharwal, M. Bansal, T. Khot. ADaPT: As-Needed Decomposition and Planning with Language Models. <em>Findings of the Association for Computational Linguistics: NAACL 2024</em>, pp. 4226–4252, 2024. <a href="https://aclanthology.org/2024.findings-naacl.264/">aclanthology.org/2024.findings-naacl.264</a></li>
  <li id="ref-5">S. Yao, D. Yu, J. Zhao, I. Shafran, T. L. Griffiths, Y. Cao, K. Narasimhan. Tree of Thoughts: Deliberate Problem Solving with Large Language Models. <em>Advances in Neural Information Processing Systems</em>, 2023.</li>
  <li id="ref-6">J. Jin, Y. Hu, K. Qiu, Q. Dai, C. Luo, et al. Toward Generalist Autonomous Research via Hypothesis-Tree Refinement. arXiv:2606.11926, 2026. <a href="https://arxiv.org/abs/2606.11926">arxiv.org/abs/2606.11926</a></li>
  <li id="ref-7">junjunjunbong. research-loop: Bounded, Approved, and Auditable Experiment Campaigns for Coding Agents. Software repository, 2026. <a href="https://github.com/junjunjunbong/research-loop">github.com/junjunjunbong/research-loop</a> (accessed 5 October 2026).</li>
  <li id="ref-8">G. Wang, Y. Xie, Y. Jiang, A. Mandlekar, C. Xiao, Y. Zhu, L. Fan, A. Anandkumar. Voyager: An Open-Ended Embodied Agent with Large Language Models. arXiv:2305.16291, 2023. <a href="https://arxiv.org/abs/2305.16291">arxiv.org/abs/2305.16291</a></li>
  <li id="ref-9">A. Zhao, D. Huang, Q. Xu, M. Lin, Y.-J. Liu, G. Huang. ExpeL: LLM Agents Are Experiential Learners. <em>Proceedings of the AAAI Conference on Artificial Intelligence</em>, 2024. <a href="https://arxiv.org/abs/2308.10144">arxiv.org/abs/2308.10144</a></li>
  <li id="ref-10">B. Minto. <em>The Pyramid Principle: Logic in Writing and Thinking</em>. Pitman, 1987.</li>
  <li id="ref-11">C. Lu, C. Lu, R. T. Lange, J. Foerster, J. Clune, D. Ha. The AI Scientist: Towards Fully Automated Open-Ended Scientific Discovery. arXiv:2408.06292, 2024. <a href="https://arxiv.org/abs/2408.06292">arxiv.org/abs/2408.06292</a></li>
  <li id="ref-12">D. V. Lindley. On a Measure of the Information Provided by an Experiment. <em>The Annals of Mathematical Statistics</em>, 27(4):986–1005, 1956.</li>
  <li id="ref-13">H. A. Simon. The Architecture of Complexity. <em>Proceedings of the American Philosophical Society</em>, 106(6):467–482, 1962.</li>
  <li id="ref-14">Anthropic. How Claude Remembers Your Project. Claude Code documentation, 2026. <a href="https://code.claude.com/docs/en/memory">code.claude.com/docs/en/memory</a> (accessed 5 October 2026).</li>
</ol>
