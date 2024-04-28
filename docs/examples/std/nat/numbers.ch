import { Zero, Add1 } from "Nat.ch"

export relation One(n) -- { Add1(prev, n) Zero(prev) }
export relation Two(n) -- { Add1(prev, n) One(prev) }
export relation Three(n) -- { Add1(prev, n) Two(prev) }
export relation Four(n) -- { Add1(prev, n) Three(prev) }
export relation Five(n) -- { Add1(prev, n) Four(prev) }
export relation Six(n) -- { Add1(prev, n) Five(prev) }
export relation Seven(n) -- { Add1(prev, n) Six(prev) }
export relation Eight(n) -- { Add1(prev, n) Seven(prev) }
export relation Nine(n) -- { Add1(prev, n) Eight(prev) }
export relation Ten(n) -- { Add1(prev, n) Nine(prev) }
export relation Eleven(n) -- { Add1(prev, n) Ten(prev) }
export relation Twelve(n) -- { Add1(prev, n) Eleven(prev) }
