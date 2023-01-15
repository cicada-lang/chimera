import { Zero, Add1 } from "Nat.mo"

export clause One(n) -- { Add1(prev, n) Zero(prev) }
export clause Two(n) -- { Add1(prev, n) One(prev) }
export clause Three(n) -- { Add1(prev, n) Two(prev) }
export clause Four(n) -- { Add1(prev, n) Three(prev) }
export clause Five(n) -- { Add1(prev, n) Four(prev) }
export clause Six(n) -- { Add1(prev, n) Five(prev) }
export clause Seven(n) -- { Add1(prev, n) Six(prev) }
export clause Eight(n) -- { Add1(prev, n) Seven(prev) }
export clause Nine(n) -- { Add1(prev, n) Eight(prev) }
export clause Ten(n) -- { Add1(prev, n) Nine(prev) }
export clause Eleven(n) -- { Add1(prev, n) Ten(prev) }
export clause Twelve(n) -- { Add1(prev, n) Eleven(prev) }
