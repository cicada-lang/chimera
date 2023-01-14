print find q {
  q = { name: "Xie Yuheng" }
  q = { country: "China" }
}

print find q {
  q = { name: "Xie Yuheng" }
  p = { name: "Xie Yuheng" }
  p = q
  p = { country: "China" }
}

print find q {
  q = { numbers: { a: 1, b: 2 } }
  p = { numbers: { a: 1, c: 3 } }
  p = q
  p = { ok: true }
}

print find q {
  q = { numbers: { a: 1, b: 2 } }
  p = { numbers: n }
  p = q
  p = { ok: true }
  n = { a: 1, c: 3 }
}
