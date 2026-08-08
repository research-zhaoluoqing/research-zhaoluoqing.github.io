---
layout: default
description: >-
  Luoqing Zhao — independent research on runtime verification of language-model
  output, and the governance that has to sit around it.
---

<div class="identity">
  <h1>Luoqing Zhao</h1>
  <p class="role">Independent research — runtime verification and governance of language-model output</p>
  <p class="handles">
    <a href="mailto:{{ site.email }}">Email</a> ·
    <a href="{{ site.scholar }}">Scholar</a> ·
    <a href="https://orcid.org/{{ site.orcid }}">ORCID</a> ·
    <a href="https://ssrn.com/abstract=7157718">SSRN</a> ·
    <a href="https://github.com/research-zhaoluoqing">GitHub</a>
  </p>
</div>

<p class="lede">
Most of the difficulty in deploying AI is not making it work. It is deciding
what happens when it is wrong.
</p>

<hr>

I write about runtime verification of language-model output: how to define what
counts as an acceptable answer, how to tell where a long chain actually broke,
and who has to be accountable before any of it can be relied on.

The recurring theme is that these are design and governance questions rather
than model questions — and that they are usually left unanswered because they
fall between two functions.

<p class="section-label">Writing</p>

{% for post in site.posts limit: 5 %}{% include entry.html post=post %}{% endfor %}

{% if site.posts.size > 5 %}
<p style="margin-top:1.2rem"><a href="{{ '/writing/' | relative_url }}">All writing →</a></p>
{% endif %}

<p class="section-label">Research</p>

<div class="entry reveal">
  <h3><a href="https://ssrn.com/abstract=7157718">Semantic Validation Gates</a></h3>
  <p class="meta">Working paper · SSRN, 2026</p>
  <p class="summary">Five computable gates for verifying language-model output at runtime, each threshold carrying a finite-sample guarantee.</p>
</div>

<div class="entry reveal">
  <h3><a href="https://ssrn.com/abstract=6365178">One decorrelated model suite as a geometric reference frame</a></h3>
  <p class="meta">Working paper · SSRN, 2026 (revised)</p>
  <p class="summary">Four closed-form conditions a design and a measurement must satisfy before an architectural scaling law can be asserted.</p>
</div>

<p style="margin-top:1.2rem"><a href="{{ '/research/' | relative_url }}">More on the research →</a></p>
