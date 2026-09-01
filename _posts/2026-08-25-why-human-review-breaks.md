---
title: "Why Human Review Breaks"
date: 2026-08-25
summary: >-
  Most human-in-the-loop systems ask the expert to judge whether the model is
  right — the one thing people are worst at. Hand them a shortlist to choose from
  instead, and the success rate factors cleanly.
standfirst: On expert prediction sets
tags: [governance, human-in-the-loop, conformal-prediction]
linkedin_url: https://www.linkedin.com/feed/update/urn:li:activity:7497895610948194305/
thumb: /assets/img/shortlist-is-the-dial.webp
---

Most human-in-the-loop systems work the same way: the model returns an answer and
a confidence score, and a human decides whether to accept it.

But that asks the expert to do three things, and not one holds up:

1. Know whether the model is right on *this* case, not on average.
2. Turn a score into a decision about trust — which only works if the model is
   well-calibrated, and most are not.
3. Do both correctly, hundreds of times a day, under pressure, without tiring.

We built a review process that rests on the exact judgment people are worst at.

## The switch

A support ticket must be routed to one of ten queues. The model returns: Refunds
55%, Logistics 30%, Accounts 10%, the rest 5%.

- **Option A:** show "Refunds, 55%" and let the agent decide whether to believe it.
- **Option B:** show "Candidates: Refunds, Logistics" and require the agent to
  pick one.

In Option B the agent never judges the model. They weigh the options. Confine the
choice to a set and the success rate factors cleanly:

*P(correct) = P(the true answer is in the set) × P(the person picks it).*

## A bigger set is not a safer set

Widen the set and the model is likelier to include the answer — but the human is
likelier to miss it. Calibration might look like this (illustrative):

| Set | In set | × Picked | = Correct |
|---|---|---|---|
| 1 candidate | 55% | 100% | 55% |
| 2 candidates | 85% | 90% | **77%** |
| 3 candidates | 95% | 80% | 76% |
| all 10 | 100% | 40% | 40% |

Too narrow, you gave up on the human. Too wide, you gave up on the machine. The
best position is in between.

<figure>
  <img src="/assets/img/shortlist-is-the-dial.webp" width="1200" height="670" loading="lazy" decoding="async"
       alt="The shortlist is the dial: the old setup asks the human to judge the model; the switch gives them a shortlist to choose from; the trade-off shows success peaking at a middle set size; the fix has the system search every set size and keep the peak.">
  <figcaption>Why the set size is the real control. Source: Straitouri et al., ICML 2023, arXiv:2201.12006.</figcaption>
</figure>

## The fix: you don't guess it

A calibration set only allows a handful of distinct set sizes. The system walks
through every one, estimates the expert's success rate at each, and keeps the
highest — with a guarantee that, with high probability, the choice is near-optimal.

The catch: it estimates the human's success from a *model* of how experts choose,
not from live people. The optimum is only as trustworthy as that model.

## The takeaway

Before building one, answer three questions: how often can the right answer be
missing from the set? How far may the real rate drift from that? How often may the
promise itself fail? Answer those, and the arithmetic tells you how many labeled
cases you need.

(This applies to enumerable tasks like routing; open-ended generation needs a
different approach.)

---

*Source: Straitouri et al., Improving Expert Predictions with Conformal
Prediction. ICML 2023. arXiv:2201.12006.*
