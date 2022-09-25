export const stmt = {
  $grammar: {
    "stmt:fact": ['"fact"', { name: "name" }, { exp: "exp" }],
    "stmt:rule": [
      '"rule"',
      { name: "name" },
      { exp: "exp" },
      "dashline",
      '"{"',
      { goals: "goals" },
      '"}"',
    ],
    "stmt:query": [
      '"query"',
      '"("',
      { names: "names" },
      '")"',
      '"{"',
      { goals: "goals" },
      '"}"',
    ],
  },
}

export const stmts = {
  $grammar: {
    "stmts:stmts": [{ stmts: { $ap: ["zero_or_more", "stmt"] } }],
  },
}
