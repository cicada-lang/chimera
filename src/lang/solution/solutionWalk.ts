import type { Exp } from "../exp"
import { Solution, solutionLookup } from "../solution"

export function solutionWalk(solution: Solution, exp: Exp): Exp {
  while (exp["@kind"] === "PatternVar") {
    const found = solutionLookup(solution, exp.name)
    if (found === undefined) return exp
    exp = found
  }

  return exp
}
