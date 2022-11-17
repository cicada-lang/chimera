import * as pt from "@cicada-lang/partech"

export function names_matcher(tree: pt.Tree): Array<string> {
  return pt.matcher({
    "names:names": ({ names, last_name }) => [
      ...pt.matchers.zero_or_more_matcher(names).map(pt.str),
      pt.str(last_name),
    ],
  })(tree)
}
