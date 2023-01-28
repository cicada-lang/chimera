import { indent } from "../../utils/indent"
import { formatExp, formatStmt } from "../format"
import type { Hyperrule } from "../hyperrule"

export function formatHyperrule(hyperrule: Hyperrule): string {
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
      const hyperrules = hyperrule.hyperrules.map(formatHyperrule)
      return `hyperrule {\n${indent(hyperrules.join("\n"))}\n}`
    }
  }
}
