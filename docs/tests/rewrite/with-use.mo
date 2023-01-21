rule add1 {
  add1(x) if Equal(x, 0) => 1
  add1(x) if Equal(x, 1) => 2
  add1(x) if Equal(x, 2) => 3
  add1(x) if Equal(x, 3) => 4
}

rule sub1 {
  sub1(x) if Equal(x, 1) => 0
  sub1(x) if Equal(x, 2) => 1
  sub1(x) if Equal(x, 3) => 2
}

rule r {
  use add1
  use sub1
}

print r(quote add1(1))
print r(quote add1(2))
print r(quote add1(3))
print r(quote add1(4))

print r(quote sub1(1))
print r(quote sub1(2))
print r(quote sub1(3))
print r(quote sub1(4))

print r(quote add1(sub1(1)))
print r(quote add1(sub1(2)))
print r(quote add1(sub1(3)))
print r(quote add1(sub1(4)))
