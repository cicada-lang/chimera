rule conjunctiveNormalForm {
  not(not(x)) => quote x
  not(and(x, y)) => quote or(not(x), not(y))
  not(or(x, y)) => quote and(not(x), not(y))
  or(and(x, y), z) => quote and(or(x, z), or(y, z))
  or(x, and(y, z)) => quote and(or(x, y), or(x, z))
}

print conjunctiveNormalForm(quote not(and(not(A), not(B))))

print rewriteManySteps(3, conjunctiveNormalForm, quote not(and(not(A), not(B))))
print rewriteManySteps(10, conjunctiveNormalForm, quote not(and(not(A), not(B))))
