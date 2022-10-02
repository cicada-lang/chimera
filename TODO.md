Array -- provide ways to view array as pure logical

- maybe `PatternArray`

- maybe just use js syntax -- `[head, ...rest]`
- maybe by doing this we can avoid defining `cons`

[maybe] command line support watch with jq

playground

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
  debug (...) [limit <number>] {

  }
  ```

module system

edge server for query

# bug

fix repl bug

# later

port Nat: https://gist.github.com/LittleJianCH/373ed5d86afaf0c72fe4dc986895332e

Stmts.AssertEqual

- assert query results for testing

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

# reify

[maybe] with out `reify` the following queries have different outputs:

```
query (q) {
  unify q = q
}

// { "success": true, "count": 1, "solutions": [{ "q": "#unknown" }] }

query (q) {
  unify q = x
}

// { "success": true, "count": 1, "solutions": [{ "q": "?x" }] }
```

[maybe] without `reify` we do not have alpha equivalence between expressions
-- consistently changing the names of pattern variables.

```
query (q) {
  unify [x, y] = q
}

// { "success": true, "count": 1, "solutions": [{ "q": ["?x", "?y"] }] }

query (s) {
  unify [t, u] = s
}

// { "success": true, "count": 1, "solutions": [{ "s": ["?t", "?u"] }] }
```

[maybe] a variant of `query` to return unnamed array instead of named object

- `query [<name>, ...] { ... }`

- if we do so, we might need `reify` to distinguish different `#unknown`s

[maybe] variant of `query` to return array of values instead of array of arrays or array of objects

- `query <name> { ... }`

# proof

[design] syntax to write proofs by hand

```ts
Member [element, cons(element, tail)]
------------------------------------- here {}

Member [element, cons(head, tail)]
---------------------------------- there {
  Member [element, tail]
}

proof {
  Member ["john", cons("paul", cons("john", null))]
  ------------------------------------------------- Member.there {
    Member ["john", cons("john", null)]
    ----------------------------------- Member.here
  }
}
```

# nameless relation

[maybe] we should add `disj {}` to define unnamed relation (clauses)

- we must also add `conj {}` for symmetry

- the problem of unnamed relation is that, it make us unable to write proofs by hand.

- maybe we can design a way to write proofs by hand for nameless relations.
