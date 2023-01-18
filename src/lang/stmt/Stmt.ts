import type { Mod } from "../mod"
import type { Span } from "../span"

export abstract class Stmt {
  abstract span?: Span
  abstract format(): string

  prepareSync(mod: Mod): void {}
  executeSync(mod: Mod): string | void {}

  async prepare(mod: Mod): Promise<void> {
    return this.prepareSync(mod)
  }

  async execute(mod: Mod): Promise<string | void> {
    return this.executeSync(mod)
  }
}
