export clause Nat(zero())
export clause Nat(add1(prev)) -- { Nat(prev) }

export clause Zero(zero())
export clause Add1(prev, add1(prev))
