import * as Errors from "../errors"
import { executeSync } from "../execute"
import type { Mod } from "../mod"
import type { Stmt } from "../stmt"
import { prepareSync } from "./prepareSync"

export function executeStmtsSync(mod: Mod, stmts: Array<Stmt>): void {
  if (!mod.initialized) {
    throw new Errors.LangError(`[executeStmtsSync] not initialized mod`)
  }

  for (const stmt of stmts.values()) {
    prepareSync(mod, stmt)
  }

  const offset = mod.stmts.length
  for (const [index, stmt] of stmts.entries()) {
    const output = executeSync(mod, stmt)
    mod.stmts.push(stmt)
    if (output) {
      mod.outputs.set(offset + index, output)
      if (mod.options.loader.options.onOutput) {
        mod.options.loader.options.onOutput(output)
      }
    }
  }
}
