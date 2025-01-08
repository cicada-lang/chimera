export { Append }

relation Append([], l, l)
relation Append([a | d], l, [a | r]) -- {
  Append(d, l, r)
}
