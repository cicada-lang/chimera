[diary] 2022-11-21-the-evolution-of-ideas-of-the-whereabouts-project.md

[diary] 2022-11-21-adding-a-rewriting-system.md

# datatype

`Exps.Data` -- `type`, `kind` and `args`

# langs

implement langs/simple type checker in whereabout

read "a surprisingly competitive conditional operator"

- minikanrenizing the inference rules of pie

# programming by rewriting

Use rewrite rule based (dynamic) language
to implement lambda calculus.

- think about cellular automata

  - can be implemented by directed change with side-effect (mutation in place)?

- computation is directed change

- what is the difference between rewrite and pattern match on ADT?

  we do not have to write trivial matches?

Syntax:

```
rewrite data rule

rewrite data {
  rule
}

rule name {
  case pattern => pattern
  case pattern => pattern
}

rule name {
  combinators
}
```

Learn:

- https://en.wikipedia.org/wiki/Tree_traversal
- https://github.com/pangloss/pattern
- nanopass
- sussman new book

# as a in memory datacase

To use this language as web app backend.

[problem] how to handle large data?

Learn:

- CMU course

# optional output valid JSON

> It is ok to use more elaborated format here,
> because it is intended to be read by machine.

`Exps.ReifiedVar` -- valid JSON -- `_.0` -> `{ @type: ..., @kind: ..., name: ... }`

`Exps.ListCons` -- valid JSON -- `[_.0 | _.1]` -> `{ @type: ..., @kind: ..., head: ..., tail: ... }`

# the-reasoned-schemer

learn more about adder: https://en.wikipedia.org/wiki/Adder_(electronics)

08-just-a-bit-more.wa -- frame 35

09-thin-ice.wa

10-under-the-hood.wa

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
