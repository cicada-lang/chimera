import * as Errors from "../../errors"
import type { Mod } from "../../mod"
import type { Span } from "../../span"
import { Stmt } from "../../stmt"

export class ImportAll extends Stmt {
  constructor(public path: string, public span?: Span) {
    super()
  }

  async execute(mod: Mod): Promise<void> {
    return
  }

  async prepare(mod: Mod): Promise<void> {
    const url = mod.resolve(this.path)
    if (url.href === mod.options.url.href) {
      throw new Errors.LangError(`I can not circular import: ${this.path}`)
    }

    try {
      const importedMod = await mod.options.loader.load(url)
      for (const [name, value] of importedMod.entries()) {
        mod.define(name, value)
      }

      mod.imported.push(url)
    } catch (error) {
      if (error instanceof Error) {
        error.message =
          `[ImportAll.execute] fail to import ${this.path}\n` + error.message
      }

      throw error
    }
  }
}
