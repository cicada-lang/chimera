import { Zero, Add1, Nat } from "Nat.ch"
import { Add } from "Add.ch"

export { Mul }

relation Mul(x, _y, z)
--------------- zero_left {
  Zero(x)
  Zero(z)
}

relation Mul(x, y, z)
----------------- add1_left_zero_right {
  Zero(y)
  Zero(z)
  Add1(_prev, x)
}

relation Mul(x, y, out)
----------------- add1_left_add1_right {
  Add1(prev, x)
  Add1(_prev, y)
  Add(y, z, out)
  Mul(prev, y, z)
}
