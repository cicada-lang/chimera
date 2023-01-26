rule r {
  a.b.c.f(x) => x
}

print r(quote a.b.f(x))
print r(quote a.b.c.f(x))
