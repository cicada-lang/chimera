relation Var(exp, name)
--------------- {
  Equal(exp, { "@type": "Exp", "@kind": "Var", name })
}

print find exp {
  Var(exp, "x")
}
