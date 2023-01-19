import * as Errors from "../errors"
import type { Mod } from "../mod"

export async function importMod(mod: Mod, path: string): Promise<Mod> {
  const url = mod.resolve(path)
  if (url.href === mod.options.url.href) {
    throw new Errors.LangError(`I can not circular import: ${path}`)
  }

  try {
    return await mod.options.loader.load(url)
  } catch (error) {
    if (error instanceof Error) {
      error.message = `[Import.import] fail to import ${path}\n` + error.message
    }

    throw error
  }
}
