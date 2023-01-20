hyperrule finiteDomain {
  // range inconsistency
  [Range(_, a, b)]
  if and [Number(a), Number(b), gt(a, b)]
  => [false]

  // range intersection
  [Range(x, a, b), Range(x, c, d)]
  if and [Number(a), Number(b), Number(c), Number(d)]
  => [Range(x, unquote max(a, c), unquote min(b, d))]

  //
}

print finiteDomain(quote [Range(x, a, b), Range(x, c, d)])
print finiteDomain(quote [Range(x, 2, 1)])
print finiteDomain(quote [Range(x, 20, 100), Range(x, 30, 120)])
