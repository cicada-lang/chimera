import * as Errors from "../errors/index.js"
import { formatValue } from "../format/index.js"
import type { Value } from "../value/index.js"

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
