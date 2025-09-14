---
title: "Important topic to teach yourself lattice-based crypto: rings and fields"
summary: "An article to discuss fields and rings, two primitives that lattice-based crypto impementations rely on."
publishDate: "2025-09-13T20:38:00-08:00"
author: "Sal Rahman"
---

I briefly mentioned in an another [post](https://blog.salrahman.com/posts/2025/08/teach-yourself-lattice-crypto-by-learning-abstract-algebra) that lattice-based crypto builds on the idea of grid of points (a lattice), and selecting a secret point, and then hiding it by adding some a small, controlled amounts of "noise".

The imagery that may come to mind is something that can easily be derived by plotting real numbers in a grid, or something that may look like a grid. Indeed, that's precisely what so many videos online often use as analogies (such as [this one by chalk talk](https://www.youtube.com/watch?v=QDdOoYdb748)). Math with real numbers is used as the basis, and integers to help plot out the grid actually works out.

But in lattice-based cryptography, real numbers, and integers aren't used, or at least not the whole integer set.

What's used, instead are rings (more specifically, [polynomial quotient rings](https://en.wikipedia.org/wiki/Polynomial_ring), but more on that in a future blog post), and to work with those rings, we must work with fields (more spefically, [finite fields](https://en.wikipedia.org/wiki/Finite_field), but also will be a subject of a future blog post, or, feel free to read my post on ["elliptic curve cryptography"](https://blog.salrahman.com/posts/2024/09/elliptic-curve-cryptography-primer) which does touch on the topic of finite field math).

So what are fields and rings?

A field is a set that is equipped two specific operations: addition ($+$), and multiplication $\cdot$, such that additions forms an [abelian group](https://en.wikipedia.org/wiki/Abelian_group). Which means, that:

- Closure: $a + b$ is a part of the field. (For example, adding two numbers together will always get another number.)
- Associativity: $(a + b) + c = a + (b + c)
- Identity: there exists an element $O$ such that $a + O = a$
- Inverses: For every $a$, there exists some $d$, such that $a + d = 0$
- Commutativity: $a + b = b + a$

On top of additions forming an abelian group, so do multiplicatons (except for some element $O$).

Finally, we have the distributive law, such that $a \cdot (b + c) = a \cdot b + a \cdot c.

Rings are like fields, but they get rid of one property, and it's that multiplications don't have inverses.

So in other words, all fields are rings, but not all rings are fields.

In a future blog post, I will go over how fields and rings are used in current implementations of lattice-based cryptography.
