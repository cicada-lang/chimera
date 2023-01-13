import { indent } from "../../utils/indent"
import type { Exp } from "../exp"
import { formatGoalExp } from "../goal-exp"

export function formatExp(exp: Exp): string {
  switch (exp["@kind"]) {
    case "Var": {
      return exp.name
    }

    case "String": {
      return JSON.stringify(exp.data)
    }

    case "Number": {
      return exp.data.toString()
    }

    case "Boolean": {
      return exp.data.toString()
    }

    case "Null": {
      return "null"
    }

    case "ArrayCons": {
      const { elements, last } = foldArrayCons(exp.car, exp.cdr)
      return formatElements(
        elements.map(formatExp),
        last === undefined ? undefined : formatExp(last),
      )
    }

    case "ArrayNull": {
      return "[]"
    }

    case "Objekt": {
      const properties = formatProperties(exp)

      if (properties.size === 0) {
        return "{}"
      }

      const entries = Array.from(properties.entries()).map(
        ([name, property]) => `"${name}": ${property}`,
      )

      return `{ ${entries.join(", ")} }`
    }

    case "Ap": {
      return `${exp.name}${formatArgs(exp.args)}`
    }

    case "Fn": {
      const patterns = exp.patterns.map(formatExp).join(", ")
      const stmts = exp.stmts.map((stmt) => stmt.format())
      return `(${patterns}) => {\n${indent(stmts.join("\n"))}\n}`
    }

    case "Quote": {
      return `quote ${formatExp(exp.exp)}`
    }

    case "Unquote": {
      return `unquote ${formatExp(exp.exp)}`
    }

    case "Find": {
      const goals = exp.goals.map(formatGoalExp)

      if (exp.limit === Infinity) {
        return `find ${formatExp(exp.pattern)} {\n${indent(
          goals.join("\n"),
        )}\n}`
      }

      return `find ${formatExp(exp.pattern)} limit ${exp.limit} {\n${indent(
        goals.join("\n"),
      )}\n}`
    }
  }
}

function formatProperties(exp: Exp): Map<string, string> {
  let properties = new Map()
  if (exp["@kind"] === "Objekt") {
    for (const [name, property] of Object.entries(exp.properties)) {
      properties.set(name, formatExp(property))
    }
  }

  return properties
}

export function formatArgs(args: Array<Exp>): string {
  const parts = args.map(formatExp)
  if (isLarge(parts)) {
    return `(\n${parts.map((part) => indent(part) + ",").join("\n")}\n)`
  } else {
    return `(${parts.join(", ")})`
  }
}

function isLarge(elements: Array<string>): boolean {
  return (
    elements.some((element) => element.includes("\n")) ||
    elements.join(", ").length >= 60
  )
}

function formatElements(elements: Array<string>, last?: string): string {
  if (last === undefined) {
    if (isLarge(elements)) {
      const body = elements.map((element) => indent(element)).join(",\n")
      return `[ \n${body}\n]`
    } else {
      return `[${elements.join(", ")}]`
    }
  } else {
    if (isLarge(elements)) {
      const body = elements.map((element) => indent(element)).join(",\n")
      const tail = indent(`| ${last}`)
      return `[ \n${body}\n${tail}\n]`
    } else {
      return `[${elements.join(", ")} | ${last}]`
    }
  }
}

function foldArrayCons(
  car: Exp,
  cdr: Exp,
): { elements: Array<Exp>; last?: Exp } {
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
