relation Border("sussex", "kent")
relation Border("sussex", "surrey")
relation Border("surrey", "kent")
relation Border("hampshire", "sussex")
relation Border("hampshire", "surrey")
relation Border("hampshire", "berkshire")
relation Border("berkshire", "surrey")
relation Border("wiltshire", "hampshire")
relation Border("wiltshire", "berkshire")

relation Adjacent(x, y)
---------------- border {
  Border(x, y)
}

relation Adjacent(x, y)
---------------- symmetry {
  Border(y, x)
}

relation Affordable(x, y)
-------------------- {
  Adjacent(x, z)
  Adjacent(z, y)
}

print find to_kent {
  Affordable(to_kent, "kent")
}

print find to_sussex {
  Affordable("sussex", to_sussex)
}

print find [x, y] {
  Affordable(x, y)
}
