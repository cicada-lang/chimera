export { Lookup }

relation Lookup(map, name, found)
------------------------- here {
  Equal(map, [[key, value] | _rest])
  Equal(key, name)
  Equal(found, value)
}

relation Lookup(map, name, found)
------------------------------- there {
  Equal(map, [[key, _value] | rest])
  NotEqual(key, name)
  Lookup(rest, name, found)
}
