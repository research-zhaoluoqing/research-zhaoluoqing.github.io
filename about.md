---
layout: default
title: About
permalink: /about/
description: Luoqing Zhao — independent research on verification and governance of language-model output.
---

# About

I work on a narrow question: **when a system can be wrong in ways you cannot
predict in advance, what has to be true before you are willing to rely on it?**

That question turns out to be less about models than about design. You cannot
write a rule for a failure you cannot locate, so the first requirement is being
able to see where a long chain actually broke. You cannot say an output is
acceptable without someone having defined what acceptable means, which is a
judgement call, not a computation. And neither of those gets done unless someone
is accountable for the result.

My research approaches this from two directions. One is runtime verification —
what can be checked about a language model's output at the moment it is
produced, and what statistical guarantee that check can carry. The other is
measurement: what conditions a set of models has to satisfy before any claim
fitted across them means anything at all.

<p class="section-label">How I try to work</p>

Report the errata. Both of my papers state withdrawn claims, deviations from the
frozen protocol, and pre-registered predictions that returned nulls, alongside
the results that held. This is not modesty — it is the only way a reader can
tell which parts are load-bearing.

Prefer a claim that can be checked. A number with a stated domain of validity is
worth more than a larger number without one.

<p class="section-label">Background</p>

MSc Computer Science — ENSEIRB, Bordeaux<br>
MSc Financial Engineering — Université Bordeaux IV

French national, based in London. Chinese, French and English.

<p class="section-label">Contact</p>

<a href="mailto:{{ site.email }}">{{ site.email }}</a><br>
<a href="{{ site.linkedin }}">LinkedIn</a>

<p class="muted" style="font-size:.85rem; margin-top:2rem">
This site is personal. It reflects my own views and independent work only, and
is unrelated to any employer.
</p>
