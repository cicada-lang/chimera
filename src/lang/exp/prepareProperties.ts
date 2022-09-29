import { LangError } from "../errors"
import * as Exps from "../exp"
import { Exp } from "../exp"

export function prepareProperties(properties: Array<Exps.Property>): Record<string, Exp> {
  const found: Set<string> = new Set()
  const record: Record<string, Exp> = {}

  for (const property of properties) {
    for (const [name, exp] of prepareProperty(property)) {
      if (found.has(name)) {
        throw new LangError(`duplicate properties: ${name}`)
      }

      record[name] = exp
      found.add(name)
    }
  }

  return record
}

export function prepareProperty(property: Exps.Property): Array<[string, Exp]> {
  switch (property.kind) {
    case "PropertyPlain": {
      return [[property.name, property.exp]]
    }
  }
}
