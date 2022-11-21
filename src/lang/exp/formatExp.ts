import type { Exp } from "../exp"

export function formatExp(exp: Exp): string {
  switch (exp["@kind"]) {
    case "PatternVar": {
      return `?${exp.name}`
    }

    case "ReifiedVar": {
      return `_.${exp.name}`
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

    case "ListCons": {
      // NOTE Always format valid JSON.
      const { elements, last } = foldListCons(exp.car, exp.cdr)

      return last === undefined
        ? `[${elements.map(formatExp).join(", ")}]`
        : `[${elements.map(formatExp).join(", ")} | ${formatExp(last)} ]`
    }

    case "ListNull": {
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

function formatArgs(args: Array<string>): string {
  return `(${args.join(", ")})`
}

function foldListCons(
  car: Exp,
  cdr: Exp,
): { elements: Array<Exp>; last?: Exp } {
  switch (cdr["@kind"]) {
    case "ListNull": {
      return { elements: [car] }
    }

    case "ListCons": {
      const { elements, last } = foldListCons(cdr.car, cdr.cdr)
      return { elements: [car, ...elements], last }
    }

    default: {
      return { elements: [car], last: cdr }
    }
  }
}
