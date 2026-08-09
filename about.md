---
layout: default
title: About
permalink: /about/
description: Luoqing Zhao — independent research on verification and governance of language-model output, from a background in bank markets and regulated delivery.
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

<p class="section-label">Where this comes from</p>

Fourteen years in bank treasury and front-office controls, across London,
Luxembourg and Paris. Treasury and ALM — liquidity and funding under LCR, NSFR
and IRRBB. Repo and secured funding, including a branch secured-funding business
built from nothing. Fixed income, FX, and interest-rate and cross-currency
derivatives. Funds transfer pricing.

Alongside that, the regulated delivery programmes: MiFID II trade reporting and
the LIBOR to risk-free-rate transition, both delivered ahead of the regulatory
milestones. I grew and led a treasury team from two people to seven.

That background is not incidental to the research. A trading desk is a place
where being wrong is expensive and someone has to sign for it, so the machinery
around a number matters more than the number — who computed it, against what
independent reference, and what happens when the two disagree. The questions I
now ask about machine-generated output are the same questions, asked of a
different producer.

<p class="section-label">How I try to work</p>

Report the errata. Both of my papers state withdrawn claims, deviations from the
frozen protocol, and pre-registered predictions that returned nulls, alongside
the results that held. This is not modesty — it is the only way a reader can
tell which parts are load-bearing.

Prefer a claim that can be checked. A number with a stated domain of validity is
worth more than a larger number without one.

<p class="section-label">Background</p>

MSc Computer Science — ENSEIRB, Bordeaux<br>
MSc Financial Engineering — Université Bordeaux IV<br>
SMCR Certified Person (UK), 2018–2023 · AMF Certification (France)

French national, based in London. Chinese, French and English.

<p class="section-label">Contact</p>

<a href="mailto:{{ site.email }}">{{ site.email }}</a><br>
<a href="{{ site.scholar }}">Google Scholar</a> ·
<a href="https://orcid.org/{{ site.orcid }}">ORCID</a> ·
<a href="{{ site.linkedin }}">LinkedIn</a>

<p class="muted" style="font-size:.85rem; margin-top:2rem">
This site is personal. It reflects my own views and independent work only, and
is unrelated to any employer.
</p>
