remove "sjcl"
remove rule support

update to esmodule

remove partech -- use hand write parser

# chimera

[chimera] 如何在逻辑式中恢复部分的过程式 contral flow？

- contral flow 是程序员最好的朋友。

[chimera] 完成更多的 clause-and-effect 中的例子。

[chimera] 关于 logic programming 与 first-order logic 的笔记。

- `clause` 中的 variable 代表 `forall`。
- `find` 代表 `exists`。

  - https://en.wikipedia.org/wiki/Conjunctive_query

[chimera] CLP 中的 `Relation` 与 `Constraint` 的语义都是集合论意义上的 relation。

- 它们有什么区别？
- 为什么我们需要 `Constraint` 而不能用 `Relation` 实现全部？

[chimera] finite domain 在于每个变量真的带有一个 domain（有限集合），
这个有限集合显然可以被代替为 区间 之类的量，
也许任意的 lattice 都可以？

- 可以为这个算法设计一个语言：https://en.wikipedia.org/wiki/AC-3_algorithm
- 注意，SAT 问题中 domain 是有限的，并且只有两个值。
- 与 propagator model 类似， propagator model 中每个变量都是一个 lattice。
- https://en.wikipedia.org/wiki/Local_consistency

[chimera] 取消 occur-check 并且能够打印循环的 value。

[chimera] simply typed logic programming

[chimera] dependently typed logic programming

- need equivalence between relations.
- if type system is logic, what is the logic of logic?

[chimera] logic programming (clique)

[chimera] datomic-like datalog in clique

[chimera] 尝试把多元关系转化为三元组（datomic）

- 关系的代数（peirce）

# CHR

`FiniteDomain.example.mo` -- complete solver

[books/clause-and-effect] 08-maximum-of-a-list.wa -- need `constraints FiniteDomain { LtEq(x, y) }`

[finite-domain] solve some puzzles about finite-domain as example

# claim and runtime type assertion

`Stmts.Claim` -- Use predicate as runtime type assertion (active during test only).

- Using `claim` as keyword.

`forall`

`exists`

# term rewriting

[term rewriting] implement lambda calculus -- with explicit substitution

# do notation

support do notation -- for programming without `try` and `catch`

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

# pattern match

pattern match support telescope

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

[idea] If we use a database of constraints,
we can let the database generates events when some query success or fail,
and clients can subscribe to these events.

[aim] to analyze personal data

- the data might be exported from somewhere,
  thus readonly,
  we do not need to worry about updating it.

- the data is personal,
  thus small amount,
  we do not need to worry about scaling it.

[aim] To use this language as web app backend.

[problem] how to handle large data? forward-chaining?

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

[later] `find` -- support taking solution -- `in <solution>`

[later] `equal` -- support all value types

[later] [DX] when adding new url to `Loader.tracked`, we should let the `watcher` watch it
