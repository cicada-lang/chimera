export const stmt = {
  $grammar: {
    "stmt:fact": [{ name: "name" }, { exp: "exp" }],
    "stmt:clause_nameless": [
      { name: "name" },
      { exp: "exp" },
      "dashline",
      '"{"',
      { goals: "goals" },
      '"}"',
    ],
    "stmt:clause_named": [
      { name: "name" },
      { exp: "exp" },
      "dashline",
      { clause_name: "name" },
      '"{"',
      { goals: "goals" },
      '"}"',
    ],
    "stmt:find": [
      '"find"',
      '"["',
      { names: "names" },
      '"]"',
      { options: { $ap: ["zero_or_more", "find_option"] } },
      '"{"',
      { goals: "goals" },
      '"}"',
    ],
    "stmt:find_single": [
      '"find"',
      { name: "name" },
      { options: { $ap: ["zero_or_more", "find_option"] } },
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
    "stmt:test": [
      '"test"',
      { description: { $pattern: ["string"] } },
      '"{"',
      { stmts: { $ap: ["zero_or_more", "stmt"] } },
      '"}"',
    ],
    "stmt:test_no_description": [
      '"test"',
      '"{"',
      { stmts: { $ap: ["zero_or_more", "stmt"] } },
      '"}"',
    ],
  },
}

export const stmts = {
  $grammar: {
    "stmts:stmts": [{ stmts: { $ap: ["zero_or_more", "stmt"] } }],
  },
}
