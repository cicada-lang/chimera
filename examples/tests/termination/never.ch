relation Never(x)
--------- {
  Never(x)
}

relation OneTwoThreeThenNever(1)
relation OneTwoThreeThenNever(x) -- { Never(x) }
relation OneTwoThreeThenNever(2)
relation OneTwoThreeThenNever(x) -- { Never(x) }
relation OneTwoThreeThenNever(3)
relation OneTwoThreeThenNever(x) -- { Never(x) }

// Ok:

print find x limit 3 {
  OneTwoThreeThenNever(x)
}

// Loop forever:

// print find x limit 4 {
//   OneTwoThreeThenNever(x)
// }
