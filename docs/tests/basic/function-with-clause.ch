function greet(x) {
  clause Hi("hi")

  // The expressions in `find` are implicitly `quote`d.

  let results = find q {
    Hi(p)
    Equal(q, [p, eval x])
  }

  print results
}

print greet

compute greet("xieyuheng")
