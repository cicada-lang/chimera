import { executeStmts } from "../execute/index.ts"
import type { Mod } from "../mod/index.ts"
import type { Stmt } from "../stmt/index.ts"
import { ReturnValue } from "../stmt/index.ts"
import type { Value } from "../value/index.ts"
import * as Values from "../value/index.ts"

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
