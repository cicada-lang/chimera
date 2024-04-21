import * as Errors from "../errors/index.js"
import type { Mod } from "../mod/index.js"

export function importMod(mod: Mod, path: string): Mod {
  const url = mod.resolve(path)
  if (url.href === mod.options.url.href) {
    throw new Errors.LangError(`I can not circular import: ${path}`)
  }

  try {
    return mod.options.loader.load(url)
  } catch (error) {
    if (error instanceof Error) {
      error.message = `[Import.import] fail to import ${path}\n` + error.message
    }

    throw error
  }
}
