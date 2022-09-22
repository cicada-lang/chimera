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

console.log(
  Logic.query(
    (v) => [pair.o({ p1: v`x`, p2: v`y`, alcohol: v`alcohol` })],
    ["x", "y"]
  )
)

{
  type Result = { x: string; y: string }
  const results: Array<Result> = Logic.find(
    (v) => [pair.o({ p1: v`x`, p2: v`y`, alcohol: v`alcohol` })],
    { x: ty.string(), y: ty.string() }
  )
  console.log(results)
}

{
  type Result = { x: string }
  const results: Array<Result> = pair.find(
    { p1: v`x`, p2: v`y`, alcohol: v`alcohol` },
    { x: ty.string() }
  )
  console.log(results)
}
