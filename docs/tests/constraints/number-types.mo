print find _ {
  Number(1)
}

print find _ {
  Number("A")
}

print find x {
  x = "cat"
  Number(x)
}

print find x {
  x = 1
  Number(x)
}

print find x {
  Number(x)
  String(x)
}

// An inequality is subsumed by a type constraint.

print find x {
  x != "cat"
  Number(x)
}

// An inequality (applied later) is subsumed by a type constraint.

print find x {
  Number(x)
  x != "cat"
}

// An inequality (applied later) is subsumed by an indirect type constraint.

print find x {
  Number(z)
  z = x
  x != "cat"
}

print find x {
  Number(z)
  x != "cat"
  z = x
}

// An inequality (in a conjunction) is subsumed by a type constraint.

print find [x, y] {
  [x, y] != ["cat", 1]
  Number(x)
}

// An inequality (in a conjunction and applied later) is subsumed by a type constraint.

print find [x, y] {
  Number(x)
  [x, y] != ["cat", 1]
}
