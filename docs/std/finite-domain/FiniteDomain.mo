hyperrule IntervalDomain {
  [Range(_, a, b)] =>
  if and [isNumber(a), isNumber(b), gt(a, b)]
  then false

  [Range(x, a, b), Range(x, c, d)] =>
  if and [isNumber(a), isNumber(b), isNumber(c), isNumber(d)]
  then quote [Range(x, eval max(a, c), eval min(b, d))]

  // `LtEq(x, y)` means that `x` is less than or equal to `y`. Hence, `x`
  // cannot be larger than the upper bound `d` of `y`. Therefore, if the
  // upper bound `b` of `x` is larger than `d`, we can replace `b` by `d`
  // without removing any solutions.

  [LtEq(x, y), Range(x, a, b), Range(y, c, d)] =>
  if and [isNumber(b), isNumber(d), gt(b, d)]
  then quote [LtEq(x, y), Range(x, a, d), Range(y, c, d)]

  // Analogously, one can reason on the lower bounds to tighten the
  // interval for `y`.

  [LtEq(x, y), Range(x, a, b), Range(y, c, d)] =>
  if and [isNumber(a), isNumber(c), lt(c, a)]
  then quote [LtEq(x, y), Range(x, a, d), Range(y, a, d)]

  // The `NotEqual` constraint can only cause a domain tightening if one of the
  // intervals denote a unique value that happens to be the bound of the
  // other intervals.

  // [Range(x, a, b), Range(y, c, d)] =>
  // if and [satisfy(NotEqual(x, y)), isNumber(a), equal(a, c), equal(c, d)]
  // then quote [Range(x, eval add1(a), b), Range(y, c, d)]

  // x + y = z

  [Add(x, y, z), Range(x, a, b), Range(y, c, d), Range(z, e, f)] =>
  if and [
    isNumber(a), isNumber(b),
    isNumber(c), isNumber(d),
    isNumber(e), isNumber(f),
    not and [
      gteq(a, sub(e, d)),
      lteq(b, sub(f, c)),
      gteq(c, sub(e, b)),
      lteq(d, sub(f, a)),
      gteq(e, add(a, c)),
      lteq(f, add(b, d)),
    ]
  ]
  then quote [
    Add(x, y, z),
    Range(x, eval max(a, sub(e, d)), eval min(b, sub(f, c))),
    Range(y, eval max(c, sub(e, b)), eval min(d, sub(f, a))),
    Range(z, eval max(e, add(a, c)), eval min(f, add(b, d))),
  ]
}

hyperrule EnumerationDomain {
  [In(_, [])] => false

  [In(x, l1), In(x, l2)] =>
  if and [
    isArray(l1), arrayEvery(l1, isNumber),
    isArray(l2), arrayEvery(l2, isNumber),
  ]
  then quote [In(x, eval arrayIntersection(l1, l2))]

  // [In(x, l1)] => {
  //   if not isArray(l1) {
  //     return
  //   }

  //   let l2 = arrayFilter(l1, (y) => satisfy(NotEqual(x, y)))

  //   if equal(arrayLength(l1), arrayLength(l2)) {
  //     return
  //   }

  //   return quote [In(x, eval l2)]
  // }

  [LtEq(x, y), In(x, l1), In(y, l2)] => {
    if not and [
      isArray(l1), arrayEvery(l1, isNumber),
      isArray(l2), arrayEvery(l2, isNumber),
    ] {
      return
    }

    let l1max = maximum(l1)
    let l2max = maximum(l2)

    if not and [gt(l1max, l2max)] {
      return
    }

    return quote [
      LtEq(x, y),
      In(x, eval arrayFilter(l1, (n) => lteq(n, l2max))),
      In(y, l2),
    ]
  }


  [LtEq(x, y), In(x, l1), In(y, l2)] => {
    if not and [
      isArray(l1), arrayEvery(l1, isNumber),
      isArray(l2), arrayEvery(l2, isNumber),
    ] {
      return
    }

    let l1min = minimum(l1)
    let l2min = minimum(l2)

    if not and [gt(l1min, l2min)] {
      return
    }

    return quote [
      LtEq(x, y),
      In(x, l1),
      In(y, eval arrayFilter(l2, (n) => gteq(n, l1min))),
    ]
  }

  [Add(x, y, z), In(x, l1), In(y, l2), In(z, l3)] => {
    if not and [
      isArray(l1), arrayEvery(l1, isNumber),
      isArray(l2), arrayEvery(l2, isNumber),
      isArray(l3), arrayEvery(l3, isNumber),
    ] {
      return
    }

    let l4 = arrayIntersection(l1, arrayDedup(arrayMapSpread(arrayProduct([l3, l2]), sub)))
    let l5 = arrayIntersection(l2, arrayDedup(arrayMapSpread(arrayProduct([l3, l1]), sub)))
    let l6 = arrayIntersection(l3, arrayDedup(arrayMapSpread(arrayProduct([l1, l2]), add)))

    if and [equal(l1, l4), equal(l2, l5), equal(l3, l6)] {
      return
    }

    return quote [Add(x, y, z), In(x, eval l4), In(y, eval l5), In(z, eval l6)]
  }
}

export hyperrule FiniteDomain {
  // NOTE The order matters
  include IntervalDomain
  include EnumerationDomain
  [Lt(x, y)] => quote [LtEq(x, y), eval NotEqual(x, y)]
  [LtEq(x, y), LtEq(y, x)] => [Equal(x, y)]
  [Range(x, a, a)] => [Equal(x, a)]
  [In(x, [a])] => [Equal(x, a)]
}
