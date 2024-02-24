clause Edge("g", "h")
clause Edge("g", "d")
clause Edge("e", "d")
clause Edge("h", "f")
clause Edge("e", "f")
clause Edge("a", "e")
clause Edge("a", "b")
clause Edge("b", "f")
clause Edge("b", "c")
clause Edge("f", "c")

clause Path(x, x)
------------ {}

clause Path(x, y)
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
