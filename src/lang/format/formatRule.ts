import { indent } from "../../utils/indent"
import { formatExp, formatStmt } from "../format"
import type { Rule } from "../rule"

export function formatRule(rule: Rule): string {
  switch (rule["@kind"]) {
    case "Case": {
      const pattern = formatExp(rule.pattern)

      if (rule.stmts.length === 1 && rule.stmts[0]["@kind"] === "Return") {
        const exp = formatExp(rule.stmts[0].exp)
        return `${pattern} => ${exp}`
      }

      const stmts = rule.stmts.map(formatStmt)
      return `${pattern} => {\n${indent(stmts.join("\n"))}\n}`
    }

    case "List": {
      if (rule.rules.length === 0) {
        return formatRule(rule.rules[0])
      }

      const rules = rule.rules.map(formatRule)
      return `rule {\n${indent(rules.join("\n"))}\n}`
    }
  }
}
