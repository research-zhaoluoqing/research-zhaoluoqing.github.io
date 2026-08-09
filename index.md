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

<p class="claim">Most of the difficulty in deploying AI is not making it work. It is deciding <em>what happens when it is wrong</em>.</p>

I work on language models in settings where being wrong is a reportable event —
where the question is not whether a system is impressive but whether anyone can
say why its output should be trusted. Three things decide that, and none of them
is a model problem.

<ol class="dims">
  <li>
    <span class="n">01</span>
    <h3>Definition</h3>
    <p>What counts as an acceptable output at each step. Not <em>is it correct</em>, but <em>how wrong can it be and still be usable</em>. Human judgement is not deterministic either; processes tolerate that because someone defined the tolerance.</p>
  </li>
  <li>
    <span class="n">02</span>
    <h3>Diagnosis</h3>
    <p>Where a long chain actually broke. Software gives you a stack trace; an agent gives you a plausible answer that went astray somewhere. You cannot write a rule for a failure you cannot locate.</p>
  </li>
  <li>
    <span class="n">03</span>
    <h3>Accountability</h3>
    <p>Who signs for the result. These questions fall between the people who own the process and the people who build the system — and nothing that falls between two functions gets built unless someone is answerable for it.</p>
  </li>
</ol>

<p class="stance">The model is allowed to be wrong. The process isn't.</p>

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
