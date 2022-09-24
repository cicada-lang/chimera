export const stmt = {
  $grammar: {
    "stmt:fact": [{ name: "name" }, { exp: "exp" }],
    "stmt:rule": [{ name: "name" }, { exp: "exp" }, "dashline", ],
  },
}

export const stmts = {
  $grammar: {
    "stmts:stmts": [{ stmts: { $ap: ["zero_or_more", "stmt"] } }],
  },
}
