import { indent } from "../../utils/indent"
import { formatExp } from "../exp"
import type { RuleExp } from "../rule-exp"

export function formatRuleExp(rule: RuleExp): string {
  switch (rule["@kind"]) {
    case "Case": {
      const from = formatExp(rule.from)
      const to = formatExp(rule.to)
      return `${from} => ${to}`
    }

    case "List": {
      const rules = rule.rules.map(formatRuleExp)
      return `list {\n${indent(rules.join("\n"))}\n}`
    }
  }
}
