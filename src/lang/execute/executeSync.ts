import * as Errors from "../errors"
import {
  evaluate,
  evaluateHyperruleExp,
  evaluateRuleExp,
  quote,
} from "../evaluate"
import * as Exps from "../exp"
import { formatExp, formatValue } from "../format"
import * as Hyperrules from "../hyperrule"
import { match } from "../match"
import type { Mod } from "../mod"
import * as Rules from "../rule"
import type { Stmt } from "../stmt"
import { ReturnValue } from "../stmt"
import {
  substitutionDeepWalk,
  substitutionEmpty,
  substitutionEntries,
} from "../substitution"
import * as Values from "../value"

import { defineClause } from "./defineClause"
import { executeStmtsSync } from "./executeStmtsSync"

export function executeSync(mod: Mod, stmt: Stmt): undefined | string {
  switch (stmt["@kind"]) {
    case "Clause": {
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

    case "Rule": {
      mod.define(
        stmt.name,
        Values.Rule(
          Rules.List(
            stmt.rules.map((rule) => evaluateRuleExp(mod, mod.env, rule)),
          ),
        ),
      )

      return
    }

    case "Hyperrule": {
      mod.define(
        stmt.name,
        Values.Hyperrule(
          Hyperrules.List(
            stmt.hyperrules.map((hyperrule) =>
              evaluateHyperruleExp(mod, mod.env, hyperrule),
            ),
          ),
        ),
      )

      return
    }

    case "Import": {
      return
    }

    case "ImportAll": {
      return
    }

    case "Export": {
      mod.exportDepth++
      executeSync(mod, stmt.stmt)
      mod.exportDepth--
      return
    }

    case "ExportNames": {
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
        executeStmtsSync(mod, stmt.stmts)
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
          executeStmtsSync(mod, elseIf.stmts)
          return
        }
      }

      executeStmtsSync(mod, stmt.elseStmts)
      return
    }
  }
}
