import type { Solution } from "../solution"

export function solutionLength(solution: Solution): number {
  switch (solution.kind) {
    case "SolutionNull": {
      return 0
    }

    case "SolutionCons": {
      return solutionLength(solution.rest) + 1
    }
  }
}
