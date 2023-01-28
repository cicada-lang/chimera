import * as pt from "@cicada-lang/partech"

// NOTE Preserve keywords for JSON.

const preserved = ["null", "true", "false"]

export const variable_name = {
  $pattern: [
    "identifier",
    `(^(?!(${preserved.join("|")})$)([_A-Za-z][_\\p{Letter}0-9]*))`,
  ],
}

export const variable_names = {
  $grammar: {
    "variable_names:variable_names": [
      {
        variable_names: {
          $ap: ["zero_or_more", "variable_name", '","'],
        },
      },
      { last_name: "variable_name" },
      { $ap: ["optional", '","'] },
    ],
  },
}

export const name_no_preserved = pt.grammars.pattern_unless_preserved(
  "identifier",
  [],
)

export const relation_name = {
  $pattern: ["identifier", "([A-Z][_\\p{Letter}0-9]*)"],
}

export const clause_name = {
  $pattern: ["identifier", "([a-z][_\\p{Letter}0-9]*)"],
}
