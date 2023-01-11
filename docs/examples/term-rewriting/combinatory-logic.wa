// Notes:
// - use explicit application -- `ap`.
// - use string as constants.

rule ski {
  ap(ap(ap("S", x), y), z) => ap(ap(x, z), ap(y, z))
  ap(ap("K", x), _) => x
  ap("I", x) => x
}

print ski(quote ap(ap(ap("S", "K"), "I"), "I"))
print ski(quote ap(ap(ap("S", "I"), "K"), "K"))

// Notes:
// - use pair as application.
// - use string as constants.

rule ski2 {
  [[["S", x], y], z] => [[x, z], [y, z]]
  [["K", x], _] => x
  ["I", x] => x

  [x, y, z | r] => [[x, y], z | r]

  ["D", x] => ["S", "I", "I", x]
}

print ski2(quote ["S", "K", "I", "I"])
print ski2(quote ["S", "I", "K", "K"])

print ski2(quote ["D", x])

print ski2(quote ["S", "K", "S", "S", "S", "K", "S"])
