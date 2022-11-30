import type { Mod } from "../../mod"
import type { Span } from "../../span"
import { Stmt } from "../../stmt"

export class Test extends Stmt {
  constructor(
    public description: string | undefined,
    public stmts: Array<Stmt>,
    public span?: Span,
  ) {
    super()
  }

  async execute(mod: Mod): Promise<string> {
    return "Stmts.Test -- TODO"
  }
}
