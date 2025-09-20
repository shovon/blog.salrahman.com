---
title: "What I value more than clean code"
summary: "Throughout my software engineering career, I'd hear this oft-repeated complaint from way too many people: code is hard to read. But should we always listen to this complaint, or should we just let them pass?"
publishDate: "2024-11-02T00:00:00-00:00"
author: "Sal Rahman"
---

Previously, I wrote about [code being ephemeral](https://blog.salrahman.com/posts/2024/11/ephemerality-of-code).

I have so much more thoughts about code cleanliness.

Especially considering that TypeScript is now ever growing in popularity, and it may one day outpace JavaScript in adoption.

As its popularity grows, the signals of it being a highly liked programming language also comes with the noise from those who dislike it.

I've heard many dissenting opinion from TypeScript haters, but one complaint that I hear alot (but not necessarily the biggest complaint) is that TypeScript makes code harder to read.

After all, JavaScript never introduced type annotations. For this reason, I have to admit, the language looks perhaps a lot less "cluttered" than typed languages such as Java, C#, and C++.

And among those who argue that JavaScript looks cleaner, in their eyes, TypeScript looks a lot messier.

If clean code is to be striving for, then surely TypeScript is a step backward.

And it's for that reason why clean code is not to be strived for, at least, by the metric of how "cluttered" things look. The concept of "appearance" is arbitrary. How do you define "appearance"?

## What's the ideal metric instead of clean code, then?

The ideal metric to look for is how easy is it to reason about the code.

## Axioms for easy to reason about code

Logic isn't enough.

After all, I've said this before, and I will say it again: bugs are not software that misbehave; it's something that someone wrote, and they are responsible to have deployed that faulty code. The execution environment just runs it. The execution environment doesn't have free will. It's logical. It's black and white.

This is where we need an axiom to determine what's considered "easy to reason about code".

So here's what I think will be a good set of guidelines:

1. determinism
2. number of state mutations; the lower the easier
3. number of heterogeneous parallel tasks; the lower the easier
4. API surface; the lower the easier
5. atomicity
