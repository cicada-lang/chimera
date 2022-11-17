# datatype

> ADT is important for implementing language expressions.

We should limit ourself to JSON only on output,
we still can support data constructors
and convert them back and forth to JSON.

[note] about unify the style of json ADT

- target host languages:

  - typescript
  - whereabouts
  - cicada

- learn from json semantic web.

  - https://en.wikipedia.org/wiki/JSON-LD

- For example, with `@type` and `@kind`.

  Adding `@` for such meta property
  to avoid preserving property names.

- learn naming from: https://en.wikipedia.org/wiki/Algebraic_data_type

# the-reasoned-schemer

learn more about adder: https://en.wikipedia.org/wiki/Adder_(electronics)

08-just-a-bit-more.wa -- frame 35

09-thin-ice.wa

10-under-the-hood.wa

# [constraint] valid json

> Currently one of our design constraint is that
> the query output should be valid JSON.

The consequence is that the output are very noisy.

Thinking about the use of `["_.0", { "...": "_.1" }]`,
instead of `["_.0", ..."_.1"]`,
maybe we should not limit ourself to JSON at all.

Maybe we should also view `_.n` as special syntax for reified variables,
instead of using string -- `"_.n"`.

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

[maybe] use the named clause during debug -- only print named clause
