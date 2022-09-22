import Logic, { Logical, Schema, v, ne, ty } from "../.."

// NOTE
// - video: https://www.youtube.com/watch?v=vdabv9EkYrY&ab_channel=ThePowerofProlog

const jug = new Logic.Table({
  name: "jug",
  schema: ty.object({
    id: ty.string(),
    capacity: ty.number(),
  }),
})

jug.i({ id: "a", capacity: 4 })
jug.i({ id: "b", capacity: 3 })

// NOTE To express changes, we think in terms of relations between states:

// TODO learn more about DCG: https://en.wikipedia.org/wiki/Definite_clause_grammar
