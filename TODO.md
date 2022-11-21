# datatype

`Exps.Data` -- `unify` -- by first converting to JSON

`Exps.Data` -- `solutionDeepWalk`
`Exps.Data` -- `solutionReify`

test my-list.wa

# langs

implement `langs/simple` type checker in whereabouts

read "a surprisingly competitive conditional operator"

- minikanrenizing the inference rules of pie

# programming by rewriting

# as a in memory database

To use this language as web app backend.

[problem] how to handle large data?

Learn:

- CMU course

[feature] reference data by URL in JSON #3

There are a lot of related semantic web ideas:

- https://en.wikipedia.org/wiki/JSON-LD

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

[later] `formatArg` -- `indent` for long `args`

[maybe] `Exps.Data` -- syntax -- support named args

- `Type::cons { ... }`

Use logic programming to play with many-valued logic.

- Can `Trileans.mul` be defined by composition of other connectives (not, min, max)?
- Search how to construct truth function by composition of given set of connectives.
- How to search high-order things like connective in logic programming?

# [feature] improve solver.report #2

[maybe] print queues[].solution with prune and deepWalk

[maybe] use the named clause during debug -- only print named clause
