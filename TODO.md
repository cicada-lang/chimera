# design

update syntax -- `the-power-of-prolog/`
update syntax -- `sicp/`

`docs/tests/` -- design concrete syntax

# Exps

maybe not equation, because there are also `!=` and `>`

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

# migrate

[migrate] copy code from `xieyuheng/logic-db`
