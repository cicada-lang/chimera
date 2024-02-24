print find x {
  Boolean(x)
}

assert isBoolean(true)
assert isBoolean(false)
assert not isBoolean(null)
assert not isBoolean(123)
assert not isBoolean("abc")

assert and []
assert and [true]
assert and [true, true]

assert not and [false]
assert not and [true, false]
assert not and [true, true, false]

assert or [true]
assert or [true, true]
assert or [true, false]
assert or [false, true, false]
assert or [false, false, true, false]

assert not or []
assert not or [false]
assert not or [false, false]
assert not or [false, false, false]
