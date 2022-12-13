import { Loader } from "../../loader"
import * as Scripts from "../../scripts"
import { envEntries, envExtend } from "../env"
import { Mod } from "../mod"
import type { Value } from "../value"

export class GlobalStore {
  mod = new Mod({ loader: new Loader({}), url: new URL("globals://") })

  async mount(mod: Mod): Promise<void> {
    for (const [name, value] of envEntries(this.mod.env)) {
      mod.env = envExtend(mod.env, name, value)
    }
  }

  define(name: string, value: Value): void {
    this.mod.define(name, value)
  }

  async code(text: string): Promise<void> {
    const script = Scripts.createScript(this.mod, text)
    await script.run()
  }
}
