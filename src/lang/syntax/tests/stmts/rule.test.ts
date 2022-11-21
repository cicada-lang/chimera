import { expect, test } from "vitest"
import * as Exps from "../../../exp"
import * as Stmts from "../../../stmts"
import { parseStmts } from "../../index"
import { deleteUndefined } from "../utils"

test("parse Rule", () => {
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
      new Stmts.RelationRule(
        "Friendship",
        undefined,
        Exps.Objekt({
          left: Exps.PatternVar("left"),
          right: Exps.PatternVar("right"),
          alcohol: Exps.PatternVar("alcohol"),
        }),
        [
          Exps.GoalApply(
            "Drink",
            Exps.Objekt({
              person: Exps.PatternVar("left"),
              alcohol: Exps.PatternVar("alcohol"),
            }),
          ),
          Exps.GoalApply(
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
