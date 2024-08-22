---
title: "Primer on Elliptic Curve Cryptography"
summary: "Just dumbing down the ideas behind elliptic curvec cryptography so that a highschooler can understand"
# publishDate: "2024-08-22"
author: "Sal Rahman"
---

_I'm going to be giving a talk that gives a quick primer on elliptic curve cryptography. But I thought I'd do a writeup on it before the presentation so that people who want to read up on it before-hand can do so. That, and also writing things down actually fleshes out what I'm about to talk about._

When building information systems, you're either storing information, or sending it somewhere else. But for every interaction you have with information, malicious actors will always be attempting to either steal or sabbotage information, impersonate someone, or fraudulently deny that they have ever committed a transaction.

Our goal is to thwart these malicious actors, and the predominant strategy for this has been to have intended actors be very easily able to disseminate and store information, while making it difficult for malicious actors to cause harm.

## The Discrete Log Problem (or rather the Elliptic Curve Discrete Log Problem)

There are many strategies for difficulty, but with elliptic curves (in finite fields of prime order, which is a term we will discuss a bit later), the difficulty has been brought on by the difficulty in solving the discrete log problem.

That is, we have some function that takes two parameters of a particular group (two points on an elliptic curve), and returns another element of that group. We repeatedly apply that function to a single element of that group, for a very large number of times. The result of that function invocation will be public information used to identify an actor, along with the element that the function was applied on. Meanwhile, the very large number of times where the function was applied is private information that an actor will have determined before generating that public information. Everyone knows that public information—the result of the function invocations, and the element in which the invocation was applied to—but only the actor knows how many times they've called that function.

To put it in math terms, let's define some function $\text{operate}$, which takes two parameters $P$ and $Q$ of a group. What we're doing is given some publicly-known element $G$, we're invoking it with some $n$ number of times:

$$
\underbrace{\text{operate}(G, \text{operate}(G, \text{operate}(G, \ldots)))}_{n} = R
$$

The element $G$ along with the result $R$ is public information, but $n$ is private information that should never be shared.

The basis of the elliptic curve discrete log problem is that even if we are publicly given the element $G$, the result $R$, and the underlying algorithm behind the hypothetical $\text{operate}$ function, it should still be absolutely impossible to recover $n$.

### Some math notations, and an introduction to Abelian groups

Earlier, I introduced the $\text{operate}$ function. But writing it out gets a little wordy.

Mathematicians have instead opted for—rather confusingly—the infix $+$ operator to express a 2-parameter operation on group elements.

That is, given two elements $P$ and $Q$ of a group, the expressed $\text{operate}(P, Q)$ operation is instead expressed as:

$$
P + Q = R
$$

Yes, the $+$ symbol is used for something that may not be intuitively an addition.

It could be argued that there is a good reason for this.

For one, even with the abbreviation, repeating the expression of several "additions", $n$-number of times gets repetitive:

$$
\underbrace{G + G + G + \ldots + G}_{n} = R
$$

So, we can just express the above as a scalar multiplication of G by the quantity n:

$$
\underbrace{G + G + G + \ldots + G}_{n} = n\cdot G = nG = R
$$

The $nG$ expression is certainly a lot more compact than $\underbrace{G + G + G + \ldots + G}_{n}$.

So in short, we settled with:

$$
nG = R
$$

Other arguments behind why is that a lot of cryptographic primitives form an Abelian group.

That is, they have the following properties:

- **Commutativity**: the expression $A + B$ can equally be expressed as $B + A$
- **Associativity**: regardless of if you compute $(A + B) + C$ or $A + (B + C)$, the results will be the same
- **Existence of an identity element**: given some element $I$, we can compute $A + I = A$
- **Existence of an inverse**: that is, not only do we have some $A$, but also some $A'$, such that $A + A' = I$. And in the case of Abelian groups that attempt to allude to the concept of an "addition", rather than expression $A + A'$, we'd express $A - A = I$, analogous to a subtraction.

In the context of elliptic curve group operations (called "addition" going forward), the identity element isn't left to some variable name of $I$, of course. That will be discussed further later.

## Elliptic curve "addition"

So earlier I introduced the $\text{operate}$ function that takes two elements from a group, and returns another element from a group. We then abbreviated it to the $+$.

But what does it mean to operate on two elements from a group to return an element of a group, and how does it relate to elliptic curves?

In the context of elliptic curves, we have a curve that looks like the one below:

We pick two points $P$ and $Q$ on that curve, and we draw a straight line that crosses the two points. As long as the two points aren't vertical reflections of each other, that line will actually end up crossing a third point $R'$ on the curve.

We call it $R'$ and not just $R$ is because $R'$ is not our result. Fortunately, finding $R$ from $R'$ is very easy: it's merely the result of vertically reflecting $R'$ to find $R$.

And if $P$ and $Q$ are equal to eachother (e.g. $P = Q$), then finding the result involves imagining that you are drawing a line that crosses two points that are negligibly different from each other, thus forming what is known by mathematicians a "tangent" line. And that tangent line will also cross another point, which is our $R'$, which we then flip veritcally to find $R$.

### Relating back to Abelian groups

#### Associativity

As we can see, drawing a straight line that crosses between two points $P$ and $Q$ also crosses a third point on the curve, as long as $P$ and $Q$ aren't vertical reflections of each other. This is true regardless of from which direction you decided to draw that line. Did you decide to have that line cross $P$ first, or $Q$ first? The result is the same! The order doesn't matter!

#### Commutativity

What's cool about this is that we can also apply this operation with three points $P$, $Q$, and $S$.

