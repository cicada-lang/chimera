let x = 1
assert equal(x, 1)

let [x, y] = [1, 2]
assert equal([x, y], [1, 2])

let f(x, y) = quote f(1, 2)
assert equal([x, y], [1, 2])
