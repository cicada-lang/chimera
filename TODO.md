`formatReification` -- format constraints using `with` syntax

`reify` -- support constraint

- the reification of an exp is the reified exp
  with a list of constraints represented as goals

# learn

> Be familiar with minikanren implementation again -- to read ckanren paper.

[diary] analysis the type of micro/minikanren implementation and our explicit search based implementation

[books/the-reasoned-schemer] 09-thin-ice.wa
[books/the-reasoned-schemer] 10-under-the-hood.wa

review old microkanren notes

# constraint logic programming

[question] how to understand constraint in first order logic?

- a group of built-in predicates with some axioms?
- take `Disequality` as an example
- take finite domain as an example
- can we use set theoretical rule based language to specify a constraint?
- maybe we can learn more about this from Byrd's thesis

[read] ckanren-minikanren-with-constraints.pdf

- The miniKanren Philosophy

  in a purely declarative miniKanren relation, the order of goals is
  unimportant. That is, swapping two conjuncts (or two disjuncts)
  should not affect the semantics of the program. This is true only
  to a point: a miniKanren query that has no answers may diverge
  instead of failing in finite time. For a query that produces
  answers, however, reordering subgoals should not affect the set of
  possible answers returned

  - See (Byrd 2009) for a detailed discussion of these issues and of
    the miniKanren design philosophy.

    - [read] relational-programming-in-minikanren-techniques-applications-and-implementations.pdf

  - [diary] about this issues
  - [read] read byrd's thesis

[read] a-framework-for-extending-microkanren-with-constraints.pdf
[read] pure-declarative-and-constructive-arithmetic-relations.pdf
[read] a-surprisingly-competitive-conditional-operator.pdf

[constraint] finite-domain
[constraint] type

# type system

datatype declaration -- we should not use dynamic type

- because of we also want to use the `::` syntax for namespace,
  this the prefix name of `::` can be used,
  only when the name is imported.

[maybe] using predicate (relation) as type to do assertion

- type can be used as meta variable's constraint

built-in globals -- `String` predicate

- need to generate all `String`

built-in globals -- `Number` predicate

- need to generate all `Number`

# programming by rewriting

`Stmts.RewriteRule`
`Stmts.Rewrite`

# std

built-in globals -- `String` to `Array`

- for string processing

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

[books/the-reasoned-schemer] 08-just-a-bit-more.wa -- frame 35

# clause-and-effect

[books/clause-and-effect] 08-maximum-of-a-list.wa -- need `<=`

[books/clause-and-effect] 09-searching-a-cyclic-graph.wa -- need `!=`

# later

[maybe] [later] restrict the parser -- relation name must be in `CamelCase`
