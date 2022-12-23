import type { Exp } from "../exp"
import type { Mod } from "../mod"
import type { RewriteRuleExp } from "../rewrite-rule-exp"
import type { Span } from "../span"
import { Stmt } from "../stmt"
import {
  varCollectionFromRewriteRuleExp,
  varCollectionValidate,
} from "../var-collection"

export class Reduce extends Stmt {
  constructor(
    public target: Exp,
    public rules: Array<RewriteRuleExp>,
    public span?: Span,
  ) {
    super()
  }

  async validate(mod: Mod): Promise<void> {
    for (const rule of this.rules) {
      varCollectionValidate(varCollectionFromRewriteRuleExp(rule))
    }
  }

  async execute(mod: Mod): Promise<void> {
    //
  }
}
