---
title: "The Correction Trap"
date: 2026-08-02
summary: >-
  Capability went up fivefold and deployment barely moved. The gap is not a
  model problem — it is what happens to a correction after someone makes it.
standfirst: On why pilots pass and systems fail
tags: [governance, verification, deployment]
---

Three numbers in Stanford's 2026 AI Index refuse to sit together.

AI agents went from roughly 12% to 66% on OSWorld, a benchmark measuring how
often AI completes a task a human assigned it. Enterprise adoption reached 88%.
Yet agentic deployment stayed in single digits across most business functions,
while documented incidents rose from 233 to 362.

Capability rose fivefold. Deployment barely moved. Failures went up.

Adoption is not deployment. Most organisations are not deploying AI. They are
hosting it.

The usual causes are real: budget in the wrong places, weak integration,
organisational resistance, talent gaps. They share one property. You can spend
your way out.

One of them doesn't work like that.

## The unpredictable 34%

The interesting part of the OSWorld result is not the 66. It is the 34.

Those failures are edge cases the benchmark never contained. A benchmark
measures the distribution it was built from, and your workflow is not that
distribution.

It isn't a capability problem. It's that you can't predict where it fails.

If you cannot predict where a system breaks, you cannot design around it in
advance. You can only design for what happens after. Which moves the question
entirely: not *how good is it*, but *what happens when it's wrong*.

## Failure without an address

Software gives you a stack trace. A line number. Something you can point at.

An agent gives you a plausible answer that went astray somewhere in twenty
steps. You cannot see the turn. You cannot locate the step where the wrong
document was retrieved, where a constraint was misweighted, where a rule was
quietly dropped.

You get a failure without an address.

And you cannot write a rule for a failure you cannot locate. So the correction
lands on the output, because the output is the only part anyone can point at.

Two things have to exist before governance means anything. Control what the
system is allowed to see at each decision point, so its behaviour has somewhere
to converge. Record what it actually did at each step, so someone can walk the
sequence backwards and say: here, at step seven, it used the old policy.

Not audit logging. Diagnostic infrastructure. The distinction matters because
audit logs are built to answer *what did it do*, and what you need to answer is
*why, and at which step could we have intervened*.

## Where the correction goes

Now watch the moment an error is caught. Someone notices, corrects it, moves on.
The only thing that matters is where that correction lands.

**Into the output.** The case is fixed. Nothing else changes. Next month the
same expert spends the same hour on the same class of error. The month after,
again.

**Into the system.** That class of failure closes. They get called less.

Same hour of expert time. Opposite trajectory.

A short trial cannot tell you which one you have, because both produce correct
outputs. That is why pilots pass. Everyone watches the output, and the output is
fine. Nobody watches what the corrections are doing.

## Two experts, and the friction between them

The people who define what correct means must not be the people patching
individual outputs.

A domain expert reads the trace and does what nobody else can. Not *this answer
is wrong* — that was already obvious. But: *at this step it treated this as
that, and that is where it left the standard.*

An engineer then applies the constraint that keeps it honest. Can that be
checked at that step, every time, without a person reading it? Most first
attempts cannot. "Use judgement on materiality" is not a rule. It gets pushed
back until it becomes one, then handed back to be tested against the case that
started it.

That friction is the work. A domain expert alone writes rules that cannot be
enforced. An engineer alone writes rules that are enforceable and wrong. Neither
can tell whether the rule held without the other.

And it runs both ways. The expert starts seeing patterns across cases they could
never see one at a time, and their own standard sharpens against the aggregate.

Neither writes it alone — which is the real reason it usually goes unwritten. It
falls between two functions, and nothing that falls between two functions gets
built unless someone is accountable for the result.

## The only proof of upgrade

So when something breaks, the response is not to fix that output. It is to add
one rule at the point where it broke, and have the system carry it from then on.

**If the rule system is not expanding, the AI is not upgrading.**

That is the one thing a demo cannot fake.

If a workflow has been live for three months and the same domain experts are
still spending the same hours correcting the same class of error, it isn't
learning.

You haven't deployed an AI workflow. You've built an expensive manual review
layer.

---

*Source: Stanford HAI, 2026 AI Index (April 2026).*
