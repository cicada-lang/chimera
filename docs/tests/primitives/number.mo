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

assert Equal(maximum([1, 2, 3, 4]), 4)

assert Equal(minimum([1, 2, 3, 4]), 1)

assert Equal(sum([1, 2, 3, 4]), 10)

assert Equal(product([1, 2, 3, 4]), 24)

assert lt(1, 2)
assert not(lt(1, 1))
assert not(lt(2, 1))

assert lteq(1, 2)
assert lteq(1, 1)
assert not(lteq(2, 1))

assert not(gt(1, 2))
assert not(gt(1, 1))
assert gt(2, 1)

assert not(gteq(1, 2))
assert gteq(1, 1)
assert gteq(2, 1)
