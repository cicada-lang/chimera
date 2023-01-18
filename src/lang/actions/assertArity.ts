import * as Errors from "../errors"
import { formatValue } from "../format"
import type { Value } from "../value"

export function assertArity(
  args: Array<Value>,
  arity: number,
  options: { who: string },
): void {
  if (args.length !== arity) {
    throw new Errors.LangError(
      [
        `[${options.who}] the number of arguments must be ${arity}`,
        `  args.length: ${args.length}`,
        `  args: ${args.map(formatValue).join(", ")}`,
      ].join("\n"),
    )
  }
}
