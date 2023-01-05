export const hyperrule = {
  $grammar: {
    "hyperrule:case": [{ from: "elements" }, '"="', '">"', { to: "elements" }],
  },
}

export const hyperrules = {
  $grammar: {
    "hyperrules:hyperrules": [
      { hyperrules: { $ap: ["zero_or_more", "hyperrule"] } },
    ],
  },
}
