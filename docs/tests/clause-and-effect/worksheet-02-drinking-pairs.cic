Drink { person: "john", alcohol: "martini" }
Drink { person: "mary", alcohol: "gin" }
Drink { person: "susan", alcohol: "vodka" }
Drink { person: "john", alcohol: "gin" }
Drink { person: "fred", alcohol: "gin" }
Drink { person: "fred", alcohol: "vodka" }

Friends { left, right, alcohol }
------------------------------------ {
  Drink { person: left, alcohol }
  Drink { person: right, alcohol }
}

query (left) {
  Friends { left, right: "mary", alcohol: "gin" }
}

query (left, right) {
  Friends { left, right, alcohol: "gin" }
}

query (left, right, alcohol) {
  Friends { left, right, alcohol }
}
