export relation A(a)
------ {
  Equal(a, "a")
}

print find [x] {
  A(x)
}
