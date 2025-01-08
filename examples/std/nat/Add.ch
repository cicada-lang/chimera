import { Zero, Add1, Nat } from "Nat.ch"

export { Add }

relation Add(Nat::Zero(), y, y)
relation Add(Nat::Add1(prev), y, Nat::Add1(res))
--------------------------- {
  Add(prev, y, res)
}
