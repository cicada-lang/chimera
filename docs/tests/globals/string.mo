assert isString("abc")
assert isString("")
assert not isString(123)
assert not isString(null)
assert not isString(true)
assert not isString(false)

assert equal(stringLength(""), 0)
assert equal(stringLength("abc"), 3)

assert equal(stringAppend("", "abc"), "abc")
assert equal(stringAppend("abc", ""), "abc")
assert equal(stringAppend("abc", "def"), "abcdef")
