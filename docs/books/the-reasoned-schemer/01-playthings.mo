export clause Succeed()

export clause Fail()
-------- {
  1 = 2
}

print find _ {
  Fail()
}

print find _ {
  "pea" = "pod"
}

print find q {
  q = "pea"
}

print find q {
  "pea" = q
}

print find _ {
  Succeed()
}

print find _ {
  "pea" = "pea"
}

print find q {
  q = q
}

print find q {
  q = _
}

print find q {
  q = [_]
}

print find _ {
  [[["pea"]], "pod"] = [[["pea"]], "pod"]
}

print find q {
  [[[q]], "pod"] = [[[_]], "pod"]
}

print find q {
  [[[q]], x] = [[[x]], "pod"]
}

print find q {
  [x, x] = q
}

print find q {
  [_x, _y] = q
}

print find s {
  [_t, _u] = s
}

print find q {
  [x, _y, x] = q
}

print find _ {
  ["pea"] = "pea"
}

print find _ {
  [x] = x
}

print find _ {
  Succeed()
  Succeed()
}

print find q {
  Succeed()
  "corn" = q
}

print find q {
  Fail()
  "corn" = q
}

print find q {
  "corn" = q
  Fail()
}

print find q {
  "corn" = q
  "meal" = q
}

print find q {
  "corn" = q
  "corn" = q
}

clause Teacup(t)
--------------- tea {
  t = "tea"
}

clause Teacup(t)
--------------- cup {
  t = "cup"
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
