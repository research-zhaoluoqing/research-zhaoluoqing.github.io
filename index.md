---
layout: default
description: >-
  Independent research and writing on runtime verification of language-model
  output — and the governance that has to sit around it.
---

<p class="lede">
Most of the difficulty in deploying AI is not making it work. It is deciding
what happens when it is wrong.
</p>

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

Two working papers on SSRN, on verifying machine-generated reasoning and on
representational geometry across model families.
<a href="{{ '/research/' | relative_url }}">See research →</a>
