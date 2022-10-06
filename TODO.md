QueryOption & QueryOptions

query option -- `limit`

- maybe learn from SQL syntax design

- maybe:

  ```
  query (...) limit <number> {
    ...
  }
  ```

query option -- `debug`

query option -- to return object instead of array

# functional

[maybe] We need a functional part to construct data with out record name

- like `cons(head, tail)` -> `{ head, tail }`

  - Maybe we do not need functional, we can do

    ```
    Cons pair
    ------------ {
      unify pair = { head, tail }
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

# nameless relation

[maybe] we should add `disj {}` to define unnamed relation (clauses)

- we must also add `conj {}` for symmetry

- the problem of unnamed relation is that, it make us unable to write proofs by hand.

- maybe we can design a way to write proofs by hand for nameless relations.
