# Personal site — deployment and maintenance

Static blog built for **GitHub Pages** (Jekyll). No local toolchain needed:
GitHub builds the site on every push.

---

## One-time setup

Account: **`research-zhaoluoqing`** → site will be served at
**https://research-zhaoluoqing.github.io**

1. **Create a public repository named exactly `research-zhaoluoqing.github.io`.**
   The name must match the username character for character, or Pages will treat
   it as a project site and the URL will be wrong.

2. **Upload the contents of this folder** to the repository root — that is
   `_config.yml`, `_layouts/`, `_posts/`, `assets/`, `index.md`, `writing.md`,
   `research.md`, `about.md`, `feed.xml`, `sitemap.xml`, `robots.txt`,
   `404.html`. (Upload the *files*, not the `Website` folder itself.)

3. **Turn on Pages.** Repository → **Settings** → **Pages** →
   Source: *Deploy from a branch* → Branch: `main`, folder `/ (root)` → Save.

4. Wait 1–3 minutes. The URL appears on that same settings page.

---

## Adding a new post

Create one file in `_posts/` named `YYYY-MM-DD-short-title.md`:

```markdown
---
title: "Your title"
date: 2026-09-14
summary: >-
  One or two sentences shown on the index pages.
standfirst: Optional line under the title
---

Your text in Markdown. `## ` for section headings.
```

Commit it. The site rebuilds automatically — the index, the writing page and
the post URL are all generated. Nothing else to update.

---

## Editing the fixed pages

| Page | File |
|---|---|
| Home | `index.md` |
| Writing index | `writing.md` |
| Research | `research.md` |
| About | `about.md` |
| Site title, email, links | `_config.yml` |
| All styling | `assets/css/style.css` |

---

## The interactive background

`assets/js/background.js` draws a neural-style field of drifting nodes that link
to their neighbours and react to the cursor. It is plain JavaScript — no library,
no network request, nothing tracked.

Tuning knobs are at the top of the file:

| Constant | Effect |
|---|---|
| `LINK_DIST` | how close two nodes must be to draw a line (higher = denser web) |
| `MOUSE_DIST` | radius of cursor influence |
| `SPEED` | base drift speed |
| `DENSITY` | one node per N pixels — **raise the number for fewer nodes** |

Node and line opacity are set in `palette()`; lower `nodeAlpha` / `linkAlpha`
to make it more subtle.

The field is masked out behind the centre column (see `#bg-field` in
`style.css`) so body text always sits on clean background. It also:

- stops animating when the browser tab is hidden,
- freezes motion for readers who set *prefers-reduced-motion*,
- caps node count so phones stay smooth,
- uses `pointer-events: none`, so it can never intercept a click or selection.

To remove it entirely: delete the `<canvas>` line and the `<script>` line from
`_layouts/default.html`.

## Design notes

- No external fonts, scripts, analytics or cookies — the site loads only its own
  CSS. Nothing is tracked.
- Light and dark themes follow the reader's system setting.
- Body text is capped at a readable measure; tables and code scroll inside
  themselves so the page never scrolls sideways on a phone.

---

## Content boundaries applied to this site

Deliberate constraints, applied when the site was built:

- **No employment information.** No employer, job title, role, duties, industry
  or workplace detail anywhere on the site.
- **No CV.** The CV PDF is intentionally *not* published here, because it
  contains employment history.
- Research is presented in its own section and is not the landing focus.
- The About page carries an explicit personal-views / unrelated-to-any-employer
  line.

Keep these in mind when adding posts: write at the level of general principle,
not personal practice.
