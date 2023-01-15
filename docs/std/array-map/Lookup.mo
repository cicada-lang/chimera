export { Lookup }

clause Lookup(map, name, found)
------------------------- here {
  map = [[key, value] | _rest]
  key = name
  found = value
}

clause Lookup(map, name, found)
------------------------------- there {
  map = [[key, _value] | rest]
  key != name
  Lookup(rest, name, found)
}
