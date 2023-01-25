import {
  Positive,
  GreaterThanOne,
  Add,
} from "07-a-bit-too-much.mo"

clause Mul([], _m, [])
clause Mul(n, [], []) -- { Positive(n) }
clause Mul([1], m, m) -- { Positive(m) }
clause Mul(n, [1], n) -- { GreaterThanOne(n) }
clause Mul([0 | x], m, [0 | z]) -- { Positive(x) Positive(z) GreaterThanOne(m) Mul(x, m, z) }
clause Mul([1 | x], [0 | y], p) -- { Positive(x) Positive(y) Mul([0 | y], [1 | x], p) }
clause Mul([1 | x], [1 | y], p) -- { Positive(x) Positive(y) MulOdd(x, [1 | x], [1 | y], p) }

// x = (n - 1) / 2

clause MulOdd(x, n, m, p)
-------------------- {
  MulBound(q, p, n, m)
  Mul(x, m, q)
  Add([0 | q], m, p)
}

// NOTE Limit the length of the q above.

clause MulBound([], p, _n, _m) -- { Positive(p) }
clause MulBound([_a0 | x], [_a1 | y], [], [_a2 | z]) -- { MulBound(x, y, z, []) }
clause MulBound([_a0 | x], [_a1 | y], [_a2 | z], m) -- { MulBound(x, y, z, m) }

print find [x, y, r] limit 10 {
  Mul(x, y, r)
}

print find p {
  Mul([0, 1], [0, 0, 1], p)
}

print find [x, y, r] limit 1 {
  Equal(x, [1, 1])
  Equal(y, [1, 1])
  Equal(r, [1, 0, 0, 1])
  Mul(x, y, r)
}

print find [n, m] limit 1 {
  Mul(n, m, [1])
}

print find [n, m] limit 2 {
  Mul(n, m, [1, 1])
}

// NOTE Without MulBound,
// the following query has no value,
// because Mul tries
//   n = 2, 3, 4, ...
//   m = 2, 3, 4, ...
// We need MulBound to make this query fail.

print find [n, m] limit 1 {
  GreaterThanOne(n)
  GreaterThanOne(m)
  Mul(n, m, [1, 1])
}

// NOTE With MulBound we can also
// safely do the following query:

print find [n, m] {
  Mul(n, m, [1])
}

print find p {
  Mul([1, 1, 1], [1, 1, 1, 1, 1, 1], p)
}

clause EqualLength([], [])
clause EqualLength([1], [1])
clause EqualLength([_a | x], [_b | y])
----------------------------------- {
  Positive(x)
  Positive(y)
  EqualLength(x, y)
}

print find [w, x, y] {
  EqualLength([1, w, x | y], [0, 1, 1, 0, 1])
}

print find b {
  EqualLength([1], [b])
}

print find n {
  EqualLength([1, 0, 1 | n], [0, 1, 1, 0, 1])
}

print find [y, z] limit 5 {
  EqualLength([1 | y], [1 | z])
}

print find [y, z] limit 5 {
  EqualLength([1 | y], [0 | z])
}
