import * as Errors from "../errors"
import { formatValue } from "../format"
import { hyperruleTermHeads } from "../hyperrule"
import type { Value } from "../value"
import * as Values from "../value"

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

  if (target["@kind"] === "Hyperrule") {
    const termHead = { prefix: [], name }
    const termHeads = hyperruleTermHeads(target.hyperrule)
    // TODO
    return Values.TermConstraint(target.hyperrule, termHead)
  }

  if (target["@kind"] === "TermConstraint") {
    const termHead = {
      prefix: [...target.termHead.prefix, target.termHead.name],
      name,
    }
    const termHeads = hyperruleTermHeads(target.hyperrule)
    // TODO
    return Values.TermConstraint(target.hyperrule, termHead)
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
