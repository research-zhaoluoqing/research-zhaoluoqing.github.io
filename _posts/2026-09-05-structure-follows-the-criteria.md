---
title: "Structure Follows the Criteria"
date: 2026-09-05
summary: >-
  A chain lets you watch every step; a loop reaches the goal on its own. Neither
  is better — which one to use is decided by where a checkable criterion can live.
standfirst: On chains, loops, and where to put your criteria
tags: [governance, agents, system-design]
linkedin_url: https://www.linkedin.com/feed/update/urn:li:activity:7501921628600041472/
thumb: /assets/img/chain-or-loop.webp
---

Same task, same model. As a rough spoken request, it answered seven or eight of
ten questions. Written up as a formal specification and run step by step, it
answered one or two.

We automate the same way every time: break the work into steps to make it
manageable, then add rules and constraints so the output stays stable. That
second move is what breaks it. The model was never missing procedure — it already
knows how to analyse, draft, and structure. What it lacked was declarative
knowledge: what a field means, how two tables relate. Give it that and it goes
from mediocre to near perfect. Layer procedure on top and you spend context
constraining something that did not need constraining.

The alternative is to stop decomposing and let the model run in a loop. That
direction is not fringe — the frontier is sold on agentic execution. But a loop
is not the better structure. It is a different trade, and the cost rarely gets
named.

## What a loop costs

A loop reaches the goal without you — provided you can define what "done" looks
like.

I ran a small isolated test: three tasks, two conditions, six runs that could not
see each other. With a checkable list of completion criteria, it finished in a
couple of passes. With only "keep iterating until you are satisfied," it ran
about twice as long — and the extra passes invented details that were never in
the input.

Note what actually varied there. Both conditions were loops. What changed was
only whether a checkable criterion existed — which is the real variable, not the
loop.

The other cost is sight. You cannot watch the middle of a loop. When the answer
comes out wrong, you have nowhere to point.

## What a chain costs

A chain gives you exactly that sight. You see each step, catch errors early, and
rerun one part instead of the whole thing. The price is that a chain only works
if you already know what each step should produce.

That is also where chains fail — not because chaining is wrong, but because we
cut too fine. Past a certain granularity you can no longer judge any single step,
so the checkpoints quietly become rubber stamps. And every handoff is a lossy
rebuild: the next step receives a reconstruction, not the real output. Those
losses multiply.

Cut at decision points instead — the steps that change how the later work is
done, not just what it contains. You find them by working backward from a
finished, correct output.

## So which one

Put the work where your criteria can live.

Criteria at every step: use a chain, and stop at the decision points. Criteria
only at the end: use a loop, and run it to a stop condition. No criteria
anywhere: do it in one pass and judge the whole thing yourself.

<figure>
  <img src="/assets/img/chain-or-loop.webp" width="1200" height="670" loading="lazy" decoding="async"
       alt="Four cards: the default chain and its lossy handoffs; the cost of cutting too fine, where quality compounds down; a table comparing what a chain and a loop each require and where each fails; and the rule — structure follows the criteria.">
  <figcaption>Chain or loop: the trade, in four steps. Sources: Kim et al., 2025; ReAct; Reflexion; Let's Verify Step by Step.</figcaption>
</figure>

The reliability of a structure was never a property of the model. Decomposition
buys sight, iteration buys convergence — and neither is free. Structure follows
the criteria.

---

*Source: Towards a Science of Scaling Agent Systems (Kim et al., 2025),
arXiv:2512.08296.*
