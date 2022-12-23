import * as pt from "@cicada-lang/partech"

/**

   Preserve keywords for JSON.

   TODO Preserve keywords goal.

**/

export const name = pt.grammars.pattern_unless_preserved("identifier", [
  "null",
  "true",
  "false",
])

export const relation_name = {
  $pattern: ["identifier", "([A-Z][_\\p{Letter}0-9]*)"],
}

export const datatype_name = {
  $pattern: ["identifier", "([A-Z][_\\p{Letter}0-9]*)"],
}

export const rewrite_rule_name = {
  $pattern: ["identifier", "([a-z][_\\p{Letter}0-9]*)"],
}

export const clause_name = {
  $pattern: ["identifier", "([a-z][_\\p{Letter}0-9]*)"],
}

const preserved = ["null", "true", "false"]

export const pattern_variable_name = {
  $pattern: [
    "identifier",
    `(^(?!(${preserved.join("|")})$)([_a-z][_\\p{Letter}0-9]*))`,
  ],
}

export const name_no_preserved = pt.grammars.pattern_unless_preserved(
  "identifier",
  [],
)

export const pattern_variable_names = {
  $grammar: {
    "pattern_variable_names:pattern_variable_names": [
      {
        pattern_variable_names: {
          $ap: ["zero_or_more", "pattern_variable_name", '","'],
        },
      },
      { last_name: "pattern_variable_name" },
      { $ap: ["optional", '","'] },
    ],
  },
}
