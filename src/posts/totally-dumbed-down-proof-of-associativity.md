---
title: "A simple proof of the Cayley-Bacharach theorem"
summary: "A lot of proofs of the Cayley-Bacharach theorem posted online often require some extensive algebraic geometry background. This blog post hopefully highlights certain properties of linear combinations in hopes of providing a rock-solid proof"
publishDate: "2024-12-19T00:00:00-08:00"
author: "Sal Rahman"
---

The Cayley-Bacharach theorem states:

> If two cubics $C_1$ and $C_2$ intersect at 9 points, and a third cubic $C_3$ passes through 8 of the 9th point, then it will also pass through the 9th intersection point, as well.

## Proof

We have three cubics, $C_1$, $C_2$, and $C_3$.

Because $C_1$ and $C_2$ are degree $3$ curves, by Bézout's theorem, $C_1$ and $C_2$ will intersect on at most $3 \cdot 3 = 9$ points. Another way to say this is that $C_1$ and $C_2$ will share $9$ common vanishing points. Also worded alternatively, the zero set of both $C_1$ and $C_2$ will be those 9 points. Also note that the linear combination of $C_1$ and $C_2$ forms a pencil that will span the space of all cubics that pass through those 9 points.

Let's have it so that the third cubic $C_3$ passes through 8 of the 9 points of the intersections of $C_1$ and $C_2$.

This means that the space of cubics that pass through those 8 points—for which $C_1$, $C_2$, and $C_3$ will be a part of—imposes 8 linear condition. Because of this, the space of cubics that pass through these 8 points is expressible as a system of 8 cubic equations. Solving for it will thus leave us with a linear combination of two cubics, giving us again a pencil of cubics that pass through those 8 points. And again, the span of which includes $C_1$, $C_2$, and $C_3$.

This means that $C_3$ can be expressible as a linear combination of $C_1$ and $C_2$.

By Bézout's theorem, not only the span will share those 8 vanishing points, but will also all 9 vanishing points.

This proof has been inspired by one written by Matthias Volk, over at his blog post "[Cayley-Bacharach theorem](https://relint.de/cayley-bacharach.html)".
