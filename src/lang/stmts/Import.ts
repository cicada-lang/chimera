import * as Errors from "../errors"
import type { Mod } from "../mod"
import type { Span } from "../span"
import { Stmt } from "../stmt"

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
    public span: Span,
  ) {
    super()
  }

  prepareSync(mod: Mod): void {
    throw new Errors.LangError(
      `[Import.prepareSync] can not use import synchronously (for example, in function body)`,
    )
  }

  async prepare(mod: Mod): Promise<void> {
    const importedMod = await this.import(mod)
    for (const { name, alias } of this.bindings) {
      if (!importedMod.exported.has(name)) {
        throw new Errors.LangError(
          [
            `[Import.prepare]`,
            `  can not import private name: ${name}`,
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
            `[Import.prepare]`,
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
          `[Import.import] fail to import ${this.path}\n` + error.message
      }

      throw error
    }
  }

  format(): string {
    const bindings = this.bindings.map(formatImportBinding)
    return `import { ${bindings.join(", ")} } from "${this.path}"`
  }
}

function formatImportBinding(binding: ImportBinding): string {
  return binding.alias === undefined
    ? binding.name
    : `${binding.name} as ${binding.alias}`
}
