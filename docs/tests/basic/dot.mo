let x = { a: 1, b: 2, c: { x: 11 } }

assert equal(x.a, 1)
assert equal(x.b, 2)
assert equal(x.c.x, 11)
