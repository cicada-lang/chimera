import { Succeed, Fail } from "01-playthings.mo"

clause Always()
--------- {
  Succeed()
}

clause Always()
--------- {
  Always()
}

print find _ limit 3 {
  Always()
}

print find q limit 3 {
  q = "onion"
  Always()
}

print find q limit 3 {
  Always()
  q = "onion"
}

// NOTE Infinite loop

// print find q {
//   Always()
//   Fail()
// }

// NOTE Infinite loop

// print find q {
//   q = "garlic"
//   Always()
//   q = "onion"
// }

print find q {
  q = "garlic"
  q = "onion"
  Always()
}

clause Never()
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
