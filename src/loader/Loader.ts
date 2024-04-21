import { FetcherSync } from "@cicada-lang/framework/lib/fetcher-sync"
import { Mod } from "../lang/mod"
import { Script } from "../script"

export interface LoaderOptions {
  onOutput?: (output: string) => void
}

export class Loader {
  private cache: Map<string, Script> = new Map()
  fetcher = new FetcherSync()
  tracked: Array<URL> = []

  constructor(public options: LoaderOptions) {}

  load(url: URL, options?: { text?: string }): Mod {
    const found = this.cache.get(url.href)
    if (found !== undefined) return found.mod

    this.tracked.push(url)
    const text = options?.text || this.fetcher.fetch(url)
    const mod = new Mod({ url, loader: this })
    const script = new Script(mod, text)
    script.run()
    this.cache.set(url.href, script)
    return mod
  }

  delete(url: URL): void {
    this.cache.delete(url.href)

    for (const script of this.cache.values()) {
      if (script.mod.imported.find(({ href }) => href === url.href)) {
        this.delete(script.mod.options.url)
      }
    }
  }
}
