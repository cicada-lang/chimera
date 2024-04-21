import fs from "node:fs"
import { Mod } from "../lang/mod/index.js"
import { Script } from "../script/index.js"

export interface LoaderOptions {
  onOutput?: (output: string) => void
}

export class Loader {
  private cache: Map<string, Script> = new Map()

  tracked: Array<URL> = []

  constructor(public options: LoaderOptions) {}

  load(url: URL, options?: { text?: string }): Mod {
    const found = this.cache.get(url.href)
    if (found !== undefined) return found.mod

    this.tracked.push(url)
    const text = options?.text || readFileSync(url.pathname)
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

function readFileSync(file: string): string {
  if (process.platform === "win32") {
    return fs.readFileSync(file.slice(1), "utf8")
  } else {
    return fs.readFileSync(file, "utf8")
  }
}
