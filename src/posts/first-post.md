---
title: "First Post"
summary: "I'm going to (re)start blogging (again)."
publishDate: "2024-07-28"
author: "Sal Rahman"
---

For the longest time, I've been active on private Discord servers, posting microblog posts over to my <a href="https://en.wikipedia.org/wiki/Fediverse" target="_blank">Fediverse</a> <a href="https://techhub.social/@manlycoffee" target="_blank">account</a>, and any blog posts that I'd write online, I'd have it be hosted on <a href="https://dev.to/manlycoffee" target="_blank">dev.to</a>.

I never really had a place to blog that I'd call my own.

Until now.

This is the new place where I'd post longer-form articles online. It's pretty much mine, with the caveat being the infrasture that these posts will be hosted on will likely not be something that I self-host <a href="https://en.wikipedia.org/wiki/On-premises_software" target="_blank">on-premise</a>. I'd likely rely on cloud providers, such as <a href="https://netlify.com" target="_blank">Netlify</a> or <a href="https://vercel.com" target="_blank">Vercel</a>.

At the time of writing this post, this blog is powered by <a href="https://nextjs.org/" target="_blank">Next.js</a>, a <a href="https://github.com/leanhanc/battle-of-the-meta-frameworks" target="_blank">metaframework</a> for <a href="https://react.dev/" target="_blank">React</a> to allow to <a href="https://www.smashingmagazine.com/2020/07/differences-static-generated-sites-server-side-rendered-apps/" target="_blank">statically render pages</a> at <a href="https://en.wikipedia.org/wiki/Compile_time" target="_blank">build time</a>, and serve those out to users. If I were to have use used React naively, without any metaframework that allows for build-time rendering, then there wouldn't have been any rendered pages, and instead, browsers would simply download a blank HTML page (e.g. nothing in the page), and a script tag to grab some scripts, which _those_ will instruct the browser how to render the page.

Too slow, and those with JavaScript disabled on their browser will not be able to see the page.

This is different: the pages are pre-populated with content, as you can see here.

## A bit about me

I'm Sal, I've been writing software since 2012. I've been fortunate enough to have gained a wealth of experience, from consulting for individuals, to working for fortune 500s. Through this blog, I hope to be able to share what I learn, and I hope to open things up to receive constructive feedback from people.

Looking forward to hearing what readers have to say about what I write.
