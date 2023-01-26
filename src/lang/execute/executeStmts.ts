import { execute } from "../execute"
import type { Mod } from "../mod"
import type { Stmt } from "../stmt"

export async function executeStmts(
  mod: Mod,
  stmts: Array<Stmt>,
): Promise<void> {
  await mod.initialize()

  const offset = mod.stmts.length
  for (const [index, stmt] of stmts.entries()) {
    const output = await execute(mod, stmt)
    mod.stmts.push(stmt)
    if (output) {
      mod.outputs.set(offset + index, output)
      if (mod.options.loader.options.onOutput) {
        mod.options.loader.options.onOutput(output)
      }
    }
  }
}
