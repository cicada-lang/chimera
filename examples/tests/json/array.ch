print find abc {
  Equal(abc, ["a", "b", "c"])
}

print find [a, b, c] {
  Equal([a, b, c], ["a", "b", "c"])
}

print find empty {
  Equal(empty, [])
}

print find [head, rest] {
  Equal([head | rest], ["a", "b", "c"])
}

print find [head, rest] {
  Equal([head | rest], ["a" | "b"])
}

print find [head, rest, result] {
  Equal([head | rest], ["a" | "b"])
  Equal(result, [head | rest])
}
