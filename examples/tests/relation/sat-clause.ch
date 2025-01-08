// We use `0` and `1`
// for `false` and `true`,
// because the code looks tidier.

relation Bit(x) -- { Equal(x, 0) }
relation Bit(x) -- { Equal(x, 1) }

relation Not(0, 1)
relation Not(1, 0)

relation Or(0, 0, 0)
relation Or(0, 1, 1)
relation Or(1, 0, 1)
relation Or(1, 1, 1)

relation BitList([])
relation BitList([car | cdr]) -- {
  Bit(car)
  BitList(cdr)
}

relation ListNot([], [])
relation ListNot([x | xs], [y | ys]) -- {
  Not(x, y)
  ListNot(xs, ys)
}

// A clause represent
//   c1 ∨ c2 ∨ ... <- p1 ∧ p2 ∧ ...
// which is equivalent to disjunction from
//   c1 ∨ c2 ∨ ... ¬p1 ∨ ¬p2 ∨ ...

relation Clause(conclusions, premises) -- {
  BitList(conclusions)
  BitList(premises)
  ListNot(premises, negPremises)
  Append(conclusions, negPremises, disjunction)
  // To satisfy a disjunction,
  // its element must contains a true,
  // specially empty list can not be satisfied.
  ContainsOne(disjunction)
}

relation ContainsOne([1 | _rest])
relation ContainsOne([0 | rest]) -- {
  ContainsOne(rest)
}

relation Append([], t, t)
relation Append([a | d], t, [a | res]) -- {
  Append(d, t, res)
}

print find [x1, x2, x3] {
  Clause([x1], [x2])
  Clause([x2, x3], [x1])
  Clause([], [x1])
}

print find [x1] {
  Clause([x1], [])
  Clause([], [x1])
}
