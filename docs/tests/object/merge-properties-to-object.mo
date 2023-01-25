print find q {
  Equal(q, { name: "Xie Yuheng" })
  Equal(q, { country: "China" })
}

print find q {
  Equal(q, { name: "Xie Yuheng" })
  Equal(p, { name: "Xie Yuheng" })
  Equal(p, q)
  Equal(p, { country: "China" })
}

print find q {
  Equal(q, { numbers: { a: 1, b: 2 } })
  Equal(p, { numbers: { a: 1, c: 3 } })
  Equal(p, q)
  Equal(p, { ok: true })
}

print find q {
  Equal(q, { numbers: { a: 1, b: 2 } })
  Equal(p, { numbers: n })
  Equal(p, q)
  Equal(p, { ok: true })
  Equal(n, { a: 1, c: 3 })
}
