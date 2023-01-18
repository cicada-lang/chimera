import { indent } from "../../utils/indent"
import { evaluateRuleExp } from "../evaluate"
import type { Mod } from "../mod"
import * as Rules from "../rule"
import { formatRuleExp, RuleExp } from "../rule-exp"
import type { Span } from "../span"
import { Stmt } from "../stmt"
import * as Values from "../value"
import {
  varCollectionFromRuleExp,
  varCollectionValidate,
} from "../var-collection"

export class Rule extends Stmt {
  constructor(
    public name: string,
    public rules: Array<RuleExp>,
    public span: Span,
  ) {
    super()
  }

  executeSync(mod: Mod): void {
    for (const rule of this.rules) {
      varCollectionValidate(varCollectionFromRuleExp(rule))
    }

    mod.define(
      this.name,
      Values.Rule(
        Rules.List(
          this.rules.map((rule) => evaluateRuleExp(mod, mod.env, rule)),
        ),
      ),
    )
  }

  format(): string {
    const rules = this.rules.map(formatRuleExp)
    return `rule ${this.name} {\n${indent(rules.join("\n"))}\n}`
  }
}
