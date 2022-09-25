import { Value } from "../value"

export function formatValue(value: Value): string {
  switch (value.kind) {
    case "Var": {
      return JSON.stringify(`#var:${value.name}`)
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

    case "Arrai": {
      const elements = value.elements.map(formatValue).join(", ")
      return `[${elements}]`
    }

    case "Objekt": {
      const properties = Object.entries(value.properties)
        .map(([name, property]) => `"${name}": ${formatValue(property)}`)
        .join(", ")
      return `{ ${properties} }`
    }

    case "Relation": {
      return JSON.stringify("#relation")
    }
  }
}
