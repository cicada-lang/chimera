---
title: Rewrite rule combinators
author: Xie Yuheng
date: 2022-12-23
---

We might use rewrite rule combinators to express different reduction strategies.

From [pangloss/pattern](https://github.com/pangloss/pattern):

- `once(rules)`

  Search the rules from top to bottom. Stop once successfully matching.

- `chain(rules)`

  Runs each of the rules in the list in a chain. If any rule succeeds, the
  subsequent rules are run with the new value. If a rule fails, the current
  value does not change and the next rule is run.

- `fix(rule)`

  Keep applying the rule until a fixed point is reached.

- `traverse(rule)`

  Run the given rule combinator on all subexpressions depth-first.

- `reduce(rule)`

  Run the given rule combinator repeatedly depth-first on all subexpressions
  until running the rule makes no further changes at each level.

Maybe eager v.s. lazy:

- eager -- try to reduce the body as much as possible.

- lazy -- try to reduce the head as much as possible.
