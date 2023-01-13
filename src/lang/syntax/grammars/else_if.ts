export const else_if = {
  $grammar: {
    "else_if:else_if": [
      '"else"',
      '"if"',
      { target: "exp" },
      '"{"',
      { stmts: "stmts" },
      '"}"',
    ],
  },
}

export const else_ifs = {
  $grammar: {
    "else_ifs:else_ifs": [{ else_ifs: { $ap: ["zero_or_more", "else_if"] } }],
  },
}
