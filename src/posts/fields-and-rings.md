---
title: "Important topic to teach yourself lattice-based crypto: rings and fields"
summary: "Rings and fields are what lattice-based crypto works with. This article goes over what they are."
publishDate: "2025-09-13T20:38:00-08:00"
author: "Sal Rahman"
---

I briefly mentioned in an another [post](https://blog.salrahman.com/posts/2025/08/teach-yourself-lattice-crypto-by-learning-abstract-algebra) that lattice-based crypto builds on the idea of grid of points (a lattice), and selecting a secret point, and hiding it by adding a small, controlled amounts of "noise".

The imagery that may come to mind is something that can easily be derived by plotting real numbers on a grid (or something that may look like a grid). Indeed, that's precisely what so many videos online often use as analogies (such as [this one by chalk talk](https://www.youtube.com/watch?v=QDdOoYdb748)). Math with real numbers is often used as the basis, and integers are used to identify all exact spots on the grid.

But in lattice-based cryptography, integers aren't quite used as how you were taught in elementary school, and real numbers aren't used at all.

What's used, instead are rings (more specifically, [polynomial quotient rings](https://en.wikipedia.org/wiki/Polynomial_ring), but more on that in another blog post), and to work with those rings, we must work with fields (more spefically, [finite fields](https://en.wikipedia.org/wiki/Finite_field), but also will be a subject of a future blog post, or, feel free to read my post on ["elliptic curve cryptography"](https://blog.salrahman.com/posts/2024/09/elliptic-curve-cryptography-primer) which does touch on the topic of finite field math).

So what are rings?

A ring is a set that must satisfy the following properties:

- must be equipped with an addition ($+$) operation, thus forming an [abelian group](https://en.wikipedia.org/wiki/Abelian_group), which satisfies the following properties:
  - Closure: $a + b$ is a part of the field. (For example, adding two numbers together will always get another number.)
  - Associativity: $(a + b) + c = a + (b + c)$
  - Identity: there exists an element $O$ such that $a + O = a$
  - Inverses: for every $a$, there exists some $d$, such that $a + d = O$
  - Commutativity: $a + b = b + a$
- must be equipped with a multiplication ($\cdot$) operation, thus forming a [semigroup](https://en.wikipedia.org/wiki/Semigroup), which only has as a requirement that the operation be associative, similar to the associativity property of abelian groups
- must have a distributive property $a\cdot (b + c) = a\cdot b + a\cdot c$

When we add more properties to a semigroup, we start giving them different names. For example, a semigroup with commutative properties (similar to commutative properties of abelian groups), we call them a commutative semigroup.

When we have the multiplication operations of a ring form a commutative semigroup, we refer to it a "commutative ring".

Then when we give a semigroup the added property of an identity element, we call that semigroup a "monoid".

When a ring not only has a commutative semigroup, but that commutative semigroup is actually a monoid, we call that ring a "field".

And the defintition of a field will be an important concept in order to effectively reason about the math behind lattic-based crypto.
