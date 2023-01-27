rule r {
  f(x, x) => quote x
}

print rewrite(r, quote f(a, a))
print rewrite(r, quote f(a, b))

print rewrite(r, quote f(1, 1))
print rewrite(r, quote f(1, 2))
