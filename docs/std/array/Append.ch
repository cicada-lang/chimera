export { Append }

clause Append([], l, l)
clause Append([a | d], l, [a | r]) -- {
  Append(d, l, r)
}
