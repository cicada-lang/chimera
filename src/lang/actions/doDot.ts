import * as Errors from "../errors/index.ts"
import { formatValue } from "../format/index.ts"
import type { Value } from "../value/index.ts"

export function doDot(target: Value, name: string): Value {
  if (target["@kind"] === "Objekt") {
    const value = target.properties[name]
    if (value === undefined) {
      throw new Errors.LangError(
        [
          `[doDot] unknown property name`,
          `  target: ${formatValue(target)}`,
          `  name: ${name}`,
        ].join("\n"),
      )
    }

    return value
  }

  throw new Errors.LangError(
    [
      `[doDot] can not dot target`,
      `  target['@kind']: ${target["@kind"]}`,
      `  target: ${formatValue(target)}`,
      `  name: ${name}`,
    ].join("\n"),
  )
}
