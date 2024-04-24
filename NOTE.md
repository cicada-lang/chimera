# why chimera

为什么 chimera 这个项目是值得做的？

- 因为 dependent type 与 logic programming 之间的关系。
- 因为 constraint programming 我还没有探索过。

顶层不需要 compute 和 任意的 exp，
只需要 application 以及 method application。

code block 没必要支持空的 {}，
空的，和 { name } 留做 Record 的语法，
只有 { f(x) } 才是正常的 block 语法。

# higher order relation

[higher order relation] We can support higher order relation
by allowing a relation to take relations as arguments.

[array] `Array(Number)(l1)`

- [maybe] use constraint to implement higher-order logic.
- [maybe] when using relation as predicate, we should not overload `Ap`

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

# tabling

lvars -- programming with fix points over lattices

If you implemented different things,
and you find that you are using similar implementation techniques,
maybe there are deep theoretical connections too.

# search strategy

[complexity] analyze time complexity of our search strategy

[question] [complexity] how to analyze time complexity of relation automatically?

conflict directed clause learning

[maybe] [schedule control] control how pursue can return some extra information
about how schedule the result solutions.

- should only change schedule, but not remove goals.

# propagator

[learn] about propagator and constraints

# quotient

How to implement quotient in logic programming language?

https://en.wikipedia.org/wiki/Quotient_by_an_equivalence_relation

毕竟 equivalence relation 是 relation。

# hypergraph based physics engine for game development

Physics has its beautiful application in physics engine of game development,
is all about simulation.

Can we design a hypergraph based physics engine,
where space itself is implemented by hypergraph,
and dynamic is implemented by rewrite rules?

# term rewriting

encode collatz rewrite in term rewrite

# hypergraph rewriting

geometry of hypergraph.

from hypergraph to cell-complex via category theory.

encode collatz rewrite in hypergraph rewrite (to get a geometry)

use hypergraph rewriting to implement inet
