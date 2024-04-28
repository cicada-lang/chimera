relation Drink({ person: "john", alcohol: "martini" })
relation Drink({ person: "mary", alcohol: "gin" })
relation Drink({ person: "susan", alcohol: "vodka" })
relation Drink({ person: "john", alcohol: "gin" })
relation Drink({ person: "fred", alcohol: "gin" })
relation Drink({ person: "fred", alcohol: "vodka" })

relation Friendship({ left, right, alcohol })
------------------------------------ {
  Drink({ person: left, alcohol })
  Drink({ person: right, alcohol })
}

print find left {
  Friendship({ left, right: "mary", alcohol: "gin" })
}

print find left {
  Friendship({ left, alcohol: "gin" })
}

print find [left, right] {
  Friendship({ left, right, alcohol: "gin" })
}

print find [left, right, alcohol] {
  Friendship({ left, right, alcohol })
}
