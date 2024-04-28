export { Nat, Zero, Add1 }

clause Nat(Nat::Zero())
clause Nat(Nat::Add1(prev)) -- { Nat(prev) }

clause Zero(Nat::Zero())
clause Add1(prev, Nat::Add1(prev))
