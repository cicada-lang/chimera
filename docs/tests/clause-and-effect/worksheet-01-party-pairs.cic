import Logic, { v, ty } from "../.."

const male = new Logic.Table({
  name: "male",
  schema: ty.string(),
})

male.i("bertram")
male.i("percival")

const female = new Logic.Table({
  name: "female",
  schema: ty.string(),
})

female.i("lucinda")
female.i("camilla")

const pair = new Logic.Table({
  name: "pair",
  schema: ty.object({
    male: ty.string(),
    female: ty.string(),
  }),
})

pair.i({ male: v`male`, female: v`female` }, (v) => [
  male.o(v`male`),
  female.o(v`female`),
])

pair.assertSuccess({ male: "bertram", female: "lucinda" })
pair.assertSuccess({ male: "bertram", female: "lucinda" })
pair.assertFailure({ male: "apollo", female: "daphne" })

console.log(pair.query({ male: "percival", female: v`female` }))
console.log(pair.query({ male: "camilla", female: v`female` }))
console.log(pair.query({ male: v`male`, female: "lucinda" }))
console.log(pair.query({ male: v`x`, female: v`x` }))
console.log(pair.query({ male: v`male`, female: "fido" }))
console.log(pair.query({ male: v`male`, female: v`female` }))
