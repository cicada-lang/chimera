import { expect, test } from "vitest"
import * as Exps from "../../../exp"
import * as Stmts from "../../../stmts"
import { parseStmts } from "../../index"
import { deleteUndefined } from "../utils"

test("parse Rule", () => {
  expect(
    parseStmts(`

Friends { left, right, alcohol }
------------------------------------ {
  Drink { person: left, alcohol }
  Drink { person: right, alcohol }
}

`),
  ).toMatchObject(
    deleteUndefined([
      new Stmts.Rule(
        "Friends",
        undefined,
        Exps.ObjektUnfolded([
          Exps.PropertyPlain("left", Exps.PatternVar("left")),
          Exps.PropertyPlain("right", Exps.PatternVar("right")),
          Exps.PropertyPlain("alcohol", Exps.PatternVar("alcohol")),
        ]),
        [
          Exps.GoalApply(
            "Drink",
            Exps.ObjektUnfolded([
              Exps.PropertyPlain("person", Exps.PatternVar("left")),
              Exps.PropertyPlain("alcohol", Exps.PatternVar("alcohol")),
            ]),
          ),
          Exps.GoalApply(
            "Drink",
            Exps.ObjektUnfolded([
              Exps.PropertyPlain("person", Exps.PatternVar("right")),
              Exps.PropertyPlain("alcohol", Exps.PatternVar("alcohol")),
            ]),
          ),
        ],
      ),
    ]),
  )
})
