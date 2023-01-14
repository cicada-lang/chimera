print find _ {
  String("A")
}

print find _ {
  String(1)
}

print find x {
  x = "cat"
  String(x)
}

// Reification.

print find x {
  String(x)
}

// An unification breaks a type constraint.

print find x {
  String(x)
  x = 1
}

// An indirect unification breaks a type constraint.

print find x {
  String(x)
  x = z
  z = 1
}

print find x {
  x = z
  z = 1
  String(x)
}

print find x {
  x = z
  String(x)
  z = 1
}

// An unification subsums a type constraint.

print find x {
  String(x)
  x = "A"
}

// An indirect unification subsums a type constraint.

print find x {
  String(x)
  x = z
  z = "A"
}

print find x {
  x = z
  z = "A"
  String(x)
}

print find x {
  x = z
  String(x)
  z = "A"
}
