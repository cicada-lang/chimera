rule conjunctiveNormalForm {
  not(not(x)) => x
  not(and(x, y)) => or(not(x), not(y))
  not(or(x, y)) => and(not(x), not(y))
  or(and(x, y), z) => and(or(x, z), or(y, z))
  or(x, and(y, z)) => and(or(x, y), or(x, z))
}

print conjunctiveNormalForm(
  quote not(and(not(A), not(B)))
)
