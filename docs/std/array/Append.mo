export clause Append([], l, l)
export clause Append([a | d], l, [a | r]) -- {
  Append(d, l, r)
}
