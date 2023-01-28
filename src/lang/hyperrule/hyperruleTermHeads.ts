import type { Hyperrule } from "../hyperrule"
import type * as Values from "../value"

export function hyperruleTermHeads(
  hyperrule: Hyperrule,
): Array<Values.TermHead> {
  switch (hyperrule["@kind"]) {
    case "Simplify": {
      throw new Error()
    }

    case "Propagate": {
      throw new Error()
    }

    case "List": {
      return hyperrule.hyperrules.flatMap(hyperruleTermHeads)
    }
  }
}
