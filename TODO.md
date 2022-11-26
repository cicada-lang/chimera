# programming by rewriting

`Stmts.RewriteRule`
`Stmts.Rewrite`

# type system

[maybe] using predicate (relation) as type to do assertion

- type can be used as meta variable's constraint

built-in globals -- `String` predicate

- need to generate all `String`

built-in globals -- `Number` predicate

- need to generate all `Number`

# std

built-in globals -- `String` to `Array`

# langs

[langs] `langs/lambda` implement lambda calculus in whereabouts -- without closure

[langs] `langs/forth`

- What are the small step and big step operational semantics of forth-like language?

[langs] `langs/pie` read "a surprisingly competitive conditional operator"

- minikanrenizing the inference rules of pie

# learn

[learn] logic programming's correspondence to first order logic

- using whereabouts to implement languages to test FFI to js

  - parsing
  - formating

# deduction

design syntax for deduction

# quotient

> How to implement quotient in logic programming language?

https://en.wikipedia.org/wiki/Quotient_by_an_equivalence_relation

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

`Exps.ArrayCons` -- valid JSON -- `[_.0 | _.1]` -> `{ @type: ..., @kind: ..., head: ..., tail: ... }`

# the-reasoned-schemer

learn more about adder: https://en.wikipedia.org/wiki/Adder_(electronics)

08-just-a-bit-more.wa -- frame 35

09-thin-ice.wa

10-under-the-hood.wa

# clause-and-effect

08-maximum-of-a-list.wa -- need `<=`

09-searching-a-cyclic-graph.wa -- need `!=`

# later

[maybe] [later] restrict the parser -- relation name must be in `CamelCase`

# maybe

[maybe] `Exps.Data` -- syntax -- support named args

- `Type::cons { ... }`

[maybe] print `queues[].solution` with prune and `deepWalk`

[maybe] use the named clause during debug -- only print named clause

- How to design a good debugger for logic programming language?

  - To understand this, we first need to write a lot of logic programs.
