import { A } from "./A.ch"

print find [x] {
  A(x)
}

relation A(x) -- {
  Equal(x, "b")
}

print find [x] {
  A(x)
}
