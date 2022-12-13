import * as Errors from "../../errors"
import type { Mod } from "../../mod"
import type { Span } from "../../span"
import { Stmt } from "../../stmt"

export type ImportBinding = {
  name: string
  alias?: string
}

export function ImportBinding(name: string, alias?: string): ImportBinding {
  return {
    name,
    alias,
  }
}

export class Import extends Stmt {
  constructor(
    public bindings: Array<ImportBinding>,
    public path: string,
    public span?: Span,
  ) {
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

    const importedMod = await mod.options.loader.load(url)
    for (const binding of this.bindings) {
      const value = importedMod.findRelation(binding.name)
      if (value !== undefined) {
        mod.define(binding.alias || binding.name, value)
      } else {
        throw new Errors.LangError(
          [
            `[Import.execute]`,
            `  undefined name: ${binding.name}`,
            `  imported path: ${this.path}`,
          ].join("\n"),
        )
      }
    }

    mod.imported.push(url)
  }
}
