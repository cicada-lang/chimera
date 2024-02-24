import { Zero, Add1, Nat } from "Nat.ch"
import { Add } from "Add.ch"

// trace steps 5 {
//   Add1(add1(zero()), _x)
// }

print find x {
  Add(x, x, zero())
}

print find x {
  Add(x, x, add1(add1(zero())))
}

// The following query diverges.

// trace steps 5 {
//   Add(x, y, z)
//   Add(x, y, add1(z))
// }
