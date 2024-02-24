export clause Car(p, a)
---------- {
  Equal([a | _d], p)
}

print find q {
  Car(["a", "c", "o", "r", "n"], q)
}

print find _ {
  Car(["a", "c", "o", "r", "n"], "a")
}

print find r {
  Car([r | _y], x)
  Equal("pear", x)
}

print find r {
  Car(["grape", "raisin", "pear"], x)
  Car([["a"], ["b"], ["c"]], y)
  Equal([x | y], r)
}

export clause Cdr(p, d)
---------- {
  Equal([_a | d], p)
}

print find r {
  Cdr(["a", "c", "o", "r", "n"], v)
  Cdr(v, w)
  Car(w, r)
}

print find r {
  Cdr(["grape", "raisin", "pear"], x)
  Car([["a"], ["b"], ["c"]], y)
  Equal([x | y], r)
}

print find _ {
  Cdr(["a", "c", "o", "r", "n"], ["c", "o", "r", "n"])
}

print find x {
  Cdr(["c", "o", "r", "n"], [x, "r", "n"])
}

print find l {
  Cdr(l, ["c", "o", "r", "n"])
  Car(l, x)
  Equal(x, "a")
}

// clause Cons(a, d, p)
// --------------- {
//   Equal([a | d], p)
// }

export clause Cons(a, d, p)
--------------- {
  Car(p, a)
  Cdr(p, d)
}

print find l {
  Cons(["a", "b", "c"], ["d", "e"], l)
}

print find x {
  Cons(x, ["a", "b", "c"], ["d", "a", "b", "c"])
}

print find r {
  Equal(["e", "a", "d", _x], r)
  Cons(_y, ["a", _z, "c"], r)
}

print find x {
  Cons(x, ["a", x, "c"], ["d", "a", x, "c"])
}

print find l {
  Equal(["d", "a", x, "c"], l)
  Cons(x, ["a", x, "c"], l)
}

print find l {
  Cons(x, ["a", x, "c"], l)
  Equal(["d", "a", x, "c"], l)
}

print find l {
  Cons(_w, ["n", "u", "s"], t)
  Cdr(l, t)
  Car(l, x)
  Equal("b", x)
  Cdr(l, d)
  Car(d, y)
  Equal("o", y)
}

export clause Null(x)
---------- {
  Equal([], x)
}

print find _ {
  Null(["grape", "raisin", "pear"])
}

print find _ {
  Null([])
}

print find x {
  Null(x)
}

print find r {
  Equal([_x, _y, "salad"], r)
}

clause Pair(p)
------ {
  Cons(_a, _d, p)
}

print find q {
  Pair([q | q])
}

print find _ {
  Pair([])
}

print find _ {
  Pair("pair")
}

print find x {
  Pair(x)
}

print find r {
  Pair([r])
}

// clause Singleton(l)
// ----------- {
//   Pair(l)
//   Cdr(l, d)
//   Null(d)
// }

clause Singleton(l)
----------- {
  Cdr(l, d)
  Null(d)
}

print find _ {
  Singleton(["tofu"])
}

print find _ {
  Singleton([["tofu"]])
}

print find _ {
  Singleton("tofu")
}

print find _ {
  Singleton(["e", "tofu"])
}

print find _ {
  Singleton([])
}

print find _ {
  Singleton(["e" | "tofu"])
}
