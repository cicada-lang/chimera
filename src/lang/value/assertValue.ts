import * as Errors from "../errors/index.ts"
import { formatValue } from "../format/index.ts"
import type { Value } from "../value/index.ts"

export function assertValue<Kind extends Value["@kind"]>(
  value: Value,
  kind: Kind,
  options: { who: string },
): asserts value is Extract<Value, { "@kind": Kind }> {
  if (value["@kind"] !== kind) {
    throw new Errors.LangError(
      [
        `[${options.who}] expect value to be ${kind}`,
        `  value: ${formatValue(value)}`,
      ].join("\n"),
    )
  }
}
