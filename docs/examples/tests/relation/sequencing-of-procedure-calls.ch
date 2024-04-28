// Example taken from Robert Kowalski's paper
// "Predicate logic as a programming language"
// Chapter "11. SEQUENCING OF PROCEDURE CALLS"

// The point is that doing `Ord` before `Perm`
// is more efficient.

// relation Sort(x, y) -- s1 { Perm(x, y) Ord(y) }
relation Sort(x, y) -- s1 { Ord(y) Perm(x, y) }
relation Perm([], []) -- s2
relation Perm(z, [x | y]) -- s3 { Perm(z2, y) Del(x, z, z2) }
relation Del(x, [x | y], y) -- s4
relation Del(x, [y | z], [y | z2]) -- s5 { Del(x, z, z2) }
relation Ord([]) -- s6
relation Ord([_x]) -- s7
relation Ord([x, y | z]) -- s8 { LE(x, y) Ord([y | z]) }
relation LE(1, 2) -- s9
relation LE(1, 3) -- s10
relation LE(2, 3) -- s11
relation LE(x, x) -- s12

print find u limit 1 {
  Sort([2, 1, 3], u)
}

print find [x, y] limit 10 {
  Sort(x, y)
}

// The difference between performance
// become clear when we ask for 2000 answers.

// print find [x, y] limit 2000 {
//   Sort(x, y)
// }
