import { A } from "./A.mo"

print find [x] {
  A(x)
}

clause A(x) -- {
  Equal(x, "b")
}

print find [x] {
  A(x)
}
