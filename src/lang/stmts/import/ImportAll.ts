import * as Errors from "../../errors"
import type { Mod } from "../../mod"
import type { Span } from "../../span"
import { Stmt } from "../../stmt"

export class ImportAll extends Stmt {
  constructor(public path: string, public span?: Span) {
    super()
  }

  async boundNames(mod: Mod): Promise<Array<string>> {
    const importedMod = await this.import(mod)
    const boundNames = []
    for (const [name] of importedMod.entries()) {
      if (importedMod.privateNames.has(name)) continue

      boundNames.push(name)
    }

    return boundNames
  }

  async prepare(mod: Mod): Promise<void> {
    const importedMod = await this.import(mod)
    for (const [name, value] of importedMod.entries()) {
      if (importedMod.privateNames.has(name)) continue

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
          `[ImportAll.Import] fail to import ${this.path}\n` + error.message
      }

      throw error
    }
  }
}
