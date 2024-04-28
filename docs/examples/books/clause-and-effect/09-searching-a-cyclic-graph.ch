relation Edge("g", "h")
relation Edge("d", "a")
relation Edge("g", "d")
relation Edge("e", "d")
relation Edge("h", "f")
relation Edge("e", "f")
relation Edge("a", "e")
relation Edge("a", "b")
relation Edge("b", "f")
relation Edge("b", "c")
relation Edge("f", "c")

// "a", "e", "d" -- in a loop

// We define `Legal` to rule out loop -- to avoid searching in a loop

relation Legal(_, [])

relation Legal(z, [head | tail])
---------------------------- {
  NotEqual(z, head)
  Legal(z, tail)
}

relation Path(x, x, _occurs)

relation Path(x, y, occurs)
------------------------ {
  Edge(x, z)
  Legal(z, occurs)
  Path(z, y, [z | occurs])
}

print find _ { Path("f", "f", []) }
print find _ { Path("a", "c", []) }
print find _ { Path("g", "e", []) }

print find x { Path("g", x, []) }
print find x { Path(x, "h", []) }

print find _ { Path("g", "c", []) }
print find _ { Path("g", "c", ["f"]) }

print find _ { Path("a", _x, ["f", "d"]) }
print find _ { Path("a", _x, []) }
