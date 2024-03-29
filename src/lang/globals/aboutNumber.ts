import * as Values from "../value"
import type { GlobalStore } from "./GlobalStore"

export function aboutNumber(globals: GlobalStore): void {
  globals.define(
    "Number",
    Values.TypeConstraint("Number", (value) => value["@kind"] === "Number"),
  )

  globals.primitive("isNumber", 1, ([value]) => {
    return Values.Boolean(value["@kind"] === "Number")
  })

  globals.primitive("add", 2, ([x, y]) => {
    Values.assertValue(x, "Number", { who: "add" })
    Values.assertValue(y, "Number", { who: "add" })
    return Values.Number(x.data + y.data)
  })

  globals.primitive("sub", 2, ([x, y]) => {
    Values.assertValue(x, "Number", { who: "sub" })
    Values.assertValue(y, "Number", { who: "sub" })
    return Values.Number(x.data - y.data)
  })

  globals.primitive("add1", 1, ([x]) => {
    Values.assertValue(x, "Number", { who: "add1" })
    return Values.Number(x.data + 1)
  })

  globals.primitive("sub1", 1, ([x]) => {
    Values.assertValue(x, "Number", { who: "sub1" })
    return Values.Number(x.data - 1)
  })

  globals.primitive("mul", 2, ([x, y]) => {
    Values.assertValue(x, "Number", { who: "mul" })
    Values.assertValue(y, "Number", { who: "mul" })
    return Values.Number(x.data * y.data)
  })

  globals.primitive("div", 2, ([x, y]) => {
    Values.assertValue(x, "Number", { who: "div" })
    Values.assertValue(y, "Number", { who: "div" })
    return Values.Number(x.data / y.data)
  })

  globals.primitive("max", 2, ([x, y]) => {
    Values.assertValue(x, "Number", { who: "max" })
    Values.assertValue(y, "Number", { who: "max" })
    return Values.Number(Math.max(x.data, y.data))
  })

  globals.primitive("min", 2, ([x, y]) => {
    Values.assertValue(x, "Number", { who: "min" })
    Values.assertValue(y, "Number", { who: "min" })
    return Values.Number(Math.min(x.data, y.data))
  })

  globals.primitive("maximum", 1, ([value]) => {
    return Values.Number(
      Math.max(
        ...Values.toArray(value).map((n) => {
          Values.assertValue(n, "Number", { who: "maximum" })
          return n.data
        }),
      ),
    )
  })

  globals.primitive("minimum", 1, ([value]) => {
    return Values.Number(
      Math.min(
        ...Values.toArray(value).map((n) => {
          Values.assertValue(n, "Number", { who: "minimum" })
          return n.data
        }),
      ),
    )
  })

  globals.primitive("sum", 1, ([value]) => {
    let result = 0
    for (const n of Values.toArray(value)) {
      Values.assertValue(n, "Number", { who: "sum" })
      result = result + n.data
    }

    return Values.Number(result)
  })

  globals.primitive("product", 1, ([value]) => {
    let result = 1
    for (const n of Values.toArray(value)) {
      Values.assertValue(n, "Number", { who: "product" })
      result = result * n.data
    }

    return Values.Number(result)
  })

  globals.primitive("lt", 2, ([x, y]) => {
    Values.assertValue(x, "Number", { who: "lt" })
    Values.assertValue(y, "Number", { who: "lt" })
    return Values.Boolean(x.data < y.data)
  })

  globals.primitive("lteq", 2, ([x, y]) => {
    Values.assertValue(x, "Number", { who: "lteq" })
    Values.assertValue(y, "Number", { who: "lteq" })
    return Values.Boolean(x.data <= y.data)
  })

  globals.primitive("gt", 2, ([x, y]) => {
    Values.assertValue(x, "Number", { who: "gt" })
    Values.assertValue(y, "Number", { who: "gt" })
    return Values.Boolean(x.data > y.data)
  })

  globals.primitive("gteq", 2, ([x, y]) => {
    Values.assertValue(x, "Number", { who: "gteq" })
    Values.assertValue(y, "Number", { who: "gteq" })
    return Values.Boolean(x.data >= y.data)
  })
}
