import { evaluateRuleExp } from "../evaluate"
import type { Mod } from "../mod"
import * as Rules from "../rule"
import type { RuleExp } from "../rule-exp"
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

  validateSync(mod: Mod): void {
    for (const rule of this.rules) {
      varCollectionValidate(varCollectionFromRuleExp(rule))
    }
  }

  executeSync(mod: Mod): void {
    mod.define(
      this.name,
      Values.Rule(
        this.name,
        Rules.List(
          this.rules.map((rule) => evaluateRuleExp(mod, mod.env, rule)),
        ),
      ),
    )
  }
}
