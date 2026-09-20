---
title: "How This Blog Works"
date: 2026-09-20
type: "case-study"
summary: "A walkthrough of how this blog is built — Astro, markdown files, dynamic OG images, and why the whole thing is basically just a fancy folder of text files."
tags: ["Astro", "Blog", "Web Dev", "Case Study"]
draft: false
---

I keep telling people this blog is simple. And it is, but only once you understand what's
actually happening under the hood. This post is that explanation.

## The short version

Every post you read here is a markdown file sitting in `src/content/posts/`. I write it,
commit it, push it, and Vercel picks it up. That's the whole pipeline. There's no database,
no admin panel, no CMS login. Just files and Git.

## The stack

The site runs on [Astro](https://astro.build/). I picked it because it's genuinely good
at the one thing a blog needs to be good at: taking content and turning it into fast,
static HTML. No unnecessary JavaScript shipped to the browser unless something actually
needs it.

The folder structure looks like this:

```
src/
  component/         # reusable UI pieces
  content/
    posts/           # every blog post lives here as a .md file
  layouts/           # page wrappers
  pages/
    category/        # tag/category routing
    og/
      [...route].ts  # dynamic OG image generation
    posts/
      [slug].astro   # individual post pages
    index.astro      # home page
  styles/
    global.css
content.config.ts    # content collection schema
```

The `content.config.ts` defines what frontmatter a post is expected to have — title, date,
type, summary, tags, draft status. Astro's content collections handle the validation and
give typed access to all of it across the site.

## Writing a post

Adding a new post is just creating a new `.md` file in `src/content/posts/` and filling
in the frontmatter. Something like:

```yaml
---
title: "Your Post Title"
date: 2026-09-20
type: "essay"
summary: "One line about what this is."
tags: ["whatever", "applies"]
draft: false
---
```

Then the content below it. That's it. The `[slug].astro` page picks it up automatically,
generates the route from the filename, and renders it.

Setting `draft: true` keeps it out of the index until it's ready. Useful for half-finished
thoughts you don't want published yet.

## The OG image thing

This is the part I'm most happy with. Instead of a static OG image for every post, there's
a dynamic route at `pages/og/[...route].ts` that generates one at request time. The image
you see when someone shares a link is built from the post's title and metadata, not
something I had to manually create for each post.

The index page does have a static OG — `public/og-index.png` — which is the dot-matrix
image with the tagline. That one made sense to do manually since it's the face of the site.

## Why this setup

The honest reason is that I wanted to write in markdown and not think about anything else.
No editor UI, no formatting toolbar, no saving drafts in a browser tab. The post is just
a file. If I want to edit it, I open it in my editor. If I want to delete it, I delete the
file. Version history is just Git.

The tradeoff is that there's no GUI for non-technical people to use. But this blog has
exactly one author, so that's fine.

## What I might change

I've been thinking about moving to Obsidian + Quartz. The output would be almost
identical — markdown files, Git, static site — but Obsidian's local writing environment
is genuinely better for longer-form pieces. Backlinks and the graph view would also let
me connect ideas across posts before they become fully formed.

Whether that's worth the migration effort is still an open question. The current setup
works well enough that "good enough" keeps winning.
