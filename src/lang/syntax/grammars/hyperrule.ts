export const hyperrule = {
  $grammar: {
    "hyperrule:simplify": [
      { from: "elements" },
      '"="',
      '">"',
      { to: "elements" },
    ],
    "hyperrule:simplify_guard": [
      { from: "elements" },
      '"if"',
      { guard: "exp" },
      '"="',
      '">"',
      { to: "elements" },
    ],
    "hyperrule:propagate": [
      { from: "elements" },
      '"+"',
      '">"',
      { to: "elements" },
    ],
    "hyperrule:propagate_guard": [
      { from: "elements" },
      '"if"',
      { guard: "exp" },
      '"+"',
      '">"',
      { to: "elements" },
    ],
  },
}

export const hyperrules = {
  $grammar: {
    "hyperrules:hyperrules": [
      { hyperrules: { $ap: ["zero_or_more", "hyperrule"] } },
    ],
  },
}
