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

  async boundNames(): Promise<Array<string>> {
    return this.bindings.map(({ name, alias }) => alias || name)
  }

  async prepare(mod: Mod): Promise<void> {
    const importedMod = await this.import(mod)
    for (const { name, alias } of this.bindings) {
      if (importedMod.privateNames.has(name)) {
        throw new Errors.LangError(
          [
            `[Import.execute]`,
            `  can not import provide name: ${name}`,
            `  imported path: ${this.path}`,
          ].join("\n"),
        )
      }

      const value = importedMod.find(name)
      if (value !== undefined) {
        mod.define(alias || name, value)
      } else {
        throw new Errors.LangError(
          [
            `[Import.execute]`,
            `  undefined name: ${name}`,
            `  imported path: ${this.path}`,
          ].join("\n"),
        )
      }
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
          `[Import.Import] fail to import ${this.path}\n` + error.message
      }

      throw error
    }
  }
}
