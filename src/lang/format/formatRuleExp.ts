import { indent } from "../../utils/indent"
import { formatExp, formatStmt } from "../format"
import type { RuleExp } from "../rule-exp"

export function formatRuleExp(rule: RuleExp): string {
  switch (rule["@kind"]) {
    case "Case": {
      const from = formatExp(rule.pattern)
      const stmts = rule.stmts.map(formatStmt)
      return `${from} => {\n${indent(stmts.join("\n"))}\n}`
    }

    case "List": {
      const rules = rule.rules.map(formatRuleExp)
      return `list {\n${indent(rules.join("\n"))}\n}`
    }

    case "Use": {
      const exp = formatExp(rule.exp)
      return `use ${exp}`
    }
  }
}
