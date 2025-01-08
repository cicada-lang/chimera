import { AB } from "./AB.ch"

export relation ABC(a, b, c)
-------------- {
  AB(a, b)
  Equal(c, "c")
}

print find [x, y, z] {
  ABC(x, y, z)
}
