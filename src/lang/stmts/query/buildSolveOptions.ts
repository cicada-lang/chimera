import { SolveOptions } from "../../solver"
import { QueryOption } from "../query"

export function buildSolveOptions(options: Array<QueryOption>): SolveOptions {
  const solveOptions: SolveOptions = {}
  for (const option of options) {
    collectQueryOption(option, solveOptions)
  }

  return solveOptions
}

function collectQueryOption(option: QueryOption, solveOptions: SolveOptions): void {
  switch (option.kind) {
    case "QueryOptionLimit": {
      solveOptions.limit = option.value
      return
    }

    case "QueryOptionDebug": {
      solveOptions.debug = option
      return
    }
  }
}
