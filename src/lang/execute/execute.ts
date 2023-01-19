import { executeSync } from "../execute"
import type { Mod } from "../mod"
import type { Stmt } from "../stmt"

export async function execute(
  mod: Mod,
  stmt: Stmt,
): Promise<undefined | string> {
  switch (stmt["@kind"]) {
    case "Clause":
    case "Let":
    case "Fn":
    case "Rule":
    case "Hyperrule":
    case "Import":
    case "ImportAll": {
      return executeSync(mod, stmt)
    }

    case "Export": {
      mod.exportDepth++
      await execute(mod, stmt.stmt)
      mod.exportDepth--
      return
    }

    case "ExportNames":
    case "Compute":
    case "Print":
    case "Assert":
    case "Return":
    case "If": {
      return executeSync(mod, stmt)
    }
  }
}
