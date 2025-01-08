export relation Succeed()

export relation Fail()
-------- {
  Equal(1, 2)
}

print find _ {
  Fail()
}

print find _ {
  Equal("pea", "pod")
}

print find q {
  Equal(q, "pea")
}

print find q {
  Equal("pea", q)
}

print find _ {
  Succeed()
}

print find _ {
  Equal("pea", "pea")
}

print find q {
  Equal(q, q)
}

print find q {
  Equal(q, _)
}

print find q {
  Equal(q, [_])
}

print find _ {
  Equal([[["pea"]], "pod"], [[["pea"]], "pod"])
}

print find q {
  Equal([[[q]], "pod"], [[[_]], "pod"])
}

print find q {
  Equal([[[q]], x], [[[x]], "pod"])
}

print find q {
  Equal([x, x], q)
}

print find q {
  Equal([_x, _y], q)
}

print find s {
  Equal([_t, _u], s)
}

print find q {
  Equal([x, _y, x], q)
}

print find _ {
  Equal(["pea"], "pea")
}

print find _ {
  Equal([x], x)
}

print find _ {
  Succeed()
  Succeed()
}

print find q {
  Succeed()
  Equal("corn", q)
}

print find q {
  Fail()
  Equal("corn", q)
}

print find q {
  Equal("corn", q)
  Fail()
}

print find q {
  Equal("corn", q)
  Equal("meal", q)
}

print find q {
  Equal("corn", q)
  Equal("corn", q)
}

relation Teacup(t)
--------------- tea {
  Equal(t, "tea")
}

relation Teacup(t)
--------------- cup {
  Equal(t, "cup")
}

print find q {
  Teacup(q)
}

print find [x, y] {
  Teacup(x)
  Teacup(y)
}

print find [x, _y] {
  Teacup(x)
  Teacup(x)
}

print find [x, _y] {
  Teacup(x)
}
