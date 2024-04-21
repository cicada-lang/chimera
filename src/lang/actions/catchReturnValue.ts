import { executeStmts } from "../execute/index.js"
import type { Mod } from "../mod/index.js"
import type { Stmt } from "../stmt/index.js"
import { ReturnValue } from "../stmt/index.js"
import type { Value } from "../value/index.js"
import * as Values from "../value/index.js"

export function catchReturnValue(mod: Mod, stmts: Array<Stmt>): Value {
  try {
    executeStmts(mod, stmts)
    return Values.Null()
  } catch (error) {
    if (error instanceof ReturnValue) {
      return error.value
    }

    throw error
  }
}
