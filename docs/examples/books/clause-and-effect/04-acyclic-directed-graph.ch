relation Edge("g", "h")
relation Edge("g", "d")
relation Edge("e", "d")
relation Edge("h", "f")
relation Edge("e", "f")
relation Edge("a", "e")
relation Edge("a", "b")
relation Edge("b", "f")
relation Edge("b", "c")
relation Edge("f", "c")

relation Path(x, x)
------------ {}

relation Path(x, y)
------------ {
  Edge(x, z)
  Path(z, y)
}

print find x {
  Path("g", x)
}

print find x {
  Path(x, "h")
}

print find [x, y] {
  Path(x, y)
}
