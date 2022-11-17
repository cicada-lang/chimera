import * as Errors from "../../errors"
import type { Mod } from "../../mod"
import type { Span } from "../../span"
import { Stmt } from "../../stmt"
import { defineBinding, ImportBinding } from "../import"

export class Import extends Stmt {
  constructor(
    public bindings: Array<ImportBinding>,
    public path: string,
    public span?: Span,
  ) {
    super()
  }

  async execute(mod: Mod): Promise<void> {
    const url = mod.resolve(this.path)
    if (url.href === mod.options.url.href) {
      throw new Errors.LangError(`I can not circular import: ${this.path}`)
    }

    const importedMod = await mod.options.loader.load(url)
    for (const binding of this.bindings) {
      const relation = importedMod.relations.get(binding.name)
      if (relation === undefined) {
        throw new Errors.LangError(
          `I meet undefined name: ${binding.name}, when importing module: ${this.path}`,
        )
      }

      defineBinding(mod, binding, relation)
    }

    mod.imported.push(url)
  }
}
