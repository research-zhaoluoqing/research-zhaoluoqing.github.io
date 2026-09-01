---
title: "Bounding a Model You Cannot Validate"
date: 2026-08-17
summary: >-
  You cannot make a language model reliable. But you can put a bound on it that
  still holds when it is wrong — and let the business, not the model, choose how
  much error to absorb.
standfirst: On conformal prediction for production AI
tags: [governance, verification, conformal-prediction]
linkedin_url: https://www.linkedin.com/feed/update/urn:li:activity:7494988909177851904/
thumb: /assets/img/bounding-a-model.webp
---

Traditional automation is reliable because every rule is written down in advance.
That is also its ceiling: it only handles the cases someone already imagined. The
new or strange case fails — and that is where the value leaks.

A language model handles the case nobody wrote a rule for. But it guesses without
telling you when it is guessing. So the goal is not to make it reliable. It is to
bound what happens when it isn't.

## The procedure

There is a method for that, older and duller than most AI tooling: conformal
prediction. It needs no retraining and no access to the weights.

Take the model as it is. Hold out a set of examples it never saw. Define a score
for how far off it is on each one. Compute the scores, and take a quantile. That
quantile is your threshold: at inference you keep every candidate answer that
scores below it.

## The guarantee

What you get back is a guarantee — the true answer sits inside that set at least
1−α of the time. Finite-sample. Distribution-free. On any model.

The part that matters commercially is who chooses what. You do not pick the
threshold. You pick α — the error rate the process can absorb. The data returns
the threshold. The business states its tolerance; the arithmetic states the
cut-off.

## What it does not give you

A guarantee nobody has stress-tested is just a slogan. Three caveats:

**Validity is free; usefulness is earned.** If the score function is poor you
still get your coverage — just with sets so wide they carry no information.

**Coverage is overall, not everywhere.** Ninety percent on average can hide forty
percent on the cases you actually care about. If the hard cases are the point,
calibrate for them.

**Exchangeability is assumed.** Production drifts, and drift breaks the guarantee
itself — not just the accuracy. There are extensions, but they do not switch
themselves on.

<figure>
  <img src="/assets/img/bounding-a-model.webp" width="1200" height="670" loading="lazy" decoding="async"
       alt="Conformal prediction in four steps: the gap between written rules and a language model; the procedure — hold out, score, sort, cut; the guarantee that the true answer is in the set at least 1 minus alpha of the time; and what it does not give you.">
  <figcaption>Conformal prediction, end to end. Source: Angelopoulos &amp; Bates, arXiv:2107.07511.</figcaption>
</figure>

## The bottom line

None of this makes a model correct. It makes its output bounded, and puts a
number on the boundary that a named person can sign for.

The question changes from *is it right* to *how wrong can it be and still be
usable* — and this is the arithmetic that turns that sentence into a threshold.

---

*Source: Angelopoulos &amp; Bates, A Gentle Introduction to Conformal Prediction
and Distribution-Free Uncertainty Quantification. arXiv:2107.07511.*
