import * as Errors from "../errors"
import { formatValue } from "../format"
import type { Value } from "../value"

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
