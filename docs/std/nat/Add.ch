import { Zero, Add1, Nat } from "Nat.ch"

export { Add }

clause Add(Nat::Zero(), y, y)
clause Add(Nat::Add1(prev), y, Nat::Add1(res))
--------------------------- {
  Add(prev, y, res)
}
