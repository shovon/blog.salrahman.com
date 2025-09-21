---
title: "Helpful topic to teach yourself lattice-based crypto: subgroups and Lagrange's theorem"
summary: "If we are motivated enough to find subdivisions of a group, we can subdivide them into subgroups. But we can't just do this blindly; there are certain discovered and implied of rules of math that makes arbitrary division of groups highly difficult. This article goes over some detailed overview of Lagrange's theorem, which should serve as a gateway towards other topics."
publishDate: "2025-09-20T15:38:00-08:00"
author: "Sal Rahman"
---

In another [post](https://blog.salrahman.com/posts/2025/09/groups), we have been introduced to groups.

The next question to ask is, can groups be subdivided? Yes, they most certainly can. Now, is that subdivision guaranteed to be a group themselves? Only under certain circumstances, and it is entirely on a case-by-case basis on certain sets. Not all groups can cleanly be subdivided into other groups.

But if they are, they most certainly serve as an interesting focus of study, which we will explore further in another post.

Now, when a group is subdivided, and if it happens to respect group laws, then such a subdivision is called a **subgroup**, and as a notation, we say that if $G$ is a group, let $H$ be a subgroup of $G$, we denote it as $H \leq G$.

Also, as a shorthand, when we're talking about the total number of elements in a group $G$, we call it the **order** of the group $G$, and the _order_ of group $G$ is denoted as $|G|$. This is especially meaningful for groups with a finite number of elements in $G$.

Because mathematicians went with the $\leq$ symbol, they also gave themselve the liberty of having $G$ be a subgroup of itself, and so $G \leq G$.

In fact, every group fundamentally has at the bare minimum the following two subgroups:

1. $G$
2. Trivial group, $\{e\}$

Where $e$ is the identity element (and recall that _every_ group _must_ have an identity element in order to even be considered a group).

When studying groups of finite order, when $H \leq G$, by Langrange's theorem $|G|$ is divisible by $|H|$.
