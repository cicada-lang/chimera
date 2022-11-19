---
title: Functional Part
author: Xie Yuheng
date: 2022-11-19
---

# functional

[maybe] We need a functional part to construct data with out record name

- syntax for define datatype, that can be used as predicate.

  - maybe simply typed system with generic (type abstraction over type).

- like `cons(head, tail)` -> `{ head, tail }`

  - Maybe we do not need functional, we can do

    ```
    Cons pair
    ------------ {
      pair = { head, tail }
    }
    ```

- define `datatype` with `family` and `kind` fields.

- we must be able to apply function to pattern variables,
  thus maybe we should define datatype and constructors instead of functions.

[question] scope of `Stmts.Rule`

- Because the `data` of a `Rule` will introduce bindings to scope,
  we can not reference to const value in `env`.

- Preserve some keywords.

  - Examples: `null`, `false`, `true`

- Add a keyword for writing data in bindings

  - maybe `ref`
  - maybe `compute` -- if we have functional part
