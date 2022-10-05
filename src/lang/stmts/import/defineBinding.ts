import { EnvCons } from "../../env"
import { Mod } from "../../mod"
import { Value } from "../../value"
import { ImportBinding } from "../import"

export function defineBinding(mod: Mod, binding: ImportBinding, value: Value): void {
  switch (binding.kind) {
    case "ImportBindingName": {
      mod.env = EnvCons(binding.name, value, mod.env)
      return
    }

    case "ImportBindingAlias": {
      mod.env = EnvCons(binding.alias, value, mod.env)
      return
    }
  }
}
