import { AB } from "./AB.mo"

export clause ABC(a, b, c)
-------------- {
  AB(a, b)
  c = "c"
}

print find [x, y, z] {
  ABC(x, y, z)
}
