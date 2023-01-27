hyperrule abc {
  ["a", "b"] => quote ["c"]
  ["a", "c"] => quote ["b"]
  ["b", "c"] => quote ["a"]
}

print hyperrewrite(abc, quote ["a", "a", "a"])

print hyperrewrite(abc, quote [
  "a", "b", "b", "a",
])

print hyperrewrite(abc, quote [
  "a", "b", "b", "a",
  "a",
])

print hyperrewrite(abc, quote [
  "a", "b", "b", "a",
  "a", "a",
])

print hyperrewrite(abc, quote [
  "a", "b", "b", "a",
  "a", "a", "a",
])
