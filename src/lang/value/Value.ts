export type Value = PatternVar | ValueAtom | ValueArray | ValueObject
export type ValueAtom = string | number | boolean | null
export type ValueArray = Array<Value>
export type ValueObject = { [x: string]: Value }

export type PatternVar = {
  kind: "PatternVar"
  name: string
}

export function PatternVar(name: string): PatternVar {
  return {
    kind: "PatternVar",
    name,
  }
}
