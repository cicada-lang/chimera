export type FindOption = FindOptionLimit | FindOptionDebug

export type FindOptionLimit = {
  kind: "FindOptionLimit"
  value: number
}

export function FindOptionLimit(value: number): FindOptionLimit {
  return {
    kind: "FindOptionLimit",
    value,
  }
}

export type FindOptionDebug = {
  kind: "FindOptionDebug"
  skipPrompt: number
}

export function FindOptionDebug(skipPrompt: number): FindOptionDebug {
  return {
    kind: "FindOptionDebug",
    skipPrompt,
  }
}
