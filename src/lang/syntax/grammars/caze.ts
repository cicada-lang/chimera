export const caze = {
  $grammar: {
    "caze:caze": [
      { pattern: "exp" },
      '"="',
      '">"',
      '"{"',
      { stmts: "stmts" },
      '"}"',
    ],
    "caze:caze_with_exp": [{ pattern: "exp" }, '"="', '">"', { exp: "exp" }],
  },
}

export const cazes = {
  $grammar: {
    "cazes:cazes": [{ cazes: { $ap: ["zero_or_more", "caze"] } }],
  },
}
