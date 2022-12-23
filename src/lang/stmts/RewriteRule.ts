import type { Mod } from "../mod"
import * as RewriteRules from "../rewrite-rule"
import type { RewriteRuleExp } from "../rewrite-rule-exp"
import type { Span } from "../span"
import { Stmt } from "../stmt"
import * as Values from "../value"
// import {
//   varCollectionFromExp,
//   varCollectionFromGoalExp,
//   varCollectionMerge,
//   varCollectionValidate,
// } from "../var-collection"

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

  async execute(mod: Mod): Promise<void> {
    // varCollectionValidate(
    //   varCollectionMerge([
    //     ...this.exps.map((exp) => varCollectionFromExp(exp)),
    //     ...this.goals.map(varCollectionFromGoalExp),
    //   ]),
    // )
    // this.rules.map(rule => evaluateRewriteRuleExp(mod, mod.env, rule))
    mod.define(this.name, Values.RewriteRule(this.name, RewriteRules.List([])))
  }
}
