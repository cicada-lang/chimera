export const rule = {
  $grammar: {
    "rule:case": [
      { pattern: "exp" },
      '"="',
      '">"',
      '"{"',
      { stmts: "stmts" },
      '"}"',
    ],
    "rule:case_with_exp": [{ pattern: "exp" }, '"="', '">"', { exp: "exp" }],
    "rule:include": ['"include"', { exp: "exp" }],
  },
}

export const rules = {
  $grammar: {
    "rules:rules": [{ rules: { $ap: ["zero_or_more", "rule"] } }],
  },
}
