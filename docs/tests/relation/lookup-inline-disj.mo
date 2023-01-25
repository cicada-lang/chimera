clause Lookup(map, name, found)
------------------------- here {
  Equal(map, [[key, value] | _rest])
  Equal(key, name)
  Equal(found, value)
}

clause Lookup(map, name, found)
------------------------------- there {
  Equal(map, [[key, _value] | rest])
  NotEqual(key, name)
  Lookup(rest, name, found)
}

print find x {
  Equal(map, [["a", 1], ["b", 2], ["c", 3]])
  Lookup(map, "b", x)
}

print find map limit 3 {
  Lookup(map, "b", 2)
}

// TODO We need to improve our search strategy
// to make the following perform the same as the above.

clause LookupInlineDisj(map, name, found)
------------------------------------ {
  Equal(map, [[key, value] | rest])
  disj {
    conj { Equal(key, name) Equal(found, value) }
    conj { NotEqual(key, name) LookupInlineDisj(rest, name, found) }
  }
}

print find x {
  Equal(map, [["a", 1], ["b", 2], ["c", 3]])
  LookupInlineDisj(map, "b", x)
}

print find map limit 3 {
  LookupInlineDisj(map, "b", 2)
}
