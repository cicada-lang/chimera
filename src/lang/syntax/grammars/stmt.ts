export const stmt = {
  $grammar: {
    "stmt:relation_no_goals_no_clause_name": [
      { name: "relation_name" },
      { exp: "exp" },
    ],
    "stmt:relation_no_goals": [
      { name: "relation_name" },
      { exp: "exp" },
      "dashline",
      { clause_name: "clause_name" },
    ],
    "stmt:relation_no_clause_name": [
      { name: "relation_name" },
      { exp: "exp" },
      "dashline",
      '"{"',
      { goals: "goals" },
      '"}"',
    ],
    "stmt:relation": [
      { name: "relation_name" },
      { exp: "exp" },
      "dashline",
      { clause_name: "clause_name" },
      '"{"',
      { goals: "goals" },
      '"}"',
    ],
    "stmt:find": [
      '"find"',
      { query_pattern: "query_pattern" },
      { limit: { $ap: ["optional", '"limit"', { $pattern: ["number"] }] } },
      '"{"',
      { goals: "goals" },
      '"}"',
    ],
    "stmt:trace": [
      '"trace"',
      { steps: { $ap: ["optional", '"steps"', { $pattern: ["number"] }] } },
      '"{"',
      { goals: "goals" },
      '"}"',
    ],
    "stmt:assert_find": [
      '"assert"',
      '"find"',
      { query_pattern: "query_pattern" },
      { limit: { $ap: ["optional", '"limit"', { $pattern: ["number"] }] } },
      '"{"',
      { goals: "goals" },
      '"}"',
    ],
    "stmt:assert_not_find": [
      '"assert"',
      '"not"',
      '"find"',
      { query_pattern: "query_pattern" },
      { limit: { $ap: ["optional", '"limit"', { $pattern: ["number"] }] } },
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
    "stmt:import_all": [
      '"import"',
      '"*"',
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
