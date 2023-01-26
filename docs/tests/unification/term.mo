print find x {
  Equal(x, a.b.c.f(1))
}

print find _ {
  Equal(a.b.f(1), a.b.c.f(1))
}
