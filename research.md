---
layout: default
title: Research
permalink: /research/
description: Working papers on runtime verification of language-model output and on representational geometry across model families.
---

# Research

Independent work, conducted on personal time with personal resources and public
data. Both papers are working papers on SSRN; neither has completed peer review.

<div class="paper reveal">
  <h3>Semantic Validation Gates</h3>
  <p class="meta">Working paper · SSRN, 2026</p>
  <p>
    A five-gate framework for runtime verification of language-model output —
    format, fact, logic, alignment and intent — where each gate is computable
    from real outputs and each threshold carries a finite-sample statistical
    guarantee. Evaluated in a pre-registered field study on real reasoning
    chains: AUROC 0.990 on compositional violations, and a 1% false-positive
    rate at 95% recall.
  </p>
  <div class="linkrow">
    <a href="https://ssrn.com/abstract=7157718">SSRN</a>
    <a href="https://github.com/research-zhaoluoqing/semantic-validation-gates">Code</a>
  </div>
</div>

<div class="paper reveal">
  <h3>One decorrelated model suite as a geometric reference frame</h3>
  <p class="meta">Working paper · SSRN, 2026 (revised)</p>
  <p>
    Four closed-form conditions — identifiability, reproducibility, monotonicity
    and internal consistency — that a design and a measurement must satisfy
    before an architectural scaling law can be asserted. Applied across four
    model families, only one suite satisfies all four; the rest are reported as
    measured offsets against that calibrated surface rather than discarded.
  </p>
  <div class="linkrow">
    <a href="https://ssrn.com/abstract=6365178">SSRN</a>
  </div>
  <p class="muted" style="font-size:.82rem; margin-top:.6rem">
    Code and artifacts are released on publication.
  </p>
</div>

<p class="section-label">Identifiers</p>

ORCID <a href="https://orcid.org/{{ site.orcid }}">{{ site.orcid }}</a><br>
<a href="{{ site.scholar }}">Google Scholar</a>

<p class="section-label">A note on method</p>

Both papers report what did not work alongside what did: withdrawn claims,
deviations from the frozen protocol, and pre-registered predictions that
returned nulls. A result that cannot survive its own errata is not a result.
