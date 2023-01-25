assert isArray([])
assert isArray([1, 2, 3])
assert isArray([1 | 2])
assert not isArray("abc")
assert not isArray("")
assert not isArray(123)
assert not isArray(null)
assert not isArray(true)
assert not isArray(false)

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

assert equal(
  arrayProduct([
    [1, 2],
    [10, 20],
    [100, 200, 300],
  ]),
  [
    [1, 10, 100],
    [2, 10, 100],
    [1, 20, 100],
    [2, 20, 100],
    [1, 10, 200],
    [2, 10, 200],
    [1, 20, 200],
    [2, 20, 200],
    [1, 10, 300],
    [2, 10, 300],
    [1, 20, 300],
    [2, 20, 300],
  ]
)

assert equal(arrayGet(["a", "b", "c"], 0), "a")
assert equal(arrayGet(["a", "b", "c"], 1), "b")
assert equal(arrayGet(["a", "b", "c"], 2), "c")

assert equal(arrayMap([0, 1, 2], add1), [1, 2, 3])

assert equal(arrayMapSpread([[0, 0], [1, 1], [2, 2]], add), [0, 2, 4])
