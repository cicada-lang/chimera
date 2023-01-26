export const hyperrule = {
  $grammar: {
    "hyperrule:simplify": [
      { pattern: "exp" },
      '"="',
      '">"',
      '"{"',
      { stmts: "stmts" },
      '"}"',
    ],
    "hyperrule:simplify_with_exp": [
      { pattern: "exp" },
      '"="',
      '">"',
      { exp: "exp" },
    ],
    "hyperrule:propagate": [
      { pattern: "exp" },
      '"+"',
      '">"',
      '"{"',
      { stmts: "stmts" },
      '"}"',
    ],
    "hyperrule:propagate_with_exp": [
      { pattern: "exp" },
      '"+"',
      '">"',
      { exp: "exp" },
    ],
    "hyperrule:include": ['"include"', { exp: "exp" }],
  },
}

export const hyperrules = {
  $grammar: {
    "hyperrules:hyperrules": [
      { hyperrules: { $ap: ["zero_or_more", "hyperrule"] } },
    ],
  },
}
