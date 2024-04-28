hyperrule ABC {
  ["a", "b"] => quote ["c"]
  ["a", "c"] => quote ["b"]
  ["b", "c"] => quote ["a"]
}

print hyperrewrite(ABC, quote ["a", "a", "a"])

print hyperrewrite(ABC, quote [
  "a", "b", "b", "a",
])

print hyperrewrite(ABC, quote [
  "a", "b", "b", "a",
  "a",
])

print hyperrewrite(ABC, quote [
  "a", "b", "b", "a",
  "a", "a",
])

print hyperrewrite(ABC, quote [
  "a", "b", "b", "a",
  "a", "a", "a",
])
