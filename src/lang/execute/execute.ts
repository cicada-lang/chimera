import * as Errors from "../errors"
import { executeSync } from "../execute"
import type { Mod } from "../mod"
import type { Stmt } from "../stmt"
import { importMod } from "./importMod"

export async function execute(
  mod: Mod,
  stmt: Stmt,
): Promise<undefined | string> {
  switch (stmt["@kind"]) {
    case "Clause":
    case "Let":
    case "Fn":
    case "Rule":
    case "Hyperrule": {
      return executeSync(mod, stmt)
    }

    case "Import": {
      const importedMod = await importMod(mod, stmt.path)
      for (const { name, alias } of stmt.bindings) {
        if (!importedMod.exported.has(name)) {
          throw new Errors.LangError(
            [
              `[Import.prepare]`,
              `  can not import private name: ${name}`,
              `  imported path: ${stmt.path}`,
            ].join("\n"),
          )
        }

        const value = importedMod.find(name)
        if (value !== undefined) {
          mod.define(alias || name, value)
        } else {
          throw new Errors.LangError(
            [
              `[Import.prepare]`,
              `  undefined name: ${name}`,
              `  imported path: ${stmt.path}`,
            ].join("\n"),
          )
        }
      }

      mod.imported.push(mod.resolve(stmt.path))
      return
    }

    case "ImportAll": {
      const importedMod = await importMod(mod, stmt.path)
      for (const [name, value] of importedMod.exportedEntries()) {
        mod.define(name, value)
      }

      mod.imported.push(mod.resolve(stmt.path))
      return
    }

    case "Export": {
      mod.exportDepth++
      await execute(mod, stmt.stmt)
      mod.exportDepth--
      return
    }

    case "ExportNames": {
      for (const name of stmt.names) {
        mod.exported.add(name)
      }

      return
    }

    case "Compute":
    case "Print":
    case "Assert":
    case "Return":
    case "If": {
      return executeSync(mod, stmt)
    }
  }
}
