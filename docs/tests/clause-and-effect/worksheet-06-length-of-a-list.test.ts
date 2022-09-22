import Logic, { Logical, v, eq, ty, Schema } from "../.."
import { List, listSchema, cons } from "./list"
import { Nat, natSchema, zero, add1 } from "./nat"

const length = new Logic.Table({
  name: "length",
  schema: ty.tuple(listSchema(ty.string()), natSchema()),
})

length.i([null, zero])

length.i([{ head: v`head`, tail: v`tail` }, v`length`], (v) => [
  length.o([v`tail`, v`tail_length`]),
  eq(v`length`, add1(v`tail_length`)),
])

length.assertFindResults({
  data: [cons("apple", cons<string>("pear", null)), v`length`],
  projections: { length: natSchema() },
  results: [{ length: add1(add1("zero")) as Nat }],
})

console.log(length.query([v`list`, "zero"]))
console.log(length.query([v`list`, add1("zero")]))
console.log(length.query([v`list`, add1(add1("zero"))]))
