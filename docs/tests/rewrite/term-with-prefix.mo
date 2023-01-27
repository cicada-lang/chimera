rule r {
  a.b.c.f(x) => x
}

print rewrite(r, quote a.b.f(x))
print rewrite(r, quote a.b.c.f(x))
