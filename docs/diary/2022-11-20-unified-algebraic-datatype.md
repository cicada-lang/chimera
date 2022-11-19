---
title: Unified algebraic datatype
author: Xie Yuheng
date: 2022-11-20
---

> ADT is important for implementing language expressions.

We should limit ourself to JSON only on output,
we still can support data constructors
and convert them back and forth to JSON.

[note] about unify the style of json ADT

- target host languages:

  - typescript
  - whereabouts
  - cicada

- learn from json semantic web.

  - https://en.wikipedia.org/wiki/JSON-LD

- For example, with `@type` `@kind` `@args`.

  Adding `@` for such meta property
  to avoid preserving property names.

  No need for datatype definition, just a syntax sugar:

  ```
  datatype List = null | cons(head, tail)

  List.cons(x, y)

  {
    "@type": "List",
    "@kind": "cons",
    "head": x,
    "tail": y,
  }

  {
    "@type": "List",
    "@kind": "cons",
    "@args": [x, y],
  }
  ```

- learn naming from: https://en.wikipedia.org/wiki/Algebraic_data_type
