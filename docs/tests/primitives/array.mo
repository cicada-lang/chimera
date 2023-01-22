assert equal(arrayLength([]), 0)
assert equal(arrayLength([1, 2, 3]), 3)

assert equal(arrayAppend([1, 2, 3], []), [1, 2, 3])
assert equal(arrayAppend([], [1, 2, 3]), [1, 2, 3])
assert equal(arrayAppend([1, 2, 3], [4, 5, 6]), [1, 2, 3, 4, 5, 6])

assert equal(arrayDedupAppend([1, 2, 3, 1, 2, 3], [4, 5, 6]), [1, 2, 3])
