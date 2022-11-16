import type { Exp } from "../exp"

export type Solution = SolutionNull | SolutionCons

export type SolutionNull = {
  kind: "SolutionNull"
}

export function SolutionNull(): SolutionNull {
  return {
    kind: "SolutionNull",
  }
}

export type SolutionCons = {
  kind: "SolutionCons"
  name: string
  exp: Exp
  rest: Solution
}

export function SolutionCons(
  name: string,
  exp: Exp,
  rest: Solution,
): SolutionCons {
  return {
    kind: "SolutionCons",
    name,
    exp,
    rest,
  }
}
