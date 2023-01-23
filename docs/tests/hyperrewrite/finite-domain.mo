hyperrule intervalDomain {
  // inconsistency

  [Range(_, a, b)]
  if and [Number(a), Number(b), gt(a, b)] =>
  [false]

  // intersection

  [Range(x, a, b), Range(x, c, d)]
  if and [Number(a), Number(b), Number(c), Number(d)] =>
  [Range(x, eval max(a, c), eval min(b, d))]

  // `LtEq(x, y)` means that `x` is less than or equal to `y`. Hence, `x`
  // cannot be larger than the upper bound `d` of `y`. Therefore, if the
  // upper bound `b` of `x` is larger than `d`, we can replace `b` by `d`
  // without removing any solutions.

  [LtEq(x, y), Range(x, a, b), Range(y, c, d)]
  if and [Number(b), Number(d), gt(b, d)] =>
  [LtEq(x, y), Range(x, a, d), Range(y, c, d)]

  // Analogously, one can reason on the lower bounds to tighten the
  // interval for `y`.

  [LtEq(x, y), Range(x, a, b), Range(y, c, d)]
  if and [Number(a), Number(c), lt(c, a)] =>
  [LtEq(x, y), Range(x, a, d), Range(y, a, d)]

  // The `Eq` constraint enforces the intersection of the intervals
  // associated with its variables provided the bounds are not yet the
  // same.

  [Eq(x, y), Range(x, a, b), Range(y, c, d)]
  if and [Number(a), Number(c), not equal(c, a)] =>
  [Eq(x, y), Range(x, eval max(a, c), b), Range(y, eval max(a, c), d)]

  [Eq(x, y), Range(x, a, b), Range(y, c, d)]
  if and [Number(b), Number(d), not equal(b, d)] =>
  [Eq(x, y), Range(x, a, eval min(b, d)), Range(y, c, eval min(b, d))]

  // The `NotEq` constraint can only cause a domain tightening if one of the
  // intervals denote a unique value that happens to be the bound of the
  // other intervals.

  [NotEq(x, y), Range(x, a, b), Range(y, c, d)]
  if and [Number(a), equal(a, c), equal(c, d)] =>
  [NotEq(x, y), Range(x, eval add1(a), b), Range(y, c, d)]

  // x + y = z

  [Add(x, y, z), Range(x, a, b), Range(y, c, d), Range(z, e, f)]
  if and [
    Number(a), Number(b),
    Number(c), Number(d),
    Number(e), Number(f),
    not and [
      gteq(a, sub(e, d)),
      lteq(b, sub(f, c)),
      gteq(c, sub(e, b)),
      lteq(d, sub(f, a)),
      gteq(e, add(a, c)),
      lteq(f, add(b, d)),
    ]
  ] =>
  [
    Add(x, y, z),
    Range(x, eval max(a, sub(e, d)), eval min(b, sub(f, c))),
    Range(y, eval max(c, sub(e, b)), eval min(d, sub(f, a))),
    Range(z, eval max(e, add(a, c)), eval min(f, add(b, d))),
  ]
}

clause NumberArray([])
clause NumberArray([a | d]) -- { Number(a) NumberArray(d) }

hyperrule enumerationDomain {
  // inconsistency

  [In(_, [])] => [false]

  // intersection

  [In(x, l1), In(x, l2)]
  if and [NumberArray(l1), NumberArray(l2)] =>
  [In(x, eval arrayIntersection(l1, l2))]

  [LtEq(x, y), In(x, l1), In(y, l2)]
  if and [NumberArray(l1), NumberArray(l2), gt(maximum(l1), maximum(l2))] =>
  [
    LtEq(x, y),
    In(x, eval arrayFilter(l1, (n) => lteq(n, maximum(l2)))),
    In(y, l2),
  ]

  [LtEq(x, y), In(x, l1), In(y, l2)]
  if and [NumberArray(l1), NumberArray(l2), gt(minimum(l1), minimum(l2))] =>
  [
    LtEq(x, y),
    In(x, l1),
    In(y, eval arrayFilter(l2, (n) => gteq(n, minimum(l1)))),
  ]

  [Eq(x, y), In(x, l1), In(y, l2)]
  if and [NumberArray(l1), NumberArray(l2), not equal(l1, l2)] =>
  [
    LtEq(x, y),
    In(x, eval arrayIntersection(l1, l2)),
    In(y, eval arrayIntersection(l1, l2)),
  ]
}

hyperrule finiteDomain {
  use intervalDomain
  use enumerationDomain
}

// intervalDomain

print finiteDomain(quote [Range(x, 2, 1)])
print finiteDomain(quote [Range(x, a, b), Range(x, c, d)])
print finiteDomain(quote [Range(x, 20, 100), Range(x, 30, 120)])
print finiteDomain(quote [LtEq(x, y), Range(x, 20, 150), Range(y, 30, 120)])
print finiteDomain(quote [Eq(x, y), Range(x, 20, 150), Range(y, 30, 120)])
print finiteDomain(quote [Range(x, 1, 3), Range(y, 2, 4), Range(z, 0, 4), Add(x, y, z)])

// enumerationDomain

print finiteDomain(quote [In(x, [])])
print finiteDomain(quote [In(x, [1, 2, 3]), In(x, [2, 3, 4])])
print finiteDomain(quote [LtEq(x, y), In(x, [4, 6, 7]), In(y, [3, 7])])
print finiteDomain(quote [LtEq(x, y), In(x, [2, 3, 4, 5]), In(y, [1, 2, 3])])
print finiteDomain(quote [LtEq(x, y), In(x, [2, 3, 4]), In(y, [0, 1])])
print finiteDomain(quote [Eq(x, y), In(x, [2, 3, 4, 5]), In(y, [1, 2, 3])])
