import { Null, Cons, Car, Cdr } from "02-teaching-old-toys-new-tricks.mo"

clause Mem(x, l, out)
--------------- {
  Car(l, x)
  Equal(out, l)
}

clause Mem(x, l, out)
--------------- {
  Cdr(l, d)
  Mem(x, d, out)
}

print find x {
  Mem(
    "fig",
    ["roll", "okra", "fig", "beet", "roll", "pea"],
    x,
  )
}

print find x {
  Mem(
    "fig",
    ["roll", "okra", "beet", "beet", "roll", "pea"],
    x,
  )
}

print find _ {
  Mem("fig", ["pea"], ["pea"])
}

print find out {
  Mem("fig", ["fig"], out)
}

print find out {
  Mem("fig", ["fig", "pea"], out)
}

print find x {
  Mem(
    x,
    ["roll", "okra", "fig", "beet", "roll", "pea"],
    ["fig", "beet", "roll", "pea"],
  )
}

print find x {
  Mem("fig", ["fig", "pea"], ["pea", x])
}

print find x {
  Mem("fig", ["fig", "pea"], [x, "pea"])
}

print find out {
  Mem("fig", ["fig", "fig", "pea"], out)
}

print find out {
  Mem("fig", ["a", _x, "c", "fig", "e"], out)
}

print find [x, y] limit 5 {
  Mem("fig", ["fig", "d", "fig", "e" | y], x)
}

clause Rember(_x, l, out)
------------------ {
  Null(l)
  Null(out)
}

clause Rember(x, l, out)
------------------ {
  Car(l, x)
  Cdr(l, out)
}

clause Rember(x, l, out)
------------------ {
  Cdr(l, d)
  Rember(x, d, res)
  Car(l, a)
  Cons(a, res, out)
}

print find out {
  Rember("pea", ["a", "b", "pea", "d", "pea", "e"], out)
}

print find out {
  Rember("pea", ["pea"], out)
}

print find out {
  Rember("pea", ["pea", "pea"], out)
}

print find out {
  Rember("pea", ["pea", "pea", "pea"], out)
}

print find out {
  Rember(y, ["a", "b", y, "d", _z, "e"], out)
}

print find [y, z] {
  Rember(y, [y, "d", z, "e"], [y, "d", "e"])
}

print find [y, z, w, out] limit 4 {
  Rember(y, [z | w], out)
}

print find [y, z, w, out] limit 5 {
  Rember(y, [z | w], out)
}

// But should the following succeed?
// We will need `NotEqual` to implementation a version
// that does not succeed on the following query.

print find _ {
  Rember(1, [1, 2, 3], [1, 2, 3])
}
