export const stmt = {
  $grammar: {
    "stmt:fact": [{ name: "name" }, { exp: "exp" }],
    "stmt:rule_nameless": [
      { name: "name" },
      { exp: "exp" },
      "dashline",
      '"{"',
      { goals: "goals" },
      '"}"',
    ],
    "stmt:rule_named": [
      { name: "name" },
      { exp: "exp" },
      "dashline",
      { clause_name: "name" },
      '"{"',
      { goals: "goals" },
      '"}"',
    ],
    "stmt:query": [
      '"query"',
      '"["',
      { names: "names" },
      '"]"',
      { options: { $ap: ["zero_or_more", "query_option"] } },
      '"{"',
      { goals: "goals" },
      '"}"',
    ],
    "stmt:query_single": [
      '"query"',
      { name: "name" },
      { options: { $ap: ["zero_or_more", "query_option"] } },
      '"{"',
      { goals: "goals" },
      '"}"',
    ],
    "stmt:import": [
      '"import"',
      '"{"',
      { bindings: { $ap: ["zero_or_more", "import_binding"] } },
      '"}"',
      '"from"',
      { path: { $pattern: ["string"] } },
    ],
  },
}

export const stmts = {
  $grammar: {
    "stmts:stmts": [{ stmts: { $ap: ["zero_or_more", "stmt"] } }],
  },
}
