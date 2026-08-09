---
title: "Stale, Not Wrong"
date: 2026-08-08
summary: >-
  Step 3 sets a definition. Step 9 overrules it. Step 11 outputs the Step 3
  version. Nothing is broken, the content is right, and the answer is wrong.
standfirst: What an agent remembers after a decision changes
tags: [context, agents, architecture]
linkedin_url: https://www.linkedin.com/feed/update/urn:li:activity:7491712007969087488/
thumb: /assets/img/stale-not-wrong.svg
---

<figure>
  <img src="/assets/img/stale-not-wrong.svg" alt="A twelve step chain. Step 3 sets a definition, step 9 overrules it, and step 11 still outputs the step 3 version.">
  <figcaption>The failure has no error code. Step 9 was never wrong, and step 11 never saw it.</figcaption>
</figure>

<div class="original" markdown="1">

AI remembers. AI remembers the version from three weeks ago.

[Last post](/writing/the-correction-trap/) I said an AI agent will sometimes hand you a failure without an error code. Someone asked what that looks like in practice.

Here is one — and it isn't just an agent problem. It's a workflow problem.

## The Problem: Stale, Not Wrong

Any long process has this vulnerability. Example of A 12-step approval chain. A monthly report through five stages. Make it long enough, and somebody changes their mind midway.

Step 3 sets a definition. It's written down and shared.

Step 9 overrules that definition.

Step 11 runs, and the system outputs the Step 3 version.

Not a hallucination. The agent found a real record that was completely correct when it was written. Nothing looks broken. The content is right, but the answer is wrong.

## The Context Trap: Three Potholes

Builders usually take one of three roads. All of them have potholes:

**Give it everything:** enough steps and you blow up the context window. Short of that, costs climb and early material gets ignored.

**Compress it (summarize):** lossy and one-way. If your summary doesn't state which version "won," that fact is gone forever.

**Filter it (retrieve):** sounds cleanest, but semantic similarity has no sense of time. Steps 3 and 9 are about the same topic. Retrieval might return only Step 3 because it was longer or more detailed.

## Possible Solution: A 3-Layer Architecture

**Layer 1: Write — rule, don't list.**

One summary listed: "Step 5 set A, Step 9 set B." The other ruled: "Final is B, A is void." Changing that one sentence pushed the model's success rate from 13% to 100%.

Note: a bigger model does worse here, not better. The largest model I tested dropped from 94.4% to 5.6% on a hedging summary. You can't buy your way past this by scaling up.

**Layer 2: Storage — compression hides, never deletes.**

The log must be append-only, every record pointing to its parent. A compaction is just a view: the original stays on the chain, so it never has to sit in the active context, and can still be recovered exactly. (Warning: one in-place update destroys this guarantee silently.)

**Layer 3: Orchestration — select for recall, not precision.**

Five irrelevant fragments alongside the correct one cost very little. Over-fetch. Extra fragments are cheap; missing the right one breaks the output.

## The Open Problem

Addressing is what I have not solved. I have the constraint, but not the ranker — when to trigger it, how to rank fragments, how many to pull. That is next, and I am open to ideas.

## The Litmus Test

Pick a decision made early in your workflow and revised later. Leave the old version in the context. Ask your agent what the value is now.

If it answers with the old one, a bigger model won't save you. Putting the current value explicitly in front of it will.

</div>

<p class="dd-label">What this rests on</p>

The constraints above were measured across **five models, nineteen conditions and
eighteen adversarial cases** — not a single run on a single model. Two figures
worth stating explicitly, because they set the price of each layer:

**Over-fetching is cheap, and here is how cheap.** Five distracting fragments
retrieved alongside the correct one cost thirteen percentage points in the worst
case observed. That is the number behind Layer 3: it is the margin you are
buying recall with, and it is small next to the cost of missing the right
fragment entirely.

**Append-only has a second payoff beyond recoverability.** Appending at the tail
leaves the cache prefix intact; it is compaction that invalidates it. So the
storage discipline that keeps an overruled decision recoverable is the same one
that keeps the prefix cache usable — the two requirements point the same way,
which is rare enough to be worth noticing.

Neither figure changes the argument. They bound it, which is the part a reader
needs in order to disagree with it precisely.
