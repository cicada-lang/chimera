relation Datom(1, "name", "A")
relation Datom(1, "age", 45)
relation Datom(2, "name", "X")
relation Datom(2, "age", 2)

print find n {
  Datom(e, "age", 2)
  Datom(e, "name", n)
}
