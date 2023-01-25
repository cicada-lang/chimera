print find _ {
  Number(1)
}

print find _ {
  Number("A")
}

print find x {
  Equal(x, "cat")
  Number(x)
}

print find x {
  Equal(x, 1)
  Number(x)
}

print find x {
  Number(x)
  String(x)
}

// An inequality is subsumed by a type constraint.

print find x {
  NotEqual(x, "cat")
  Number(x)
}

// An inequality (applied later) is subsumed by a type constraint.

print find x {
  Number(x)
  NotEqual(x, "cat")
}

// An inequality (applied later) is subsumed by an indirect type constraint.

print find x {
  Number(z)
  Equal(z, x)
  NotEqual(x, "cat")
}

print find x {
  Number(z)
  NotEqual(x, "cat")
  Equal(z, x)
}

// An inequality (in a conjunction) is subsumed by a type constraint.

print find [x, y] {
  NotEqual([x, y], ["cat", 1])
  Number(x)
}

// An inequality (in a conjunction and applied later) is subsumed by a type constraint.

print find [x, y] {
  Number(x)
  NotEqual([x, y], ["cat", 1])
}
