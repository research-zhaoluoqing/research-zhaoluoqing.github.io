---
title: "Planning Less Up Front: ADaPT for Practical AI Workflows"
date: 2026-10-13 00:32:00 +0100
summary: >-
  A reflection on letting execution reveal where a workflow needs more structure:
  attempt, verify, diagnose, and decompose when useful, with local optimisation
  inside suitable problem-tree nodes.
standfirst: A reflection on adaptive execution, verification, and local optimisation
post_class: adapt-post
tags: [agents, automation, workflows, verification]
thumb: /assets/img/adapt-bicycle-repair.webp
image: /assets/img/adapt-bicycle-repair.webp
image_width: 928
image_height: 1152
image_alt: "A bicycle repair analogy for adaptive execution, local optimisation, and whole-result verification."
---

<figure class="adapt-cover">
  <a href="/assets/img/adapt-bicycle-repair.webp" aria-label="Open the full-size bicycle repair illustration">
    <img src="/assets/img/adapt-bicycle-repair.webp" width="928" height="1152" loading="eager" fetchpriority="high" decoding="async" alt="A bicycle repair analogy: attempt the whole task, decompose the obstacle into drivetrain, wheel alignment and brake checks, optionally test local adjustments with fixed criteria, then verify the complete bicycle before human review. A candidate with weaker braking is rejected even if it reduces rubbing.">
  </a>
  <figcaption>Bicycle repair is an analogy: improving a local adjustment still requires checking the complete result. Open the image to inspect the details.</figcaption>
</figure>

When automating a manual process, we often begin by reproducing its steps. We map the workflow, assign responsibilities, define handoffs, and ask AI to follow the resulting plan.

That approach works well when the process is stable and its exceptions are understood. It becomes harder when important facts emerge only during execution: a source is unavailable, two records disagree, an assumption turns out to be wrong, or a task requires more reasoning than expected.

ADaPT suggests a useful alternative for these uncertain parts of a workflow: give an executor a complete task, let it attempt the task, and introduce explicit decomposition only when the attempt fails. Apply the same approach to the resulting subtasks.

The practical opportunity is to postpone detailed decomposition until execution provides evidence about where it is needed. We still design the system’s goals, tools, permissions, verification, and budgets in advance.

**Keep the operating boundaries stable. Let execution reveal where the task needs more structure.**

