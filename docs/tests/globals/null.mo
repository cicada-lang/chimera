print find x {
  Null(x)
}

assert isNull(null)
assert not isNull(true)
assert not isNull(false)
assert not isNull(123)
assert not isNull("abc")
