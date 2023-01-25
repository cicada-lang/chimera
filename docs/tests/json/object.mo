print find abc {
  Equal(abc, {
    a: "a",
    b: "b",
    c: "c",
  })
}

print find [a, b, c] {
  Equal({ a, b, c }, {
    a: "a",
    b: "b",
    c: "c",
  })
}

print find empty {
  Equal(empty, {})
}
