---
title: "Important topic to teach yourself lattice-based crypto: rings and fields"
summary: "Rings and fields are what lattice-based crypto works with. This article goes over what they are."
publishDate: "2025-09-13T20:38:00-08:00"
author: "Sal Rahman"
---

I briefly mentioned in an another [post](https://blog.salrahman.com/posts/2025/08/teach-yourself-lattice-crypto-by-learning-abstract-algebra) that lattice-based crypto builds on the idea of grid of points (a lattice), and selecting a secret point, and hiding it by adding a small, controlled amounts of "noise".

The imagery that may come to mind is something that can easily be derived by plotting real numbers on a grid (or something that may look like a grid). Indeed, that's precisely what so many videos online often use as analogies (such as [this one by chalk talk](https://www.youtube.com/watch?v=QDdOoYdb748)). Math with real numbers is often used as the basis, and integers are used to identify all exact spots on the grid.

But in lattice-based cryptography, integers aren't quite used as how you were taught in elementary school, and real numbers aren't used at all.

What's used, instead are rings (more specifically, [polynomial quotient rings](https://en.wikipedia.org/wiki/Polynomial_ring), but more on that in a future blog post), and to work with those rings, we must work with fields (more spefically, [finite fields](https://en.wikipedia.org/wiki/Finite_field), but also will be a subject of a future blog post, or, feel free to read my post on ["elliptic curve cryptography"](https://blog.salrahman.com/posts/2024/09/elliptic-curve-cryptography-primer) which does touch on the topic of finite field math).

So what are fields and rings?

A field is a set that is equipped with two specific operations: addition ($+$), and multiplication ($\cdot$), such that additions forms an [abelian group](https://en.wikipedia.org/wiki/Abelian_group). Which means that we have:

- Closure: $a + b$ is a part of the field. (For example, adding two numbers together will always get another number.)
- Associativity: $(a + b) + c = a + (b + c)$
- Identity: there exists an element $O$ such that $a + O = a$
- Inverses: for every $a$, there exists some $d$, such that $a + d = O$
- Commutativity: $a + b = b + a$

On top of additions forming an abelian group, multiplicatons do so as well (except for some element $O$).

Fields also we have the distributive law, such that $a \cdot (b + c) = a \cdot b + a \cdot c$.

And what are rings? Rings are like fields, but they lack one property, and it's that multiplications don't have inverses.

So in other words, all fields are rings, but not all rings are fields.

In a future blog post, I will go over how fields and rings are used in current implementations of lattice-based cryptography.
