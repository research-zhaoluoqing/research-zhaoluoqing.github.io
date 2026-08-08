---
layout: default
title: Writing
permalink: /writing/
description: Essays on verification, failure paths and AI governance.
---

# Writing

{% for post in site.posts %}
<div class="entry">
  <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
  <p class="meta"><time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%-d %B %Y" }}</time></p>
  {% if post.summary %}<p class="summary">{{ post.summary }}</p>{% endif %}
</div>
{% endfor %}
