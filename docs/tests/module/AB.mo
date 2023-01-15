import { A } from "./A.mo"

export clause AB(a, b)
---------- {
  A(a)
  b = "b"
}

print find [x, y] {
  AB(x, y)
}
