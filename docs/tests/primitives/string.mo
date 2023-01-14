assert Equal(stringLength(""), 0)
assert Equal(stringLength("abc"), 3)

assert Equal(stringAppend("", "abc"), "abc")
assert Equal(stringAppend("abc", ""), "abc")
assert Equal(stringAppend("abc", "def"), "abcdef")
