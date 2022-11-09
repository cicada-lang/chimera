---
title: Depth-first search
---

For performance reason,
it is import to use [depth-first search](https://en.wikipedia.org/wiki/Depth-first_search)
instead of [breadth-first search](https://en.wikipedia.org/wiki/Breadth-first_search).

Prolog and minikanren both use depth-first search.

TODO I do not understand why yet.

# Example

With breadth-first search, doing abstraction
by defining relation will costs a lot.

For example

```
Add [[], y, y]
```

The above is much faster than the following:

```
Zero []

Add [x, y, y]
------------- {
  Zero x
}
```
