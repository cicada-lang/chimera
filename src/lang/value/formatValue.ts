import { Value } from "../value"

export function formatValue(value: Value): string {
  switch (value.kind) {
    case "PatternVar": {
      return JSON.stringify(`?${value.name}`)
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

    case "Cons": {
      const { elements, last } = foldCons(value.car, value.cdr)
      return last === undefined
        ? `[${elements.map(formatValue).join(", ")}]`
        : `[${elements.map(formatValue).join(", ")}, ...${formatValue(last)}]`
    }

    case "Objekt": {
      const properties = Object.entries(value.properties)
        .map(([name, property]) => `"${name}": ${formatValue(property)}`)
        .join(", ")
      return `{ ${properties} }`
    }

    case "Relation": {
      return "#relation"
    }
  }
}

function foldCons(car: Value, cdr: Value): { elements: Array<Value>; last?: Value } {
  switch (cdr.kind) {
    case "Null": {
      return { elements: [car] }
    }

    case "Cons": {
      const { elements, last } = foldCons(cdr.car, cdr.cdr)
      return { elements: [car, ...elements], last }
    }

    default: {
      return { elements: [car], last: cdr }
    }
  }
}
