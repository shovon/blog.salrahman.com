---
title: "Helpful topic to teach yourself lattice-based crypto: cosets"
summary: "Before we even begin to talk about the fun stuff, it's time to talk about one more topic: cosets. What they are is what will be discussed further in this article."
publishDate: "2025-09-20T18:25:00-08:00"
---

I've talked about [subgroups](http://localhost:3001/posts/2025/09/subgroups-and-lagrange-theorem). The thing about studying subgroups, is that it may feel like we're dismissing all other subsets. The next logical question would be, why not study the rest of the sets?

And this is where cosets comes along. Although cosets don't cover _every_ subsets of a group, but, nevertheless, it still broadens the scope further than what subgroups ever did, and they can be used to build powerful primitives. Primitives that are used in many cryptographic studies.

So what is a coset?

A coset is what you get when you take a subgroup $H$ of a group $G$ and "shift" it by some _element_ of $G$.

Formally, if $G$ is a group and $H \leq G$ is a subgroup, as well as some operator $\cdot$, then cosets take on any of the following forms

- left coset of $H$ by $g \in G$: $g\cdot  H = \{g\cdot h | h \in H\}$
- right coset of $H$ by $g \in G$: $H \cdot g = \{h \cdot g | h \in H\}$

The key properties of cosets are:

- The set of all left cosets of $H \leq G$ forms a _partition_ of $G$, and right cosets of $H \leq G$ forms a _partition_ of $G$. Meaning that every element of $G$ belong to exactly one left coset and one right coset of $H$
- Every element of $G$ belongs to exactly one left coset and right coset of any subgroup $H$.
- All cosets of $H$ have the same number of elements as $H$ itself.
- Cosets are either equal or disjoint

## Example with Integers

Additions in integers $\mathbb{Z}$ forms a group. We can define a subgroup of $\mathbb{Z}$ as being nothing but multiples of a particular integer, using $n\mathbb{Z}$ (where $n \in \mathbb{Z}$), e.g. $5\mathbb{Z} = \{\ldots, -15, -10, -5, 0, 5, 10, 15, \ldots\}$.

Using additions as the "shift" operator, then the possible left cosets of $H = 5\mathbb{Z}$ gives:

- $0 + H = \{\ldots, -15, -10, -5, 0, 5, 10, 15, \ldots\}$
- $1 + H = \{\ldots, -14, -9, -4, 1, 6, 11, 16, \ldots\}$
- $2 + H = \{\ldots, -13, -8, -3, 2, 7, 12, 17, \ldots\}$
- $3 + H = \{\ldots, -12, -7, -2, 3, 8, 13, 18, \ldots\}$
- $4 + H = \{\ldots, -11, -6, -1, 4, 9, 14, 19, \ldots\}$

These cosets partition $\mathbb{Z}$ into 5 distinct sets, each containing all integers that give the same remainder when divided by 5. This is a fundamental concept that leads to modular arithmetic.

This is a powerful idea to be leveraged when discussing quotient groups.
