print find _ {
  1 != 1
}

print find _ {
  1 != 2
}

print find [x, y] {
  y != "cat"
  [x, 3] != [5, y]
  [3, x] = [y, 5]
}

print find [x, y] {
  y != "cat"
  [x, 3] != [5, y]
  [x, "cat"] = [5, y]
}

print find [x, y] {
  y != "cat"
  [x, 3] != [5, y]
  [x, 5] = [3, y]
}

print find [x, y] {
  [x, 3] != ["cat", y]
  x = "cat"
}

// disj of not equal

print find [x, y] {
  [x, y] != [1, 2]
}

print find [x, y] {
  [x, y] != [1, 2]
  x = 1
}

print find [x, y] {
  [x, y] != [1, 2]
  x = 1
  y = 2
}

// filter somePairContainsVar

print find x {
  x != 1
  _y != 2
}

// removeSubsumed

print find [x, y] {
  x != 3
  [x, "cat"] != [3, y]
}
