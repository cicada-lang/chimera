// Notes:
// - use explicit application -- `ap`.
// - use string as constants.

rule ski {
  ap(ap(ap("S", x), y), z) => quote ap(ap(x, z), ap(y, z))
  ap(ap("K", x), _) => quote x
  ap("I", x) => quote x
}

print ski(quote ap(ap(ap("S", "K"), "I"), "I"))
print ski(quote ap(ap(ap("S", "I"), "K"), "K"))

// Notes:
// - use pair as application.
// - use string as constants.

rule ski2 {
  [[["S", x], y], z] => quote [[x, z], [y, z]]
  [["K", x], _] => quote x
  ["I", x] => quote x

  [x, y, z | r] => quote [[x, y], z | r]

  ["D", x] => quote ["S", "I", "I", x]
}

print ski2(quote ["S", "K", "I", "I"])
print ski2(quote ["S", "I", "K", "K"])

print ski2(quote ["D", x])

print ski2(quote ["S", "K", "S", "S", "S", "K", "S"])
