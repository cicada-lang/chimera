solution/occur

fix repl bug

Stmts.Success.execute
Stmts.Success -- syntax -- parse success.test.ts

Stmts.Failure.execute
Stmts.Failure -- syntax -- parse failure.test.ts

# functional

We need a functional part to construct data with out record name
like `cons(head, tail)` -> `{ head, tail }`

- we must be able to apply function to pattern variables,
  thus maybe we should define datatype and constructors instead of functions.

- the language will be a subset of JavaScript,
  maybe we should design this language first.

[question] scope of `Stmts.Rule`

- Because the `data` of a `Rule` will introduce bindings to scope,
  we can not reference to const value in `env`.

  - Examples: `null`, `false`, `true`

- Solution 1:

  - Preserve some keywords.
  - Force `PascalCase` naming convention for data constructors.

- Solution 2:

  - Preserve some keywords.
  - Allow function call.
  - Warn about const variable.

- Solution 3:

  - Add a keyword for writing data in bindings (like `implicit`)

[feature] Maybe add `interface` or `schema` keyword to limit type of a `Relation` (`Predicate`)

- if we add `interface`, we should just use ts (cicada) syntax of record type

  - maybe change to PascalCase

- example:

  ```ts
  interface Job {
    name: String
    dept: String
    role: String
  }
  ```

# Value

maybe not equation, because there are also `!=` and `>`

[maybe] provide ways to view array as pure logical

- maybe by doing this we can avoid defining `cons`

# playground

# later

Stmts.AssertEqual

- assert query results for testing
