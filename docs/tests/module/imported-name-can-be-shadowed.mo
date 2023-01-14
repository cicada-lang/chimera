import { A } from "./A.mo"

print find [x] {
  A(x)
}

clause A(x) -- { x = "b" }

print find [x] {
  A(x)
}
