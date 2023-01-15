// If a constraint already in the result, a hyperrule should fail.

hyperrule h1 {
  [LtEq(x, y), LtEq(y, z)] => [LtEq(x, y), LtEq(y, z), LtEq(x, z)]
}

print hyprrewriteManySteps(10, h1, quote [LtEq(x, y), LtEq(y, z)])
print h1(quote [LtEq(x, y), LtEq(y, z)])
