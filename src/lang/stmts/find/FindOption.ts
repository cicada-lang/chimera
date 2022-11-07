export type FindOption = FindOptionLimit | FindOptionDebug

export type FindOptionLimit = {
  kind: "FindOptionLimit"
  exp: number
}

export function FindOptionLimit(exp: number): FindOptionLimit {
  return {
    kind: "FindOptionLimit",
    exp,
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
