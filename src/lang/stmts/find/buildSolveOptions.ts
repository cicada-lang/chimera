import type { SolveOptions } from "../../solver"
import type { FindOption } from "../find"

export function buildSolveOptions(options: Array<FindOption>): SolveOptions {
  const solveOptions: SolveOptions = {}
  for (const option of options) {
    collectFindOption(option, solveOptions)
  }

  return solveOptions
}

function collectFindOption(
  option: FindOption,
  solveOptions: SolveOptions,
): void {
  switch (option["@kind"]) {
    case "FindOptionLimit": {
      solveOptions.limit = option.exp
      return
    }
  }
}
