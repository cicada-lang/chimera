import { indent } from "../../utils/indent"
import { evaluateHyperruleExp } from "../evaluate"
import { formatHyperruleExp } from "../format"
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

  executeSync(mod: Mod): void {
    for (const hyperrule of this.hyperrules) {
      varCollectionValidate(varCollectionFromHyperruleExp(hyperrule))
    }

    mod.define(
      this.name,
      Values.Hyperrule(
        Hyperrules.List(
          this.hyperrules.map((hyperrule) =>
            evaluateHyperruleExp(mod, mod.env, hyperrule),
          ),
        ),
      ),
    )
  }

  format(): string {
    const hyperrules = this.hyperrules.map(formatHyperruleExp)
    return `hyperrule ${this.name} {\n${indent(hyperrules.join("\n"))}\n}`
  }
}
