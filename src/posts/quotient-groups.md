---
title: "Helpful topic to teach yourself lattice-based crypto: normal subgroups and quotient groups"
summary: "We have integers. They form a group. Then we can sub-divide them even more to get subgroups and cosets. Once we know what cosets are, we can work with something called a quotient group."
publishDate: "2025-09-21T12:02:00-08:00"
author: "Sal Rahman"
---

In the [post](https://blog.salrahman.com/posts/2025/09/cosets) on cosets, I briefly touched on cosets in the integer $\mathbb{Z}$ group. If we are to pick a subgroup, defined as the multiple of some other element in the group, then we can pick a coset by simply shifting the subgroup.

As a refresher, we have left cosets on a subgroup $H = n\mathbb{Z}$ defined as $a + H = \{a + h | h \in H\}$, so as an example, for the cosets of $5\mathbb{Z}$, we get:

- $0 + H = \{\ldots, -15, -10, -5, 0, 5, 10, 15, \ldots\}$
- $1 + H = \{\ldots, -14, -9, -4, 1, 6, 11, 16, \ldots\}$
- $2 + H = \{\ldots, -13, -8, -3, 2, 7, 12, 17, \ldots\}$
- $3 + H = \{\ldots, -12, -7, -2, 3, 8, 13, 18, \ldots\}$
- $4 + H = \{\ldots, -11, -6, -1, 4, 9, 14, 19, \ldots\}$

Now, onto _right_ cosets of $5\mathbb{Z}$.

We pretty much get the same thing.

- $H + 0 = \{\ldots, -15, -10, -5, 0, 5, 10, 15, \ldots\}$
- $H + 1 = \{\ldots, -14, -9, -4, 1, 6, 11, 16, \ldots\}$
- $H + 2 = \{\ldots, -13, -8, -3, 2, 7, 12, 17, \ldots\}$
- $H + 3 = \{\ldots, -12, -7, -2, 3, 8, 13, 18, \ldots\}$
- $H + 4 = \{\ldots, -11, -6, -1, 4, 9, 14, 19, \ldots\}$

This is due to the commutative properties of integers.

## Normal subgroups

Leveraging the commutative properties of integers, we can study a more specific type of subgroup, called a normal subgroup.

As a refresher, a left coset of a subgroup $H$ is defined as $g\cdot H = \{ g\cdot h | h \in H \}$. The _right_ coset is is defined similarly, but as $H\cdot g = \{ h\cdot g | h \in H \}$.

But if a subgroup is able to have cosets that "cancel each other out" to derive the original subgroup, then the subgroup is considered to be a normal subgroup.

That is, for some normal subgroup $N \trianglelefteq G$:

$$
g\cdot N \cdot g^1 = N
$$

For all $g$ in $G$.

Thanks to the commutative properties of integers, every subgroup as a multiple of integers forms a normal subgroup.

### Subgroups, cosets of integers, and congruence classes

Notice how in previous examples, when we are to take some arbitrary coset $a + 5\mathbb{Z}$, then the examples always have it so that $a$ is $0$, $1$, $2$, $3$, or $4$?

What happens if we are to have $a = 5$? The coset $a + 5\mathbb{Z}$ is equivalent to $0 + 5\mathbb{Z}$. So it effectively "wraps around".

Same thing for $a = 6$. We get effectively get $1 + 5\mathbb{Z}$.

In fact, regardless of what we choose for $a$, the resulting coset will always be modulo $5$.

### Congruence classes

Previously we saw how $0 + 5\mathbb{Z}$ is equivalent to $5 + 5\mathbb{Z}$. In fact, it's also equivalent to $10 + 5\mathbb{Z}$. If anything, it's also equivalent to $5a + 5\mathbb${Z}$.

When two cosets are equivalent to each other, and when elements of belong to either coset, we say that the element is in the congruence class of a specific coset.

For example, $12$ is in the congruence class of $2 + 5\mathbb{Z}$.

#### Modular arithmetics

If we are to take an integer $a$, and attempt to "divide" it by another integer $b$ that can't divide $a$, then we attempt to "fit" be some $c$ number of times, but we are left with a remainder $r$.

Let's take an example, $13 / 5$ leaves us with the quotient $2$, and the remainder $3$.

In the world of modular arithmetics, we're highly intersted with what remainders are left during division.

So much so, we created a special operator for this study, and we use the symbol $\text{mod}$.

Let's take our $13 / 5$ example, where we not only get the quotient $2$, but also the remainder $3$. With the $\text{mod}$ operator, we are saying that we'd take that same division of $13 / 5$, but only care about the remainder, and it would look like so $13 \text{ mod } 5 = 2$.

#### Modular arithmetic and congruence classes

### Adding two cosets of $n\mathbb{Z}$

Fun fact: in the case of $\mathbb{Z}$, let's take the subgroup $5\mathbb{Z}$, and adding an element from one coset, and adding an element from another coset, we always get an element

Let's take $2 + n\mathbb{Z}$ and $3 + n\mathbb{Z}$. Adding them together we get

$$
(2 + n\mathbb{Z}) + (3 + n\mathbb{Z})$
$$
