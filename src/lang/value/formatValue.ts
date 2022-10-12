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

    case "ListCons": {
      // NOTE Always format valid JSON.
      const { elements, last } = foldListCons(value.car, value.cdr)
      return last === undefined
        ? `[${elements.map(formatValue).join(", ")}]`
        : `[${elements.map(formatValue).join(", ")}, { "...": ${formatValue(last)} }]`
    }

    case "ListNull": {
      return "[]"
    }

    case "Objekt": {
      if (Object.entries(value.properties).length === 0) {
        return "{}"
      }

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

function foldListCons(car: Value, cdr: Value): { elements: Array<Value>; last?: Value } {
  switch (cdr.kind) {
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
