import { Nat, Zero, Add1 } from "index.ch"
import { Add, Mul } from "index.ch"
import { One, Two, Three, Four, Five, Six } from "index.ch"
import { Seven, Eight, Nine, Ten, Eleven, Twelve } from "index.ch"

print find z {
  Two(x)
  Two(y)
  Mul(x, y, z)
}

print find [x, y] { Two(z) Mul(x, y, z) }
print find [x, y] { Four(z) Mul(x, y, z) }
print find [x, y] { Five(z) Mul(x, y, z) }
print find [x, y] { Six(z) Mul(x, y, z) }
print find [x, y] { Seven(z) Mul(x, y, z) }
print find [x, y] { Eight(z) Mul(x, y, z) }
print find [x, y] { Nine(z) Mul(x, y, z) }
print find [x, y] { Ten(z) Mul(x, y, z) }
print find [x, y] { Eleven(z) Mul(x, y, z) }
print find [x, y] { Twelve(z) Mul(x, y, z) }
