import { Succeed, Fail } from "01-playthings.ch"
import { Null, Cons, Car, Cdr } from "02-teaching-old-toys-new-tricks.ch"

relation List(l)
----------- {
  Null(l)
}

relation List(l)
------------- {
  Cdr(l, d)
  List(d)
}

print find x {
  List(["a", "b", x, "d"])
}

print find x limit 1 {
  List(["a", "b" | x])
}

print find x limit 5 {
  List(["a", "b" | x])
}

relation ListOfLists(l)
------------- {
  Null(l)
}

relation ListOfLists(l)
------------- {
  Car(l, a)
  List(a)
  Cdr(l, d)
  ListOfLists(d)
}

print find _ {
  ListOfLists([["a", "b"], [_x, "c"], ["d", _y]])
}

print find l limit 1 {
  ListOfLists(l)
}

print find l limit 5 {
  ListOfLists(l)
}

print find x limit 5 {
  ListOfLists([["a", "b"] | x])
}

print find x limit 5 {
  ListOfLists([["a", "b"], ["c", "d"] | x])
}

relation Singleton(l)
----------- {
  Equal(l, [_])
}

relation ListOfSingletons(l)
------------------- {
  Null(l)
}

relation ListOfSingletons(l)
-------------------- {
  Car(l, a)
  Singleton(a)
  Cdr(l, d)
  ListOfSingletons(d)
}

print find l limit 1 {
  ListOfSingletons(l)
}

print find l limit 5 {
  ListOfSingletons(l)
}

print find r limit 5 {
  ListOfSingletons([["g"], ["e" | w], [x | y] | z])
  Equal(r, [w, [x | y], z])
}

print find out limit 5 {
  Equal([["g"], ["e" | _w], [_x | _y] | _z], out)
  ListOfSingletons(out)
}

// NOTE By "The Law of Fail", we can drop the following clause.

// relation Member(x, l)
// ------------- {
//   Null(l)
//   Fail()
// }

// relation Member(x, l)
// ------------- {
//   Car(l, a)
//   Equal(x, a)
// }

relation Member(x, l)
------------- {
  Car(l, x)
}

relation Member(x, l)
------------- {
  Cdr(l, d)
  Member(x, d)
}

print find _ {
  Member("olive", ["virgin", "olive", "oil"])
}

print find x {
  Member(x, ["virgin", "olive", "oil"])
}

print find x {
  Member(x, ["hummus", "with", "pita"])
}

print find x {
  Member(x, ["pear", "grape" | "peaches"])
}

print find x {
  Member("e", ["pasta", x, "fagioli"])
}

print find x {
  Member("e", ["pasta", "e", x, "fagioli"])
}

print find x {
  Member("e", ["pasta", x, "e", "fagioli"])
}

print find [x, y] {
  Member("e", ["pasta", x, "fagioli", y])
}

print find q {
  Equal(["pasta", _x, "fagioli", _y], q)
  Member("e", q)
}

print find l limit 5 {
  Member("tofu", l)
}

relation ProperMember(x, l)
------------------- {
  Car(l, x)
  Cdr(l, d)
  List(d)
}

relation ProperMember(x, l)
------------------- {
  Cdr(l, d)
  ProperMember(x, d)
}

print find l limit 5 {
  ProperMember("tofu", l)
}

print find l limit 12 {
  ProperMember("tofu", l)
}
