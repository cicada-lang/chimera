import * as Errors from "../../errors"
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

  async execute(mod: Mod): Promise<void> {
    for (const stmt of this.stmts) {
      const assertionErrors = []
      try {
        await stmt.execute(mod)
      } catch (error) {
        if (error instanceof Errors.AssertionError) {
          assertionErrors.push(error)
        } else {
          throw error
        }
      }

      if (assertionErrors.length > 0) {
        if (this.description) {
          throw new Errors.TestingError(
            `[Test.execute] fail: ${JSON.stringify(this.description)}`,
            assertionErrors,
          )
        } else {
          throw new Errors.TestingError(`[Test.execute] fail`, assertionErrors)
        }
      }
    }
  }
}
