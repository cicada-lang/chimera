import Logic, { Logical, v, ty, Schema, Var } from "../.."
import { List, listSchema, cons } from "./list"

const member = new Logic.Table({
  name: "member",
  schema: ty.tuple(ty.string(), listSchema(ty.string())),
})

member.i([v`element`, cons<string>(v`element`, v`tail`)])
member.i([v`element`, cons<string>(v`head`, v`tail`)], (v) => [
  member.o([v`element`, v`tail`]),
])

member.assertSuccess(["john", cons("paul", cons<string>("john", null))])
member.assertFailure([
  "joe",
  cons("marx", cons("darwin", cons<string>("freud", null))),
])

member.assertFindResults({
  data: [v`element`, cons("paul", cons<string>("john", null))],
  projections: { element: ty.string() },
  results: [{ element: "paul" }, { element: "john" }],
})

{
  const results = member.query(["foo", v`list`], { limit: 3 })
  for (const result of results) {
    console.log(JSON.stringify(result))
  }
}
