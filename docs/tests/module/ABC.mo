import { AB } from "./AB.mo"

clause ABC(a, b, c)
-------------- {
  AB(a, b)
  c = "c"
}

print find [x, y, z] {
  ABC(x, y, z)
}
