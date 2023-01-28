hyperrule H {
  ["a", "b"] +> quote ["c", "d"]
}

print hyperrewrite(H, quote ["a", "b"])
