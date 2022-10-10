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
  skipPrompt: number
}

export function QueryOptionDebug(skipPrompt: number): QueryOptionDebug {
  return {
    kind: "QueryOptionDebug",
    skipPrompt,
  }
}
