import { FiniteDomain } from "FiniteDomain.mo"

// intervalDomain

print hyperrewrite(FiniteDomain, quote [Range(x, 2, 1)])
print hyperrewrite(FiniteDomain, quote [Range(x, a, b), Range(x, c, d)])
print hyperrewrite(FiniteDomain, quote [Range(x, 20, 100), Range(x, 30, 120)])
print hyperrewrite(FiniteDomain, quote [LtEq(x, y), Range(x, 20, 150), Range(y, 30, 120)])
print hyperrewrite(FiniteDomain, quote [Eq(x, y), Range(x, 20, 150), Range(y, 30, 120)])
print hyperrewrite(FiniteDomain, quote [Add(x, y, z), Range(x, 1, 3), Range(y, 2, 4), Range(z, 0, 4)])

// enumerationDomain

print hyperrewrite(FiniteDomain, quote [In(x, [])])
print hyperrewrite(FiniteDomain, quote [In(x, [1, 2, 3]), In(x, [2, 3, 4])])
print hyperrewrite(FiniteDomain, quote [LtEq(x, y), In(x, [4, 6, 7]), In(y, [3, 7])])
print hyperrewrite(FiniteDomain, quote [LtEq(x, y), In(x, [2, 3, 4, 5]), In(y, [1, 2, 3])])
print hyperrewrite(FiniteDomain, quote [LtEq(x, y), In(x, [2, 3, 4]), In(y, [0, 1])])
print hyperrewrite(FiniteDomain, quote [Eq(x, y), In(x, [2, 3, 4, 5]), In(y, [1, 2, 3])])
print hyperrewrite(FiniteDomain, quote [Add(x, y, z), In(x, [1, 2, 3]), In(y, [2, 3, 4]), In(z, [0, 1, 2, 3, 4])])
print hyperrewrite(FiniteDomain, quote [Add(x, y, z), In(x, [1]), In(y, [2]), In(z, [3])])
print hyperrewrite(FiniteDomain, quote [Add(x, y, z), In(x, [1]), In(y, [2]), In(z, [4])])
print hyperrewrite(FiniteDomain, quote [Add(x, y, z), In(x, [1]), In(y, [2]), In(z, [3, 4])])

print hyperrewrite(FiniteDomain, quote [
  Range(x, 3, 5),
  Range(z, 3, 5),
  Range(y, 1, 4),
  Lt(x, 5),
  Eq(x, y),
])
