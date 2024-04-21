import { Loader } from "../../loader/index.js"
import { Script } from "../../script/index.js"
import { envEntries, envExtend } from "../env/index.js"
import { Mod } from "../mod/index.js"
import * as Values from "../value/index.js"
import { type Value } from "../value/index.js"

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
