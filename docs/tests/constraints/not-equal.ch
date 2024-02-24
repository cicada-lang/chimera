print find _ {
  NotEqual(1, 1)
}

print find _ {
  NotEqual(1, 2)
}

print find [x, y] {
  NotEqual(y, "cat")
  NotEqual([x, 3], [5, y])
  Equal([3, x], [y, 5])
}

print find [x, y] {
  NotEqual(y, "cat")
  NotEqual([x, 3], [5, y])
  Equal([x, "cat"], [5, y])
}

print find [x, y] {
  NotEqual(y, "cat")
  NotEqual([x, 3], [5, y])
  Equal([x, 5], [3, y])
}

print find [x, y] {
  NotEqual([x, 3], ["cat", y])
  Equal(x, "cat")
}

// disj of not equal

print find [x, y] {
  NotEqual([x, y], [1, 2])
}

print find [x, y] {
  NotEqual([x, y], [1, 2])
  Equal(x, 1)
}

print find [x, y] {
  NotEqual([x, y], [1, 2])
  Equal(x, 1)
  Equal(y, 2)
}

// filter somePairContainsVar

print find x {
  NotEqual(x, 1)
  NotEqual(_y, 2)
}

// removeSubsumed

print find [x, y] {
  NotEqual(x, 3)
  NotEqual([x, "cat"], [3, y])
}
