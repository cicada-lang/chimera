import { applyFn, applyPrimitive } from "."
import * as Errors from "../errors"
import * as Goals from "../goal"
import { hyperrewrite } from "../hyperrewrite"
import type { Mod } from "../mod"
import { rewrite } from "../rewrite"
import { Solver } from "../solver"
import type { Value } from "../value"
import * as Values from "../value"
import { formatValue } from "../value"

export function doAp(mod: Mod, target: Value, args: Array<Value>): Value {
  if (target["@kind"] === "Rule") {
    if (args.length !== 1) {
      throw new Errors.LangError(
        [
          `[doAp] the number of arguments of Rule must be 1`,
          `  args.length: ${args.length}`,
        ].join("\n"),
      )
    }

    return rewrite(mod, target.rule, args[0])
  }

  if (target["@kind"] === "Hyperrule") {
    if (args.length !== 1) {
      throw new Errors.LangError(
        [
          `[doAp] the number of arguments of Hyperrule must be 1`,
          `  args.length: ${args.length}`,
        ].join("\n"),
      )
    }

    return Values.fromArray(
      hyperrewrite(mod, target.hyperrule, Values.toArray(args[0])),
    )
  }

  if (target["@kind"] === "Fn") {
    return applyFn(target, args)
  }

  if (target["@kind"] === "Primitive") {
    return applyPrimitive(mod, target, args)
  }

  if (target["@kind"] === "Relation") {
    const goal = Goals.Apply(target.name, target, args)
    const solver = Solver.start([goal])
    const solutions = solver.solve(mod, { limit: Infinity })
    if (solutions.length === 0) {
      return Values.Boolean(false)
    } else {
      return Values.Boolean(true)
    }
  }

  throw new Errors.LangError(
    [
      `[doAp] can not apply target`,
      `  target['@kind']: ${target["@kind"]}`,
      `  target: ${formatValue(target)}`,
      `  args: ${args.map(formatValue).join(", ")}`,
    ].join("\n"),
  )
}
