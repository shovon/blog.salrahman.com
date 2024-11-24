---
title: "Monads in TypeScript"
summary: "Just another article that talks about monads in TypeScript"
publishDate: "2024-11-23T00:00:00-08:00"
author: "Sal Rahman"
---

I've been writing code that aims to be as axiomatic as possible. The goal is to focus on some basic functionality for one problem domain, and generalizing it across domains.

And this ultimately leads to paradigms, that allows for seamless transition from domain model to domain models. No façades needed. It's all just idioms that work practically everywhere.

And this is where monads come in.

## What are monads

Monads are a way to encapsulate a result of a computation. To extract it, a special "bind" operator is given a function to further transform that result and return another instance of a monad.

It may seem that I'm referring generically closure, and I could, but monads also have "laws" that they naturally adhere to. Not saying these laws can't be preserved using closures, but I am saying that the concept is not exclusive to it.

But before I even talk about monad laws, let's define a type that we can use to represent a monad.

### A type for monad

A type signature that I'm going to go with:

```typescript
type Monad<T> = {
	then: <V>(f: (value: T) => Monad<V>) => Monad<V>;
};
```

In the above case, the `then` method in an instance of a `Monad<T>` is our "bind" operator that we talked about earlier.

A lot of JavaScript programmers prefer to structure that `bind` operator as a method to an object, and that method is often either named `flatMap` or `then`.

And if you're wondering: is the `then` the same `then` in promises, then yes, that most certainly is. We'll see later why JavaScript promises are monads.

Moving on, perhaps to initialize a Monad, we'd define a function called `unit` to do so:

```typescript
const unit = <T>(value: T): Monad<T> => ({
	then: (f) => f(value);
})
```

To use it, it's simply a matter of invoking it like so:

```typescript
declare const m: Monad<number>;

const newMonad = m.then((value) => {
	// Do stuff with `value` here

	return unit(null);
});

// The value of `newMonad` should represent `Monad<null>`
```

## Monad laws

Now that we have defined a type for a monad, we can now use it to explore how it can adhere to the monad laws.

Monads have three laws that they must adhere to.

### Law 1: Left Identity

The expression:

```typescript
unit(x).then(f);
```

Is equivalent to just:

```typescript
f(x);
```

### Law 2: Right Identity

The expression:

```typescript
m.then(unit);
```

Is equivalent to just:

```typescript
m;
```

### Law 3: Associativity

The expression:

```typescript
m.then(f).then(g);
```

Is equivalent to

```typescript
m.then((x) => f(x).then(g));
```

This last rule is the most salient of them all.

## Consequence of law 3.

Because of law 3, we can nest monads as much as we want.

For example, we can expand the above to add yet another step:

```typescript
m.then((x) => f(x).then((x) => g(x).then((x) => h(x))));
```

And that above expression can also be written as:

```typescript
m.then(f).then(g).then(h);
```

You may think, the above looks ugly, and I agree it does, but there are cases where this can come in handy.

But first, let's look at Promises.

## Promises as monads

Promises are monads.

So the above expressions of `then` is very similar to how promises work.

But one of the earliest motivations for promises were created to mitigate "callback hell", that is result of a computation that will eventually be available asynchronously, will be made available through callbacks.

And, by the nature of a lot of problems, one asynchronous call will lead to another.

Here's an example:

```typescript
doSomething((err, s) => {
	if (err) {
		return;
	}
	doSomething((err, s) => {
		if (err) {
			return;
		}
	});
});
```

For a long time, people hated that.

That said, it can be useful to have some amount of tasteful nesting.

Recall that async/await is just an abstraction for chained nesting of promises.

For example, this code:

```typescript
async function fn() {
	await doSomething();
	await doSomething();
	await doSomething();
}
```

Is equivalent to:

```typescript
function fn() {
	return doSomething()
		.then(() => doSomething())
		.then(() => doSomething())
		.then(() => Promise.resolve(undefined));
}
```

Because of that, we can actually combine both async/await with promises.

This is what the code would look like:

```typescript
async function fn() {
	await doSomething().then(() => doSomething());
	await doSomething();
}
```

### How is this useful?

It's useful if you want the elegance of issuing a GET request without storing any intermediate variables

```typescript
function fn() {
	return fetch("https://example.com").then(async (response) =>
		parse(await response.json())
	);
}
```

This is compared to this:

```typescript
async function fn() {
	const response = await fetch("https://example.com");
	return parse(await response.json());
}
```

Neither is more or less legible than the other, but at the very least, in certain situation, if it is felt that it is best to avoid declaring any additional variables, then the promise approach (as opposed to the async/await approach) can be favourable for some people.

## More monad patterns

What's nice about monads (and interface segregation in general) is that monads don't care about implementation.

A programming pattern employed is to fail fast.

But, failing fast with runtime exception causes unnecessary crashes for a lot of applications.

A middle ground is to fail fast, preventing further execution, but just not crash.

This idea is not new.

Division by zero, for example is not allowed. With IEEE754 floating point numbers, division by zero yields (at least mathematically under most operations) an invalid quantity. But this will not cause a crash; simply that subsequent derivation of new values from such an inconsistent state will yield more inconsistent state.

We can achieve an effect quite similar to that with monads.

This is done by defining a "nothing monad".

It would work something like this.

```typescript
function nothing<T>(): Monad<T> {
	return {
		then: () => nothing(),
	};
}
```

And subsequent invocations of `then` will do nothing at all.

For example:

```typescript
function divide(a: number, b: number): Monad<number> {
	return {
		then: () => {
			if (b === 0) {
				return nothing<number>();
			}
			return unit(a / b);
		},
	};
}

divide(10, 0)
	.then((x) => {
		console.log("Should not be here");
		return x;
	})
	.then((x) => {
		console.log("Not here either");
		return x;
	});
```

## Conclusion

Monads have some powerful axioms that you can leverage to compose smaller blocks of computation. This effectively yields an inversion of control, away from the domain models that could have required full control over other domain objects, and instead allow other domain objects to pass the computation along to something else through chaining.

I hope this article provides something to think about.
