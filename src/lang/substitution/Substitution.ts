import type { Exp } from "../exp"

export type Substitution = SubstitutionNull | SubstitutionCons

export type SubstitutionNull = {
  "@kind": "SubstitutionNull"
}

export function SubstitutionNull(): SubstitutionNull {
  return {
    "@kind": "SubstitutionNull",
  }
}

export type SubstitutionCons = {
  "@kind": "SubstitutionCons"
  name: string
  exp: Exp
  rest: Substitution
}

export function SubstitutionCons(
  name: string,
  exp: Exp,
  rest: Substitution,
): SubstitutionCons {
  return {
    "@kind": "SubstitutionCons",
    name,
    exp,
    rest,
  }
}
