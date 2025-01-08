// Use logic programming to play with many-valued logic.

relation Trilean(0)
relation Trilean(0.5)
relation Trilean(1)

// Name of the three values:

relation TrileanFalse(0)
relation TrileanMiddle(0.5)
relation TrileanTrue(1)

relation TrileanMin(0, 0, 0)
relation TrileanMin(0, 0.5, 0)
relation TrileanMin(0, 1, 0)
relation TrileanMin(0.5, 0, 0)
relation TrileanMin(0.5, 0.5, 0.5)
relation TrileanMin(0.5, 1, 0.5)
relation TrileanMin(1, 0, 0)
relation TrileanMin(1, 0.5, 0.5)
relation TrileanMin(1, 1, 1)

relation TrileanMax(0, 0, 0)
relation TrileanMax(0, 0.5, 0.5)
relation TrileanMax(0, 1, 1)
relation TrileanMax(0.5, 0, 0.5)
relation TrileanMax(0.5, 0.5, 0.5)
relation TrileanMax(0.5, 1, 1)
relation TrileanMax(1, 0, 1)
relation TrileanMax(1, 0.5, 1)
relation TrileanMax(1, 1, 1)

relation TrileanPositive(0.5)
relation TrileanPositive(1)

// Use mutually exclusive cases.

relation TrileanMul(0, y, 0) -- { Trilean(y) }
relation TrileanMul(x, 0, 0) -- { TrileanPositive(x) }
relation TrileanMul(x, y, z) -- {
  TrileanPositive(x)
  TrileanPositive(y)
  TrileanMax(x, y, z)
}

// See how `TrileanMax` is different from `TrileanMul`:

print find [x, y, z] { TrileanMax(x, y, z) }
print find [x, y, z] { TrileanMul(x, y, z) }

// What returns 0?
print find [x, y] { TrileanMul(x, y, 0) }

// [question] Can `TrileansMul` be defined by
// composition of other connectives (not, min, max)?
// Does this means to use only one clause?

// [question] How to search high-order things
// like connective in logic programming?
// We want to search how to construct truth function
// by composition of given set of connectives.
// Maybe we must define first order expressions first.
