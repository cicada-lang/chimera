[little] chapter 1

[little] chapter 2

[maybe] variant of `query` to return unnamed array instead of named object

- `query [<name>, ...] { ... }`

[maybe] variant of `query` to return array of values instead of array of arrays or array of objects

- `query <name> { ... }`

[maybe] command line support watch with jq

Array -- provide ways to view array as pure logical

- maybe `PatternArray`

- maybe just use js syntax -- `[head, ...rest]`
- maybe by doing this we can avoid defining `cons`

support query limit

- maybe:

  ```
  query (...) limit <number> {
    ...
  }
  ```

support query with debug info

- maybe:

  ```
  report (...) [limit <number>] {

  }
  ```

port Nat: https://gist.github.com/LittleJianCH/373ed5d86afaf0c72fe4dc986895332e

playground

module system

server for query

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

# later

Stmts.AssertEqual

- assert query results for testing

fix repl bug
