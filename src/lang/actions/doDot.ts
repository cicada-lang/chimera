import * as Errors from "../errors/index.js"
import { formatValue } from "../format/index.js"
import type { Value } from "../value/index.js"

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
