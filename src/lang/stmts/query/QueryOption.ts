export type QueryOption = QueryOptionLimit

export type QueryOptionLimit = {
  kind: "QueryOptionLimit"
  value: number
}

export function QueryOptionLimit(value: number): QueryOptionLimit {
  return {
    kind: "QueryOptionLimit",
    value,
  }
}
