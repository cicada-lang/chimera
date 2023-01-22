assert equal(add(2, 2), 4)
assert equal(add(1, 0), 1)

assert equal(sub(1, 2), -1)
assert equal(sub(2, 1), 1)

assert equal(add1(0), 1)
assert equal(add1(1), 2)

assert equal(sub1(0), -1)
assert equal(sub1(1), 0)
assert equal(sub1(2), 1)

assert equal(mul(2, 2), 4)
assert equal(mul(2, 3), 6)

assert equal(div(6, 3), 2)
assert equal(div(6, 2), 3)

assert equal(max(1, 2), 2)
assert equal(max(-1, 0), 0)

assert equal(min(1, 2), 1)
assert equal(min(-1, 0), -1)

assert equal(maximum([1, 2, 3, 4]), 4)

assert equal(minimum([1, 2, 3, 4]), 1)

assert equal(sum([1, 2, 3, 4]), 10)

assert equal(product([1, 2, 3, 4]), 24)

assert lt(1, 2)
assert not lt(1, 1)
assert not lt(2, 1)

assert lteq(1, 2)
assert lteq(1, 1)
assert not lteq(2, 1)

assert not gt(1, 2)
assert not gt(1, 1)
assert gt(2, 1)

assert not gteq(1, 2)
assert gteq(1, 1)
assert gteq(2, 1)
