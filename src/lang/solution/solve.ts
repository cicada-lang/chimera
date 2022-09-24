import { deepWalk, Solution } from "../solution"
import { Value } from "../value"

export function solve(
  solution: Solution,
  left: Value,
  right: Value,
): Solution | undefined {
  left = deepWalk(solution, left)
  right = deepWalk(solution, right)

  // TODO
  return undefined
}
