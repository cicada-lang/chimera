import * as pt from "@cicada-lang/partech"
import type { GoalExp } from "../../goal-exp/index.js"
import * as GoalExps from "../../goal-exp/index.js"
import * as matchers from "../matchers/index.js"

export function goal_matcher(tree: pt.Tree): GoalExp {
  return pt.matcher<GoalExp>({
    "goal:apply": ({ target, args }, { span }) =>
      GoalExps.Apply(
        matchers.operator_matcher(target),
        matchers.args_matcher(args),
        span,
      ),
    "goal:equal": ({ left, right }, { span }) =>
      GoalExps.Equal(
        matchers.exp_matcher(left),
        matchers.exp_matcher(right),
        span,
      ),
    "goal:not_equal": ({ left, right }, { span }) =>
      GoalExps.NotEqual(
        matchers.exp_matcher(left),
        matchers.exp_matcher(right),
        span,
      ),
    "goal:conj": ({ goals }, { span }) =>
      GoalExps.Conj(
        pt.matchers.zero_or_more_matcher(goals).map(goal_matcher),
        span,
      ),
    "goal:disj": ({ goals }, { span }) =>
      GoalExps.Disj(
        pt.matchers.zero_or_more_matcher(goals).map(goal_matcher),
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