This article develops that idea for automation. The recursive decomposition mechanism comes from [ADaPT](https://aclanthology.org/2024.findings-naacl.264/). Failure classification, external verification, explicit state management, and integration with autoresearch below are proposed workflow extensions; their combined benefits need to be tested in the target setting.

## 1. Automate the outcome, then decide how much of the manual process to preserve

A manual workflow contains more than a sequence of visible actions. People use background knowledge, recognise exceptions, consult other sources, and make judgments that may never appear in the procedure.

Giving AI the same input therefore does not automatically give it everything the human used.

Before delegating the task, define:

- **Outcome:** what must exist or be true when the task finishes?
- **Evidence:** how can the outcome be checked?
- **Context:** which rules, reference material, and additional sources are needed?
- **Boundaries:** which actions are permitted, and which conditions must remain unchanged?

The existing manual process is useful evidence about how the work is currently done. Some steps embody required controls; others are conveniences or workarounds. Required controls remain part of the task specification. The executor can have flexibility over the remaining implementation choices.

For example, a reporting task should specify the required period, scope, definitions, reconciliation checks, and output format. It need not prescribe every lookup and intermediate note if the executor can produce a verifiable result through another permitted route.

## 2. Attempt the whole task within a defined boundary

The relevant ADaPT principle is: attempt the task before explicitly decomposing it; if execution fails, decompose and attempt the subtasks recursively.

This differs from generating a comprehensive task hierarchy before learning anything from execution. A capable executor may solve the task directly. A less capable executor, or a more difficult instance, may need a deeper decomposition.

However, “attempt the task” must have an operational meaning. It can mean preparing a draft, inspecting data, running a simulation, or acting within a reversible environment. It does not require committing every possible external action before understanding the consequences.

The system also needs a limit on the first attempt. If it spends most of the available budget before reporting failure, little remains for decomposition. Set local attempt limits alongside the shared budget for the entire task.

Explicit decomposition can be deferred even though the executor performs internal reasoning and the controller follows a predefined policy. “Do not plan” is therefore too broad a description.

**Defer detailed task decomposition until it can use evidence from execution.**

## 3. Choose fixed and adaptive execution according to the work

Fixed workflows already handle many exceptions well. They can include retries, alternative routes, and human review. ADaPT-inspired execution is especially relevant when the useful decomposition cannot be fully determined in advance.

| Design question | Fixed workflow | ADaPT-inspired execution |
|---|---|---|
| Where does the structure come from? | Previously established steps and exception paths | A stable controller, with local decomposition added during execution |
| Where does it fit best? | Repeated tasks with understood inputs and dependencies | Tasks whose difficult parts emerge through interaction |
| What happens at an exception? | Follow an existing handler or escalate | Diagnose the obstacle; decompose when decomposition can help |
| What is predictable? | Sequence, resource use, and expected outputs | Boundaries and stopping policy; the precise execution path varies |
| What needs attention? | Coverage of known exceptions | Quality of decomposition, verification, and state handling |

In practice, a workflow can use both. Routine data loading and formatting can remain deterministic. An unusual mismatch can enter an adaptive investigation. Once repeated investigations reveal a stable solution, that solution can become a reusable procedure or tool.

This creates a useful progression: explore uncertain work adaptively, verify the resulting method, and make recurring work more predictable.

## 4. Treat failure as a diagnosis problem before treating it as a decomposition problem

Execution failure does not identify its own cause. A difficult task, a missing credential, and an impossible requirement can all produce “failed,” but they need different responses.

| Observed obstacle | Useful response |
|---|---|
| Too much information or too many interacting requirements | Decompose into smaller tasks with clear interfaces |
| A transient tool error | Retry within a limit |
| An unsuitable method | Try an alternative method |
| Missing data or permission | Retrieve what is available or record a blocker |
| Conflicting definitions or requirements | Resolve the conflict or request a decision |
| Insufficient evidence | Preserve uncertainty; identify what evidence is missing |
| Exhausted budget or repeated lack of progress | Stop and return a bounded result |

A useful failure report records the task, the attempted actions, the observed result, and the unmet requirement. It distinguishes observations from the executor’s interpretation of their cause.

The planner then asks whether splitting the task is likely to address the obstacle. If the source system is inaccessible, producing ten smaller source-system tasks does not improve access.

The practical workflow is therefore:

<figure class="adapt-flow" aria-labelledby="adapt-flow-title">
  <p class="adapt-figure-label">Adaptive execution</p>
  <h3 id="adapt-flow-title">Let evidence guide the next move</h3>
  <ol class="adapt-flow-steps">
    <li><span class="adapt-step-number">01</span><strong>Attempt</strong><span>Pursue the task within its boundaries.</span></li>
    <li><span class="adapt-step-number">02</span><strong>Verify</strong><span>Check the result against the requirement.</span></li>
    <li><span class="adapt-step-number">03</span><strong>Diagnose</strong><span>Identify why a requirement remains unmet.</span></li>
    <li><span class="adapt-step-number">04</span><strong>Choose a response</strong><span>Respond to the observed obstacle.</span></li>
  </ol>
  <div class="adapt-response-options" aria-label="Possible responses">
    <span>Retry</span><span>Change method</span><span>Flag a blocker</span><span class="adapt-response-decompose">Decompose when useful</span>
  </div>
  <p class="adapt-recursion-note">For each subtask: attempt and verify again. Then check the parent result.</p>
  <figcaption>If verification passes, return the result. If a requirement remains unmet, diagnose it before choosing a response. Every path shares the same overall budget.</figcaption>
</figure>

This extends the paper’s basic success/failure routing into a more informative control policy.

## 5. Use a problem tree to preserve purpose and evidence

A useful problem tree explains why its branches exist. The root contains the desired outcome and its acceptance criteria. Each child addresses a requirement or obstacle that matters to its parent.

For a node, keep a small record:

| Field | Question it answers |
|---|---|
| Objective and parent link | What must this node establish, and why does the parent need it? |
| Inputs and prerequisites | What information and state does it require? |
| Acceptance evidence | What would justify marking it complete? |
| Attempt, result, and status | What happened, and what remains unresolved? |
| Budget and boundaries | How far may execution go? |

This is a reasoning and execution record. It need not become a large administrative system. Start with the fields needed to resume work and assess the result.

Two distinctions matter:

1. **An action can finish without answering its question.** Running an experiment does not establish that the proposed method works. A negative or inconclusive result may be the correct answer.
2. **Children can finish without establishing the parent outcome.** Two datasets can each pass local checks while their combination violates a shared definition. The parent needs its own acceptance check.

The tree is also relative to the executor and environment. A stronger executor may solve a node directly; another may need several layers. More detail is useful only when it helps execution or verification.

Real workflows may share evidence and dependencies across branches. A tree can remain the main view while the execution system records those dependencies explicitly. Some workflows need a dependency graph rather than a pure tree.

## 6. AND and OR express different obligations

AND means all required contributions must hold. OR means a permitted alternative can satisfy the objective. The paper combines subtasks using these operators, including mixed expressions.

For workflow design, distinguish logical requirements from scheduling:

- AND does not, by itself, specify an execution order. Dependencies determine the order. Independent checks may run in parallel if resources and state allow it.
- OR applies to genuinely acceptable alternatives. It does not make different checks interchangeable.

For example, obtaining the same approved document from either of two equivalent repositories may be an OR task. Checking the document’s identity, scope, and completeness may require all three checks, making them AND requirements.

In troubleshooting, “inspect the source table, inspect the file, inspect the API” is not automatically an OR plan. Those sources may contribute different evidence, or all may be required. Finding an anomaly in one source does not establish that the whole pipeline is now correct.

Short-circuiting can save work: stop trying alternatives once an acceptable route succeeds, or stop downstream work when a necessary prerequisite fails. The controller must implement this behaviour; writing AND or OR in a prompt does not enforce it.

A failed branch may also change the environment. Before another branch runs, the system must understand the resulting state or restore an appropriate starting point.

## 7. Make verification part of execution

Model self-assessment is useful feedback, but it does not establish completion. In ADaPT’s WebShop experiment, self-assessed success exceeded the environment-based success rate by more than 30 percentage points, causing premature termination. See Appendix F of the [paper](https://aclanthology.org/2024.findings-naacl.264.pdf).

Workflow verification should connect the claimed result to observable evidence.

| Task | Relevant verification | What remains to check |
|---|---|---|
| Code change | Tests tied to the intended behaviour | Passing existing tests may leave the requested behaviour untested |
| Data transformation | Reconciliation, schema, required coverage, and invariants | Row counts alone do not establish correctness |
| Information extraction | Source-linked field checks; labelled examples for offline evaluation | Search results alone are not ground-truth labels |
| Ticket handling | Required fields, recorded action, and appropriate outcome confirmation | A status change alone may not establish resolution |
| Report generation | Required sections, calculations, source links, and consistency checks | A polished report may still make unsupported claims |

Macro-F1 can help compare extraction systems on a labelled evaluation set. For a new individual input, the workflow needs checks available at runtime, such as source correspondence, field validity, and explicit uncertainty. These are different forms of evaluation.

A verifier is itself a component that needs validation. Another model can identify errors but may share blind spots with the executor. Use mechanical checks where they fit, and make the limits of judgment-based checks explicit.

For the practical extension, return at least three outcomes: **verified**, **not verified**, and **insufficient evidence**. Tool blockers and decision requests can be recorded separately. Treating insufficient evidence as success would defeat the purpose of the controller.

## 8. Preserve state, limit costs, and know when to stop

Successful work can be reused only while its prerequisites remain valid. If a repair changes an upstream dataset, dependent outputs may need to be recomputed. Otherwise, the system can combine individually plausible results from incompatible versions.

Record artifact versions, completed actions, dependency changes, and enough tool results to resume. Repeated actions also need care: rerunning a read is different from sending a message twice or appending the same records again. Use appropriate checks, reversible stages, or compensation for actions with side effects.

A depth limit is one cost control. If every node has at most b children, the root is at depth 1, each visited node receives one executor attempt, and execution stops after depth d_max, then the number of executor invocations is bounded by:

<div class="adapt-equation" aria-labelledby="adapt-bound-title">
  <p class="adapt-figure-label" id="adapt-bound-title">Executor invocation bound</p>
  <math xmlns="http://www.w3.org/1998/Math/MathML" display="block" aria-label="N executor is at most one plus b plus b squared, continuing through b to the power d max minus one.">
    <mrow>
      <msub><mi>N</mi><mtext>executor</mtext></msub>
      <mo>≤</mo><mn>1</mn><mo>+</mo><mi>b</mi><mo>+</mo>
      <msup><mi>b</mi><mn>2</mn></msup><mo>+</mo><mo>⋯</mo><mo>+</mo>
      <msup><mi>b</mi><mrow><msub><mi>d</mi><mtext>max</mtext></msub><mo>−</mo><mn>1</mn></mrow></msup>
    </mrow>
  </math>
  <dl class="adapt-equation-key">
    <div><dt><i>b</i></dt><dd>Maximum children per node</dd></div>
    <div><dt><i>d</i><sub>max</sub></dt><dd>Maximum execution depth; root = 1</dd></div>
  </dl>
  <p class="adapt-equation-example">For <i>b</i> = 3 and <i>d</i><sub>max</sub> = 3: <strong>1 + 3 + 9 = 13</strong> executor invocations.</p>
</div>

This is not a bound of 13 LLM calls: an executor may make several calls, and planning and verification add work. Extra retries or replacement subtrees also require separate accounting.

Set shared limits for elapsed time, model calls or token cost, tool calls, retries, and task expansion. Recursive calls must draw from the same overall budget rather than receiving an unlimited fresh allowance.

Stopping conditions should include reaching the depth limit, repeating the same unsuccessful strategy, obtaining no useful new evidence, and exhausting the budget. A stopped task should return completed work, unresolved requirements, and the next decision needed.

## 9. Example: investigating a data-pipeline discrepancy

Suppose the goal is to produce a reconciled report from a defined input snapshot. A known pipeline exists, but its latest output fails a reconciliation check.

1. **Attempt the whole task within a safe environment.** Run the existing pipeline against the snapshot and check the report’s acceptance criteria. This avoids rebuilding an execution plan unnecessarily.
2. **Record the failed requirement.** The report’s total disagrees with the reference total. The task has not succeeded, even if the pipeline exited without an error.
3. **Decompose the discrepancy.** Determine where the disagreement first appears: input coverage, transformation, or aggregation. Use the actual dependency structure; these are not automatically interchangeable OR branches.
4. **Expand the difficult node.** If input coverage is wrong, investigate relevant requirements such as completeness and key consistency. If the cause is missing access, record that blocker rather than decomposing indefinitely.
5. **Apply a bounded repair.** For example, correct a key mapping in a working copy. Recompute outputs affected by the change and reuse unaffected work whose prerequisites still hold.
6. **Verify the root outcome.** Check reconciliation, required coverage, and output definitions. Deliver the result, supporting evidence, and remaining uncertainty for final review.

The adaptive part is how the system locates and addresses the discrepancy. Established pipeline logic and final acceptance criteria remain stable.

The benefit is a hypothesis to evaluate: does local decomposition resolve difficult cases with less human intervention at an acceptable cost?

## 10. Use autoresearch inside nodes that need method improvement

Some nodes require a result for the current input. Others require finding a better reusable method. The latter can be suitable for an autoresearch-style loop.

For example, “explain this record mismatch” is an execution or investigation task. “Find a matching rule that reduces errors across a representative dataset” is a method-improvement task.

Before routing a node to autoresearch, establish:

- a defined candidate artifact that may change;
- a credible, repeatable way to compare candidates;
- fixed constraints and an acceptance rule;
- sufficient resources to run experiments;
- an independent final evaluation appropriate to the claim.

[Karpathy’s autoresearch](https://github.com/karpathy/autoresearch) supplies the basic modify–run–evaluate–keep-or-discard pattern. Using it within a task tree is a proposed integration.

If the evaluation does not exist, creating and validating it becomes a separate task. Freeze its definition before comparing candidates. Changes to the evaluator begin a new evaluation phase; they cannot quietly make earlier candidate scores comparable to new ones.

The optimisation node returns a candidate, evidence, and limitations, or reports that no improvement was found within budget. It does not certify the root business objective on its own. The outer controller still has to establish the final result.

## 11. Start with one bounded workflow and measure the whole outcome

A minimal implementation needs a task specification, a tool-capable executor, a verifier, and a controller that can record state, choose responses, and enforce limits. These are responsibilities; they do not require separate agents for every role.

A prompt can describe the policy. To run it autonomously, the environment must actually support tool execution, observation, persistence, and control flow. A chat-only setup may require human orchestration between stages.

Start with one workflow whose inputs and outputs are clear. Compare ordinary execution with the adaptive version on routine cases and meaningful exceptions. Where a fixed workflow already exists, include it as a baseline.

Measure:

- independently verified completion;
- errors that reach final review;
- human intervention and review time;
- elapsed time and total execution cost;
- which decompositions help, and which add work without improving the result.

Count time spent resolving incomplete handoffs. Returning a document quickly does not save effort if the reviewer has to reconstruct the entire analysis.

## 12. Where the approach fits

The best candidates have observable feedback, useful ways to decompose the task, executable tools, and acceptance criteria that can be checked at reasonable cost. Examples include document processing with exceptions, bounded troubleshooting, reconciliation, and multi-source investigations.

Stable repetitive tasks may be better served by established rules or code. Missing infrastructure requires infrastructure work. Tasks with largely subjective acceptance can still benefit from decomposition, but an automatic success declaration has weaker meaning and human judgment remains important.

Creative writing and strategic planning are therefore not inherently “undecomposable.” Their challenge is often that quality and completeness cannot be established through a simple verifier. Likewise, irreversible actions require a suitable execution boundary; adaptive reasoning can still help prepare or evaluate a proposed action.

The value of ADaPT-inspired automation depends on whether its local flexibility improves the full workflow. Verified results, review effort, and operating cost should determine how much adaptive execution to retain.
