---
title: quote and unquote
author: Xie Yuheng
date: 2023-01-07
---

A math like language:

- json and term as data.
- `quote` and `unquote` as keywords.
- the only thing the core top-level does is to evaluate expressions.
  - there can be sugar top-level.

It will be as fun as lisp.

Examples:

```
clause(quote ..., "rule-name", quote [
  ...,
])
```

```
let f = (x) => {}

let("f", fn(quote [], quote [
  let(),
  if(x, quote [], quote []),
  return(...),
  let(),
  return(...),
]))
```
