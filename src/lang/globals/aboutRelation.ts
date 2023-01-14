import { find, goalFromValue } from "../find"
import { refresh } from "../refresh"
import * as Values from "../value"
import type { GlobalStore } from "./GlobalStore"

export async function aboutRelation(globals: GlobalStore): Promise<void> {
  globals.primitive("findAll", 2, ([pattern, body], { mod, env }) => {
    const renames = new Map()
    const value = refresh(mod, renames, pattern)
    const goals = Values.toArray(refresh(mod, renames, body)).map((value) =>
      goalFromValue(mod, env, value),
    )
    return Values.fromArray(find(mod, Infinity, value, goals))
  })
}
