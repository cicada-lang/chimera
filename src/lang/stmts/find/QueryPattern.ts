export type QueryPattern = QueryPatternNames | QueryPatternName

export type QueryPatternNames = {
  "@kind": "QueryPatternNames"
  names: Array<string>
}

export function QueryPatternNames(names: Array<string>): QueryPatternNames {
  return {
    "@kind": "QueryPatternNames",
    names,
  }
}

export type QueryPatternName = {
  "@kind": "QueryPatternName"
  name: string
}

export function QueryPatternName(name: string): QueryPatternName {
  return {
    "@kind": "QueryPatternName",
    name,
  }
}
