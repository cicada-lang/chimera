import type { Mod } from "../lang/mod"
import type { Script } from "../script"
import * as Scripts from "../scripts"

export function createScript(mod: Mod, text: string): Script {
  return new Scripts.DefaultScript(mod, text)
}
