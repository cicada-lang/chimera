import { execute } from "../execute/index.ts"
import type { Mod } from "../mod/index.ts"
import type { Stmt } from "../stmt/index.ts"

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
