rename ArrayCons and ArrayNull to ListCons and ListNull
remove quote and eval

`datatype` -- `Data` should have `type` and `kind`

type constraint should not be `String(x)`

- should be `The(String, x)`
- or just `x: String`

# syntax

> remove partech -- use hand write parser

parseOperator
parseOperand
parseStmt & parseStmts
loopUntilEnd

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

# do notation

[maybe] support do notation -- for programming without `try` and `catch`

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

可以考虑编译到 xvm。
也许应该直接编译到 x86。

# 1.0.0

mark as 1.0.0 and writie some docs

- about set-theory based programming for language development

# prolog

[learn] learn DCG of prolog -- the `-->` syntax

# DX

[logic programming] provide a tool for checking relation's disjoint-ness against examples.

[debug] [primitive] `trace` as a built-in function

- result should be represented by term and json

# read

[read] logic-for-problem-solving.pdf

[read] constraint-logic-programming--a-survey.pdf

# alphaKanren and alphaLean

implement alphaKanren

implement alphaLean

# langs

[langs] `langs/pie` -- use pie as an example of non trivial logic program

- we should use nominal logic instead of `freshen`

[wiki of rules] when writing a PL paper,
use concrete syntax to write examples,
and use abstract syntax to write rules

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

能够把保存 facts 的文件当成小型数据库来用。

# deduction

有了带有名字的 clause 之后，
可以设计手写 deduction 的语法。

# learn

[question] why we do not need `key != name` in `Lookup`?

[books/the-reasoned-schemer] 09-thin-ice.wa
[books/the-reasoned-schemer] 10-under-the-hood.wa

[read] relational-programming-in-minikanren-techniques-applications-and-implementations.pdf
[read] a-framework-for-extending-microkanren-with-constraints.pdf
[read] pure-declarative-and-constructive-arithmetic-relations.pdf
[read] a-surprisingly-competitive-conditional-operator.pdf

# the-reasoned-schemer

learn more about adder: https://en.wikipedia.org/wiki/Adder_(electronics)

[books/the-reasoned-schemer] 08-just-a-bit-more.wa -- frame 35

# later

[later] `find` -- support taking solution -- `in <solution>`

[later] `equal` -- support all value types

[later] [DX] when adding new url to `Loader.tracked`, we should let the `watcher` watch it
