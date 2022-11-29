import type { Mod } from "../lang/mod/index.ts"
import type { Script } from "../script/index.ts"
import * as Scripts from "../scripts/index.ts"

export function createScript(mod: Mod, text: string): Script {
  if (mod.options.url.href.endsWith(".md")) {
    return new Scripts.MarkdownScript(mod, text)
  } else {
    return new Scripts.DefaultScript(mod, text)
  }
}
