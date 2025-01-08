export { Nat, Zero, Add1 }

relation Nat(Nat::Zero())
relation Nat(Nat::Add1(prev)) -- { Nat(prev) }

relation Zero(Nat::Zero())
relation Add1(prev, Nat::Add1(prev))
