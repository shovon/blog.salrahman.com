---
title: "A simple proof of the Cayley-Bacharach theorem"
summary: "A lot of proofs of the Cayley-Bacharach theorem posted online often require some extensive algebraic geometry background. This blog post hopefully highlights certain properties of linear combinations in hopes of providing a rock-solid proof"
publishDate: "2024-12-19T00:00:00-08:00"
author: "Sal Rahman"
---

The Cayley-Bacharach states:

> If two cubics $C_1$ and $C_2$ intersect at 9 points, and a third cubic $C_3$ passes through 8 of the 9th point, then it will also pass through the 9th intersection point, as well.

## Proof

We have three cubics, $C_1$, $C_2$, and $C_3$.

By Bézout's theorem, we will have $C_1$ and $C_2$ intersect on 9 points.

Let's have it so that the third curve $C_3$ passes through 8 of the 9 points.

This means that we are imposing 8 linear conditions on the third curve. Because of this, the space of cubics that pass through just about _any_ 9th point is expressible as a solution to a system of 8 cubic equations. This will thus leave us with a linear combination of two cubics, forming a space of cubics that pass through those 8 points, and an arbitrary 9th point.

Same can be said of both $C_1$ and $C_2$, and thus both $C_1$ and $C_2$ is expressible by curves that pass through those 8 points. This means that $C_3$ is also expressible as a linear combination of $C_1$ and $C_2$.

Because both $C_1$ and $C_2$ share the same 9 vanishing points, and that $C_3$ is expressible as a linear combination of $C_1$ and $C_2$, we immediately know that the $C_3$ will also share those same 9 vanishing points.

This proof has been inspired by one written by Matthias Volk, over at his blog post "[Cayley-Bacharach theorem](https://relint.de/cayley-bacharach.html)".
