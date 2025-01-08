import { Succeed, Fail } from "01-playthings.ch"

relation Always()
--------- {
  Succeed()
}

relation Always()
--------- {
  Always()
}

print find _ limit 3 {
  Always()
}

print find q limit 3 {
  Equal(q, "onion")
  Always()
}

print find q limit 3 {
  Always()
  Equal(q, "onion")
}

// NOTE Infinite loop

// print find q {
//   Always()
//   Fail()
// }

// NOTE Infinite loop

// print find q {
//   Equal(q, "garlic")
//   Always()
//   Equal(q, "onion")
// }

print find q {
  Equal(q, "garlic")
  Equal(q, "onion")
  Always()
}

relation Never()
--------- {
  Never()
}

print find _ {
  Fail()
  Never()
}

// NOTE Infinite loop

// print find q {
//   Never()
//   Fail()
// }

// NOTE Infinite loop

// print find q {
//   Never()
//   Fail()
//   Never()
// }
