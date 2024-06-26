import { Zero, Add1, One, Two } from "../../std/nat/index.ch"

relation Length([], n)
-------------------- {
  Zero(n)
}

relation Length([_head | tail], n)
-------------------------------- {
  Add1(prev, n)
  Length(tail, prev)
}

// print find n {
//   Length(["apple", "pear"], n)
// }

// print find list { Length(list, n) Zero(n) }
// print find list { Length(list, n) One(n) }
// print find list { Length(list, n) Two(n) }
