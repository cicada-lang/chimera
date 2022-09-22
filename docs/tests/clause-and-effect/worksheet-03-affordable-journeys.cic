import Logic, { v, ty } from "../.."

const border = new Logic.Table({
  name: "border",
  schema: ty.tuple(ty.string(), ty.string()),
})

border.i(["sussex", "kent"])
border.i(["sussex", "surrey"])
border.i(["surrey", "kent"])
border.i(["hampshire", "sussex"])
border.i(["hampshire", "surrey"])
border.i(["hampshire", "berkshire"])
border.i(["berkshire", "surrey"])
border.i(["wiltshire", "hampshire"])
border.i(["wiltshire", "berkshire"])

// to get symmetry

const adjacent = new Logic.Table({
  name: "adjacent",
  schema: ty.tuple(ty.string(), ty.string()),
})

adjacent.i([v`x`, v`y`], (v) => [border.o([v`x`, v`y`])])
adjacent.i([v`x`, v`y`], (v) => [border.o([v`y`, v`x`])])

const affordable = new Logic.Table({
  name: "affordable",
  schema: ty.tuple(ty.string(), ty.string()),
})

affordable.i([v`x`, v`y`], (v) => [
  adjacent.o([v`x`, v`z`]),
  adjacent.o([v`z`, v`y`]),
])

console.log(affordable.query([v`to_kent`, "kent"]))
console.log(affordable.query(["sussex", v`to_sussex`]))
console.log(affordable.query([v`x`, v`y`]))
