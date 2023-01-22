assert equal(stringLength(""), 0)
assert equal(stringLength("abc"), 3)

assert equal(stringAppend("", "abc"), "abc")
assert equal(stringAppend("abc", ""), "abc")
assert equal(stringAppend("abc", "def"), "abcdef")
