import { indent } from "../../utils/indent"
import { evaluateGoalExp } from "../evaluate"
import type { Goal } from "../goal"
import type { GoalExp } from "../goal-exp"
import type { Mod } from "../mod"
import { refreshGoals } from "../refresh"
import { formatReification, reify } from "../reify"
import type { Solution } from "../solution"
import { Solver } from "../solver"
import type { Span } from "../span"
import { Stmt } from "../stmt"
import type { Value } from "../value"
import * as Values from "../value"
import {
  varCollectionFromExp,
  varCollectionFromGoalExp,
  varCollectionMerge,
  varCollectionValidate,
} from "../var-collection"
import {
  QueryPattern,
  queryPatternNames,
  queryPatternToExp,
} from "./utils/QueryPattern"

export class Find extends Stmt {
  constructor(
    public pattern: QueryPattern,
    public limit: number,
    public goals: Array<GoalExp>,
    public span: Span,
  ) {
    super()
  }

  validateSync(mod: Mod): void {
    varCollectionValidate(
      varCollectionMerge([
        varCollectionFromExp(queryPatternToExp(this.pattern)),
        ...this.goals.map(varCollectionFromGoalExp),
      ]),
    )
  }

  executeSync(mod: Mod): string {
    const { goals, variables } = prepareGoals(
      mod,
      this.goals,
      queryPatternNames(this.pattern),
    )
    const solver = Solver.start(goals)
    const solutions = solver.solve(mod, { limit: this.limit })

    switch (this.pattern["@kind"]) {
      case "QueryPatternNames": {
        return formatFoundVariables(mod, solutions, variables)
      }

      case "QueryPatternName": {
        return formatFoundVariable(mod, solutions, variables[0])
      }
    }
  }
}

function prepareGoals(
  mod: Mod,
  goals: Array<GoalExp>,
  names: Array<string>,
): { goals: Array<Goal>; variables: Array<Values.PatternVar> } {
  const variables: Array<Values.PatternVar> = []
  const renames = new Map()
  for (const name of names) {
    const variable = Values.PatternVar(mod.freshen(name))
    variables.push(variable)
    renames.set(name, variable)
  }

  /**

     In a `mod`, `evaluateGoalExp` finds a `Value`
     from `name` of `GoalExps.Apply`.

  **/

  return {
    goals: refreshGoals(
      mod,
      renames,
      goals.map((goal) => evaluateGoalExp(mod, mod.env, goal)),
    ),
    variables,
  }
}

function formatFoundVariable(
  mod: Mod,
  solutions: Array<Solution>,
  variable: Values.PatternVar,
): string {
  return formatResults(
    solutions.map((solution) =>
      formatReification(reify(mod, solution, variable)),
    ),
  )
}

function formatFoundVariables(
  mod: Mod,
  solutions: Array<Solution>,
  variables: Array<Values.PatternVar>,
): string {
  const value = variables.reduceRight<Value>(
    (result, variable) => Values.ArrayCons(variable, result),
    Values.ArrayNull(),
  )

  return formatResults(
    solutions.map((solution) => formatReification(reify(mod, solution, value))),
  )
}

function formatResults(results: Array<string>): string {
  if (results.length === 0) return "[]"
  if (isLargeResults(results)) {
    return `[ \n${results.map((result) => indent(result)).join(",\n")}\n]`
  } else {
    return `[ ${results.join(", ")} ]`
  }
}

function isLargeResults(results: Array<string>): boolean {
  return (
    results.some((result) => result.includes("\n")) ||
    results.join(", ").length >= 60
  )
}
