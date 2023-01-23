rule r {
  add1(x) => if equal(x, 1) then 2
  add1(x) => if equal(x, 2) then 3
  add1(x) => if equal(x, 3) then 4
}

print r(quote add1(1))
print r(quote add1(2))
print r(quote add1(3))
print r(quote add1(4))
