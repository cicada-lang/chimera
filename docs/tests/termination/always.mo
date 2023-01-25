clause Always() -- base
clause Always() -- loop { Always() }

print find _ limit 3 {
  Always()
}

// This code diverges,
// because `Always` succeeds
// an unbounded number of times,
// and because `Equal(x, false)` fails each of those times.

// print find x limit 1 {
//   Equal(x, true)
//   Always()
//   Equal(x, false)
// }

// Termination is relative to implementation,
// we can trace our solver,
// to see why the above code diverges.

// If the same solver state occurred,
// thus infinite loop here.

// trace steps 5 {
//   Equal(x, true)
//   Always()
//   Equal(x, false)
// }

// We can simply reorder the goals in the conjunction
// to make the search not diverge,
// but we can not do this for performance reason
// (depth-first v.s. breadth-first).

print find x {
  Equal(x, true)
  Equal(x, false)
  Always()
}

// trace {
//   Equal(x, true)
//   Equal(x, false)
//   Always()
// }

print find x limit 5 {
  Disj([
    Equal(x, true),
    Equal(x, false),
  ])
  Always()
  Equal(x, false)
}

// Some solutions will diverge,
// But we can also understand why
// some solutions will not diverge,
// and return as many `false`s as asked.

// trace steps 5 {
//   Disj([
//     Equal(x, true),
//     Equal(x, false),
//   ])
//   Always()
//   Equal(x, false)
// }

// If we change the last line to `Equal(x, true)`
// we get as many `true`s as asked.

print find x limit 5 {
  Disj([
    Equal(x, true),
    Equal(x, false),
  ])
  Always()
  Equal(x, true)
}
