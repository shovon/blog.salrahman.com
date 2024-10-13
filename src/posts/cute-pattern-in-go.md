---
title: "A cute Golang pattern"
summary: "So I've been doing this for a while. It could become an anti-pattern, or it could be the best thing ever"
publishDate: "2024-10-13"
author: "Sal Rahman"
---

Go has types. And types have methods.

Go has type aliasing. Aliased types lose the original methods, but introduces new ones.

Go may not support inheritance, but casting gets you pretty close to it.

Only problem is, unless the type aliases are in the same modules, unexposed fields remain unexposed.

Is that last point a problem? Not really.

Regardless, type aliasing can introduce some really cool semantics.

For example, if you wanted to implement a stack using slices, rather than wrap a slice inside a struct, just alias the slice!

```go
type Stack[T any] []T

func (s *Stack[T]) Push(value T) {
	*s = append(value)
}

func (s *Stack[T]) Pop() T {
	lastItem := s[len(s) - 1]
	*s = s[:-1]
	return lastItem
}
```

Then, if you wanted to map over all of the elements in the stack, well, a mapper can can come in handy.

```go
type Mapper[T any, V any] []T

func (s Mapper[T, V]) Map(cb func (value V) T) []T {
	arr := make([]T, len(s))
	for i, el := s {
		arr[i] = cb(i)
	}
	return arr
}
```

Then, putting it all together, you get:

```go
stack := Stack[int]{}

stack.Push(10)
stack.Push(20)
stack.Push(3)
stack.Pop()
stack.Push(30)

fmt.Printf("%#v\n", Mapper[int, int](stack).Map(func (v int) int {
	return v * 2
}))
```

What's the benefit of this? The one main benefit is that method calls require only a single parameter.

if you value the ability to pass in only a single parameter, then the pattern outlined should be helpful to you.
