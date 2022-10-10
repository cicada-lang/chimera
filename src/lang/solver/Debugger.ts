import { Solver } from "../solver"

export interface Debugger {
  report(solver: Solver): void
  // NOTE Return number of steps without prompt.
  prompt(solver: Solver): number
}
