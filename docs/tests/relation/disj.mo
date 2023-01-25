print find [x] {
  Disj([
    Equal(x, 1),
    Equal(x, 2),
  ])
}

print find [x, y] {
  Disj([
    Conj([
      Equal(x, 1),
      Equal(y, 1),
    ]),
    Conj([
      Equal(x, 2),
      Equal(y, 2),
    ]),
  ])
}
