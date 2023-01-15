rule ruleCaseWithGuard {
  add1(x) if Equal(x, 1) => 2
  add1(x) if Equal(x, 2) => 3
  add1(x) if Equal(x, 3) => 4
}

print ruleCaseWithGuard(quote add1(1))
print ruleCaseWithGuard(quote add1(2))

print r1(quote f(1, 1))
print r1(quote f(1, 2))
