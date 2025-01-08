// relation Max(null, n, n)
// ---------------- {}

// relation Max(cons(x, rest), n, max)
// ---------------------------- {
//   Max(rest, x, max)
//   x > n
// }

// relation Max(cons (x, rest), n, max)
// ---------------------------- {
//   Max(rest, n, max)
//   x <= n
// }

// // TODO We need to view `Array` as `cons` and `null` here.

// print find max { Max([3, 1, 4, 1, 5, 8, 2, 6], 0, max) }
// print find max { Max([3, 1, 4, 1, 5, 8, 2, 6], 9, max) }
// print find max { Max([2, 4, 7, 7, 7, 2, 1, 6], 5, max) }
