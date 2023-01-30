import * as Errors from "../errors"
import * as Goals from "../goal"
import { hyperruleTermHeads } from "../hyperrule"
import type { Value } from "../value"
import * as Values from "../value"
import { assertArity } from "./assertArity"

export function applyHyperrule(
  target: Values.Hyperrule,
  args: Array<Value>,
): Value {
  assertArity(args, 1, { who: "applyHyperrule" })

  const termHeads = hyperruleTermHeads(target.hyperrule)
  const arg = args[0]

  if (arg["@kind"] === "Term") {
    if (!termHeads.some(({ name }) => name === arg.name)) {
      throw new Errors.LangError(
        [
          `[applyHyperrule] can not apply to unknown term`,
          `  name: ${arg.name}`,
        ].join("\n"),
      )
    }
  }

  return Values.Goal(Goals.Apply(target, args))
}
