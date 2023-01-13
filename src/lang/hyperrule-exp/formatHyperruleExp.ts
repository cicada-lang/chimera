import { indent } from "../../utils/indent"
import { formatExp } from "../exp"
import type { HyperruleExp } from "../hyperrule-exp"

export function formatHyperruleExp(hyperrule: HyperruleExp): string {
  switch (hyperrule["@kind"]) {
    case "Case": {
      const from = hyperrule.from.map(formatExp).join(", ")
      const to = hyperrule.to.map(formatExp).join(", ")
      return `[${from}] => [${to}]`
    }

    case "List": {
      const hyperrules = hyperrule.hyperrules.map(formatHyperruleExp)
      return `list {\n${indent(hyperrules.join("\n"))}\n}`
    }
  }
}
