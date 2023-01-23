import { indent } from "../../utils/indent"
import { formatExp, formatStmt } from "../format"
import type { HyperruleExp } from "../hyperrule-exp"

export function formatHyperruleExp(hyperrule: HyperruleExp): string {
  switch (hyperrule["@kind"]) {
    case "Simplify": {
      const pattern = formatExp(hyperrule.pattern)

      if (
        hyperrule.stmts.length === 1 &&
        hyperrule.stmts[0]["@kind"] === "Return"
      ) {
        const exp = formatExp(hyperrule.stmts[0].exp)
        return `${pattern} => ${exp}`
      }

      const stmts = hyperrule.stmts.map(formatStmt)
      return `${pattern} => {\n${indent(stmts.join("\n"))}\n}`
    }

    case "Propagate": {
      const pattern = formatExp(hyperrule.pattern)

      if (
        hyperrule.stmts.length === 1 &&
        hyperrule.stmts[0]["@kind"] === "Return"
      ) {
        const exp = formatExp(hyperrule.stmts[0].exp)
        return `${pattern} +> ${exp}`
      }

      const stmts = hyperrule.stmts.map(formatStmt)
      return `${pattern} +> {\n${indent(stmts.join("\n"))}\n}`
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
