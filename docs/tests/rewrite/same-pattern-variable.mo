rule r {
  f(x, x) => quote x
}

print r(quote f(a, a))
print r(quote f(a, b))

print r(quote f(1, 1))
print r(quote f(1, 2))
