export type FindOption = FindOptionLimit

export type FindOptionLimit = {
  "@kind": "FindOptionLimit"
  value: number
}

export function FindOptionLimit(value: number): FindOptionLimit {
  return {
    "@kind": "FindOptionLimit",
    value,
  }
}
