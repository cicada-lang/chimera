assert Equal(arrayLength([]), 0)
assert Equal(arrayLength([1, 2, 3]), 3)

assert Equal(arrayAppend([1, 2, 3], []), [1, 2, 3])
assert Equal(arrayAppend([], [1, 2, 3]), [1, 2, 3])
assert Equal(arrayAppend([1, 2, 3], [4, 5, 6]), [1, 2, 3, 4, 5, 6])
