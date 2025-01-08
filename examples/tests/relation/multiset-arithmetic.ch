// "A multiset approach to arithmetic"
// https://www.youtube.com/watch?v=4xoF2SRp194

relation Multiset([])
relation Multiset([car | cdr]) -- { Multiset(car) Multiset(cdr) }

// print find x limit 10 {
//   Multiset(x)
// }

relation Zero([])

relation Nat([])
relation Nat([car | cdr]) -- { Zero(car) Nat(cdr) }

// print find x limit 10 {
//   Nat(x)
// }

relation Poly([])
relation Poly([car | cdr]) -- { Nat(car) Poly(cdr) }

// print find x limit 10 {
//   Poly(x)
// }

relation Multi([])
relation Multi([car | cdr]) -- { Poly(car) Multi(cdr) }

// print find x limit 10 {
//   Multi(x)
// }

relation Append([], t, t)
relation Append([a | d], t, out) -- {
  Equal(out, [a | res])
  Append(d, t, res)
}

relation Add(x, y, z) -- { Append(x, y, z) }

relation AddMany([], [])
relation AddMany([x], x)
relation AddMany([x, y | rest], out) -- {
  Add(x, y, z)
  AddMany([z | rest], out)
}

// print find [x, y, out] limit 10 {
//   Nat(x)
//   Nat(y)
//   Add(x, y, out)
// }

// print find [xs, out] limit 20 {
//   Poly(xs)
//   AddMany(xs, out)
// }

relation Product([], _, [])
relation Product([_x | _xs], [], [])
relation Product([x | xs], [y | ys], out) -- {
  Product([x], ys, xSide)
  Product(xs, [y], ySide)
  Product(xs, ys, body)
  Append(xSide, ySide, sides)
  Append(sides, body, tmp)
  Equal(out, [[x, y] | tmp])
}

print find q {
  Product([1], ["a"], q)
}

print find q {
  Product([1, 2], ["a", "b"], q)
}

print find q {
  Product([1, 2, 3], ["a", "b", "c"], q)
}

relation AddPairs([], [])
relation AddPairs([[x, y] | ps], [z | res]) -- {
  Add(x, y, z)
  AddPairs(ps, res)
}

relation Mul(x, y, z) -- {
  Product(x, y, pairs)
  AddPairs(pairs, z)
}

print find z {
  Mul([[], []], [[], []], z)
}

print find [x, y] limit 3 {
  Mul(x, y, [[], [], [], []])
}

print find [x, y, z] limit 10 {
  Nat(x)
  Nat(y)
  Mul(x, y, z)
}

relation MulMany([], [])
relation MulMany([x], x)
relation MulMany([x, y | rest], out) -- {
  Mul(x, y, z)
  MulMany([z | rest], out)
}

print find z {
  MulMany([[[], []], [[], []], [[], []]], z)
}

print find z {
  MulMany([[[], []], [[]]], z)
}

print find z {
  MulMany([[[]], [[], []]], z)
}

print find z {
  MulMany([[[], []]], z)
}

print find [x, y] limit 2 {
  Nat(x)
  Nat(y)
  Mul(x, y, [[], []])
}

print find [xs, z] limit 20 {
  Poly(xs)
  MulMany(xs, z)
}
