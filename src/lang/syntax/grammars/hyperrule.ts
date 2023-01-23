export const hyperrule = {
  $grammar: {
    "hyperrule:simplify": [{ from: "elements" }, '"="', '">"', { to: "exp" }],
    "hyperrule:simplify_guard": [
      { from: "elements" },
      '"if"',
      { guard: "exp" },
      '"="',
      '">"',
      { to: "exp" },
    ],
    "hyperrule:propagate": [{ from: "elements" }, '"+"', '">"', { to: "exp" }],
    "hyperrule:propagate_guard": [
      { from: "elements" },
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
