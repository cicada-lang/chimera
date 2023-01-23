assert equal(arrayLength([]), 0)
assert equal(arrayLength([1, 2, 3]), 3)

assert equal(arrayAppend([1, 2, 3], []), [1, 2, 3])
assert equal(arrayAppend([], [1, 2, 3]), [1, 2, 3])
assert equal(arrayAppend([1, 2, 3], [4, 5, 6]), [1, 2, 3, 4, 5, 6])

assert equal(arrayDedup([1, 2, 3, 1, 2, 3]), [1, 2, 3])

assert equal(arrayUnion([1, 2, 3, 1, 2, 3], [4, 5, 6, 4, 5, 6]), [1, 2, 3, 4, 5, 6])

assert equal(arrayIntersection([1, 2, 3, 4, 1, 2, 3], [3, 4, 5, 6, 4, 5, 6]), [3, 4])

assert not arrayMember([1, 2, 3], 0)
assert arrayMember([1, 2, 3], 1)

assert equal(arrayFilter([0, 1, 2, 3], (x) => gt(x, 1)), [2, 3])
