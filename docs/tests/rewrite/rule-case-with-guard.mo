rule ruleCaseWithGuard {
  add1(x) if Equal(x, 1) => 2
  add1(x) if Equal(x, 2) => 3
  add1(x) if Equal(x, 3) => 4
}

print ruleCaseWithGuard(quote add1(1))
print ruleCaseWithGuard(quote add1(2))
print ruleCaseWithGuard(quote add1(3))
print ruleCaseWithGuard(quote add1(4))
