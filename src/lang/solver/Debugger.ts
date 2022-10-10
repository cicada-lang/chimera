import { Solver } from "../solver"

export interface Debugger {
  onStep(solver: Solver): void
}
