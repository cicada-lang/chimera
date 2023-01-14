import { A } from "./A.mo"

clause AB(a, b)
---------- {
  A(a)
  b = "b"
}

print find [x, y] {
  AB(x, y)
}
