export const stmt = {
  $grammar: {
    "stmt:clause_no_goals_no_name": [
      '"clause"',
      { name: "relation_name" },
      { args: "args" },
    ],
    "stmt:clause_no_goals": [
      '"clause"',
      { name: "relation_name" },
      { args: "args" },
      "dashline",
      { clause_name: "clause_name" },
    ],
    "stmt:clause_no_name": [
      '"clause"',
      { name: "relation_name" },
      { args: "args" },
      "dashline",
      '"{"',
      { goals: "goals" },
      '"}"',
    ],
    "stmt:clause": [
      '"clause"',
      { name: "relation_name" },
      { args: "args" },
      "dashline",
      { clause_name: "clause_name" },
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
    "stmt:private": [
      '"private"',
      '"{"',
      { stmts: { $ap: ["zero_or_more", "stmt"] } },
      '"}"',
    ],
    "stmt:rule": [
      '"rule"',
      { name: "rule_name" },
      '"{"',
      { rules: "rules" },
      '"}"',
    ],
    "stmt:hyperrule": [
      '"hyperrule"',
      { name: "rule_name" },
      '"{"',
      { hyperrules: "hyperrules" },
      '"}"',
    ],
    "stmt:let": ['"let"', { name: "variable_name" }, '"="', { exp: "exp" }],
    "stmt:print": ['"print"', { exp: "exp" }],
    "stmt:compute": ['"compute"', { exp: "exp" }],
    "stmt:fn": [
      '"function"',
      { name: "variable_name" },
      { patterns: "args" },
      '"{"',
      { stmts: "stmts" },
      '"return"',
      { ret: "exp" },
      '"}"',
    ],
    "stmt:return": ['"return"', { exp: "exp" }],
  },
}

export const stmts = {
  $grammar: {
    "stmts:stmts": [{ stmts: { $ap: ["zero_or_more", "stmt"] } }],
  },
}
