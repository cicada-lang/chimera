export type QueryOption = QueryOptionLimit | QueryOptionDebug

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

export type QueryOptionDebug = {
  kind: "QueryOptionDebug"
}

export function QueryOptionDebug(): QueryOptionDebug {
  return {
    kind: "QueryOptionDebug",
  }
}
