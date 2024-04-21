rule add1 {
  add1(x) => if equal(x, 0) then 1
  add1(x) => if equal(x, 1) then 2
  add1(x) => if equal(x, 2) then 3
  add1(x) => if equal(x, 3) then 4
}

rule sub1 {
  sub1(x) => if equal(x, 1) then 0
  sub1(x) => if equal(x, 2) then 1
  sub1(x) => if equal(x, 3) then 2
}

rule r {
  include add1
  include sub1
}

print rewrite(r, quote add1(1))
print rewrite(r, quote add1(2))
print rewrite(r, quote add1(3))
print rewrite(r, quote add1(4))

print rewrite(r, quote sub1(1))
print rewrite(r, quote sub1(2))
print rewrite(r, quote sub1(3))
print rewrite(r, quote sub1(4))

print rewrite(r, quote add1(sub1(1)))
print rewrite(r, quote add1(sub1(2)))
print rewrite(r, quote add1(sub1(3)))
print rewrite(r, quote add1(sub1(4)))
