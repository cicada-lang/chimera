import * as Errors from "../errors"
import type { Mod } from "../mod"
import type { Stmt } from "../stmt"
import { Relation } from "../value"

export function prepareSync(mod: Mod, stmt: Stmt): void {
  switch (stmt["@kind"]) {
    case "Clause": {
      const value = mod.find(stmt.relationName)

      if (
        value !== undefined &&
        value["@kind"] === "Relation" &&
        value.mod === mod
      ) {
        return
      }

      mod.define(
        stmt.relationName,
        Relation(mod, stmt.relationName, undefined, []),
      )
      return
    }

    case "Let":
    case "Fn":
    case "Rule":
    case "Hyperrule": {
      return
    }

    case "Import": {
      throw new Errors.LangError(
        `[prepareSync] can not use import synchronously (for example, in function body)`,
      )
    }

    case "ImportAll": {
      throw new Errors.LangError(
        `[prepareSync] can not use import * synchronously (for example, in function body)`,
      )
    }

    case "Export": {
      mod.exportDepth++
      prepareSync(mod, stmt.stmt)
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
      return
    }
  }
}