Regardless of if you start by attempting to find some $R_1$ by first drawing a line through $P$ and $Q$, or through $Q$ and $S$, after you've drawn a line through $R_1$ and the remaining point where you didn't "add" yet, you'll still get the same $R_2$.

#### Identity element

This is where Mathematicians used their imagination.

Remember how I kept emphasizing that $P$ and $Q$ shouldn't be vertical reflections of each other?

What happens if they are?

The resulting line will never intersect anywhere on the curve, and go on for infinity!

But rather than dismissing this behaviour as being merely "undefined", instead, mathematicians opted to call this "forever point" as the "point at infinity", denoted as $\infty$.

It may sound blasphemous, but there is an important opportunity for us here.

For one, we can treat this as the "identity element".

Imagine if $P$ and $Q$ were indeed vertical reflections of each other.

Then computing $P + Q$ will give us $\infty$.

How can we use the fact that there exists some $\infty$ that we can play around with?

Well, imagine if we have $P$, and draw a perfectly vertical line that crosses $P$.

It will of course go on for $\infty$. We can think of this as $P + \infty$. Now, the thing about crossing $P$ and $\infty$, it will also cross some point that is a reflection of $P$.

And remember the operation: the idea is, once we've crossed a third point, we reflect vertically!

This means that crossing $P$ and $\infty$ will cross the vertical reflection of $P$, which we will call $P'$, and doing so will require flipping vertically, thus giving us $P$ again.

This means that $P + \infty$ yield $P$, or $P + \infty = P$.

#### Existence of an inverse

I've already mentioned earlier that if $P$ and $Q$ were vertical reflections of each other, then we get some point at infinity denoted as $\infty$. In other words $P + Q = \infty$, only if $P$ and $Q$ are vertical reflections of each other.

But if $P + \infty = P$, is there a $P - P = \infty$?

Yes!

If $P$ is a vertical reflection of $Q$, then this merely means that $Q$ could simply be denoted as $-P$.

In other words, "negation" is merely the act of vertically reflecting $P$.

## Drawing lines across elliptic curves

I introduced the curve, that we call the "elliptic curve". But of course, it's difficult to draw such a curve perfectly. Not to mention, computers can't work with them.

Instead, they can work with math.

They have support for additions, subtractions, exponentiation, etc.

So let's use good old math for this.

Elliptic curves can be expressed as the equation:

$$
y^2 = x^3 + ax + b
$$

Of course $x$ and $y$ are variables that relate to eachother, but $a$ and $b$ are constants that we pick right before we interact with others.

Regardless, now our problem is, if we happened to have picked two points $P$ and $Q$ on a curve, how would we find the $x$-coordinate of the third point, and the corresponding $y$-coordinate?

Here is where will do some derivations for the math to recover those values.

### Finding the x-coordinate of the third point

Let's define $P = (x_1, y_1)$ as a point on the curve and $Q = (x_2, y_2)$ on that same curve.

We'll first need to define the equation of the line that is secant to $P$ and $Q$, and it will be this:

$$
y = mx+d
$$

Where we can think of $m$ as the slope of the line, and $d$ is where the line intercepts at the y-coordinate, when $x = 0$, or simply known as the "$y$-intercept".

Our $m$ isn't just any value; it's dependent on the positions of $P$ and $Q$, for $P \neq Q$, and $Q \neq -P$. To compute the slope, it's merely the "rise over the run", or rather the rate of change of $y$, with respect to $x$. In other words, it's a ratio, and the ratio is computed by calculating the differences in the y coordinates with respect to the x-coordinates.

So:

$$
m = \frac{y_2 - y_1}{x_2 - x1}
$$

To find the $y$-intercept $d$, we'd simply sample a point on the equation of the line, and solve for $d$. We'll just take the coordinates from $P$.

$$
d = y_1 - mx_1
$$

OK, this is nice to know and all, but what can we do with this?

Well, we need to find the third point on the curve.

Can we use algebra for this?

We can see that both the equation of the line, and the equation of the curve have a $y$-coordinate.

How about we do a substitution? After all, the points on the line intersect with the points of the curve. Does this mean that both the line and the curve will intersect at all three points? Let's try:

$$
y^2 = x^3 + ax + b \Rightarrow (mx+d)^2 = x^3 + ax + b
$$

We can see that the left-hand side is quadratic with respect to x, and the right-hand side is cubic. Subtracting a quadratic from a cubic will still yield a cubic equation.

Let's do that.

$$
(mx+d)^2 = x^3 + ax + b \Rightarrow
$$

Now here is the interesting thing: a cubic equation can often have three roots.

That is, for some constant roots $r_1$, $r_2$, or $r_3$, if $x = r_1$ or $x = r_2$ or $x = r_3$, then some cubic expression $a_3x^3 + a_2x^2 + a_1x + a_0$ will be $0$.

We can infer this from factorizing the cubic expression like so:

$$
\begin{equation}
\begin{split}
a_3x^3 + a_2x^2 + a_1x + a_0 & = a_3(x^3 + \frac{a_2}{a_3}x^2 + \frac{a_1}{a_3}x + \frac{a_0}{a_3}) \\
                             & = a_3(x-r_1)(x-r_2)(x-r_3)
\end{split}
\end{equation}
$$

Expanding the right-hand side of the above equation should yield:

$$
a_3x^3 - a_3(r_1 + r_2 + r_3)x^2 + a_3(r_1r_2 + r_1r_3 + r_2r_3)x - a_3r_1r_2r_3
$$

OK, now we have a bunch of
