import { find, goalFromValue } from "../find"
import { refresh } from "../refresh"
import * as Values from "../value"
import { assertValue } from "../value"
import type { GlobalStore } from "./GlobalStore"

export async function aboutRelation(globals: GlobalStore): Promise<void> {
  globals.primitive("findAll", 2, (args, { mod, env }) => {
    const renames = new Map()
    const pattern = refresh(renames, args[0])
    const goals = Values.toArray(refresh(renames, args[1])).map((value) =>
      goalFromValue(mod, env, value),
    )
    return Values.fromArray(find(mod, Infinity, pattern, goals))
  })

  globals.primitive("find", 3, (args, { mod, env }) => {
    const limit = args[0]
    assertValue(limit, "Number", { who: "find" })
    const renames = new Map()
    const pattern = refresh(renames, args[1])
    const goals = Values.toArray(refresh(renames, args[2])).map((value) =>
      goalFromValue(mod, env, value),
    )
    return Values.fromArray(find(mod, limit.data, pattern, goals))
  })
}
