print find [x] {
  disj {
    Equal(x, 1)
    Equal(x, 2)
  }
}

print find [x, y] {
  disj {
    conj { Equal(x, 1) Equal(y, 1) }
    conj { Equal(x, 2) Equal(y, 2) }
  }
}
