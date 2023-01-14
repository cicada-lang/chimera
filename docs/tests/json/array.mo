print find abc {
  abc = ["a", "b", "c"]
}

print find [a, b, c] {
  [a, b, c] = ["a", "b", "c"]
}

print find empty {
  empty = []
}

print find [head, rest] {
  [head | rest] = ["a", "b", "c"]
}

print find [head, rest] {
  [head | rest] = ["a" | "b"]
}

print find [head, rest, result] {
  [head | rest] = ["a" | "b"]
  result = [head | rest]
}
