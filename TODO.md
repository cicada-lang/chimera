# migrate

Fact

Rule

[migrate] understand `xieyuheng/logic-db` again

[migrate] copy code from `xieyuheng/logic-db`

# Exps

maybe not equation, because there are also `!=` and `>`

Values.Null

Values.Boolean

Values.Objekt

Values.Array -- maybe provide ways to view this datatype as pure logical

- maybe by doing this we can avoid defining `cons`

# Stmts

Stmts.Fact

Stmts.Rule

- force `PascalCase` naming convention -- keywords will be lowercase

- introduce bindings to scope

  - how about reference to const like:
    - `null`
    - `false`, `true`

  - solution 1: preserve some keywords

- how about the functional part of the language?

  - do we have a functional part at all?
  - maybe we need a functional part to construct data with out record name
    like `cons(head, tail)` -> `{ head, tail }`

    - we must be able to apply function to pattern variables,
      thus maybe we should define datatype and constructors instead of functions.

  - the language will be a subset of JavaScript,
    maybe we should design this language first.

- like inference rules in logic books and papers, but reversed.

- rule can have optional name -- after the rule line

Stmts.Query

Stmts.Success

Stmts.Failure

Stmts.AssertEqual

- assert query results for testing

Maybe add `interface` or `schema` keyword to limit type of a `Relation` (`Predicate`)

- if we add `interface`, we should just use ts (cicada) syntax of record type

  - maybe change to PascalCase

- example:

  ```ts
  schema Job {
    name: String
    dept: String
    role: String
  }
  ```
