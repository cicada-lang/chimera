hyperrule intervalDomain {
  // inconsistency

  [Range(_, a, b)]
  if and [Number(a), Number(b), gt(a, b)]
  => [false]

  // intersection

  [Range(x, a, b), Range(x, c, d)]
  if and [Number(a), Number(b), Number(c), Number(d)]
  => [Range(x, unquote max(a, c), unquote min(b, d))]

  // `LtEq(x, y)` means that `x` is less than or equal to `y`. Hence, `x`
  // cannot be larger than the upper bound `d` of `y`. Therefore, if the
  // upper bound `b` of `x` is larger than `d`, we can replace `b` by `d`
  // without removing any solutions.

  [LtEq(x, y), Range(x, a, b), Range(y, c, d)]
  if and [Number(b), Number(d), gt(b, d)]
  => [LtEq(x, y), Range(x, a, d), Range(y, c, d)]

  // Analogously, one can reason on the lower bounds to tighten the
  // interval for `y`.

  [LtEq(x, y), Range(x, a, b), Range(y, c, d)]
  if and [Number(a), Number(c), lt(c, a)]
  => [LtEq(x, y), Range(x, a, d), Range(y, a, d)]

  // The `Eq` constraint enforces the intersection of the intervals
  // associated with its variables provided the bounds are not yet the
  // same.

  [Eq(x, y), Range(x, a, b), Range(y, c, d)]
  if and [Number(a), Number(c), not equal(c, a)]
  => [Eq(x, y), Range(x, unquote max(a, c), b), Range(y, unquote max(a, c), d)]

  [Eq(x, y), Range(x, a, b), Range(y, c, d)]
  if and [Number(b), Number(d), not equal(b, d)]
  => [Eq(x, y), Range(x, a, unquote min(b, d)), Range(y, c, unquote min(b, d))]

  // The `NotEq` constraint can only cause a domain tightening if one of the
  // intervals denote a unique value that happens to be the bound of the
  // other intervals.

  [NotEq(x, y), Range(x, a, b), Range(y, c, d)]
  if and [Number(a), equal(a, c), equal(c, d)]
  => [NotEq(x, y), Range(x, unquote add1(a), b), Range(y, c, d)]

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
  ]
  => [
    Add(x, y, z),
    Range(x, unquote max(a, sub(e, d)), unquote min(b, sub(f, c))),
    Range(y, unquote max(c, sub(e, b)), unquote min(d, sub(f, a))),
    Range(z, unquote max(e, add(a, c)), unquote min(f, add(b, d))),
  ]
}

clause NumberArray([])
clause NumberArray([a | d]) -- { Number(a) NumberArray(d) }

hyperrule enumerationDomain {
  // inconsistency

  [In(_, [])] => [false]

  // intersection

  [In(x, l1), In(x, l2)]
  if and [NumberArray(l1), NumberArray(l2)]
  => [In(x, unquote arrayIntersection(l1, l2))]
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
