clause List(null)
clause List(cons(_head, tail)) -- { List(tail) }

print find _ {
  List(null)
  List(cons(1, cons(2, cons(3, null))))
}

print find [list, x, y, z] {
  Equal(list, cons(1, cons(2, cons(3, null))))
  Equal(list, cons(x, cons(y, cons(z, null))))
}

print find [list, x, y, z] {
  Equal(list, cons(x, cons(y, cons(z, null))))
}
