import { indent } from "../../utils/indent"
import { formatExp, formatStmt } from "../format"
import type { RuleExp } from "../rule-exp"

export function formatRuleExp(rule: RuleExp): string {
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
      const rules = rule.rules.map(formatRuleExp)
      return `rule {\n${indent(rules.join("\n"))}\n}`
    }

    case "Include": {
      const exp = formatExp(rule.exp)
      return `include ${exp}`
    }
  }
}
