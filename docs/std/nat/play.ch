clause LtEqThree(n)
-------------- {
  NotEqual(n, Nat::Add1(Nat::Add1(Nat::Add1(Nat::Zero()))))
}

print find n {
  LtEqThree(n)
}

print find _ {
  LtEqThree(Nat::Zero())
}

print find _ {
  LtEqThree(Nat::Add1(Nat::Zero()))
}

print find _ {
  LtEqThree(Nat::Add1(Nat::Add1(Nat::Zero())))
}

print find _ {
  LtEqThree(Nat::Add1(Nat::Add1(Nat::Add1(Nat::Zero()))))
}
