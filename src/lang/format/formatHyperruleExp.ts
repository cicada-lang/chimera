import { indent } from "../../utils/indent"
import { formatExp } from "../format"
import type { HyperruleExp } from "../hyperrule-exp"

export function formatHyperruleExp(hyperrule: HyperruleExp): string {
  switch (hyperrule["@kind"]) {
    case "Simplify": {
      const from = hyperrule.from.map(formatExp).join(", ")
      const to = formatExp(hyperrule.to)
      return `[${from}] => ${to}`
    }

    case "Propagate": {
      const from = hyperrule.from.map(formatExp).join(", ")
      const to = formatExp(hyperrule.to)
      return `[${from}] +> ${to}`
    }

    case "List": {
      const hyperrules = hyperrule.hyperrules.map(formatHyperruleExp)
      return `list {\n${indent(hyperrules.join("\n"))}\n}`
    }

    case "Use": {
      const exp = formatExp(hyperrule.exp)
      return `use ${exp}`
    }
  }
}
