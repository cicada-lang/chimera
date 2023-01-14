clause Always() -- base
clause Always() -- loop { Always() }

print find _ limit 3 {
  Always()
}

// This code diverges,
// because `Always` succeeds
// an unbounded number of times,
// and because `x = false` fails each of those times.

// print find x limit 1 {
//   x = true
//   Always()
//   x = false
// }

// Termination is relative to implementation,
// we can trace our solver,
// to see why the above code diverges.

// If the same solver state occurred,
// thus infinite loop here.

// trace steps 5 {
//   x = true
//   Always()
//   x = false
// }

// We can simply reorder the goals in the conjunction
// to make the search not diverge,
// but we can not do this for performance reason
// (depth-first v.s. breadth-first).

print find x {
  x = true
  x = false
  Always()
}

// trace {
//   x = true
//   x = false
//   Always()
// }

print find x limit 5 {
  disj {
    x = true
    x = false
  }
  Always()
  x = false
}

// Some solutions will diverge,
// But we can also understand why
// some solutions will not diverge,
// and return as many `false`s as asked.

// trace steps 5 {
//   disj {
//     x = true
//     x = false
//   }
//   Always()
//   x = false
// }

// If we change the last line to `x = true`
// we get as many `true`s as asked.

print find x limit 5 {
  disj {
    x = true
    x = false
  }
  Always()
  x = true
}
