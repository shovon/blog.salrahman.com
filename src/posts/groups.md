---
title: "Helpful topic to teach yourself lattice-based crypto: groups"
summary: "We have integers. They form a group. What is a group will be discussed in this article"
publishDate: "2025-09-15T15:20:00-08:00"
author: "Sal Rahman"
---

In another [article](https://blog.salrahman.com/posts/2025/09/fields-and-rings), I talked about rings and fields.

But I think that I got ahead of myself.

Recall fields add _more_ restrictions in addition to rings to have some set satisfy the definition of what a field is.

But to flip things around to give a better perspective, it's worth to think of rings as a generalization of a field.

If rings are a generalization of fields, do rings themselves generalize to something else?

Yes!

That's precisely what groups are.

While both fields and rings have multiplicative groups, groups generalize to only have addition groups without the multiplications.

Although at the time of writing this, I'm not sure how groups—as a generlization—can be helpful for understanding lattice-based cryptography, there is a motivation to learn groups.

Learning groups allow us to start thinking about groups in other ways, such as subgroups, cosets, and quotient groups, which will be a topic of a future blog post. Especially quotient groups, the latter of which is a good gateway into quotient _rings_, which is a generalization of one of the tools used in modern implementations of lattice-based cryptography, such ML-KEM.
