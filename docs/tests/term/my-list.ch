clause List(List::Null())
clause List(List::Cons(_head, tail)) -- { List(tail) }

print find _ {
  List(List::Null())
  List(List::Cons(1, List::Cons(2, List::Cons(3, List::Null()))))
}

print find [list, x, y, z] {
  Equal(list, List::Cons(1, List::Cons(2, List::Cons(3, List::Null()))))
  Equal(list, List::Cons(x, List::Cons(y, List::Cons(z, List::Null()))))
}

print find [list, x, y, z] {
  Equal(list, List::Cons(x, List::Cons(y, List::Cons(z, List::Null()))))
}
