import pt from "@cicada-lang/partech"
import * as Goals from "../../goal"
import { Goal } from "../../goal"
import * as matchers from "../matchers"

export function goal_matcher(tree: pt.Tree): Goal {
  return pt.matcher<Goal>({
    "goal:apply": ({ name, exp }, { span }) =>
      Goals.Apply(pt.str(name), matchers.exp_matcher(exp)),
    "goal:equation": ({ left, right }, { span }) =>
      Goals.Unifiable(matchers.exp_matcher(left), matchers.exp_matcher(right)),
  })(tree)
}

export function goals_matcher(tree: pt.Tree): Array<Goal> {
  return pt.matcher({
    "goals:goals": ({ goals }) =>
      pt.matchers.zero_or_more_matcher(goals).map(goal_matcher),
  })(tree)
}
