export const rule = {
  $grammar: {
    "rule:case": [{ from: "exp" }, '"="', '">"', { to: "exp" }],
    "rule:case_guard": [
      { from: "exp" },
      '"if"',
      { guard: "exp" },
      '"="',
      '">"',
      { to: "exp" },
    ],
  },
}

export const rules = {
  $grammar: {
    "rules:rules": [{ rules: { $ap: ["zero_or_more", "rule"] } }],
  },
}
