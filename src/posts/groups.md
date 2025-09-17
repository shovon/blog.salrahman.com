---
title: "Helpful topic to teach yourself lattice-based crypto: groups"
summary: "We have integers. They form a group. What is a group will be discussed in this article"
publishDate: "2025-09-15T15:20:00-08:00"
author: "Sal Rahman"
---

In another [article](https://blog.salrahman.com/posts/2025/09/fields-and-rings) about rings and fields, I briefly touched on the topic of an abelian group.

As a quick refresher, in order for a set that happens to be equipped with a binary operation to even be considered an abelian group, it must satisfy the following properties:

- Closure: $a + b$ is a part of the field. (For example, adding two numbers together will always get another number.)
- Associativity: $(a + b) + c = a + (b + c)$
- Identity: there exists an element $O$ such that $a + O = a$
- Inverses: for every $a$, there exists some $d$, such that $a + d = O$
- Commutativity: $a + b = b + a$

But a generalization of an abelian group is just a group, and it merely involves removing the requirement that a set equipped with a binary operation to not guarantee to be commutative.

So in other words, get rid of the commutativity requirement, and we're left with a group.

Groups are an important topic to explore, because later on, we are going to be exploring the idea of a subgroup.
