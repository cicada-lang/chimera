import * as pt from "@cicada-lang/partech"
import * as Exps from "../../exp"
import * as matchers from "../matchers"

export function goal_matcher(tree: pt.Tree): Exps.Goal {
  return pt.matcher<Exps.Goal>({
    "goal:apply": ({ name, exp }, { span }) =>
      Exps.GoalApply(pt.str(name), matchers.exp_matcher(exp)),
    "goal:unify": ({ left, right }, { span }) =>
      Exps.GoalUnifiable(
        matchers.exp_matcher(left),
        matchers.exp_matcher(right),
      ),
  })(tree)
}

export function goals_matcher(tree: pt.Tree): Array<Exps.Goal> {
  return pt.matcher({
    "goals:goals": ({ goals }) =>
      pt.matchers.zero_or_more_matcher(goals).map(goal_matcher),
  })(tree)
}
