export const stmt = {
  $grammar: {
     "stmt:fact": [{ name: "name" }, { exp: "exp" }],
  },
}

export const stmts = {
  $grammar: {
    "stmts:stmts": [{ stmts: { $ap: ["zero_or_more", "stmt"] } }],
  },
}
