import { Exp } from "../exp"
import { occur, Solution, SolutionCons, walk } from "../solution"

export function unify(
  solution: Solution,
  left: Exp,
  right: Exp,
): Solution | undefined {
  left = walk(solution, left)
  right = walk(solution, right)

  if (
    left.kind === "PatternVar" &&
    right.kind === "PatternVar" &&
    left.name === right.name
  ) {
    return solution
  }

  if (left.kind === "PatternVar") {
    if (occur(solution, left.name, right)) return undefined
    return SolutionCons(left.name, right, solution)
  }

  if (right.kind === "PatternVar") {
    if (occur(solution, right.name, left)) return undefined
    return SolutionCons(right.name, left, solution)
  }

  if (left.kind === "Null" && right.kind === "Null") {
    return solution
  }

  if (left.kind === "Boolean" && right.kind === "Boolean") {
    if (left.data !== right.data) return undefined
    return solution
  }

  if (left.kind === "String" && right.kind === "String") {
    if (left.data !== right.data) return undefined
    return solution
  }

  if (left.kind === "Number" && right.kind === "Number") {
    if (left.data !== right.data) return undefined
    return solution
  }

  if (left.kind === "ListCons" && right.kind === "ListCons") {
    const carSolution = unify(solution, left.car, right.car)
    if (carSolution === undefined) return undefined
    const cdrSolution = unify(carSolution, left.cdr, right.cdr)
    return cdrSolution
  }

  if (left.kind === "ListNull" && right.kind === "ListNull") {
    return solution
  }

  if (left.kind === "Objekt" && right.kind === "Objekt") {
    for (const [name, leftProperty] of Object.entries(left.properties)) {
      const rightProperty = right.properties[name]
      if (rightProperty === undefined) continue

      const nextSolution = unify(solution, leftProperty, rightProperty)
      if (nextSolution === undefined) return undefined

      solution = nextSolution
    }

    return solution
  }

  return undefined
}
