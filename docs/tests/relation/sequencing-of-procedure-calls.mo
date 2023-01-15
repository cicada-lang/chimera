// Example taken from Robert Kowalski's paper
// "Predicate logic as a programming language"
// Chapter "11. SEQUENCING OF PROCEDURE CALLS"

// The point is that doing `Ord` before `Perm`
// is more efficient.

// clause Sort(x, y) -- s1 { Perm(x, y) Ord(y) }
clause Sort(x, y) -- s1 { Ord(y) Perm(x, y) }
clause Perm([], []) -- s2
clause Perm(z, [x | y]) -- s3 { Perm(z2, y) Del(x, z, z2) }
clause Del(x, [x | y], y) -- s4
clause Del(x, [y | z], [y | z2]) -- s5 { Del(x, z, z2) }
clause Ord([]) -- s6
clause Ord([_x]) -- s7
clause Ord([x, y | z]) -- s8 { LE(x, y) Ord([y | z]) }
clause LE(1, 2) -- s9
clause LE(1, 3) -- s10
clause LE(2, 3) -- s11
clause LE(x, x) -- s12

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
