import { Zero, Add1, Nat } from "Nat.mo"

export clause Add(zero(), y, y)

export clause Add(add1(prev), y, add1(res))
--------------------------- {
  Add(prev, y, res)
}
