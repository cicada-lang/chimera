import { Mod } from "../../mod"
import { Relation } from "../../relation"
import { ImportBinding } from "../import"

export function defineBinding(
  mod: Mod,
  binding: ImportBinding,
  relation: Relation,
): void {
  switch (binding.kind) {
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
