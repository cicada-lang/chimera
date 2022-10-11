import { reify, Solution } from "../solution"
import * as Values from "../value"
import { formatValue } from "../value"

export function formatVariable(solution: Solution, name: string): string {
  return formatValue(reify(solution, Values.PatternVar(name)))
}
