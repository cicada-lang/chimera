import { executeStmtsSync } from "../execute"
import type { Mod } from "../mod"
import type { Stmt } from "../stmt"
import { ReturnValue } from "../stmt"
import type { Value } from "../value"
import * as Values from "../value"

export function catchReturnValue(mod: Mod, stmts: Array<Stmt>): Value {
  try {
    executeStmtsSync(mod, stmts)
    return Values.Null()
  } catch (error) {
    if (error instanceof ReturnValue) {
      return error.value
    }

    throw error
  }
}
