relation Bit(0)
relation Bit(1)

print find x {
  Bit(x)
}

relation BitXor(0, 0, 0)
relation BitXor(0, 1, 1)
relation BitXor(1, 0, 1)
relation BitXor(1, 1, 0)

print find [x, y] {
  BitXor(x, y, 0)
}

print find [x, y] {
  BitXor(x, y, 1)
}

print find [x, y, r] {
  BitXor(x, y, r)
}

relation BitAnd(0, 0, 0)
relation BitAnd(0, 1, 0)
relation BitAnd(1, 0, 0)
relation BitAnd(1, 1, 1)

print find [x, y] {
  BitAnd(x, y, 1)
}

// x + y = r + 2 * c

relation HalfAdder(x, y, r, c)
---------------------- {
  BitXor(x, y, r)
  BitAnd(x, y, c)
}

print find r {
  HalfAdder(1, 1, r, 1)
}

print find [x, y, r, c] {
  HalfAdder(x, y, r, c)
}

// b + x + y = r + 2 * c

relation FullAdder(b, x, y, r, c)
------------------------- {
  HalfAdder(x, y, w, xy)
  HalfAdder(w, b, r, wz)
  BitXor(xy, wz, c)
}

print find [r, c] {
  FullAdder(0, 1, 1, r, c)
}

print find [r, c] {
  FullAdder(1, 1, 1, r, c)
}

print find [b, x, y, r, c] {
  FullAdder(b, x, y, r, c)
}

export relation Positive(n)
---------------- {
  Equal([_a | _d], n)
}

print find _ {
  Positive([0, 1, 1])
}

print find _ {
  Positive([1])
}

print find _ {
  Positive([])
}

print find r {
  Positive(r)
}

export relation GreaterThanOne(n)
--------------------- {
  Equal([_a, _ad | _dd], n)
}

print find _ {
  GreaterThanOne([0, 1, 1])
}

print find _ {
  GreaterThanOne([0, 1])
}

print find _ {
  GreaterThanOne([1])
}

print find _ {
  GreaterThanOne([])
}

print find r {
  GreaterThanOne(r)
}

relation Adder(0, n, [], n)
relation Adder(0, [], m, m) -- { Positive(m) }
relation Adder(1, n, [], r) -- { Adder(0, n, [1], r) }
relation Adder(1, [], m, r) -- { Positive(m) Adder(0, [1], m, r) }
relation Adder(b, [1], [1], [a, c]) -- { FullAdder(b, 1, 1, a, c) }
relation Adder(b, [1], m, r) -- { GenAdder(b, [1], m, r) }
relation Adder(b, n, [1], r) -- { GreaterThanOne(n) GreaterThanOne(r) Adder(b, [1], n, r) }
relation Adder(b, n, m, r) -- { GreaterThanOne(n) GenAdder(b, n, m, r) }

// Given the carry bit b,
// and the numbers n, m, and r,
// `GenAdder` satisfies b + n + m = r,
// provided that n is positive
// and m and r are greater than one.

relation GenAdder(b, n, m, r)
------------------------- {
  Equal([a | x], n)
  Equal([d | y], m)  Positive(y)
  Equal([c | z], r)  Positive(z)
  FullAdder(b, a, d, c, e)
  Adder(e, x, y, z)
}

print find [x, y, r] limit 2 {
  Adder(0, x, y, r)
}

print find [x, y, r] limit 3 {
  Adder(0, x, y, r)
}

print find [x, y, r] limit 4 {
  Adder(0, x, y, r)
}

print find [x, y, r] limit 5 {
  Adder(0, x, y, r)
}

print find [x, y, r] limit 19 {
  Adder(0, x, y, r)
}

print find [x, y] {
  Adder(0, x, y, [1, 0, 1])
}

export relation Add(x, y, r)
--------------------- {
  Adder(0, x, y, r)
}

print find [x, y] {
  Add(x, y, [1])
}

print find [x, y] {
  Add(x, y, [0, 1])
}

print find [x, y] {
  Add(x, y, [1, 1])
}

print find [x, y] {
  Add(x, y, [1, 0, 1])
}

relation Sub(n, m, k)
---------------- {
  Add(m, k, n)
}

print find q {
  Sub([1], [1], q)
}

print find q {
  Sub([], [1], q)
}

print find q {
  Sub([1, 1], [1], q)
}

print find q {
  Sub([0, 0, 0, 1], [1, 0, 1], q)
}

print find q {
  Add([1, 1], [1, 0, 1], q)
}

// print find [x, y] {
//   Add(x, y, [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1])
// }

// print find [x, y] {
//   Add(x, y, [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1])
// }

relation Length([], [])
relation Length([_a | d], n) -- {
  Add([1], res, n)
  Length(d, res)
}

print find n limit 1 {
  Length(["jicama", "rhubarb", "guava"], n)
}

print find l {
  Length(l, [1])
}

print find l {
  Length(l, [0, 1])
}

print find q limit 3 {
  Length(q, q)
}

// NOTE The following query has no value,
// since it is still looking for the fourth value,
// but there is non.

// print find q limit 4 {
//   Length(q, q)
// }
