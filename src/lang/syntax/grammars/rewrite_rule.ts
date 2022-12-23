export const rewrite_rule = {
  $grammar: {
    "rewrite_rule:case": [{ from: "exp" }, '"="', '">"', { to: "exp" }],
    "rewrite_rule:call": [{ exp: "exp" }],
  },
}

export const rewrite_rules = {
  $grammar: {
    "rewrite_rules:rewrite_rules": [
      { rewrite_rules: { $ap: ["zero_or_more", "rewrite_rule"] } },
    ],
  },
}
