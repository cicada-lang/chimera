change to depth-first search

# the-reasoned-schemer

08-just-a-bit-more.wa

learn more about adder: https://en.wikipedia.org/wiki/Adder_(electronics)

09-thin-ice.wa

10-under-the-hood.wa

# datatype

> ADT is import for implementing language expressions.

Maybe we should limit ourself to JSON only on output,
we still can support data constructors
and convert them back and forth to JSON.

- For example, with `family` and `kind`,
  maybe add `@` for such meta property,
  to avoid preserving property names.

# optimize

note about -- doing abstraction by defining relation costs a lot

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

This means doing abstraction by defining relation cost a lot.

How to optimize this?

# langs

implement langs/simple type checker in whereabout

read "a surprisingly competitive conditional operator"

- minikanrenizing the inference rules of pie

# clause-and-effect

08-maximum-of-a-list.wa -- need `<=`

09-searching-a-cyclic-graph.wa -- need `!=`

# later

Use logic programming to play with many-valued logic.

- Can `Trileans.mul` be defined by composition of other connectives (not, min, max)?
- Search how to construct truth function by composition of given set of connectives.
- How to search high-order things like connective in logic programming?

# [feature] reference data by URL in JSON #3

https://github.com/cicada-lang/whereabouts/issues/3

There are a lot of related semantic web ideas:

- https://en.wikipedia.org/wiki/JSON-LD

# [feature] improve solver.report #2

https://github.com/cicada-lang/whereabouts/issues/2

[maybe] print queues[].solution with prune and deepWalk
