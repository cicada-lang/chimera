import { envMerge } from "../env"
import type { Hyperrule } from "../hyperrule"
import { quote } from "../quote"
import type { Value } from "../value"
import * as Values from "../value"

export function hyperruleTermHeads(
  hyperrule: Hyperrule,
): Array<Values.TermHead> {
  switch (hyperrule["@kind"]) {
    case "Simplify":
    case "Propagate": {
      const mod = hyperrule.mod.copy()
      mod.env = envMerge(mod.env, hyperrule.env)
      const patterns = Values.toArray(quote(mod, mod.env, hyperrule.patterns))
      return patterns.flatMap(valueTermHead)
    }

    case "List": {
      return hyperrule.hyperrules.flatMap(hyperruleTermHeads)
    }
  }
}

function valueTermHead(value: Value): Array<Values.TermHead> {
  if (value["@kind"] === "Term") {
    return [
      {
        name: value.name,
      },
    ]
  }

  return []
}
