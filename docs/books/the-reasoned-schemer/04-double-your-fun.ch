import { Null, Cons, Car, Cdr } from "02-teaching-old-toys-new-tricks.ch"

clause Append(l, t, out)
------------------ {
  Null(l)
  Equal(out, t)
}

clause Append(l, t, out)
------------------ {
  Cdr(l, d)
  Append(d, t, res)
  Car(l, a)
  Cons(a, res, out)
}

print find q {
  Append([1, 2, 3], [4, 5], q)
}

print find q {
  Append([], [4, 5], q)
}

print find q {
  Append(1, [4, 5], q)
}

print find q {
  Append([4, 5], 1, q)
}

print find x limit 6 {
  Append(x, _y, _z)
}

print find [x, y, z] limit 6 {
  Append(x, y, z)
}

print find x {
  Append(
    ["cake"],
    ["tastes", "yummy"],
    x,
  )
}

print find x {
  Append(
    ["cake", "&", "ice", _y],
    ["tastes", "yummy"],
    x,
  )
}

print find x {
  Append(
    ["cake", "&", "ice", "cream"],
    _y,
    x,
  )
}

print find x limit 1 {
  Append(
    ["cake", "&", "ice" | _y],
    ["d", "t"],
    x,
  )
}

print find x limit 5 {
  Append(
    ["cake", "&", "ice" | _y],
    ["d", "t"],
    x,
  )
}

print find y limit 5 {
  Append(
    ["cake", "&", "ice" | y],
    ["d", "t"],
    _x,
  )
}

print find x limit 5 {
  Append(
    ["cake", "&", "ice" | y],
    ["d", "t" | y],
    x,
  )
}

print find x {
  Append(
    ["cake", "&", "ice", "cream"],
    ["d", "t" | _z],
    x,
  )
}

print find [x, y] limit 6 {
  Append(
    x,
    y,
    ["cake", "&", "ice", "d", "t"],
  )
}

clause Unwrap(x, out)
--------------- {
  Car(x, a)
  Unwrap(a, out)
}

clause Unwrap(x, out)
--------------- {
  Equal(x, out)
}

print find x {
  Unwrap(
    [[["pizza"]]],
    x,
  )
}

print find x limit 3 {
  Unwrap(
    x,
    "pizza",
  )
}

print find x limit 3 {
  Unwrap(
    [[x]],
    "pizza",
  )
}
