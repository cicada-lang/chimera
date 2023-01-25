print find _ {
  String("A")
}

print find _ {
  String(1)
}

print find x {
  Equal(x, "cat")
  String(x)
}

// Reification.

print find x {
  String(x)
}

// An unification breaks a type constraint.

print find x {
  String(x)
  Equal(x, 1)
}

// An indirect unification breaks a type constraint.

print find x {
  String(x)
  Equal(x, z)
  Equal(z, 1)
}

print find x {
  Equal(x, z)
  Equal(z, 1)
  String(x)
}

print find x {
  Equal(x, z)
  String(x)
  Equal(z, 1)
}

// An unification subsums a type constraint.

print find x {
  String(x)
  Equal(x, "A")
}

// An indirect unification subsums a type constraint.

print find x {
  String(x)
  Equal(x, z)
  Equal(z, "A")
}

print find x {
  Equal(x, z)
  Equal(z, "A")
  String(x)
}

print find x {
  Equal(x, z)
  String(x)
  Equal(z, "A")
}
