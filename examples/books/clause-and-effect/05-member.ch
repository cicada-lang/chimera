relation Member(element, [element | _tail])
------------------------------------ here {}

relation Member(element, [_head | tail])
--------------------------------- there {
  Member(element, tail)
}

print find _ {
  Member("john", ["paul", "john"])
}

print find _ {
  Member("joe", ["marx", "darwin", "freud" ])
}

print find element {
  Member(element, ["marx", "darwin", "freud"])
}

print find [list] limit 3 {
  Member("foo", list)
}
