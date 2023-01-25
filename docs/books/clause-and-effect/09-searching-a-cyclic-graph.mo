clause Edge("g", "h")
clause Edge("d", "a")
clause Edge("g", "d")
clause Edge("e", "d")
clause Edge("h", "f")
clause Edge("e", "f")
clause Edge("a", "e")
clause Edge("a", "b")
clause Edge("b", "f")
clause Edge("b", "c")
clause Edge("f", "c")

// "a", "e", "d" -- in a loop

// We define `Legal` to rule out loop -- to avoid searching in a loop

clause Legal(_, [])

clause Legal(z, [head | tail])
---------------------------- {
  NotEqual(z, head)
  Legal(z, tail)
}

clause Path(x, x, _occurs)

clause Path(x, y, occurs)
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
