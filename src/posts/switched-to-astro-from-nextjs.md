---
title: "Switching from Next.js to Astro"
summary: "Previously, my site was built on Next.js. It served me well, but I need something that is more aligned with what my site actually needs. Astro is it."
publishDate: "2026-09-13T15:38:00-08:00"
author: "Sal Rahman"
---

When I first decided to [go back to blogging](https://blog.salrahman.com/posts/2024/07/first-post/), I wanted to write posts in Markdown and have that be delivered to the web.

HTML written by hand was out of the question purely because it's tedious. I like Markdown, and by 2024, there really wasn't any shortage of platforms (both static local build tools as well as hosted solutions) that allowed one to write in paragraphs without having to deal with syntax. The market settled: it's either [WYSIWYG](https://en.wikipedia.org/wiki/WYSIWYG), or the typical format in the "textarea" box in most chat software; relying on nothing but UTF-8, punctuations and paragraphs to format plain text, yet successfully convey a message without formatting typography per text components.

I could have gone with WordPress, but I didn't want to deal with hosting. I'm not particularly against the idea of using it, but I have the particular skills to turn text files stored locally then deployed to materialize into a static website. So, I may as well put that to good use.

So, a static site generator is what I settled on.

For my current incarnation of the blog, I don't really remember what made me settle with a [Node.js](https://nodejs.org/en)+[React](https://react.dev/) combo, but I really wanted to use that. I think the Node.js draw stemmed from my early enthusiasm for JavaScript way back in 2010, and the fact that I was excited that a Turing-complete language like JavaScript escaped from being merely a scripting language for a web page, to something to sit alongside Python and Ruby.

That said, my preference for DIY static site gen is **not** superior to having hosted solutions do everything for you. I simply like the idea of static site generation, and I don't expect anyone to do it.

Over the years, I used several tools. Many of them were merely an aggressive attempt at replacing Makefiles, or to bring some CMake-like tooling to the JavaScript world.

I started with [Cake](https://coffeescript.org/v1/annotated-source/cake.html). Then moved to [Grunt.js](https://gruntjs.com/). I tried [Yeoman](https://yeoman.io/), but I didn't quite like it. Then my absolute favourite was released in 2013: [Gulp.js](https://github.com/gulpjs/gulp). I used that for a while.

But the overall theme was that none of these tools were dedicated to static site generation, but an overarching theme even above that was that I liked flexibility. Grunt.js provided guardrails yet had some flexibility, but Gulp.js took the flexibility step even further, while also operating within its frameworks.

But then, I eventually stopped blogging altogether. It was a whole host of reasons. You reading the above thought process of mine probably felt exhausted reading it, and that's probably what contributed to it. That, and also, just the unwillingness to look stupid. (Part of what brought me back to blogging was realizing that looking stupid is probably a lot less harmful than having nothing to show at all.)

Fast-forward to 2024, I decided, enough with the tooling. In the end of the day, it's not about tooling at all; tech exists to get things done, no matther how much so many programmers see otherwise. Some of us seem to forget that our hobbies are funded entirely by the ability to serve the world. It's what rewards us, literally, in cash.

Similar idea to blogging. It's not the tooling. Whether it is WordPress, Hugo static site generator, or anything else. It's about getting the word across in written form, using a medium what many call "the World Wide Web", accessed through a web browser.

I just bit the bullet and settled with Next.js. I chose it because it was the tool that I was deeply familiar with, and it was capable of merely serving as a static site generator.

And that's where I casually began to blog.

## Onto Astro

Next.js served me well for a while, and I'm sure many who use it will continue to benefit from it.

To get this out of the way, I genuinely did not care about the vendor lock-in for Next.js. I always thought that I'll switch when the vendor lock-in becomes too invasive.

That said, here are some things about Next.js itself that became too obnoxious for me to tolerate:

- lag from save to screen for HMR
- it's a full-stack framework with the ability to run stuff on the backend. I don't need that part; my blog is a static site with each page being an HTML page
- there was a noticeable lag in page-to-page transition
- too much magic and abstractions

So that settled it.

I had to look for something else.

I have considered [Hugo](https://gohugo.io/). In fact, it may have been more than 6 months ago that I was looking at migrating away from Next.js. Why didn't I choose Hugo? It's because taking a quick glance at the docs made it look like Hugo was strictly a template-only tool, and that would make things tricky for if I ever wanted to have features for more elaborate than mere static texts that don't have any JavaScript enhancements. And not to mention, I also had a lot of faith in Next.js to make sure that only the JavaScript that I needed is what was smartly loaded up for the page in question. I did not get that confidence with Hugo.

So I said "no thanks" to Hugo.

Fast forward to a few days, I really was considering moving to something else. I've been hearing about Astro for a while. It boasted support for React support.

I could have merely tried it out myself. But I took the word of [Allen Pike](https://allenpike.com/), who moved his site from Jekyll to Astro. That was more than enough evidence for me to make the switch.

So, I just went ahead and asked AI to translate my old site to Astro.

And it worked.

And here we are.
