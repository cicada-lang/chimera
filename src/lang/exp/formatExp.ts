import { indent } from "../../utils/indent"
import type { Exp } from "../exp"

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

    case "Term": {
      const args = exp.args.map(formatExp)
      return `${exp.name}${formatArgs(args)}`
    }

    case "Fn": {
      const patterns = exp.patterns.map(formatExp).join(", ")
      const stmts = exp.stmts.map((stmt) => stmt.format()).join("\n")
      return `(${patterns}) => {\n${indent(stmts)}\n}`
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

function isLargeArgs(args: Array<string>): boolean {
  return args.some((arg) => arg.includes("\n")) || args.join(", ").length >= 60
}

function formatArgs(args: Array<string>): string {
  if (isLargeArgs(args)) {
    return `(\n${args.map((arg) => indent(arg) + ",").join("\n")}\n)`
  } else {
    return `(${args.join(", ")})`
  }
}

function isLargeElements(elements: Array<string>): boolean {
  return (
    elements.some((element) => element.includes("\n")) ||
    elements.join(", ").length >= 60
  )
}

function formatElements(elements: Array<string>, last?: string): string {
  if (last === undefined) {
    if (isLargeElements(elements)) {
      const body = elements.map((element) => indent(element)).join(",\n")
      return `[ \n${body}\n]`
    } else {
      return `[${elements.join(", ")}]`
    }
  } else {
    if (isLargeElements(elements)) {
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
