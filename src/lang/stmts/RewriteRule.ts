import { evaluateRewriteRuleExp } from "../evaluate"
import type { Mod } from "../mod"
import * as RewriteRules from "../rewrite-rule"
import type { RewriteRuleExp } from "../rewrite-rule-exp"
import type { Span } from "../span"
import { Stmt } from "../stmt"
import * as Values from "../value"
import {
  varCollectionFromRewriteRuleExp,
  varCollectionValidate,
} from "../var-collection"

export class RewriteRule extends Stmt {
  constructor(
    public name: string,
    public rules: Array<RewriteRuleExp>,
    public span?: Span,
  ) {
    super()
  }

  async boundNames(): Promise<Array<string>> {
    return [this.name]
  }

  async validate(mod: Mod): Promise<void> {
    for (const rule of this.rules) {
      varCollectionValidate(varCollectionFromRewriteRuleExp(rule))
    }
  }

  async execute(mod: Mod): Promise<void> {
    mod.define(
      this.name,
      Values.RewriteRule(
        this.name,
        RewriteRules.List(
          this.rules.map((rule) => evaluateRewriteRuleExp(mod, mod.env, rule)),
        ),
      ),
    )
  }
}
