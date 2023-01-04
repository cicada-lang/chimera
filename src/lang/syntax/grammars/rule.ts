export const rule = {
  $grammar: {
    "rule:case": [{ from: "exp" }, '"="', '">"', { to: "exp" }],
  },
}

export const rules = {
  $grammar: {
    "rules:rules": [{ rules: { $ap: ["zero_or_more", "rule"] } }],
  },
}
