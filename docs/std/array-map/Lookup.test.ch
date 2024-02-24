import { Lookup } from "Lookup.ch"

print find x {
  Equal(map, [["a", 1], ["b", 2], ["c", 3]])
  Lookup(map, "b", x)
}

print find map limit 3 {
  Lookup(map, "b", 2)
}
