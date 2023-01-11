import { evaluateHyperruleExp } from "../evaluate"
import * as Hyperrules from "../hyperrule"
import type { HyperruleExp } from "../hyperrule-exp"
import type { Mod } from "../mod"
import type { Span } from "../span"
import { Stmt } from "../stmt"
import * as Values from "../value"
import {
  varCollectionFromHyperruleExp,
  varCollectionValidate,
} from "../var-collection"

export class Hyperrule extends Stmt {
  constructor(
    public name: string,
    public hyperrules: Array<HyperruleExp>,
    public span: Span,
  ) {
    super()
  }

  boundNamesSync(): Array<string> {
    return [this.name]
  }

  validateSync(mod: Mod): void {
    for (const hyperrule of this.hyperrules) {
      varCollectionValidate(varCollectionFromHyperruleExp(hyperrule))
    }
  }

  executeSync(mod: Mod): void {
    mod.define(
      this.name,
      Values.Hyperrule(
        this.name,
        Hyperrules.List(
          this.hyperrules.map((hyperrule) =>
            evaluateHyperruleExp(mod, mod.env, hyperrule),
          ),
        ),
      ),
    )
  }
}
