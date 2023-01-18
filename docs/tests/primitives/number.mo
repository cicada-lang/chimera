assert Equal(add(2, 2), 4)
assert Equal(add(1, 0), 1)

assert Equal(sub(1, 2), -1)
assert Equal(sub(2, 1), 1)

assert Equal(add1(0), 1)
assert Equal(add1(1), 2)

assert Equal(sub1(0), -1)
assert Equal(sub1(1), 0)
assert Equal(sub1(2), 1)

assert Equal(mul(2, 2), 4)
assert Equal(mul(2, 3), 6)

assert Equal(div(6, 3), 2)
assert Equal(div(6, 2), 3)

assert Equal(max(1, 2), 2)
assert Equal(max(-1, 0), 0)

assert Equal(min(1, 2), 1)
assert Equal(min(-1, 0), -1)
