import { Zero, Add1, Nat } from "Nat.ch"
import { Add } from "Add.ch"

// trace steps 5 {
//   Add1(Nat::Add1(Nat::Zero()), _x)
// }

print find x {
  Add(x, x, Nat::Zero())
}

print find x {
  Add(x, x, Nat::Add1(Nat::Add1(Nat::Zero())))
}

// The following query diverges.

// trace steps 5 {
//   Add(x, y, z)
//   Add(x, y, Nat::Add1(z))
// }
