import { Zero, Add1, Nat } from "Nat.ch"

export { Add }

clause Add(zero(), y, y)
clause Add(add1(prev), y, add1(res))
--------------------------- {
  Add(prev, y, res)
}
