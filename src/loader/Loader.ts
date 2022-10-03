import { Fetcher } from "../framework/fetcher"
import { Mod } from "../lang/mod"
import { parseStmts } from "../lang/parse"

export class Loader {
  cache: Map<string, Mod> = new Map()
  fetcher = new Fetcher()

  async load(url: URL, options?: { text?: string }): Promise<Mod> {
    const found = this.cache.get(url.href)
    if (found !== undefined) return found

    const text = options?.text || (await this.fetcher.fetch(url))
    const stmts = parseStmts(text)
    const mod = new Mod({ loader: this, url })
    await mod.executeStmts(stmts)

    this.cache.set(url.href, mod)
    return mod
  }
}
