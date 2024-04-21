import { Loader } from "../../loader"
import { Script } from "../../script"
import { envEntries, envExtend } from "../env"
import { Mod } from "../mod"
import type { Value } from "../value"
import * as Values from "../value"

export class GlobalStore {
  mod = new Mod({ loader: new Loader({}), url: new URL("globals://") })

  mount(mod: Mod): void {
    for (const [name, value] of envEntries(this.mod.env)) {
      mod.env = envExtend(mod.env, name, value)
    }
  }

  code(text: string): void {
    const script = new Script(this.mod, text)
    script.run()
  }

  define(name: string, value: Value): void {
    this.mod.define(name, value)
  }

  primitive(name: string, arity: number, nativeFn: Values.NativeFn): void {
    this.define(name, Values.Primitive(name, arity, nativeFn))
  }
}
