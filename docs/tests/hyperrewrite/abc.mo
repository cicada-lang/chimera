hyperrule abc {
  ["a", "b"] => quote ["c"]
  ["a", "c"] => quote ["b"]
  ["b", "c"] => quote ["a"]
}

print abc(quote ["a", "a", "a"])

print abc(quote [
  "a", "b", "b", "a",
])

print abc(quote [
  "a", "b", "b", "a",
  "a",
])

print abc(quote [
  "a", "b", "b", "a",
  "a", "a",
])

print abc(quote [
  "a", "b", "b", "a",
  "a", "a", "a",
])
