Nat "zero"

Nat { prev }
------------ {
  Nat prev
}

Zero "zero"

One { prev }
------------ {
  Zero prev
}

Two { prev }
------------ {
  One prev
}

Add ["zero", y, y]

Add [{ prev }, y, { prev: result_prev } ]
---------------------------------------- {
  Add [prev, y, result_prev]
}

query (z) {
  One x
  One y
  Add [x, y, z]
}

// TODO need limit

// query (x, y, z) {
//   Add [x, y, z]
// }

query (x, y) {
  Two z
  Add [x, y, z]
}

Mul ["zero", y, "zero"]

Mul [{ prev }, y, result]
---------------------------- {
  Add [z, y, result]
  Mul [prev, y, z]
}

query (z) {
  Two x
  Two y
  Mul [x, y, z]
}
