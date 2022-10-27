import { SolveOptions } from "../../solver"
import { FindOption } from "../find"

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
  switch (option.kind) {
    case "FindOptionLimit": {
      solveOptions.limit = option.value
      return
    }

    case "FindOptionDebug": {
      solveOptions.debug = option
      return
    }
  }
}
