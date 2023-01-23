export const hyperrule = {
  $grammar: {
    "hyperrule:simplify": [{ from: "exp" }, '"="', '">"', { to: "exp" }],
    "hyperrule:simplify_guard": [
      { from: "exp" },
      '"if"',
      { guard: "exp" },
      '"="',
      '">"',
      { to: "exp" },
    ],
    "hyperrule:propagate": [{ from: "exp" }, '"+"', '">"', { to: "exp" }],
    "hyperrule:propagate_guard": [
      { from: "exp" },
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
