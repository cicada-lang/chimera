export const stmt = {
  $grammar: {
    "stmt:fact": ['"check"', { exp: "exp" }, '":"', { t: "exp" }],
  },
}

export const stmts = {
  $grammar: {
    "stmts:stmts": [{ stmts: { $ap: ["zero_or_more", "stmt"] } }],
  },
}
