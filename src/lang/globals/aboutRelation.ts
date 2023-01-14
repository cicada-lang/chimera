import { envLookupValue } from "../env"
import * as Errors from "../errors"
import * as Goals from "../goal"
import { refresh } from "../refresh"
import { reify } from "../reify"
import { Solver } from "../solver"
import * as Values from "../value"
import { formatValue } from "../value"
import type { GlobalStore } from "./GlobalStore"

export async function aboutRelation(globals: GlobalStore): Promise<void> {
  globals.primitive("findAll", 2, ([pattern, body], { mod, env }) => {
    const renames = new Map()
    const value = refresh(mod, renames, pattern)
    const goals = Values.toArray(refresh(mod, renames, body)).map((value) => {
      if (value["@kind"] !== "Term") {
        throw new Errors.LangError(
          [
            `[aboutRelation] expect value in body to be a Term`,
            `  value: ${formatValue(value)}`,
          ].join("\n"),
        )
      }

      {
        const target = envLookupValue(env, value.name)
        if (target !== undefined) {
          return Goals.Apply(value.name, target, value.args)
        }
      }

      {
        const target = envLookupValue(mod.env, value.name)
        if (target !== undefined) {
          return Goals.Apply(value.name, target, value.args)
        }
      }

      throw new Errors.LangError(
        `[findAll] undefined relation name: ${value.name}`,
      )
    })

    const solver = Solver.start(goals)
    const solutions = solver.solve(mod, { limit: Infinity })

    return Values.fromArray(
      solutions.map((solution) => reify(mod, solution, value)),
    )
  })
}
