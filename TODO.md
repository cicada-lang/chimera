update `docs/` to new syntax

# term rewriting

> Can rule fail? or just return the term untouched?

`Stmts.RewriteRule`
`Exps.RewriteRule` -- syntax
`Stmts.RewriteRule` -- syntax

`Stmts.Rewrite`
`Stmts.Rewrite` -- syntax

[term rewriting] rewrite rule combinator

- for different reduction strategy.

  fix traverse
  eager -- try to reduce the body as much as possible
  lazy -- try to reduce the head as much as possible

- once []

  Search the rules from top to bottom. Stop once successfully matching.

- chain []

  Runs each of the rules in the list in a chain. If any rule succeeds, the
  subsequent rules are run with the new value. If a rule fails, the current
  value does not change and the next rule is run.

- fix rule

  Keep applying the rule until a fixed point is reached.

- traverse rule

  Run the given rule combinator on all subexpressions depth-first.

- reduce rule

  Run the given rule combinator repeatedly depth-first on all subexpressions
  until running the rule makes no further changes at each level.

[read] ~/topics/term-rewriting/term-rewriting-and-all-that--franz-baader.djvu

# hypergraph rewriting

implement hypergraph rewriting directly -- based on terms

use hypergraph rewriting to implement lambda calculus -- with explicit substitution
use hypergraph rewriting to implement inet

# hypergraph presentation

like higher inductive types

# namespace

support namespace

[diary] supporting-namespace.md

# finite-domain constraint programming

[diary] reading-ckanren.md

[read] ckanren-minikanren-with-constraints.pdf

- A constraint itself encodes how to rewrite the set of constraints
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

# read

[diary] the goal is to satisfy constraint

- Maybe we should call goals "constraints",
  because they are actually constraint, and the goal is to satisfy them.

- Or we should say constraint applied to argument value is a goal?

[read] logic-for-problem-solving.pdf
[read] constraint-logic-programming--a-survey.pdf

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

# as a database

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
