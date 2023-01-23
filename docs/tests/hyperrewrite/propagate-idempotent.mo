// Should not apply one propagate to the same arguments twice.

hyperrule h {
  [LtEq(x, y), LtEq(y, z)] +> quote [LtEq(x, z)]
}

print h(quote [LtEq(1, 2), LtEq(2, 3)])
print h(quote [LtEq(2, 3), LtEq(1, 2)])

print h(quote [LtEq(1, 3), LtEq(1, 2), LtEq(2, 3)])
print h(quote [LtEq(1, 2), LtEq(2, 3), LtEq(1, 3)])
print h(quote [LtEq(1, 3), LtEq(10, 20), LtEq(20, 30)])

print hyperrewriteManySteps(10, h, quote [LtEq(1, 2), LtEq(2, 3)])

// For testing permutation by `console.log`.

hyperrule h2 {
  [LtEq(x, y), LtEq(y, z), F(_)] +> quote [LtEq(x, z)]
}

print h2(quote [LtEq(1, 2), LtEq(2, 3), F(100)])
print h2(quote [LtEq(2, 3), LtEq(1, 2), F(100)])
