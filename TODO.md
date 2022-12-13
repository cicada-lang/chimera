# type constraint

`Apply` -- has `value` instead of `relation`

`Number` and `String` as globals type constraint value

add test `constraints/primitive-types.wa`

`Apply` -- support `TypeConstraint` -- extending `solution`

[type constraint] implementing subsumption between disequality constraints

[type constraint] verifying constraints' validity

[type constraint] reification

# finite-domain constraint programming

[read] ckanren-minikanren-with-constraints.pdf

[books/clause-and-effect] 08-maximum-of-a-list.wa -- need `<=`

[finite-domain] solve some puzzles about finite-domain as example

# alphaKanren and alphaLean

implement alphaKanren

implement alphaLean

# langs

[langs] `langs/pie` read "a surprisingly competitive conditional operator"

- minikanrenizing the inference rules of pie

[langs] `langs/joy` -- how to generate quine?

[wiki of rules] when writing a PL paper,
use concrete syntax to write examples,
and use abstract syntax to write rules

[langs] `langs/lambda` implement lambda calculus in whereabouts -- without closure

[lang] `langs/array-and-object`

[langs] `langs/lambda-cps` implement CPS rules for lambda calculus

[read] A Unified Approach to Solving Seven Programming Problems (Functional Pearl)

# dataset

[dataset] load dataset as fect to a relation

- syntax

  ```
  dataset Edge {
    load "<...>.jsonl"
    load "<...>.json" // must be array
    load "<...>.json" {
      // postprocessing
      path "graphs[2].edges"
    }
  }
  ```

[dataset] translate object with `@type`, `@kind` and `@args` to `Exps.Data`

# as a database

[learn] CMU database courses

[maybe] as an in-memory database first

- the main is not a database,
  but to analyze data
  to get useful information.

[aim] we need to be able to analyze personal data

- the data might be exported from somewhere,
  thus readonly,
  we do not need to worry about updating it.

- the data is personal,
  thus small amount,
  we do not need to worry about scaling it.

[aim] To use this language as web app backend.

[problem] how to handle large data?

- [problem] how to not load all facts (which might be very large) as goals?

- [question] minikanren uses stream to implement search.

  - is stream also useful when we want to use relational programming language as a database?

# programming by rewriting

`Stmts.RewriteRule`
`Stmts.Rewrite`

[rewrite] support xml

- xml templating = rewrite system for xml

# std

built-in globals -- translate string to array -- for string processing

# deduction

design syntax for deduction

# quotient

> How to implement quotient in logic programming language?

https://en.wikipedia.org/wiki/Quotient_by_an_equivalence_relation

# first-order logic

[learn] logic programming's correspondence to first-order logic

- In a Horn clause all variables are universally quantified
  and the scope is the whole clause.

  This means Horn clause can only express a subset of first-order logic.

  How should we understand this limitation?

[plan] Since I understand the use of untyped bound variables now,
maybe I can understand Gentzen and Goedel's works.

[learn] I should read Ray's book about first-order logic

[question] how to understand constraint in first-order logic?

- a group of built-in predicates with some axioms?

  - take `Disequality` as an example
  - take finite domain as an example
  - if they are axioms, can we use set theoretical
    rule based language to specify a constraint?

- we can learn more about first-order logic by implementing alphaLean

# learn

[question] why we do not need `key != name` in `Lookup`?

[books/the-reasoned-schemer] 09-thin-ice.wa
[books/the-reasoned-schemer] 10-under-the-hood.wa

[read] relational-programming-in-minikanren-techniques-applications-and-implementations.pdf
[read] a-framework-for-extending-microkanren-with-constraints.pdf
[read] pure-declarative-and-constructive-arithmetic-relations.pdf
[read] a-surprisingly-competitive-conditional-operator.pdf

# search strategy

[complexity] analyze time complexity of our search strategy

[question] [complexity] how to analyze time complexity of relation automatically?

conflict directed clause learning

[maybe] [schedule control] control how pursue can return some extra information
about how schedule the result solutions.

- should only change schedule, but not remove goals.

# propagator

[propagator] [learn] about propagator and constraints

# optional output valid JSON

> It is ok to use more elaborated format here,
> because it is intended to be read by machine.

`Exps.ReifiedVar` -- valid JSON -- `_.0` -> `{ @type: ..., @kind: ..., name: ... }`

`Exps.ArrayCons` -- valid JSON -- `[_.0 | _.1]` -> `{ @type: ..., @kind: ..., head: ..., tail: ... }`

# the-reasoned-schemer

learn more about adder: https://en.wikipedia.org/wiki/Adder_(electronics)

[books/the-reasoned-schemer] 08-just-a-bit-more.wa -- frame 35

# higher order relation

[higher order relation] We can support higher order relation
by allowing a relation to take relations as arguments.

# tabling

lvars -- programming with fix points over lattices

If you implemented different things,
and you find that you are using similar implementation techniques,
maybe there are deep theoretical connections too.

# later

[later] [DX] when adding new url to `Loader.tracked`, we should let the `watcher` watch it

# type assertion

[maybe] support type assertion

- because I heard (only heard) that
  relations fail silently is very bad for debugging.
