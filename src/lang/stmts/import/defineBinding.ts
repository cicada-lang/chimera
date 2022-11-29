import type { Mod } from "../../mod/index.ts"
import type { Relation } from "../../relation/index.ts"
import type { ImportBinding } from "../import/index.ts"

export function defineBinding(
  mod: Mod,
  binding: ImportBinding,
  relation: Relation,
): void {
  switch (binding["@kind"]) {
    case "ImportBindingName": {
      mod.relations.set(binding.name, relation)
      return
    }

    case "ImportBindingAlias": {
      mod.relations.set(binding.alias, relation)
      return
    }
  }
}
