---
title: "Sharing what I learned about limits"
summary: "Sharing how I finally understood limits in mathematics"
publishDate: "2024-08-11T00:00:00-07:00"
author: "Sal Rahman"
---

So, I was trying to employ the Feynman technique to learn about differentiation of a continuous function, or better yet, be capable of teaching it (so this is more of an inverse of the Feynman technique, I guess?).

For context, when a lay-person looks up how to differentiate a function, they are presented with a bunch of math symbols, confusing them, and ultmately having them give up.

So, I basically went out on a mission to understand differentiation, but I was stuck on the definition of a limit.

I honestly felt stupid the entire time, but I was happy to find out that it is a common problem: people struggle to understand it. Someone even said that people don't understand limits until they get to grad school.

Now that's good to know.

But that doesn't solve the problem.

Good thing is, I think I figured it out, and this article will share what I learned.

## The limit

One aspect of the limit that had me stuck was the misconception that one function can equal to another function, no matter how much it intuitively seems that one function does not equal another.

In college, for example, I'd watch instructors confidently state $\lim_{x\rightarrow 0} \frac{x^2}{x} = 0$, which gave me the incorrect perception that $\frac{0^2}{0} = 0$.

But that's not what that limit expression is saying at all.

What that limit operator in $\lim_{x\rightarrow a} f(x)$ is saying is that it is giving you something that is really close to the expression $f(x)$, as $x$ aproaches $a$, that there isn't really much else that can come close to it. And that thing that it is giving you is called the limit.

## Sounds like nonesense

So it's good to know that the concept of attempting to find the limit isn't saying that a particular expression exactly equals another. Instead, it's saying that as a variable $x$ comes close to something, the expression $f(x)$ comes close to something else—which is known as the limit.

This is all well and good.

But for many of you unfamiliar with calculus, you may be reading this and thinking that this sounds nonsense.

The good news is, you aren't alone.

When calculus was first introduced independently by Isaac Newton and Gotfriend Leibniz, people did express skepticism of their approach to differentiation. Yes, mathematicians still did adopt those discoveries, but there were still doubts at that time.

This is where Karl Weierstrass formally gave a definition of a limit, removing all uncertainty…

Except, fast forward today, and many of us still don't quite understand the most accepted definition of a limit, until much later in life.

## Definition of a limit

So what is that definition of a limit that everyone seems to be so confused about?

It goes like this:

> $f(x)$ approaches the limit $L$, as $x$ approaches $a$, if and only if for every $\epsilon > 0$, there exists a $\delta >  0$ such that if $x$ is within $\delta$ distance away from $a$, then it must follow that $f(x)$ is within $\epsilon$ distance from $L$

To put it in math terms, the above would translate into:

$$
\lim_{x \rightarrow a} f(x) = L \Longleftrightarrow \forall_{\epsilon > 0}\exists_{\delta > 0} 0 < |x - a| < \epsilon \rightarrow |f(x) - L| < \delta
$$

So what that is effectively saying is that if you are to have $x$ freely move within $\delta$ distance from $a$, then this act of moving around should have $f(x)$ move no further than $\epsilon$ distance from $L$.

Of course, we're only asking for _one_ $\delta$ for each $\epsilon$, so it doesn't make sense to choose a $\delta$ first. Instead, we iterate across all possible $\epsilon$, and we search for a $\delta$ that will satisfy the implication. If no such $\delta$ is found, vacuously, the existential quantifier that one $\delta$ must exist fails, and a candidate limit is not the limit of the expression.

## Example

For people who asked "how come $\lim_{x\rightarrow a}\frac{x^2}{x}$ is $a$ and not something like $a^2$ ?", that is an excellent question.

If we are to follow the definition of the limit to the letter, we can set $a = 4$ as an example, which has $|x - a^2| < \epsilon \rightarrow |x - 4^2| < \epsilon  \rightarrow |x - 16| < \epsilon$ as the conclusion. Regardless of what $\delta$ we pick for some $\epsilon$, there will always be some value of $x$ that will fail to satisfy the conclusion, thus making the entire implication false. And remember, we need to satisfy not just some $\epsilon$, but absolutly none of the $\epsilon$ should fail to have found a $\delta$.

Thus

$$
\lim_{x\rightarrow a}\frac{x^2}{x} \neq a^2
$$

## Conclusion

Mathematicians are fairly rigourous. For that they will never allow either side of an equation not equal to eachother.

That said, there are some quantities that would be interesting to study not necessarily equal to that point, but near it. And this study is the study of limit.

This is where the definition of a limit comes in, which should help elliminate ambiguities of what can and cannot be near a certain point.

Hopefully you have a better intuition now for what it is the study of limits involves.
