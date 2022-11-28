import { indent } from "../../utils/indent"
import type { Exp } from "../exp"

export function formatExp(exp: Exp): string {
  switch (exp["@kind"]) {
    case "PatternVar": {
      return `?${exp.name}`
    }

    case "ReifiedVar": {
      return `_.${exp.count}`
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
      if (Object.entries(exp.properties).length === 0) {
        return "{}"
      }

      const properties = Object.entries(exp.properties)
        .map(([name, property]) => `"${name}": ${formatExp(property)}`)
        .join(", ")
      return `{ ${properties} }`
    }

    case "Data": {
      const args = exp.args.map(formatExp)
      return `${exp.type}::${exp.kind}${formatArgs(args)}`
    }
  }
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
