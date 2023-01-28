import { FiniteDomain as FD } from "../docs/std/finite-domain/index.mo"

// `In` is a special relation which requires
// its second argument to be a list of numbers
// i.e. to be grounded.

print hyperrewrite(FD, quote [
  In(q, [1, 2, 3]),
  NotEq(q, 2),
])

print find q {
  constraints {
    In(q, [1, 2, 3])
    NotEq(q, 2)
  }
}

print find q {
  FD.In(q, [1, 2, 3])
  FD.NotEq(q, 2)
}

// => [1, 3]

print find [x, y, z] {
  FD.In(x, [1, 2, 3])
  FD.In(y, [3, 4, 5])
  FD.In(z, [5, 6, 9])
  FD.In(z, [1, 2, 3, 5, 6, 7, 8])
  x = y
}

// => [[3, 3, 5], [3, 3, 6]]

clause FD.Lt(x, y) -- { FD.LtEq(x, y) FD.NotEq(x, y) }

// `FD.Range` requires its second argument to be grounded.

print find x {
  FD.Lt(2, x)
  FD.LtEq(x, 7)
  FD.Range(x, [0, 10])
}

// => [3, 4, 5, 6, 7]

// A variable used with finite domain constraints
// must have domain (or equal to a number).
// The follow in is error instead of fail.

print find [x, y] {
  FD.Lt(x, y)
  FD.Lt(y, x)
}

// Unsatisfiable constraints, even when the variables are not
// referenced or associated with the run variable in any way,
// still result in failure.

print find q {
  FD.In(x, [1, 2, 3])
  FD.In(y, [1, 2, 3])
  FD.In(z, [1, 2, 3])
  FD.AllDiff(x, y, z)
  q = 5
}

// => []

print find q {
  FD.In(x, [1, 2, 3])
  FD.In(y, [1, 2, 3])
  FD.In(z, [1, 2, 3])
  FD.AllDiff(x, y, z)
  q = x
}

// => [1, 2, 3]

print find q {
  FD.In(x, [1, 2, 3])
  FD.In(y, [1, 2, 3])
  FD.In(z, [1, 2, 3])
  FD.AllDiff(x, y, z)
  q = [x, z]
}

// => [[1, 2], [1, 3], [2, 1], [3, 1], [2, 3], [3, 2]]

print find q {
  FD.In(q, [3, 4, 5, 6])
  FD.AllDiff(2, 3, q)
}

// => [4, 5, 6]

print find [x, y, z] {
  FD.In(x, [1, 2, 3, 4, 5])
  FD.In(y, [1, 2, 3, 4, 5])
  FD.In(z, [1, 2, 3, 4, 5])
  FD.Lt(z, x)
  FD.Add(y, 2, z)
}

// => [[4, 1, 3], [5, 1, 3], [5, 2, 4]]

// # 3.1.2 Watching cKanren Run

// NOTE This is one of the essential techniques
// of little book study, i.e. watch the interpreter run,
// or say, designing formal language
// to take about how the interpreter runs.

// TODO solution changes (as in the paper) to the exmaples.

print find [y, z] {
  FD.Range(x, [3, 5])
  FD.Range(z, [3, 5])
  FD.Range(y, [1, 4])
  FD.Lt(x, 5)
  x = y
}

// => [[3, 3], [4, 3], [3, 4], [4, 4], [3, 5], [4, 5]]

print find [y, z] {
  FD.Range(x, [3, 5])
  FD.Range(z, [3, 5])
  FD.Range(y, [1, 4])
  x = y
  FD.Lt(x, 5)
}

print find [y, z] {
  x = y
  FD.Lt(x, 5)
  FD.Range(x, [3, 5])
  FD.Range(z, [3, 5])
  FD.Range(y, [1, 4])
}

print find q {
  FD.Range(w, [1, 5])
  FD.Range(z, [1, 5])
  FD.AllDiff(q)
  q = [x, y, z]
  [x, y] = [1, 2]
  FD.Add(x, y, w)
  FD.Add(w, y, z)
}

// => [[1, 2, 5]]
