import * as Errors from "../errors"
import type { Mod } from "../mod"
import type { Span } from "../span"
import { Stmt } from "../stmt"

export class ImportAll extends Stmt {
  constructor(public path: string, public span: Span) {
    super()
  }

  prepareSync(mod: Mod): void {
    throw new Errors.LangError(
      `[ImportAll.prepareSync] can not use import synchronously (for example, in function body)`,
    )
  }

  async prepare(mod: Mod): Promise<void> {
    const importedMod = await this.import(mod)
    for (const [name, value] of importedMod.exportedEntries()) {
      mod.define(name, value)
    }

    mod.imported.push(mod.resolve(this.path))
  }

  private async import(mod: Mod): Promise<Mod> {
    const url = mod.resolve(this.path)
    if (url.href === mod.options.url.href) {
      throw new Errors.LangError(`I can not circular import: ${this.path}`)
    }

    try {
      return await mod.options.loader.load(url)
    } catch (error) {
      if (error instanceof Error) {
        error.message =
          `[ImportAll.import] fail to import ${this.path}\n` + error.message
      }

      throw error
    }
  }

  formatStmt(): string {
    return `import * from "${this.path}"`
  }
}
