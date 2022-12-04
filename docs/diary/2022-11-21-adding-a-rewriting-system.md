---
title: Adding a rewriting system
author: Xie Yuheng
date: 2022-11-21
---

Computation is but directed change.

We should use rewrite rule based (dynamic) language
to implement lambda calculus,
to see what will happen.

Think about cellular automata.

- Which can be implemented by directed change with side-effect (mutation in place)?

[problem] Can we generalize the language to handle rewriting of graphs instead of trees?

[problem] What is the difference between rewrite and pattern match on ADT?

- We do not have to write trivial matches?

# Syntax

```
<rule-name> <pattern> => <pattern>
<rule-name> <pattern> => <pattern>
...

rewrite <rule-name> <data>

rewrite rule <name> {
  // combinators
}
```

# Learn

- https://en.wikipedia.org/wiki/Tree_traversal
- https://github.com/pangloss/pattern
- The nanopass framework
- Software Design for Flexibility, by Chris Hanson and Gerald Sussman.
