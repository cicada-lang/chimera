# relation

[relation] goal use `Equal` -- instead of `=`
[relation] goal use `NotEqual` -- instead of `!=`

[relation] `clause` use `[]` syntax (require ",") -- instead of `{}`

`Values.Goal`

relation as predicate -- require a special predicate

- `sat(Number(x))`

[relation] `clause` has `stmts` -- instead of just a list of goals

extract `defineRenames`

`GoalExp` -- support any `Exp` that evaluate to `Relation` -- instead of using `GoalExps.Apply`

`GoalExp` -- should be evaluated late -- for the repl

`stmt` -- remove `prepare`

remove the feature for importing form url, and use for sync `execute` only

- to support a self-hosting compiler

# functional

[functional] implement lambda calculus with env in functional language

# dot

`Exps.Dot`
`Exps.Dot` -- evaluate
`Exps.Dot` -- syntax
`doDot`

# prefix as namespace

`Values.Term` can have prefix -- for `Dot`

hyperrewrite can operate under with given prefix

# module

[module] support `import * as <name>`

# CHR

`rule` rename `use` to `include`
`hyperrule` rename `use` to `include`

a value for hyperrewrite failure

`use` -- to register `hyperrule` to `mod` -- maybe with `as` for prefix

- We should import constraint system instead of constraints.

  Constraints should be pure data (for example, quoted terms),
  but relation should be special value.

`Goal` -- check head is defined relation or constraint

`Solution` has `constraints`

`Goals.Constraints`

`Goals.Constraints` -- syntax

[books/clause-and-effect] 08-maximum-of-a-list.wa -- need `<=`

[finite-domain] solve some puzzles about finite-domain as example

# term rewriting

[term rewriting] implement lambda calculus -- with explicit substitution

# do notation

support do notation -- for programming without `try` and `catch`

# hyperrewrite

hyperrewrite/boolean-algebra -- add

hyperrewrite/boolean-algebra -- search

`enumerationDomain` -- `NotEq`

# claim and runtime type assertion

`Stmts.Claim` -- Use predicate as runtime type assertion (active during test only).

- Using `claim` as keyword.

# first-order logic

[learn] logic programming's correspondence to first-order logic

[learn] Since I understand the use of untyped bound variables now,
maybe I can understand Gentzen and Goedel's works.

[learn] I should read Ray's book about first-order logic

[write] understand constraint in first-order logic by writing?

- take `Disequality` as an example
- take finite domain as an example

[learn] we can learn more about first-order logic by implementing alphaLean

# compiler

[compiler] compile to x86 -- for linux.

[compiler] compile to wasm -- for browser.

# 1.0.0

mark as 1.0.0 and writie some docs

- about set-theory based programming for language development

# term rewriting

encode collatz rewrite in term rewrite

[learn] learn DCG of prolog -- the `-->` syntax

# hypergraph rewriting

geometry of hypergraph.

from hypergraph to cell-complex via category theory.

encode collatz rewrite in hypergraph rewrite (to get a geometry)

use hypergraph rewriting to implement inet

draw labelled hypergraph by JavaScript.

# hypergraph based physics engine for game development

Physics has its beautiful application in physics engine of game development,
is all about simulation.

Can we design a hypergraph based physics engine,
where space itself is implemented by hypergraph,
and dynamic is implemented by rewrite rules?

# hypergraph presentation

like higher inductive types

# DX

[logic programming] provide a tool for checking relation's disjoint-ness against examples.

[debug] [primitive] `trace` as a built-in function

- result should be represented by term and json

# grammar

Add `grammar` keyword to define partech grammar.

# actor model

Implement actor model to handle async programming.

# read

[read] logic-for-problem-solving.pdf

[read] constraint-logic-programming--a-survey.pdf

# alphaKanren and alphaLean

implement alphaKanren

implement alphaLean

# langs

[langs] `langs/pie` -- use pie as an example of non trivial logic program

- we should use nominal logic instead of `freshen`

[langs] `langs/joy` -- how to generate quine?

[wiki of rules] when writing a PL paper,
use concrete syntax to write examples,
and use abstract syntax to write rules

[langs] `langs/lambda` implement lambda calculus -- without closure

[langs] `langs/lambda-cps` implement CPS rules for lambda calculus

[read] A Unified Approach to Solving Seven Programming Problems (Functional Pearl)

# datalog

Why we can use negation of `Equal` (still monotone),
but can not use general negation of all relations?

A named conjunctive query
can be viewed as a new relation
generated from its body,

A named conjunctive query
can also be viewed as a new relation with schema
-- the constrains (the body of the query),
that must be satisfied when we add new data to the relation,
or update existing data in the relation.

# database

how to use protocol to separate the storage layer?

[idea] If we use a database of constraints,
we can let the database generates events when some query success or fail,
and clients can subscribe to these events.

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

# deduction

design syntax for deduction

# quotient

> How to implement quotient in logic programming language?

https://en.wikipedia.org/wiki/Quotient_by_an_equivalence_relation

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

[array] `Array(Number)(l1)`

- [maybe] use constraint to implement higher-order logic.
- [maybe] when using relation as predicate, we should not overload `Ap`

# tabling

lvars -- programming with fix points over lattices

If you implemented different things,
and you find that you are using similar implementation techniques,
maybe there are deep theoretical connections too.

# forward chaining

a.k.a. bottom-up

- Is Earley parser bottom-up?
  Can we do Earley parser using datalog?

play with forward chaining where we accumulate facts in some kind of database.

- dialogue planning, dixon 2009
- voting protocols, DeYoung 2011
- operational semantic of PL, simmons 2012
- modular robotics, goldstein 2012

datalog can be implemented using forward chaining

datalog stratification: https://en.wikipedia.org/wiki/Stratification_(mathematics)

# later

[later] `equal` -- support all value types

[later] [DX] when adding new url to `Loader.tracked`, we should let the `watcher` watch it
