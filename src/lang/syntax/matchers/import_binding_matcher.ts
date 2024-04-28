import * as pt from "@cicada-lang/partech"
import * as Stmts from "../../stmt/index.js"

export function import_binding_matcher(tree: pt.Tree): Stmts.ImportBinding {
  return pt.matcher<Stmts.ImportBinding>({
    "import_binding:name": ({ name }) => Stmts.ImportBinding(pt.str(name)),
    "import_binding:alias": ({ name, alias }) =>
      Stmts.ImportBinding(pt.str(name), pt.str(alias)),
  })(tree)
}
