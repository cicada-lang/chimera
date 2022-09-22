import { ty, Schema, Logical } from "../.."

// prepare the nat
//   for we can not deal with native js number logically yet ...
//   this should be fixed by constraint programming.
//   I am apologize for this, and I will fix this soon.

export type Nat = "zero" | { prev: Nat }

export const zero: Nat = "zero"

export function add1(prev: Logical<Nat>): Logical<Nat> {
  return { prev }
}

export function natSchema(): Schema<Nat> {
  const zeroSchema = ty.const("zero" as const)
  const succSchema = ty.object({ prev: ty.lazy(natSchema) })
  return ty.union(zeroSchema, succSchema)
}
