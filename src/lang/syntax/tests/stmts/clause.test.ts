import { expect, test } from "vitest"
import * as Exps from "../../../exp"
import * as GoalExps from "../../../goal-exp"
import * as Stmts from "../../../stmts"
import { parseStmts } from "../../index"
import { deleteUndefined } from "../utils"

test("parse Clause", () => {
  expect(
    parseStmts(`

Friendship { left, right, alcohol }
------------------------------------ {
  Drink { person: left, alcohol }
  Drink { person: right, alcohol }
}

`),
  ).toMatchObject(
    deleteUndefined([
      new Stmts.RelationClause(
        "Friendship",
        undefined,
        Exps.Objekt({
          left: Exps.PatternVar("left"),
          right: Exps.PatternVar("right"),
          alcohol: Exps.PatternVar("alcohol"),
        }),
        [
          GoalExps.Apply(
            "Drink",
            Exps.Objekt({
              person: Exps.PatternVar("left"),
              alcohol: Exps.PatternVar("alcohol"),
            }),
          ),
          GoalExps.Apply(
            "Drink",
            Exps.Objekt({
              person: Exps.PatternVar("right"),
              alcohol: Exps.PatternVar("alcohol"),
            }),
          ),
        ],
      ),
    ]),
  )
})
