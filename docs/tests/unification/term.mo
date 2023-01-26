print find x {
  Equal(x, a.b.c.f(1))
}

assert equal(find _ {
  Equal(a.b.f(1), a.b.c.f(1))
}, [])
