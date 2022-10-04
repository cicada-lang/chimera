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
    "stmt:query": ['"query"', '"("', { names: "names" }, '")"', '"{"', { goals: "goals" }, '"}"'],
    "stmt:query_no_name": ['"query"', '"{"', { goals: "goals" }, '"}"'],
    "stmt:query_no_name_2": ['"query"', '"("', '")"', '"{"', { goals: "goals" }, '"}"'],
    "stmt:success": ['"success"', '"{"', { goals: "goals" }, '"}"'],
    "stmt:failure": ['"failure"', '"{"', { goals: "goals" }, '"}"'],
  },
}

export const stmts = {
  $grammar: {
    "stmts:stmts": [{ stmts: { $ap: ["zero_or_more", "stmt"] } }],
  },
}
