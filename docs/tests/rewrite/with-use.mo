rule add1 {
  add1(x) => { if equal(x, 0) { return 1 } }
  add1(x) => { if equal(x, 1) { return 2 } }
  add1(x) => { if equal(x, 2) { return 3 } }
  add1(x) => { if equal(x, 3) { return 4 } }
}

rule sub1 {
  sub1(x) => { if equal(x, 1) { return 0 } }
  sub1(x) => { if equal(x, 2) { return 1 } }
  sub1(x) => { if equal(x, 3) { return 2 } }
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
