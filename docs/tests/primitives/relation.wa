clause Append([], l, l)
clause Append([a | d], l, [a | r]) -- { Append(d, l, r) }

print find [x, y] {
  Append(x, y, [1, 2, 3, 4, 5])
}

assert Equal(
  findAll(quote [x, y], quote [
    Append(x, y, [1, 2, 3, 4, 5])
  ]),
  [
    [[], [1, 2, 3, 4, 5]],
    [[1], [2, 3, 4, 5]],
    [[1, 2], [3, 4, 5]],
    [[1, 2, 3], [4, 5]],
    [[1, 2, 3, 4], [5]],
    [[1, 2, 3, 4, 5], []]
  ],
)

print find [x, y] limit 3 {
  Append(x, y, [1, 2, 3, 4, 5])
}

assert Equal(
  find(3, quote [x, y], quote [
    Append(x, y, [1, 2, 3, 4, 5])
  ]),
  [
    [[], [1, 2, 3, 4, 5]],
    [[1], [2, 3, 4, 5]],
    [[1, 2], [3, 4, 5]],
  ],
)

// dynamic scope

function f(R) {
  // `R` in the `quote` will be dynamicly scoped.
  return findAll(quote x, quote [R(x)])
}

clause Hi("hi")

assert Equal(f(Hi), ["hi"])
