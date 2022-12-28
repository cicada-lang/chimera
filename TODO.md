extract module `createErrorReport` -- to be used in repl

# functional

`Exps.FnUnfolded`
`Exps.FnUnfolded` -- syntax
`Exps.FnUnfolded` -- `evaluate` -- with the help of `exp/foldFn`

`Exps.Fn` -- `formatExp` -- with the help of `exp/unfoldFn`

- Note that, we do not need `unfoldFormatFn` here,
  because `FnUnfolded` and `Fn` are all `Exp` (no `Core`).

`Values.Fn` -- `formatValue` -- with the help of `value/unfoldFormatFn`

- function should be opaque value (like in scheme),
  but we format it as expression any way (like in JavaScript).

`Exps.Ap`
`Exps.Ap` -- `formatExp`
`Exps.Ap` -- `evaluate`

- `actions/doAp`

`Exps.ApUnfolded`
`Exps.ApUnfolded` -- `formatExp`
`Exps.ApUnfolded` -- syntax
`Exps.ApUnfolded` -- `evaluate`

`Exps.Dot`
`Exps.Dot` -- `formatExp`
`Exps.Dot` -- syntax
`Exps.Dot` -- `evaluate`

- `actions/doDot`

[maybe] `Stmt.execute` -- returns `Promise<Value | void>` instead of `Promise<string | void>`

`doAp` -- Use term rewrite rule as function.

`doAp` -- Use relation as predicate.

`Stmts.Declare` -- Use predicate as runtime type assertion (active during test only).

- Using `declare` as keyword.

`Exps.Compute` -- support using `compute` in pattern -- like in inference rules and term rewrite rules

- [maybe] `compute` should not print to output,
  we should implement `print` and `println` as a primitive function.

Some `Stmt`s should be implemented as `Exp`, to support using `Stmts.Let` over them.

- `assert` and `assert not` can also be used for any expression

- [maybe] use something like `begin` to turn a list of stmts to an expression.

# term rewriting

A `RewriteRules.Case` will generates `PatternVar` from `vars`

# hypergraph rewriting

[maybe] keyword syntax `hyperrule`

- There are many ways to apply a rule

  - consume input or not:

    - consume input -- simplification rule in CHR
    - not consume input -- propagation rule in CHR

    Why not just express this by repeating the not consumed goal?

    Maybe all we need is a syntax to repeating a goal.

    - If we do so, a goal can not be used reversely,
      unless "repeating" means repeating on the other side of the line.

    - Or maybe we should make a `hyperrule` contains three parts.

  - from left to right or from right to left:

    - left to right: top-down logic programming
    - right to left: bottom-up datalog generation

[maybe] `compute` support apply hyperrule as function

implement hypergraph rewriting directly -- based on terms

use hypergraph rewriting to implement lambda calculus -- with explicit substitution
use hypergraph rewriting to implement inet

# hypergraph presentation

like higher inductive types

# finite-domain constraint programming

A constraint itself encodes how to rewrite the set of constraints
(a little like the type of `pursue`).

- We need to rewrite the set of constraints,
  because of a new constraint (or new constraints)
  are added to the set of constraints.

  We can maintain some invariants for the set of constraints.

  Before adding the new constraints, the invariants holds,
  adding the new constraints will break the invariants,
  after rewriting, we should bring back the invariants.

  Example invariant is "no more redex".

[books/clause-and-effect] 08-maximum-of-a-list.wa -- need `<=`

[finite-domain] solve some puzzles about finite-domain as example

# clp

[note] The general idea about implementing constraint:

- Reduce the set of constraints,
  to some kind of normal form
  by which we can build a model in the theory.

- If this is true, we can use rewriting
  to implement the "normal form" part of constraint.

  A set of rewrite rules applied to the set of constraints.

  - Can we implement this kind of rewrite in the logic programming itself?

    (and provide a syntax keyword for defining new constraint)

- elements of a domain can be defined by ADT (or a relation).

- predicates in a domain can be defined by relation with more than one conclusions?

- how to solve linear equations by rewriting?

# term rewriting

[question] what is the wired syntax of `-->` in prolog? DCG?

- about list-processing?

[read] ~/topics/term-rewriting/term-rewriting-and-all-that--franz-baader.djvu

# compiler

Compile to wasm to run in the browser.

Compile to native code to run in linux.

# namespace

support namespace

[diary] supporting-namespace.md

# homoiconicity

read source code file as list of terms

# DX

[logic programming] provide a tool for checking relation's disjoint-ness against examples.

[free variable] learn from wolfram's design about free variable

# grammar

add `grammar` keyword to define partech grammar

# read

[diary] the goal is to satisfy constraint

- Maybe we should call goals "constraints",
  because they are actually constraint, and the goal is to satisfy them.

- Or we should say constraint applied to argument value is a goal?

[read] logic-for-problem-solving.pdf
[read] constraint-logic-programming--a-survey.pdf

# higher-order logic

use constraint to implement higher-order logic.

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

# docs

[manual] compare with SQL

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

[later] [DX] when adding new url to `Loader.tracked`, we should let the `watcher` watch it

# type assertion

[maybe] support type assertion

- because I heard (only heard) that
  relations fail silently is very bad for debugging.
