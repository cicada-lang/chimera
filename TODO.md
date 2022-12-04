# type constraint

[type constraint] built-in global `String`

[type constraint] built-in global `Number`

# as a database

[maybe] as an in-memory database first

- the main is not a database,
  but to analyze data
  to get useful information.

we need to be able to analyze personal data

- the data might be exported from somewhere,
  thus readonly,
  we do not need to worry about updating it.

- the data is personal,
  thus small amount,
  we do not need to worry about scaling it.

To use this language as web app backend.

[problem] how to handle large data?

Learn:

- CMU course

[feature] reference data by URL in JSON #3

There are a lot of related semantic web ideas:

- https://en.wikipedia.org/wiki/JSON-LD

[question] minikanren uses stream to implement search.

- is stream also useful when we want to use relational programming language as a datatype?

[problem] how to not load all facts (which might be very large) as goals?

# finite-domain constraint programming

[read] ckanren-minikanren-with-constraints.pdf

[books/clause-and-effect] 08-maximum-of-a-list.wa -- need `<=`

# programming by rewriting

`Stmts.RewriteRule`
`Stmts.Rewrite`

[rewrite] support xml

- xml templating = rewrite system for xml

# std

built-in globals -- `String` to `Array`

- for string processing

# langs

[langs] `langs/lambda` implement lambda calculus in whereabouts -- without closure

[langs] `langs/forth`

- What are the small step and big step operational semantics of forth-like language?
- use forth-like language to play with quine

[langs] `langs/pie` read "a surprisingly competitive conditional operator"

- minikanrenizing the inference rules of pie

# deduction

design syntax for deduction

# quotient

> How to implement quotient in logic programming language?

https://en.wikipedia.org/wiki/Quotient_by_an_equivalence_relation

# first-order logic

[learn] logic programming's correspondence to first-order logic

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

[diary] fair-search-strategy.md

[lang] langs/array-and-object

[question] why we do not need `key != name` in `Lookup`?

[diary] the use of stream in minikanren implementation

[books/the-reasoned-schemer] 09-thin-ice.wa
[books/the-reasoned-schemer] 10-under-the-hood.wa

[read] relational-programming-in-minikanren-techniques-applications-and-implementations.pdf
[read] a-framework-for-extending-microkanren-with-constraints.pdf
[read] pure-declarative-and-constructive-arithmetic-relations.pdf
[read] a-surprisingly-competitive-conditional-operator.pdf

# complexity

[complexity] analyze time complexity of our search strategy

[question] [complexity] how to analyze time complexity of relation automatically?

# optional output valid JSON

> It is ok to use more elaborated format here,
> because it is intended to be read by machine.

`Exps.ReifiedVar` -- valid JSON -- `_.0` -> `{ @type: ..., @kind: ..., name: ... }`

`Exps.ArrayCons` -- valid JSON -- `[_.0 | _.1]` -> `{ @type: ..., @kind: ..., head: ..., tail: ... }`

# the-reasoned-schemer

learn more about adder: https://en.wikipedia.org/wiki/Adder_(electronics)

[books/the-reasoned-schemer] 08-just-a-bit-more.wa -- frame 35

# higher order relation and dependent type

[higher order relation] We can support higher order relation
by allowing a relation to take relations as arguments.

[dependent type] What happen if we support dependent type?
(by allowing a relation to take data as arguments.)

- Dependent type in functional language is described as
  "any computation can happens during type checking".
  in relational programming, all computation are un-nested,
  what would happen here?

# later

[later] [DX] when adding new url to `Loader.tracked`, we should let the `watcher` watch it

# maybe

[maybe] [type assertion] because I heard (only heard) that relations fail silently is very bad for debugging,

[maybe] configure limit by built-in special goal `limit <n>`
that do side-effects to the solver.

- instead of configuring limit by optional

[maybe] [syntax] restrict the parser -- relation name must be in `CamelCase`

[maybe] [syntax] restrict the parser -- `PatternVar` name must be in `camelCase`

[maybe] [schedule control] control how pursue can return some extra information
about how schedule the result solutions.

- should only change schedule, but not remove goals.

- maybe only put generated solutions to the back of the queue
  when the goals are generated from disj
  (or `goals.length > 1` (but not all disj are like this)).
