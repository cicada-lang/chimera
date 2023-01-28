hyperrule h {
  ["a", "b"] +> quote ["c", "d"]
}

print hyperrewrite(h, quote ["a", "b"])
