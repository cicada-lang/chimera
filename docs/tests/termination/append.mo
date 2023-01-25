clause Append([], t, t)

clause Append([a | d], t, out)
------------------------- {
  Append(d, t, res)
  Equal(out, [a | res])
}

print find [x, y] limit 6 {
  Append(x, y, [1, 2, 3, 4, 5])
}

// Unfortunately, replacing try to find the 7th result will diverge,

// print find [x, y] limit 7 {
//   Append(x, y, [1, 2, 3, 4, 5])
// }

// We can avoid this problem if we swap the last two lines of `Append`.
// "FF" means finite failure.

clause AppendFF([], t, t)

clause AppendFF([a | d], t, out)
-------------------------------------- {
  Equal(out, [a | res])
  AppendFF(d, t, res)
}

print find [x, y] {
  AppendFF(x, y, [1, 2, 3, 4, 5])
}

// This `AppendFF` illustrates an important principle:
// unifications should always come before recursive calls,
// or calls to other "serious" relations.
