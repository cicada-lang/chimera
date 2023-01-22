print find x {
  Equal(x, 1)
}

assert equal(1, 1)
assert equal(quote a, quote a)
assert not equal(quote a, quote b)
