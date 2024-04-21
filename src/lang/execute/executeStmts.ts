import { execute } from "../execute/index.js"
import type { Mod } from "../mod/index.js"
import type { Stmt } from "../stmt/index.js"

export function executeStmts(mod: Mod, stmts: Array<Stmt>): void {
  mod.initialize()

  const offset = mod.stmts.length
  for (const [index, stmt] of stmts.entries()) {
    const output = execute(mod, stmt)
    mod.stmts.push(stmt)
    if (output) {
      mod.outputs.set(offset + index, output)
      if (mod.options.loader.options.onOutput) {
        mod.options.loader.options.onOutput(output)
      }
    }
  }
}
