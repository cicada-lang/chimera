hyperrule abc {
  ["a", "b"] => ["c"]
  ["a", "c"] => ["b"]
  ["b", "c"] => ["a"]
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
