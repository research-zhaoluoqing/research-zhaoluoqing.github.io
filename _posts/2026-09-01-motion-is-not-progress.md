---
title: "Motion Is Not Progress"
date: 2026-09-01
summary: >-
  An agent loop fails two ways — it never stops, or it stops too early with an
  answer you can't trust. Both are the same failure: the loop can't tell motion
  from progress.
standfirst: On why agent loops feel unreliable
tags: [governance, verification, agents]
linkedin_url:   # backfill after the LinkedIn post is live
thumb: /assets/img/motion-is-not-progress.webp
---

Every agent loop I've built has failed the same two ways. It never finishes, or
it finishes with an answer I can't trust.

For a long time I debugged the wrong one. I kept tuning *when the loop stops.*
Stopping was never the real problem.

A loop has two jobs: get closer to the goal on every turn, and know when it has
arrived. Almost everyone debugs the second and ignores the first. But you cannot
fix a loop that isn't converging with a better stopping rule. Stop it early and
you get garbage. Stop it late and you get expensive garbage.

## The loop everyone writes first

Ask the model what to do next. Run the tool. Feed the result back. Ask again —
until the model says it's done. That is the ReAct pattern: reason, act, observe,
repeat.

Look at the exit. Nothing in that loop decides when the task is actually
finished. It stops when the model *feels* finished. That single gap is where
both failures come from.

## The failure nobody debugs

Generate an answer. Reflect on it. Regenerate. Reflect again. It looks like
diligence.

But if no new external fact entered the loop, you didn't improve the answer —
you rephrased the same input. The model gets more confident, not more correct.
That is motion, not progress.

Reflexion made the line precise: reflection helps only when the feedback carries
a real signal — a test that passed or failed, an environment that returned
success or failure — not the model's opinion of its own work.

## Two bugs, one disease

The two things people actually complain about are symptoms of this.

**It never stops.** A target the loop never converges toward is never satisfied,
so it runs until something else kills it. "Max 10 retries" is that blind kill
switch: nine wasted runs on a task that died at step one, or the guillotine on a
task that needed eleven. A counter cannot tell the difference.

**It stops too early.** You capped a loop that wasn't converging, or "done" was
a feeling instead of a fact.

Same disease: the loop cannot measure whether it is getting closer.

## What makes a loop converge

Three things a converging loop has that the naive one does not.

**A checkable goal.** Not "make it better" — that is unfalsifiable. Something you
can test: *every key claim has a valid source.* Without it there is nothing to
converge toward.

**Evidence that is on target.** New evidence is not enough. Each step has to be
pointed at the goal, and you have to check that it was. This is the difference
between accumulating facts and closing the gap — a step can gather something new
and still move sideways. Step-level checks beat grading only the final answer,
and that is measured, not asserted.

**A stop that watches progress, not a counter.** Two turns with no new on-target
evidence means the loop has stalled. That is a signal to stop — not a reason to
run the same thing a third time.

<figure>
  <img src="/assets/img/motion-is-not-progress.webp" width="1200" height="673" loading="lazy" decoding="async"
       alt="Four cards on why agent loops fail: the naive ReAct loop that stops on a feeling; the two failure modes (never stops, stops too early) that share one root; a loop spec of eight elements including an added intent check; and the fix, a loop that converges toward a checkable goal on on-target evidence.">
  <figcaption>The naive loop, the two ways it fails, the spec, and the fix.</figcaption>
</figure>

## The point

The reliability of a loop was never a property of the model. It is whether the
loop can verify its own progress. Make the model smarter and a non-converging
loop still won't converge. Give it a goal it can check and evidence it can act
on, and knowing when to stop becomes trivial — "done" becomes something you
test, not something the model feels.

The question is rarely *is the output correct.* It is whether you can show it is
getting closer, and bound where it lands.

---

*Sources: ReAct (Yao et al., 2022) · Reflexion (Shinn et al., 2023) · Let's
Verify Step by Step (Lightman et al., 2023).*
