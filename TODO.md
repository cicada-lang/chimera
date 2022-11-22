# langs

[std/langs] `langs/lambda` implement lambda calculus in whereabouts

[std/langs] `langs/simple` implement type checker of simple typed lambda calculus in whereabouts

[std/langs] `langs/pie` read "a surprisingly competitive conditional operator"

- minikanrenizing the inference rules of pie

# deduction

design syntax for deduction

# programming by rewriting

`Stmts.RewriteRule`
`Stmts.Rewrite`

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

[later] restrict the parser -- relation name must be in `CamelCase`

[later] `formatArg` -- `indent` for long `args`

# std

[std] update `std/nat`

[std] Use logic programming to play with many-valued logic.

- Can `Trileans.mul` be defined by composition of other connectives (not, min, max)?
- Search how to construct truth function by composition of given set of connectives.
- How to search high-order things like connective in logic programming?

# maybe

[maybe] `Exps.Data` -- syntax -- support named args

- `Type::cons { ... }`

[maybe] print `queues[].solution` with prune and `deepWalk`

[maybe] use the named clause during debug -- only print named clause

- How to design a good debugger for logic programming language?

  - To understand this, we first need to write a lot of logic programs.
