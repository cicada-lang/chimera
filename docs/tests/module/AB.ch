import { A } from "./A.ch"

export clause AB(a, b)
---------- {
  A(a)
  Equal(b, "b")
}

print find [x, y] {
  AB(x, y)
}
