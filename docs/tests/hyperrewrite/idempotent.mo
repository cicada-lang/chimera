// If a constraint already in the result, a hyperrule should fail.

hyperrule h1 {
  [LtEq(x, y), LtEq(y, z)] => [LtEq(x, y), LtEq(y, z), LtEq(x, z)]
}

print h1(quote [LtEq(1, 2), LtEq(2, 3)])

print hyperrewriteManySteps(10, h1, quote [LtEq(1, 2), LtEq(2, 3)])
