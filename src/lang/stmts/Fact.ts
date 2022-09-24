import { Mod } from "../mod"
import { Span } from "../span"
import { Stmt } from "../stmt"

export class Fact extends Stmt {
  constructor(public span?: Span) {
    super()
  }

  async execute(mod: Mod): Promise<void> {
    throw new Error()
  }
}
