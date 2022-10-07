export type QueryOption = Limit

export type Limit = {
  family: "Option"
  kind: "Limit"
  value: number
}

export function Limit(value: number): Limit {
  return {
    family: "Option",
    kind: "Limit",
    value,
  }
}
