rule r {
  add1(x) => { if equal(x, 1) { return 2 } }
  add1(x) => { if equal(x, 2) { return 3 } }
  add1(x) => { if equal(x, 3) { return 4 } }
}

print r(quote add1(1))
print r(quote add1(2))
print r(quote add1(3))
print r(quote add1(4))
