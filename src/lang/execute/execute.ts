import * as Errors from "../errors/index.ts"
import { evaluate } from "../evaluate/index.ts"
import * as Exps from "../exp/index.ts"
import { formatExp, formatValue } from "../format/index.ts"
import { match } from "../match/index.ts"
import type { Mod } from "../mod/index.ts"
import { quote } from "../quote/index.ts"
import type { Stmt } from "../stmt/index.ts"
import { ReturnValue } from "../stmt/index.ts"
import {
  substitutionDeepWalk,
  substitutionEmpty,
  substitutionEntries,
} from "../substitution/index.ts"
import type { Value } from "../value/index.ts"
import * as Values from "../value/index.ts"
import {
  varCollectionFromExps,
  varCollectionFromGoalExp,
  varCollectionMerge,
  varCollectionValidate,
} from "../var-collection/index.ts"
import { defineClause } from "./defineClause.ts"
import { executeStmts } from "./executeStmts.ts"
import { importMod } from "./importMod.ts"

export function execute(mod: Mod, stmt: Stmt): undefined | string {
  switch (stmt["@kind"]) {
    case "Clause": {
      varCollectionValidate(
        varCollectionMerge([
          varCollectionFromExps(stmt.exps),
          ...stmt.goals.map(varCollectionFromGoalExp),
        ]),
      )

      defineClause(mod, stmt.relationName, stmt.name, stmt.exps, stmt.goals)
      return
    }

    case "Let": {
      const pattern = quote(mod, mod.env, stmt.pattern)
      const value = evaluate(mod, mod.env, stmt.exp)
      const substitution = match(substitutionEmpty(), pattern, value)

      if (substitution === undefined) {
        throw new Errors.LangError(
          [
            `[executeSync Let] pattern mismatch`,
            `  pattern: ${formatValue(pattern)}`,
            `  value: ${formatValue(value)}`,
          ].join("\n"),
        )
      }

      for (const [name, value] of substitutionEntries(substitution)) {
        mod.define(name, substitutionDeepWalk(substitution, value))
      }

      return
    }

    case "Fn": {
      const exp = Exps.Fn(stmt.patterns, stmt.stmts, stmt.span)
      const value = evaluate(mod, mod.env, exp)
      mod.define(stmt.name, value)
      return
    }

    case "Import": {
      const importedMod = importMod(mod, stmt.path)
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
      const importedMod = importMod(mod, stmt.path)
      for (const [name, value] of importedMod.exportedEntries()) {
        mod.define(name, value)
      }

      mod.imported.push(mod.resolve(stmt.path))
      return
    }

    case "ImportAllAs": {
      const properties: Record<string, Value> = {}
      const importedMod = importMod(mod, stmt.path)
      for (const [name, value] of importedMod.exportedEntries()) {
        properties[name] = value
      }

      mod.define(stmt.name, Values.Objekt(properties))
      mod.imported.push(mod.resolve(stmt.path))
      return
    }

    case "Export": {
      mod.exportDepth++
      execute(mod, stmt.stmt)
      mod.exportDepth--
      return
    }

    case "ExportNames": {
      for (const name of stmt.names) {
        mod.exported.add(name)
      }

      return
    }

    case "Compute": {
      evaluate(mod, mod.env, stmt.exp)
      return
    }

    case "Print": {
      const value = evaluate(mod, mod.env, stmt.exp)
      return formatValue(value)
    }

    case "Assert": {
      const value = evaluate(mod, mod.env, stmt.exp)

      if (value["@kind"] !== "Boolean") {
        throw new Errors.LangError(
          [
            `[Assert.executeSync] assertion fail, because the value is not a Boolean`,
            `  exp: ${formatExp(stmt.exp)}`,
            `  value: ${formatValue(value)}`,
          ].join("\n"),
          { span: stmt.span },
        )
      }

      if (value.data === false) {
        throw new Errors.LangError(
          [
            `[Assert.executeSync] assertion fail, because the value is false instead of true`,
            `  exp: ${formatExp(stmt.exp)}`,
          ].join("\n"),
          { span: stmt.span },
        )
      }

      return
    }

    case "Return": {
      throw new ReturnValue(evaluate(mod, mod.env, stmt.exp))
    }

    case "If": {
      const target = evaluate(mod, mod.env, stmt.target)
      if (target["@kind"] !== "Boolean") {
        throw new Errors.LangError(
          [
            `[If.executeSync] target of if must be a Boolean`,
            `  target: ${formatValue(target)}`,
          ].join("\n"),
        )
      }

      if (target.data) {
        executeStmts(mod, stmt.stmts)
        return
      }

      for (const elseIf of stmt.elseIfs) {
        const target = evaluate(mod, mod.env, elseIf.target)
        if (target["@kind"] !== "Boolean") {
          throw new Errors.LangError(
            [
              `[If.executeSync] target else if must be a Boolean`,
              `  target: ${formatValue(target)}`,
            ].join("\n"),
          )
        }

        if (target.data) {
          executeStmts(mod, elseIf.stmts)
          return
        }
      }

      executeStmts(mod, stmt.elseStmts)
      return
    }
  }
}
