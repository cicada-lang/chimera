import * as pt from "@cicada-lang/partech"
import type { GoalExp } from "../../goal-exp"
import * as GoalExps from "../../goal-exp"
import * as matchers from "../matchers"

export function goal_matcher(tree: pt.Tree): GoalExp {
  return pt.matcher<GoalExp>({
    "goal:apply": ({ name, exp }, { span }) =>
      GoalExps.Apply(pt.str(name), matchers.exp_matcher(exp), span),
    "goal:equal": ({ left, right }, { span }) =>
      GoalExps.Equal(
        matchers.exp_matcher(left),
        matchers.exp_matcher(right),
        span,
      ),
  })(tree)
}

export function goals_matcher(tree: pt.Tree): Array<GoalExp> {
  return pt.matcher({
    "goals:goals": ({ goals }) =>
      pt.matchers.zero_or_more_matcher(goals).map(goal_matcher),
  })(tree)
}
