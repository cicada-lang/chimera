export const hyperrule = {
  $grammar: {
    "hyperrule:simplify": [{ pattern: "exp" }, '"="', '">"', { to: "exp" }],
    "hyperrule:simplify_guard": [
      { pattern: "exp" },
      '"if"',
      { guard: "exp" },
      '"="',
      '">"',
      { to: "exp" },
    ],
    "hyperrule:propagate": [{ pattern: "exp" }, '"+"', '">"', { to: "exp" }],
    "hyperrule:propagate_guard": [
      { pattern: "exp" },
      '"if"',
      { guard: "exp" },
      '"+"',
      '">"',
      { to: "exp" },
    ],
    "hyperrule:use": ['"use"', { exp: "exp" }],
  },
}

export const hyperrules = {
  $grammar: {
    "hyperrules:hyperrules": [
      { hyperrules: { $ap: ["zero_or_more", "hyperrule"] } },
    ],
  },
}
