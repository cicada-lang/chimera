import { A } from "./A.ch"

export relation AB(a, b)
---------- {
  A(a)
  Equal(b, "b")
}

print find [x, y] {
  AB(x, y)
}
