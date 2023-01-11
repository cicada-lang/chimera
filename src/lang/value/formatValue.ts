import { indent } from "../../utils/indent"
import { formatExp } from "../exp"
import { formatGoal } from "../goal"
import type { Value } from "../value"

export function formatValue(value: Value): string {
  switch (value["@kind"]) {
    case "PatternVar": {
      return value.name
    }

    case "ReifiedVar": {
      return `_.${value.count}`
    }

    case "String": {
      return JSON.stringify(value.data)
    }

    case "Number": {
      return value.data.toString()
    }

    case "Boolean": {
      return value.data.toString()
    }

    case "Null": {
      return "null"
    }

    case "ArrayCons": {
      const { elements, last } = foldArrayCons(value.car, value.cdr)
      return formatElements(
        elements.map(formatValue),
        last === undefined ? undefined : formatValue(last),
      )
    }

    case "ArrayNull": {
      return "[]"
    }

    case "Objekt": {
      const properties = formatProperties(value)

      if (properties.size === 0) {
        return "{}"
      }

      const entries = Array.from(properties.entries()).map(
        ([name, property]) => `"${name}": ${property}`,
      )

      return `{ ${entries.join(", ")} }`
    }

    case "Term": {
      const args = value.args.map(formatValue)
      return `${value.name}${formatArgs(args)}`
    }

    case "Relation": {
      return value.name
    }

    case "TypeConstraint": {
      return value.name
    }

    case "Rule": {
      return value.name
    }

    case "Hyperrule": {
      return value.name
    }

    case "Fn": {
      /**
         A function should be opaque (like in scheme),
         but we format it as expression any way (like in JavaScript).
      **/

      const patterns = value.patterns.map(formatValue).join(", ")
      const stmts = value.stmts.map((stmt) => stmt.format())
      const ret = `return ${formatExp(value.ret)}`
      const body = [...stmts, ret].join("\n")
      return `(${patterns}) => {\n${indent(body)}\n}`
    }

    case "WithConstraints": {
      if (value.constraints.length === 0) {
        return formatValue(value.value)
      }

      const constraints = value.constraints.map(formatGoal)
      return isLarge(constraints)
        ? `${formatValue(value.value)} with {\n${constraints
            .map((constraint) => indent(constraint))
            .join("\n")}\n}`
        : `${formatValue(value.value)} with { ${constraints.join(" ")} }`
    }
  }
}

function formatProperties(value: Value): Map<string, string> {
  let properties = new Map()
  if (value["@kind"] === "Objekt") {
    for (const [name, property] of Object.entries(value.properties)) {
      properties.set(name, formatValue(property))
    }

    if (value.etc !== undefined) {
      properties = new Map([...properties, ...formatProperties(value.etc)])
    }
  }

  return properties
}

function formatArgs(args: Array<string>): string {
  return isLarge(args)
    ? `(\n${args.map((arg) => indent(arg) + ",").join("\n")}\n)`
    : `(${args.join(", ")})`
}

function isLarge(elements: Array<string>): boolean {
  return (
    elements.some((element) => element.includes("\n")) ||
    elements.join(", ").length >= 60
  )
}

function formatElements(elements: Array<string>, last?: string): string {
  if (last === undefined) {
    return isLarge(elements)
      ? `[ \n${elements.map((element) => indent(element)).join(",\n")}\n]`
      : `[${elements.join(", ")}]`
  } else {
    return isLarge(elements)
      ? `[ \n${elements
          .map((element) => indent(element))
          .join(",\n")}\n${indent(`| ${last}`)}\n]`
      : `[${elements.join(", ")} | ${last}]`
  }
}

function foldArrayCons(
  car: Value,
  cdr: Value,
): { elements: Array<Value>; last?: Value } {
  switch (cdr["@kind"]) {
    case "ArrayNull": {
      return { elements: [car] }
    }

    case "ArrayCons": {
      const { elements, last } = foldArrayCons(cdr.car, cdr.cdr)
      return { elements: [car, ...elements], last }
    }

    default: {
      return { elements: [car], last: cdr }
    }
  }
}
