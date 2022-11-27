export type FindOption = FindOptionLimit

export type FindOptionLimit = {
  "@kind": "FindOptionLimit"
  exp: number
}

export function FindOptionLimit(exp: number): FindOptionLimit {
  return {
    "@kind": "FindOptionLimit",
    exp,
  }
}
