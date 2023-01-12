import type { Mod } from "../mod"
import type { Span } from "../span"

export abstract class Stmt {
  abstract span?: Span

  prepareSync(mod: Mod): void {}
  validateSync(mod: Mod): void {}
  executeSync(mod: Mod): string | void {}

  async prepare(mod: Mod): Promise<void> {
    return this.prepareSync(mod)
  }

  async validate(mod: Mod): Promise<void> {
    return this.validateSync(mod)
  }

  async execute(mod: Mod): Promise<string | void> {
    return this.executeSync(mod)
  }

  format(): string {
    return "TODO"
  }
}
