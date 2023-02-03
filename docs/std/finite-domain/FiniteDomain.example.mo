import { FiniteDomain } from "FiniteDomain.mo"

function Different(values) {
  return conj(arrayMapSpread(arrayCombination(values, 2), NotEqual))
}

// `In` is a special relation which requires
// its second argument to be a list of numbers
// i.e. to be grounded.

print find q {
  constraints FiniteDomain {
    In(q, [1, 2, 3])
  }
  NotEqual(q, 2)
}

print find q {
  NotEqual(q, 2)
  constraints FiniteDomain {
    In(q, [1, 2, 3])
  }
}

// => [1, 3]

print find q {
  constraints FiniteDomain {
    Range(q, 1, 3)
  }
  NotEqual(q, 1)
}

print find q {
  constraints FiniteDomain {
    Range(q, 1, 3)
  }
  NotEqual(q, 1)
  NotEqual(q, 3)
}

print find [x, y, z] {
  constraints FiniteDomain {
    In(x, [1, 2, 3])
    In(y, [3, 4, 5])
    In(z, [5, 6, 9])
    In(z, [1, 2, 3, 5, 6, 7, 8])
  }
  x = y
}

// => [[3, 3, 5], [3, 3, 6]]

// `FD.Range` requires its second argument to be grounded.

print find x {
  constraints FiniteDomain {
    Lt(2, x)
    LtEq(x, 7)
    Range(x, 0, 10)
  }
}

// => [3, 4, 5, 6, 7]

// A variable used with finite domain constraints
// must have domain (or equal to a number).
// The follow in is error instead of fail.

print find [x, y] {
  constraints FiniteDomain {
    Lt(x, y)
    Lt(y, x)
  }
}

// Unsatisfiable constraints, even when the variables are not
// referenced or associated with the run variable in any way,
// still result in failure.

print find q {
  constraints FiniteDomain {
    In(x, [1, 2])
    In(y, [1, 2])
    In(z, [1, 2])
  }
  Different([x, y, z])
  q = 5
}

// => []

print find q {
  constraints FiniteDomain {
    In(x, [1, 2, 3])
    In(y, [1, 2, 3])
    In(z, [1, 2, 3])
  }
  Different([x, y, z])
  q = x
}

// => [1, 2, 3]

print find q {
  constraints FiniteDomain {
    In(x, [1, 2, 3])
    In(y, [1, 2, 3])
    In(z, [1, 2, 3])
  }
  Different([x, y, z])
  q = [x, z]
}

// => [[1, 2], [1, 3], [2, 1], [3, 1], [2, 3], [3, 2]]

print find q {
  constraints FiniteDomain {
    In(q, [3, 4, 5, 6])
  }
  Different([2, 3, q])
}

// => [4, 5, 6]

print find [x, y, z] {
  constraints FiniteDomain {
    In(x, [1, 2, 3, 4, 5])
    In(y, [1, 2, 3, 4, 5])
    In(z, [1, 2, 3, 4, 5])
    Lt(z, x)
    Add(y, 2, z)
  }
}

// => [[4, 1, 3], [5, 1, 3], [5, 2, 4]]

// # 3.1.2 Watching cKanren Run

// NOTE This is one of the essential techniques
// of little book study, i.e. watch the interpreter run,
// or say, designing formal language
// to take about how the interpreter runs.

// TODO solution changes (as in the paper) to the exmaples.

print find [y, z] {
  constraints FiniteDomain {
    Range(x, 3, 5)
    Range(z, 3, 5)
    Range(y, 1, 4)
    Lt(x, 5)
  }
  x = y
}

// => [[3, 3], [4, 3], [3, 4], [4, 4], [3, 5], [4, 5]]

print find [y, z] {
  constraints FiniteDomain {
    Range(x, 3, 5)
    Range(z, 3, 5)
    Range(y, 1, 4)
  }
  x = y
  constraints FiniteDomain {
    Lt(x, 5)
  }
}

print find [y, z] {
  x = y
  constraints FiniteDomain {
    Lt(x, 5)
    Range(x, 3, 5)
    Range(z, 3, 5)
    Range(y, 1, 4)
  }
}

print find q {
  constraints FiniteDomain {
    Range(w, 1, 5)
    Range(z, 1, 5)
  }

  Different([x, y, z])
  q = [x, y, z]
  [x, y] = [1, 2]

  constraints FiniteDomain {
    Add(x, y, w)
    Add(w, y, z)
  }
}

// => [[1, 2, 5]]
